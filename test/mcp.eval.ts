import { experimental_createMCPClient as createMCPClient } from "@ai-sdk/mcp";
import { generateText, createGateway, type ToolCall } from "ai";
import { evalite } from "evalite";

// Load environment variables from .env (evalite automatically loads it)
const apiKey = process.env.AI_GATEWAY_API_KEY;
const MCP_URL = process.env.MCP_URL ?? "http://localhost:3200/mcp";

if (!apiKey) throw new Error("Missing AI_GATEWAY_API_KEY in .env file");

const gateway = createGateway({
  apiKey: apiKey,
});

// Use gateway with model
const model = gateway("google/gemini-2.5-flash-lite");

// Custom tool call accuracy scorer
function toolCallAccuracy({
  actualCalls,
  expectedCalls,
}: {
  actualCalls: ToolCall[];
  expectedCalls: Array<{ toolName: string; input?: Record<string, any> }>;
}) {
  let score = 0;
  const maxScore = expectedCalls.length;

  if (actualCalls.length === 0 && expectedCalls.length > 0) {
    return {
      score: 0,
      maxScore,
      name: "Tool Call Accuracy",
      details: "No tools were called",
    };
  }

  for (let i = 0; i < expectedCalls.length; i++) {
    const expected = expectedCalls[i];
    const actual = actualCalls[i];

    if (!actual) break;

    // Check if tool name matches
    if (actual.toolName === expected.toolName) {
      let inputMatches = true;

      // Check if input matches (if specified)
      if (expected.input) {
        for (const [key, value] of Object.entries(expected.input)) {
          if (actual.args[key] !== value) {
            inputMatches = false;
            break;
          }
        }
      }

      if (inputMatches) {
        score++;
      }
    }
  }

  return {
    score,
    maxScore,
    name: "Tool Call Accuracy",
    details: `${score}/${maxScore} tool calls matched`,
  };
}

// Test get-component tool
evalite("Pixel Component Documentation", {
  data: async () => [
    {
      input: "Show me the documentation for the Button component",
      expected: [
        { toolName: "get-component", input: { componentName: "Button" } },
      ],
    },
    {
      input: "How do I use MpButton?",
      expected: [
        { toolName: "get-component", input: { componentName: "MpButton" } },
      ],
    },
    {
      input: "What are the props for mp-button component?",
      expected: [
        { toolName: "get-component", input: { componentName: "mp-button" } },
      ],
    },
    {
      input: "Get the Card component documentation",
      expected: [
        { toolName: "get-component", input: { componentName: "Card" } },
      ],
    },
  ],
  task: async (input) => {
    const mcp = await createMCPClient({
      transport: { type: "http", url: MCP_URL },
    });
    try {
      const result = await generateText({
        model,
        prompt: input,
        tools: await mcp.tools(),
      });
      return result.toolCalls ?? [];
    } finally {
      await mcp.close();
    }
  },
  scorers: [
    ({ output, expected }) =>
      toolCallAccuracy({ actualCalls: output, expectedCalls: expected }),
  ],
});

// Test get-docs tool - setup and general queries
evalite("Pixel Documentation - Setup and General", {
  data: async () => [
    {
      input: "How do I setup the Pixel library in my project?",
      expected: [
        {
          toolName: "get-docs",
          input: { query: "how to setup Pixel library" },
        },
      ],
    },
    {
      input: "What is Pixel and how do I get started?",
      expected: [{ toolName: "get-docs", input: { query: "what is Pixel" } }],
    },
    {
      input: "Show me the installation guide for Pixel",
      expected: [
        { toolName: "get-docs", input: { query: "installation guide" } },
      ],
    },
  ],
  task: async (input) => {
    const mcp = await createMCPClient({
      transport: { type: "http", url: MCP_URL },
    });
    try {
      const result = await generateText({
        model,
        prompt: input,
        tools: await mcp.tools(),
      });
      return result.toolCalls ?? [];
    } finally {
      await mcp.close();
    }
  },
  scorers: [
    ({ output, expected }) =>
      toolCallAccuracy({ actualCalls: output, expectedCalls: expected }),
  ],
});

// Test get-docs tool - design tokens
evalite("Pixel Documentation - Design Tokens", {
  data: async () => [
    {
      input: "What is the difference between design token 2.1 and 2.4?",
      expected: [
        {
          toolName: "get-docs",
          input: { query: "difference between token 2.1 and 2.4" },
        },
      ],
    },
    {
      input: "Tell me about Pixel design tokens",
      expected: [{ toolName: "get-docs", input: { query: "design tokens" } }],
    },
    {
      input: "Should I use token v2.1 or v2.4?",
      expected: [
        { toolName: "get-docs", input: { query: "token v2.1 or v2.4" } },
      ],
    },
  ],
  task: async (input) => {
    const mcp = await createMCPClient({
      transport: { type: "http", url: MCP_URL },
    });
    try {
      const result = await generateText({
        model,
        prompt: input,
        tools: await mcp.tools(),
      });
      return result.toolCalls ?? [];
    } finally {
      await mcp.close();
    }
  },
  scorers: [
    ({ output, expected }) =>
      toolCallAccuracy({ actualCalls: output, expectedCalls: expected }),
  ],
});

// Test get-docs tool - theming and styling
evalite("Pixel Documentation - Theming and Styling", {
  data: async () => [
    {
      input: "How do I implement dark mode in Pixel?",
      expected: [{ toolName: "get-docs", input: { query: "dark mode" } }],
    },
    {
      input: "How can I write custom styles with Pixel?",
      expected: [{ toolName: "get-docs", input: { query: "custom styles" } }],
    },
    {
      input: "Explain theme management in Pixel",
      expected: [
        { toolName: "get-docs", input: { query: "theme management" } },
      ],
    },
  ],
  task: async (input) => {
    const mcp = await createMCPClient({
      transport: { type: "http", url: MCP_URL },
    });
    try {
      const result = await generateText({
        model,
        prompt: input,
        tools: await mcp.tools(),
      });
      return result.toolCalls ?? [];
    } finally {
      await mcp.close();
    }
  },
  scorers: [
    ({ output, expected }) =>
      toolCallAccuracy({ actualCalls: output, expectedCalls: expected }),
  ],
});

// Test multi-step workflow - component + docs
evalite("Multi-Step Workflow - Component and Documentation", {
  data: async () => [
    {
      input:
        "Show me the Button component documentation and how to setup Pixel",
      expected: [
        { toolName: "get-component", input: { componentName: "Button" } },
        { toolName: "get-docs", input: { query: "how to setup Pixel" } },
      ],
    },
    {
      input:
        "I need documentation for the Card component and information about design tokens",
      expected: [
        { toolName: "get-component", input: { componentName: "Card" } },
        { toolName: "get-docs", input: { query: "design tokens" } },
      ],
    },
  ],
  task: async (input) => {
    const mcp = await createMCPClient({
      transport: { type: "http", url: MCP_URL },
    });
    try {
      const result = await generateText({
        model,
        prompt: input,
        tools: await mcp.tools(),
        maxSteps: 5, // Allow multiple tool calls
      });
      return result.toolCalls ?? [];
    } finally {
      await mcp.close();
    }
  },
  scorers: [
    ({ output, expected }) =>
      toolCallAccuracy({ actualCalls: output, expectedCalls: expected }),
  ],
});

// Test tool selection accuracy
evalite("Tool Selection - Component vs Docs", {
  data: async () => [
    {
      input: "What components are available in Pixel?",
      expected: [
        { toolName: "get-docs", input: { query: "available components" } },
      ],
    },
    {
      input: "Get me the Input component details",
      expected: [
        { toolName: "get-component", input: { componentName: "Input" } },
      ],
    },
    {
      input: "How do I customize components?",
      expected: [
        { toolName: "get-docs", input: { query: "customize components" } },
      ],
    },
    {
      input: "Show Avatar component usage",
      expected: [
        { toolName: "get-component", input: { componentName: "Avatar" } },
      ],
    },
  ],
  task: async (input) => {
    const mcp = await createMCPClient({
      transport: { type: "http", url: MCP_URL },
    });
    try {
      const result = await generateText({
        model,
        prompt: input,
        tools: await mcp.tools(),
      });
      return result.toolCalls ?? [];
    } finally {
      await mcp.close();
    }
  },
  scorers: [
    ({ output, expected }) =>
      toolCallAccuracy({ actualCalls: output, expectedCalls: expected }),
  ],
});
