import Fuse from "fuse.js";

export type DocumentationEntry = {
  rawName: string;
  slugName: string;
  keyName: string;
  section: string;
  description: string;
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, "-");

const escapeRegExp = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export const toSearchKey = (value: string, stripPattern: RegExp) =>
  slugify(value).replace(stripPattern, "");

export const toSearchQuery = (value: string, stripPattern: RegExp) => ({
  slugName: slugify(value),
  keyName: toSearchKey(value, stripPattern)
});

export const buildDocumentationIndex = ({
  fileContent,
  headerPrefix,
  keyStripPattern
}: {
  fileContent: string;
  headerPrefix: string;
  keyStripPattern: RegExp;
}) => {
  const sections = fileContent.split(
    new RegExp(`\\n(?=${escapeRegExp(headerPrefix)})`)
  );

  return sections
    .map((section) => {
      const lines = section.split("\n");
      const firstLine = lines[0]?.trim() || "";

      if (!firstLine.startsWith(headerPrefix)) {
        return null;
      }

      const rawName = firstLine.slice(headerPrefix.length).trim();
      const description =
        lines
          .slice(1)
          .map((line) => line.trim())
          .find((line) => line.length > 0 && !line.startsWith("#")) || "";

      return {
        rawName,
        slugName: slugify(rawName),
        keyName: toSearchKey(rawName, keyStripPattern),
        section,
        description
      };
    })
    .filter((entry): entry is DocumentationEntry => entry !== null);
};

export const findBestMatches = <
  T extends { slugName: string; keyName: string }
>(
  entries: T[],
  query: { slugName: string; keyName: string },
  { limit = 10 }: { limit?: number } = {}
) => {
  const exact = entries.find((entry) => {
    return entry.slugName === query.slugName || entry.keyName === query.keyName;
  });

  if (exact) {
    return [exact];
  }

  const startsWith = entries.filter((entry) => {
    return (
      entry.slugName.startsWith(query.slugName) ||
      entry.keyName.startsWith(query.keyName)
    );
  });

  if (startsWith.length > 0) {
    return startsWith.slice(0, limit);
  }

  return entries
    .filter((entry) => {
      return (
        entry.slugName.includes(query.slugName) ||
        entry.keyName.includes(query.keyName)
      );
    })
    .slice(0, limit);
};

export const isListAllIntent = (query: string, singularType: string) => {
  const normalized = query.trim().toLowerCase();
  const pluralType = `${singularType}s`;
  const typePattern = new RegExp(`\\b(${singularType}|${pluralType})\\b`);

  // "all" shorthand on its own
  if (normalized === "all") return true;

  // Contains "all" or "every" + the type word anywhere in query
  // e.g. "get all components", "give me every component", "all available components"
  if (/\b(all|every)\b/.test(normalized) && typePattern.test(normalized))
    return true;

  // Short verb-only form without "all": "list components", "show the patterns", "fetch available templates"
  const shortIntentPattern = new RegExp(
    `^(list|show|get|fetch|display|find)\\s+(all\\s+|the\\s+|available\\s+)?(${singularType}|${pluralType})$`
  );
  if (shortIntentPattern.test(normalized)) return true;

  return false;
};

export const findBestMatchesFuzzy = <T extends DocumentationEntry>(
  entries: T[],
  rawQuery: string,
  { tokenSearch = false, limit }: { tokenSearch?: boolean; limit?: number } = {}
): T[] => {
  // Collapse 3+ consecutive identical chars ("butonnn" → "buton")
  const normalizedQuery = rawQuery.replace(/(.)\1{2,}/g, "$1");

  const fuse = new Fuse(entries, {
    keys: [
      { name: "rawName", weight: 2 },
      { name: "slugName", weight: 1.5 },
      { name: "keyName", weight: 1 },
      { name: "description", weight: 0.5 }
    ],
    useTokenSearch: tokenSearch,
    threshold: 0.4,
    ignoreLocation: true,
    includeScore: true,
    minMatchCharLength: 2
  });

  const results = fuse.search(normalizedQuery, limit ? { limit } : {});

  if (results.length > 0) {
    return results.map((r) => r.item);
  }

  // Fallback to exact/prefix/includes matching
  return findBestMatches(entries, toSearchQuery(normalizedQuery, /[-/]/g));
};
