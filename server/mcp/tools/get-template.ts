import { z } from "zod";
import {
  buildDocumentationIndex,
  findBestMatches,
  isListAllIntent,
  toSearchQuery
} from "../utils/searchDocumentation";

export default defineMcpTool({
  description:
    "Retrieves Pixel UI template documentation and code examples from llms-templates.txt",
  inputSchema: {
    templateName: z
      .string()
      .describe(
        'The name of the template (e.g., "base layout", "qontak inbox", "jurnal layout")'
      )
  },
  async handler({ templateName }) {
    try {
      const query = toSearchQuery(templateName, /[-/]/g);

      const config = useRuntimeConfig();
      const baseUrl = config.pixelMcpBaseUrl;
      const fileContent = await $fetch<string>(
        `${baseUrl}/llms-templates.txt`,
        {
          responseType: "text"
        }
      );

      const templateIndex = buildDocumentationIndex({
        fileContent,
        headerPrefix: "# Template: ",
        keyStripPattern: /[-/]/g
      });

      if (isListAllIntent(templateName, "template")) {
        return jsonResult({
          total: templateIndex.length,
          templates: templateIndex.map((template) => ({
            name: template.rawName,
            description: template.description
          })),
          message: `Found ${templateIndex.length} templates in documentation.`
        });
      }

      const matches = findBestMatches(templateIndex, query);

      if (matches.length === 0) {
        const availableTemplates = templateIndex.map((t) => t.rawName);
        return errorResult(
          `Template '${templateName}' not found in documentation. Available templates: ${availableTemplates.join(
            ", "
          )}`
        );
      }

      // Multiple matches — return a list so the caller can refine
      if (matches.length > 1) {
        return jsonResult({
          query: templateName,
          message: `Found ${matches.length} templates matching '${templateName}'. Please refine your query.`,
          matches: matches.map((t) => t.rawName)
        });
      }

      const match = matches[0];
      return jsonResult({
        name: match.rawName,
        documentation: match.section.trim()
      });
    } catch (error) {
      return errorResult(
        `Error reading template documentation: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }
});
