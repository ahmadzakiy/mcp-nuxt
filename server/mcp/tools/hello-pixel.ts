import { z } from "zod";

export default defineMcpTool({
  name: "hello-pixel",
  description: "A simple test tool",
  annotations: {
    readOnlyHint: true,
    destructiveHint: false,
    idempotentHint: true,
    openWorldHint: false
  },
  inputSchema: {
    name: z.string().describe("The name of the user to greet")
  },
  inputExamples: [{ name: "World" }, { name: "Pixel" }],
  handler: async ({ name }) => {
    return `Hello ${name}, welcome to Pixel MCP Server`;
  }
});
