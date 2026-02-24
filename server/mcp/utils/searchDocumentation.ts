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
  query: { slugName: string; keyName: string }
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
    return startsWith;
  }

  return entries.filter((entry) => {
    return (
      entry.slugName.includes(query.slugName) ||
      entry.keyName.includes(query.keyName)
    );
  });
};

export const isListAllIntent = (query: string, singularType: string) => {
  const normalized = query.trim().toLowerCase();
  const pluralType = `${singularType}s`;

  return (
    normalized === "all" ||
    normalized === `all ${singularType}` ||
    normalized === `all ${pluralType}` ||
    normalized === `list all ${singularType}` ||
    normalized === `list all ${pluralType}` ||
    normalized === `show all ${singularType}` ||
    normalized === `show all ${pluralType}`
  );
};
