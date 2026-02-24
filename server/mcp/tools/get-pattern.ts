import { z } from "zod";
import {
  buildDocumentationIndex,
  findBestMatches,
  isListAllIntent,
  toSearchQuery
} from "../utils/searchDocumentation";

export default defineMcpTool({
  description:
    "Retrieves Pixel UI pattern documentation and code examples from llms-patterns.txt",
  inputSchema: {
    patternName: z
      .string()
      .describe(
        'The name of the pattern (e.g., "beaker", "input otp", "summary box")'
      )
  },
  async handler({ patternName }) {
    try {
      const query = toSearchQuery(patternName, /-/g);

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
        return jsonResult({
          total: patternIndex.length,
          patterns: patternIndex.map((pattern) => ({
            name: pattern.rawName,
            description: pattern.description
          })),
          message: `Found ${patternIndex.length} patterns in documentation.`
        });
      }

      const matches = findBestMatches(patternIndex, query);

      if (matches.length === 0) {
        const availablePatterns = patternIndex.map((p) => p.rawName);
        return errorResult(
          `Pattern '${patternName}' not found in documentation. Available patterns: ${availablePatterns.join(
            ", "
          )}`
        );
      }

      // Multiple matches — return a list so the caller can refine
      if (matches.length > 1) {
        return jsonResult({
          query: patternName,
          message: `Found ${matches.length} patterns matching '${patternName}'. Please refine your query.`,
          matches: matches.map((p) => p.rawName)
        });
      }

      const match = matches[0];
      return jsonResult({
        name: match.rawName,
        documentation: match.section.trim()
      });
    } catch (error) {
      return errorResult(
        `Error reading pattern documentation: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }
});
