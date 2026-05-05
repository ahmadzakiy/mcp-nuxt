import {
  streamText,
  UIMessage,
  convertToModelMessages,
  createGateway,
  type ToolSet
} from "ai";
import { createMCPClient, MCPClient } from "@ai-sdk/mcp";

/** Convert MCP tool output to plain text for maximum model compatibility */
function mcpOutputToText({
  output
}: {
  toolCallId: string;
  input: unknown;
  output: unknown;
}) {
  const result = output as { content?: Array<{ type: string; text?: string }> };
  if (result?.content && Array.isArray(result.content)) {
    const text = result.content
      .filter((p) => p.type === "text" && p.text)
      .map((p) => p.text)
      .join("\n");
    return { type: "text", value: text || JSON.stringify(result) };
  }
  return {
    type: "text",
    value: typeof output === "string" ? output : JSON.stringify(output)
  };
}

export default defineLazyEventHandler(async () => {
  const config = useRuntimeConfig();
  const apiKey = config.aiGatewayApiKey;
  const mcpURL = config.pixelMcpBaseUrl;
  const modelId = config.aiGatewayModel;

  if (!apiKey) throw new Error("Missing AI Gateway API key");

  const gateway = createGateway({
    apiKey: apiKey
  });

  return defineEventHandler(async (event) => {
    const { messages }: { messages: UIMessage[] } = await readBody(event);

    const mcpClient: MCPClient = await createMCPClient({
      transport: { type: "http", url: `${mcpURL}/mcp` }
    });

    let tools;
    try {
      const mcpTools = await mcpClient.tools();
      // Override toModelOutput on each tool to return plain text instead of
      // {type: "content"} format, which may not be supported by all gateways/models
      tools = Object.fromEntries(
        Object.entries(mcpTools).map(([name, tool]) => [
          name,
          { ...tool, toModelOutput: mcpOutputToText }
        ])
      ) as unknown as ToolSet;
    } catch (err) {
      await mcpClient.close();
      throw err;
    }

    let convertedMessages;
    try {
      convertedMessages = await convertToModelMessages(messages);
      console.log(
        `[chat] convertedMessages count: ${convertedMessages.length}`
      );
    } catch (err) {
      console.error("[chat] convertToModelMessages error:", err);
      await mcpClient.close();
      throw err;
    }

    const result = streamText({
      model: gateway(modelId),
      tools,
      // Default stopWhen is stepCountIs(1): stops after step 1 (tool call + execution).
      // The client re-submits automatically via sendAutomaticallyWhen in Chat constructor.
      onStepFinish: async ({ toolCalls, toolResults, text, finishReason }) => {
        console.log(
          `[chat] onStepFinish: finishReason=${finishReason}, toolCalls=${toolCalls?.length ?? 0}, toolResults=${toolResults?.length ?? 0}, textLen=${text?.length ?? 0}`
        );
      },
      onFinish: async ({ finishReason, steps }) => {
        console.log(
          `[chat] onFinish: finishReason=${finishReason}, steps=${steps.length}`
        );
        await mcpClient.close();
      },
      onError: async ({ error }) => {
        console.error("[chat] streamText onError:", error);
      },
      messages: convertedMessages
    });

    return result.toUIMessageStreamResponse();
  });
});
