import {
  streamText,
  UIMessage,
  convertToModelMessages,
  createGateway,
  type ToolSet
} from "ai";
import { createMCPClient, MCPClient } from "@ai-sdk/mcp";

const CHAT_SYSTEM_PROMPT = `You are helping users work with Mekari Pixel.

Render normal explanations as markdown.
For tabular data, use GitHub Flavored Markdown tables.
For charts, use only this Comark component syntax:

::pixel-chart
\`\`\`yaml [props]
title: Monthly revenue
type: bar
labels:
  - Jan
  - Feb
datasets:
  - label: Revenue
    data:
      - 120
      - 180
showLegend: false
\`\`\`
::

Chart props are limited to title, type, labels, datasets, horizontal, stacked, area, and showLegend.
Use chart type bar, line, pie, doughnut, or radar. Labels must be strings. Dataset data must be numbers with the same count as labels.
Do not output raw Vue components or arbitrary HTML for Pixel charts.`;

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
  const baseURL = config.aiGatewayBaseUrl;
  const mcpURL = config.pixelMcpBaseUrl;
  const modelId = config.aiGatewayModel;

  if (!apiKey) throw new Error("Missing AI Gateway API key");

  const gateway = createGateway({
    apiKey: apiKey,
    ...(baseURL ? { baseURL: baseURL } : {})
  });

  console.log("gateway config", gateway);

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
    } catch (err) {
      await mcpClient.close();
      throw err;
    }

    const result = streamText({
      model: gateway(modelId),
      tools,
      onFinish: async () => {
        await mcpClient.close();
      },
      system: CHAT_SYSTEM_PROMPT,
      messages: convertedMessages
    });

    return result.toUIMessageStreamResponse();
  });
});
