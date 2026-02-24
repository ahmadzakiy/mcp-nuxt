import { z } from "zod";
import { normalizeComponentName } from "../utils/normalizeComponentName";
import {
  buildDocumentationIndex,
  findBestMatches,
  isListAllIntent
} from "../utils/searchDocumentation";

export default defineMcpTool({
  description:
    "Retrieves Pixel component documentation and details from llms-components.txt",
  inputSchema: {
    componentName: z
      .string()
      .describe(
        'The name of the component (e.g., "Button", "MpButton", "mp-button")'
      )
  },
  // cache: '30m',
  async handler({ componentName }) {
    try {
      const normalizedName = normalizeComponentName(componentName);

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
        return jsonResult({
          total: componentIndex.length,
          components: componentIndex.map((component) => ({
            name: normalizeComponentName(component.rawName),
            description: component.description
          })),
          message: `Found ${componentIndex.length} components in documentation.`
        });
      }

      const searchableComponentIndex = componentIndex.map((component) => {
        const normalizedComponent = normalizeComponentName(
          component.rawName
        ).toLowerCase();
        return {
          ...component,
          slugName: normalizedComponent,
          keyName: normalizedComponent
        };
      });

      const matches = findBestMatches(searchableComponentIndex, {
        slugName: normalizedName.toLowerCase(),
        keyName: normalizedName.toLowerCase()
      });

      const match = matches.length > 0 ? matches[0] : null;

      if (!match) {
        return errorResult(
          `Component '${componentName}' not found in documentation. Please check the component name and try again.`
        );
      }

      return jsonResult({
        name: normalizedName,
        componentName: componentName,
        documentation: match.section.trim(),
        documentation_url: `https://docs.mekari.design/components/${normalizedName.toLowerCase()}.html`
      });
    } catch (error) {
      return errorResult(
        `Error reading component documentation: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }
});
