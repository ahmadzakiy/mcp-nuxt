import { z } from "zod";

export default defineMcpTool({
  name: "hello-pixel",
  description: "A simple test tool",
  inputSchema: {
    name: z.string().describe("The name of the user to greet")
  },
  handler: async ({ name }) => {
    return {
      content: [
        {
          type: "text",
          text: `Hello ${name}, welcome to Pixel MCP Server`
        }
      ]
    };
  }
});
