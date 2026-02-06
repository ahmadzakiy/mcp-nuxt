import { z } from "zod";

export default defineMcpPrompt({
  name: "create-design-to-pixel",
  title: "Create Vue Component with Pixel 3",
  description:
    "Generate Vue component from natural language description using Pixel 3 design system. No Figma required - purely text-to-code implementation.",

  inputSchema: {
    description: z
      .string()
      .describe(
        "What to create (e.g., 'a login form with email, password, and reset button' or 'a user profile card with avatar and edit button')"
      )
  },

  handler: async ({ description }) => {
    return {
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `Create: ${description}

Use the **"pixel"** skill to implement this with Mekari Pixel 3 design system.

The pixel skill will:
- Analyze what components are needed
- Use Pixel MCP tools (get-component, get-docs) for documentation
- Generate complete Vue SFC with proper structure
- Apply Design Token 2.4 semantic tokens
- Follow all Pixel design system guidelines

Begin implementation using the pixel skill.`
          }
        }
      ]
    };
  }
});
