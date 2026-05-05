import { z } from "zod";
import { normalizeComponentName } from "../utils/normalizeComponentName";
import {
  buildDocumentationIndex,
  findBestMatchesFuzzy,
  isListAllIntent
} from "../utils/searchDocumentation";

const isDescriptiveQuery = (query: string) =>
  query.trim().split(/\s+/).length > 2;

const STOP_WORDS = new Set([
  "a",
  "an",
  "the",
  "in",
  "on",
  "at",
  "to",
  "for",
  "of",
  "with",
  "by",
  "from",
  "and",
  "or",
  "is",
  "are",
  "be",
  "that",
  "this",
  "i",
  "want",
  "need",
  "show",
  "me",
  "give",
  "get",
  "inside",
  "within",
  "which",
  "use",
  "used",
  "using"
]);

const stripStopWords = (query: string) =>
  query
    .trim()
    .split(/\s+/)
    .filter((word) => !STOP_WORDS.has(word.toLowerCase()))
    .join(" ");

export default defineMcpTool({
  description:
    "Retrieves Pixel component documentation. Accepts a component name (e.g. 'Button', 'mp-button') OR a natural-language description (e.g. 'a delete button inside a modal') to find multiple relevant components.",
  annotations: {
    readOnlyHint: true,
    destructiveHint: false,
    idempotentHint: true,
    openWorldHint: true
  },
  inputSchema: {
    componentName: z
      .string()
      .describe(
        'Component name (e.g. "Button", "MpButton", "mp-button") or a description (e.g. "a delete button inside a modal")'
      )
  },
  inputExamples: [
    { componentName: "Button" },
    { componentName: "mp-input" },
    { componentName: "a delete button inside a modal" },
    { componentName: "list all components" }
  ],
  cache: "30m",
  async handler({ componentName }) {
    const log = useMcpLogger("get-component");
    try {
      // Fetch the llms-components.txt file from public directory
      const config = useRuntimeConfig();
      const baseUrl = config.pixelMcpBaseUrl;
      const fileContent = await $fetch<string>(
        `${baseUrl}/llms-components.txt`,
        {
          responseType: "text"
        }
      );

      const componentIndex = buildDocumentationIndex({
        fileContent,
        headerPrefix: "# ",
        keyStripPattern: /[-/]/g
      });

      if (isListAllIntent(componentName, "component")) {
        return {
          total: componentIndex.length,
          components: componentIndex.map((component) => ({
            name: normalizeComponentName(component.rawName),
            description: component.description
          })),
          message: `Found ${componentIndex.length} components in documentation.`
        };
      }

      // Natural language description → token search, return multiple components
      if (isDescriptiveQuery(componentName)) {
        const cleanedQuery = stripStopWords(componentName);
        const matches = findBestMatchesFuzzy(
          componentIndex,
          cleanedQuery || componentName,
          {
            tokenSearch: true,
            limit: 5
          }
        );

        if (matches.length === 0) {
          throw createError({
            statusCode: 404,
            message: `No components found matching '${componentName}'. Try using a component name like 'Button' or 'Modal'.`
          });
        }

        return {
          query: componentName,
          componentsFound: matches.length,
          components: matches.map((match) => ({
            name: normalizeComponentName(match.rawName),
            componentName: `mp-${match.rawName.toLowerCase()}`,
            documentation: match.section.trim(),
            documentationUrl: `https://docs.mekari.design/components/${match.rawName.toLowerCase()}.html`
          }))
        };
      }

      // Single component name lookup → plain fuzzy, return best match
      const matches = findBestMatchesFuzzy(componentIndex, componentName);
      const match = matches.length > 0 ? matches[0] : null;

      if (!match) {
        throw createError({
          statusCode: 404,
          message: `Component '${componentName}' not found in documentation. Please check the component name and try again.`
        });
      }

      const matchedName = normalizeComponentName(match.rawName);
      await log.notify.info({ msg: `Found component: ${matchedName}` });

      return {
        name: matchedName,
        componentName: `mp-${match.rawName.toLowerCase()}`,
        documentation: match.section.trim(),
        documentationUrl: `https://docs.mekari.design/components/${match.rawName.toLowerCase()}.html`
      };
    } catch (error) {
      await log.notify.error({
        msg: `Error reading component documentation: ${error instanceof Error ? error.message : "Unknown error"}`
      });
      throw error;
    }
  }
});
