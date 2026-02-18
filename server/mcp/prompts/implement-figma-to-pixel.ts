import { z } from "zod";

export default defineMcpPrompt({
  name: "implement-figma-to-pixel",
  title: "Implement Figma Design with Pixel 3",
  description:
    "Convert Figma design to Vue component using Pixel 3 design system.",

  inputSchema: {
    figmaLink: z
      .string()
      .describe(
        "Figma design link or node URL (e.g., https://figma.com/design/file-key?node-id=1-2)"
      ),
    componentName: z
      .string()
      .optional()
      .describe(
        "(Optional) Target Pixel component name (e.g., MpButton, MpCard). Auto-detected if not provided."
      )
  },

  handler: async ({ figmaLink, componentName }) => {
    return {
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `
## Implement Figma design into a Vue component using Mekari Pixel 3.

**Figma URL:** ${figmaLink}
${componentName ? `**Target Component:** ${componentName}` : "**Target Component:** (Auto-detect from design)"}

**Required Skills:**
- Use **Pixel** skill to implement the design with Pixel 3 components

**Required MCP:**
- Use **Figma** MCP for design extraction and context
- Use **Pixel** MCP for component documentation and design token reference

**Workflow:**

1. **Extract Design from Figma**
   - Parse node ID from the Figma URL
   - Use Figma MCP tools to fetch design context and screenshot
   - Analyze layout, colors, typography, spacing, and interactive elements

2. **Get Pixel Documentation**
   - Identify required Pixel components from design
   - Use Pixel MCP tools (get-component, get-docs) for component details and usage guidelines

3. **Implement Vue Component**
   - Map design elements to Pixel components
   - Apply styling hierarchy: CSS Props → CSS Function → Design Token 2.4
   - Follow Vue 3 Composition API with <script setup>
   - Place <template> block before <script setup>

4. **Validate Implementation**:
   - Verify all UI elements match Figma design
   - Ensure Design Token 2.4 semantic tokens used
   - Check spacing, typography, and colors accuracy
`
          }
        }
      ]
    };
  }
});
