import {
  streamText,
  UIMessage,
  convertToModelMessages,
  createGateway,
  stepCountIs
} from "ai";
import { createMCPClient, MCPClient } from "@ai-sdk/mcp";

export default defineLazyEventHandler(async () => {
  const config = useRuntimeConfig();
  const apiKey = config.aiGatewayApiKey;
  const mcpURL = config.pixelMcpBaseUrl;
  const modelId = config.aiGatewayModel;

  if (!apiKey) throw new Error("Missing AI Gateway API key");

  const gateway = createGateway({
    apiKey: apiKey
  });

  const mcpClient: MCPClient = await createMCPClient({
    transport: { type: "http", url: `${mcpURL}/mcp` }
  });

  return defineEventHandler(async (event) => {
    const { messages }: { messages: UIMessage[] } = await readBody(event);
    const tools = await mcpClient.tools();

    const result = streamText({
      model: gateway(modelId),
      tools,
      stopWhen: stepCountIs(5),
      onStepFinish: async ({ toolResults }) => {
        console.log(`STEP RESULTS: ${JSON.stringify(toolResults, null, 2)}`);
      },
      onFinish: async () => {
        await mcpClient.close();
      },
      messages: await convertToModelMessages(messages)
    });

    return result.toUIMessageStreamResponse();
  });
});
