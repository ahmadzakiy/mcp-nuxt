import {
  streamText,
  UIMessage,
  convertToModelMessages,
  createGateway,
  stepCountIs
} from "ai";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import { createMCPClient, MCPClient } from "@ai-sdk/mcp";

export default defineLazyEventHandler(async () => {
  const config = useRuntimeConfig();
  const apiKey = config.aiGatewayApiKey;
  const mcpURL = config.pixelMcpBaseUrl;
  if (!apiKey) throw new Error("Missing AI Gateway API key");
  const gateway = createGateway({
    apiKey: apiKey
  });

  const transport = new StreamableHTTPClientTransport(new URL(`${mcpURL}/mcp`));

  const mcpClient: MCPClient = await createMCPClient({
    transport
  });

  return defineEventHandler(async (event) => {
    const { messages }: { messages: UIMessage[] } = await readBody(event);
    const tools = await mcpClient.tools();

    const result = streamText({
      model: gateway("anthropic/claude-sonnet-4.5"),
      tools,
      stopWhen: stepCountIs(5),
      onStepFinish: async ({ toolResults }) => {
        console.log(`STEP RESULTS: ${JSON.stringify(toolResults, null, 2)}`);
      },
      messages: await convertToModelMessages(messages)
    });

    return result.toUIMessageStreamResponse();
  });
});
