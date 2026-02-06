import { z } from "zod";

export default defineMcpPrompt({
  name: "implement-figma-to-pixel",
  title: "Implement Figma Design with Pixel 3",
  description:
    "Convert Figma design to Vue component using Pixel 3 design system. Delegates to figma-implement-design and pixel skills.",

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
            text: `Implement the Figma design into a Vue component using Mekari Pixel 3.

**Figma URL:** ${figmaLink}
${componentName ? `**Target Component:** ${componentName}` : "**Target Component:** (Auto-detect from design)"}

**Required Skills:**
- Use the **"figma-implement-design"** skill to fetch and analyze the Figma design
- Use the **"pixel"** skill to implement the design with Pixel 3 components

**Workflow:**

1. **Extract Design from Figma** (using figma-implement-design skill):
   - Parse node ID from the Figma URL
   - Use Figma MCP tools to fetch design context and screenshot
   - Analyze layout, colors, typography, spacing, and interactive elements

2. **Get Pixel Documentation** (using pixel skill):
   - Identify required Pixel components from design
   - Use Pixel MCP tools (get-component, get-docs) for component APIs

3. **Implement Vue Component** (using pixel skill):
   - Map design elements to Pixel components
   - Apply styling hierarchy: CSS Props → CSS Function → Design Token 2.4
   - Follow Vue 3 Composition API with <script setup>
   - Place <template> block before <script setup>

4. **Validate Implementation**:
   - Verify all UI elements match Figma design
   - Ensure Design Token 2.4 semantic tokens used
   - Check spacing, typography, and colors accuracy
   - Add TypeScript types, event handlers, accessibility attributes

**Important:** Let the skills handle MCP tool calls. The figma-implement-design skill knows how to interact with Figma MCP properly.

Begin by using the figma-implement-design skill to extract the design from Figma.`
          }
        }
      ]
    };
  }
});
