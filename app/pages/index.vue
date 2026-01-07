<script setup lang="ts">
import { css, MpText, MpFlex, MpButton, MpButtonGroup } from "@mekari/pixel3";

const headingMargin = css({ mb: "4" });
const codeBlockStyle = css({
  background: "#f5f5f5",
  padding: "4",
  borderRadius: "2",
  fontFamily: "monospace",
  fontSize: "14px",
});
</script>

<template>
  <div
    :class="
      css({
        minHeight: '100vh',
        background: 'background.airene',
        padding: '4',
      })
    "
  >
    <MpFlex direction="column" alignItems="center" gap="8">
      <!-- Header Section -->
      <MpFlex
        direction="column"
        alignItems="center"
        gap="2"
        maxWidth="800px"
        mb="6"
      >
        <MpText as="h1" size="h1"> Mekari Pixel MCP Server </MpText>
        <MpText size="body" color="text.secondary">
          Use Mekari Pixel components in your AI assistants with Model Context
          Protocol support. Access component documentation, design tokens, and
          implementation guides directly from your IDE.
        </MpText>
        <MpButtonGroup>
          <MpButton
            variant="primary"
            left-icon="chat"
            @click="navigateTo('/chat')"
          >
            Try Chat
          </MpButton>
          <MpButton
            variant="secondary"
            left-icon="code"
            @click="navigateTo('/result')"
          >
            View Result
          </MpButton>
        </MpButtonGroup>
      </MpFlex>

      <!-- What is MCP Section -->
      <MpFlex
        direction="column"
        gap="4"
        maxWidth="1200px"
        width="100%"
        padding="8"
        background="white"
        borderRadius="12px"
        boxShadow="lg"
        mb="6"
      >
        <MpText as="h2" size="h2" weight="semiBold"> What is MCP? </MpText>
        <MpText
          size="body"
          color="text.secondary"
          :style="{ lineHeight: '1.6' }"
        >
          MCP (Model Context Protocol) is a standardized protocol that enables
          AI assistants to access external data sources and tools. Mekari Pixel
          MCP provides structured access to our component library, making it
          easy for AI tools to understand and assist with Pixel development.
        </MpText>
      </MpFlex>

      <!-- How to Use Section -->
      <MpFlex
        direction="column"
        gap="6"
        maxWidth="1200px"
        width="100%"
        padding="10"
        background="white"
        borderRadius="12px"
        boxShadow="lg"
      >
        <MpText as="h2" size="h2" weight="semiBold">
          How to Use MCP Pixel
        </MpText>

        <MpFlex direction="column" gap="6">
          <!-- VS Code Configuration -->
          <MpFlex direction="column" gap="3">
            <MpText size="h3" weight="semiBold"> Visual Studio Code </MpText>
            <MpText color="text.secondary">
              Create or edit <code>.vscode/mcp.json</code> in your project:
            </MpText>
            <MpFlex direction="column" :class="codeBlockStyle">
              <MpText size="body-small" :style="{ fontFamily: 'monospace' }">
                {
              </MpText>
              <MpText
                size="body-small"
                :style="{ fontFamily: 'monospace', paddingLeft: '16px' }"
              >
                "servers": {
              </MpText>
              <MpText
                size="body-small"
                :style="{ fontFamily: 'monospace', paddingLeft: '32px' }"
              >
                "pixel3": {
              </MpText>
              <MpText
                size="body-small"
                :style="{ fontFamily: 'monospace', paddingLeft: '48px' }"
              >
                "type": "http",
              </MpText>
              <MpText
                size="body-small"
                :style="{ fontFamily: 'monospace', paddingLeft: '48px' }"
              >
                "url": "https://pixel-mcp.netlify.app/mcp"
              </MpText>
              <MpText
                size="body-small"
                :style="{ fontFamily: 'monospace', paddingLeft: '32px' }"
              >
                }
              </MpText>
              <MpText
                size="body-small"
                :style="{ fontFamily: 'monospace', paddingLeft: '16px' }"
              >
                }
              </MpText>
              <MpText size="body-small" :style="{ fontFamily: 'monospace' }">
                }
              </MpText>
            </MpFlex>
          </MpFlex>

          <!-- Cursor Configuration -->
          <MpFlex direction="column" gap="3">
            <MpText size="h3" weight="semiBold"> Cursor </MpText>
            <MpText size="body" color="text.secondary">
              Create or update <code>.cursor/mcp.json</code> in your project
              root:
            </MpText>
            <MpFlex direction="column" :class="codeBlockStyle">
              <MpText size="body-small" :style="{ fontFamily: 'monospace' }">
                {
              </MpText>
              <MpText
                size="body-small"
                :style="{ fontFamily: 'monospace', paddingLeft: '16px' }"
              >
                "mcpServers": {
              </MpText>
              <MpText
                size="body-small"
                :style="{ fontFamily: 'monospace', paddingLeft: '32px' }"
              >
                "pixel3": {
              </MpText>
              <MpText
                size="body-small"
                :style="{ fontFamily: 'monospace', paddingLeft: '48px' }"
              >
                "type": "http",
              </MpText>
              <MpText
                size="body-small"
                :style="{ fontFamily: 'monospace', paddingLeft: '48px' }"
              >
                "url": "https://pixel-mcp.netlify.app/mcp"
              </MpText>
              <MpText
                size="body-small"
                :style="{ fontFamily: 'monospace', paddingLeft: '32px' }"
              >
                }
              </MpText>
              <MpText
                size="body-small"
                :style="{ fontFamily: 'monospace', paddingLeft: '16px' }"
              >
                }
              </MpText>
              <MpText size="body-small" :style="{ fontFamily: 'monospace' }">
                }
              </MpText>
            </MpFlex>
          </MpFlex>
        </MpFlex>
      </MpFlex>

      <!-- Available Tools Section -->
      <MpFlex
        direction="column"
        gap="6"
        maxWidth="1200px"
        width="100%"
        padding="10"
        background="white"
        borderRadius="12px"
        boxShadow="lg"
      >
        <MpText as="h2" size="h2" weight="semiBold" :class="headingMargin">
          Available MCP Tools
        </MpText>

        <MpFlex direction="column" gap="5">
          <!-- get-component tool -->
          <MpFlex direction="column" gap="2">
            <MpFlex align="center" gap="2">
              <MpText size="body" weight="semiBold" color="text.highlight">
                get-component
              </MpText>
            </MpFlex>
            <MpText size="body" color="text.secondary">
              Retrieves Pixel component documentation and details including
              props, slots, and events.
            </MpText>
            <MpText size="body-small" color="text.warning">
              Example: "Get MpButton component documentation"
            </MpText>
          </MpFlex>

          <!-- get-docs tool -->
          <MpFlex direction="column" gap="2">
            <MpFlex align="center" gap="2">
              <MpText size="body" weight="semiBold" color="text.highlight">
                get-docs
              </MpText>
            </MpFlex>
            <MpText size="body" color="text.secondary">
              Answers questions about Pixel setup, component usage, design
              tokens (v2.1 vs v2.4), and implementation guides.
            </MpText>
            <MpText size="body-small" color="text.warning">
              Example: "How to setup Pixel?" or "Difference between token 2.1
              and 2.4"
            </MpText>
          </MpFlex>

          <!-- hello-pixel tool -->
          <MpFlex direction="column" gap="2">
            <MpFlex align="center" gap="2">
              <MpText size="body" weight="semiBold" color="text.highlight">
                hello-pixel
              </MpText>
            </MpFlex>
            <MpText size="body" color="text.secondary">
              A simple test tool to verify MCP server connection.
            </MpText>
            <MpText size="body-small" color="text.warning">
              Example: "Hello Pixel"
            </MpText>
          </MpFlex>
        </MpFlex>
      </MpFlex>

      <!-- Available Prompts Section -->
      <MpFlex
        direction="column"
        gap="6"
        maxWidth="1200px"
        width="100%"
        padding="10"
        background="background.neutral"
        borderRadius="md"
        boxShadow="lg"
      >
        <MpText as="h2" size="h2" weight="semiBold" :class="headingMargin">
          Available MCP Prompts
        </MpText>

        <MpFlex direction="column" gap="5">
          <!-- implement-figma-to-pixel prompt -->
          <MpFlex direction="column" gap="2">
            <MpFlex align="center" gap="2">
              <MpText size="body" weight="semiBold" color="text.highlight">
                implement-figma-to-pixel
              </MpText>
            </MpFlex>
            <MpText size="body" color="text.secondary">
              Generate complete implementation guide for converting Figma
              designs to Pixel 3 components. This prompt provides step-by-step
              instructions including design analysis, component mapping, styling
              hierarchy, and best practices.
            </MpText>
            <MpText size="body-small" color="text.warning">
              Example: /implement-figma-to-pixel
            </MpText>
          </MpFlex>
        </MpFlex>
      </MpFlex>

      <!-- Usage Examples -->
      <MpFlex
        direction="column"
        gap="4"
        maxWidth="1200px"
        width="100%"
        padding="10"
        background="white"
        borderRadius="12px"
        boxShadow="lg"
      >
        <MpText as="h2" size="h2" weight="semiBold" :class="headingMargin">
          Usage Examples
        </MpText>

        <MpText
          size="body"
          color="text.secondary"
          :style="{ marginBottom: '8px' }"
        >
          Once configured, you can ask your AI assistant questions like:
        </MpText>

        <MpFlex direction="column" gap="2">
          <MpText size="body" color="text.secondary">
            • "Get MpButton component documentation"
          </MpText>
          <MpText size="body" color="text.secondary">
            • "What props does MpFlex accept?"
          </MpText>
          <MpText size="body" color="text.secondary">
            • "How to setup Pixel in my project?"
          </MpText>
          <MpText size="body" color="text.secondary">
            • "Show me MpText component examples"
          </MpText>
          <MpText size="body" color="text.secondary">
            • "What's the difference between design token 2.1 and 2.4?"
          </MpText>
        </MpFlex>
      </MpFlex>

      <!-- Footer -->
      <MpFlex mt="12" textAlign="center">
        <MpText
          size="body-small"
          :style="{ color: 'rgba(255, 255, 255, 0.8)' }"
        >
          Built with ❤️ using Mekari Pixel Design System
        </MpText>
      </MpFlex>
    </MpFlex>
  </div>
</template>
