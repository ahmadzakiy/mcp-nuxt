import { z } from "zod";
import Fuse from "fuse.js";
import { isListAllIntent } from "../utils/searchDocumentation";

export default defineMcpTool({
  description:
    "Retrieves valid icon names for the MpIcon component `name` prop. Use to list all available icons or search for a specific icon by name (e.g. 'delete', 'edit', 'close').",
  annotations: {
    readOnlyHint: true,
    destructiveHint: false,
    idempotentHint: true,
    openWorldHint: true
  },
  inputSchema: {
    query: z
      .string()
      .describe(
        'Icon name to search for (e.g. "delete", "edit") or intent to list all (e.g. "list all icons", "all")'
      )
  },
  inputExamples: [
    { query: "delete" },
    { query: "edit" },
    { query: "close" },
    { query: "list all icons" }
  ],
  cache: "30m",
  async handler({ query }) {
    const log = useMcpLogger("get-icon-name");
    try {
      const config = useRuntimeConfig();
      const baseUrl = config.pixelMcpBaseUrl;
      const fileContent = await $fetch<string>(`${baseUrl}/llms-icons.txt`, {
        responseType: "text"
      });

      // List all intent → return full file
      if (isListAllIntent(query, "icon")) {
        return {
          query,
          content: fileContent.trim(),
          documentationUrl: "https://docs.mekari.design/components/icon.html"
        };
      }

      // Search: extract all icon names (lines starting with "- ")
      const allIcons = fileContent
        .split("\n")
        .filter((line) => line.startsWith("- "))
        .map((line) => ({ name: line.slice(2).trim() }));

      const normalized = query
        .toLowerCase()
        .trim()
        .replace(/(.)\1{2,}/g, "$1");

      const fuse = new Fuse(allIcons, {
        keys: [{ name: "name", weight: 1 }],
        useTokenSearch: true,
        threshold: 0.3,
        ignoreLocation: true,
        includeScore: true,
        minMatchCharLength: 2
      });

      const results = fuse.search(normalized);
      const matches = results.map((r) => r.item.name);

      if (matches.length === 0) {
        throw createError({
          statusCode: 404,
          message: `No icon found matching '${query}'. Use "list all icons" to see available icon names.`
        });
      }

      await log.notify.info({
        msg: `Found ${matches.length} icon(s) for query: ${query}`
      });
      return {
        query,
        matches,
        total: matches.length,
        documentationUrl: "https://docs.mekari.design/components/icon.html"
      };
    } catch (error) {
      await log.notify.error({
        msg: `Error reading icon names: ${error instanceof Error ? error.message : "Unknown error"}`
      });
      throw error;
    }
  }
});
