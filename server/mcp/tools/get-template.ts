import { z } from "zod";
import {
  buildDocumentationIndex,
  findBestMatchesFuzzy,
  isListAllIntent
} from "../utils/searchDocumentation";

export default defineMcpTool({
  description:
    "Retrieves Pixel UI template documentation and code examples from llms-templates.txt",
  annotations: {
    readOnlyHint: true,
    destructiveHint: false,
    idempotentHint: true,
    openWorldHint: true
  },
  inputSchema: {
    templateName: z
      .string()
      .describe(
        'The name of the template (e.g., "base layout", "qontak inbox", "jurnal layout")'
      )
  },
  inputExamples: [
    { templateName: "base layout" },
    { templateName: "qontak inbox" },
    { templateName: "list all templates" }
  ],
  cache: "30m",
  async handler({ templateName }) {
    const log = useMcpLogger("get-template");
    try {
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
        return {
          total: templateIndex.length,
          templates: templateIndex.map((template) => ({
            name: template.rawName,
            description: template.description
          })),
          message: `Found ${templateIndex.length} templates in documentation.`
        };
      }

      const matches = findBestMatchesFuzzy(templateIndex, templateName, {
        tokenSearch: true
      });

      if (matches.length === 0) {
        const availableTemplates = templateIndex.map((t) => t.rawName);
        throw createError({
          statusCode: 404,
          message: `Template '${templateName}' not found in documentation. Available templates: ${availableTemplates.join(", ")}`
        });
      }

      // If multiple matches, check if the top result is an exact name match before asking to refine
      if (matches.length > 1) {
        const query = templateName.trim().toLowerCase();
        const exactMatch = matches.find(
          (m) =>
            m.rawName.toLowerCase() === query ||
            m.slugName === query.replace(/\s+/g, "-") ||
            m.keyName === query.replace(/[\s-]/g, "")
        );
        if (!exactMatch) {
          return {
            query: templateName,
            message: `Found ${matches.length} templates matching '${templateName}'. Please refine your query.`,
            matches: matches.map((t) => t.rawName)
          };
        }
        const match = exactMatch;
        await log.notify.info({ msg: `Found template: ${match.rawName}` });
        return {
          name: match.rawName,
          documentation: match.section.trim()
        };
      }

      const match = matches[0];
      await log.notify.info({ msg: `Found template: ${match.rawName}` });
      return {
        name: match.rawName,
        documentation: match.section.trim()
      };
    } catch (error) {
      await log.notify.error({
        msg: `Error reading template documentation: ${error instanceof Error ? error.message : "Unknown error"}`
      });
      throw error;
    }
  }
});
