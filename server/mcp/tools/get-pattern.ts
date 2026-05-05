import { z } from "zod";
import {
  buildDocumentationIndex,
  findBestMatchesFuzzy,
  isListAllIntent
} from "../utils/searchDocumentation";

export default defineMcpTool({
  description:
    "Retrieves Pixel UI pattern documentation and code examples from llms-patterns.txt",
  annotations: {
    readOnlyHint: true,
    destructiveHint: false,
    idempotentHint: true,
    openWorldHint: true
  },
  inputSchema: {
    patternName: z
      .string()
      .describe(
        'The name of the pattern (e.g., "beaker", "input otp", "summary box")'
      )
  },
  inputExamples: [
    { patternName: "input otp" },
    { patternName: "summary box" },
    { patternName: "list all patterns" }
  ],
  cache: "30m",
  async handler({ patternName }) {
    const log = useMcpLogger("get-pattern");
    try {
      const config = useRuntimeConfig();
      const baseUrl = config.pixelMcpBaseUrl;
      const fileContent = await $fetch<string>(`${baseUrl}/llms-patterns.txt`, {
        responseType: "text"
      });

      const patternIndex = buildDocumentationIndex({
        fileContent,
        headerPrefix: "# Pattern: ",
        keyStripPattern: /-/g
      });

      if (isListAllIntent(patternName, "pattern")) {
        return {
          total: patternIndex.length,
          patterns: patternIndex.map((pattern) => ({
            name: pattern.rawName,
            description: pattern.description
          })),
          message: `Found ${patternIndex.length} patterns in documentation.`
        };
      }

      const matches = findBestMatchesFuzzy(patternIndex, patternName, {
        tokenSearch: true
      });

      if (matches.length === 0) {
        const availablePatterns = patternIndex.map((p) => p.rawName);
        throw createError({
          statusCode: 404,
          message: `Pattern '${patternName}' not found in documentation. Available patterns: ${availablePatterns.join(", ")}`
        });
      }

      // If multiple matches, check if the top result is an exact name match before asking to refine
      if (matches.length > 1) {
        const query = patternName.trim().toLowerCase();
        const exactMatch = matches.find(
          (m) =>
            m.rawName.toLowerCase() === query ||
            m.slugName === query.replace(/\s+/g, "-") ||
            m.keyName === query.replace(/[\s-]/g, "")
        );
        if (!exactMatch) {
          return {
            query: patternName,
            message: `Found ${matches.length} patterns matching '${patternName}'. Please refine your query.`,
            matches: matches.map((p) => p.rawName)
          };
        }
        const match = exactMatch;
        await log.notify.info({ msg: `Found pattern: ${match.rawName}` });
        return {
          name: match.rawName,
          documentation: match.section.trim()
        };
      }

      const match = matches[0];
      await log.notify.info({ msg: `Found pattern: ${match.rawName}` });
      return {
        name: match.rawName,
        documentation: match.section.trim()
      };
    } catch (error) {
      await log.notify.error({
        msg: `Error reading pattern documentation: ${error instanceof Error ? error.message : "Unknown error"}`
      });
      throw error;
    }
  }
});
