<template>
  <MpFlex
    direction="column"
    alignItems="center"
    minHeight="100vh"
    background="background.surface"
    padding="4"
  >
    <MpFlex
      direction="column"
      alignItems="center"
      gap="8"
      :width="{ base: '100%', md: '800px' }"
    >
      <!-- Header Section -->
      <MpFlex
        direction="column"
        alignItems="center"
        gap="2"
        maxWidth="800px"
        mb="6"
      >
        <MpText as="h1" size="h1"> Mekari Pixel MCP</MpText>
        <MpText color="text.secondary" :class="css({ textAlign: 'center' })">
          Connect your AI assistant to Mekari Pixel design system documentation
          and tools.
        </MpText>
        <MpButtonGroup>
          <NuxtLink to="/chat">
            <MpButton variant="primary" left-icon="chat"> Try Chat </MpButton>
          </NuxtLink>
          <NuxtLink to="/result">
            <MpButton variant="secondary" left-icon="code">
              View Result
            </MpButton>
          </NuxtLink>
        </MpButtonGroup>
      </MpFlex>

      <!-- What is MCP Section -->
      <MpFlex
        direction="column"
        gap="4"
        maxWidth="1200px"
        width="100%"
        padding="8"
        background="background.neutral"
        borderRadius="lg"
        boxShadow="lg"
        mb="6"
      >
        <MpText as="h2" size="h2" weight="semiBold"> What is MCP? </MpText>
        <MpText color="text.secondary">
          MCP (Model Context Protocol) is an open-source standard for connecting
          AI applications to external systems (resources, tools, and prompts).
        </MpText>

        <br />

        <MpText size="h2">What is Mekari Pixel MCP?</MpText>
        <MpText color="text.secondary">
          Mekari Pixel MCP is a <strong>remote MCP server</strong> hosted on the
          internet, providing structured access to our component library from
          any device with an internet connection, no local installation
          required. Unlike local MCP servers that require setup on each machine,
          our remote server is accessible from anywhere. Connect once from
          Claude Desktop, VS Code, Cursor, or any MCP-compatible client, and
          instantly access Pixel component documentation, design tokens, and
          implementation guides to assist with your development workflow.
        </MpText>
      </MpFlex>

      <!-- How to Use Section -->
      <MpFlex
        direction="column"
        gap="6"
        maxWidth="1200px"
        width="100%"
        padding="8"
        background="background.neutral"
        borderRadius="lg"
        boxShadow="lg"
      >
        <MpText as="h2" size="h2" weight="semiBold">
          How to Use MCP Pixel
        </MpText>

        <MpFlex direction="column" gap="6">
          <!-- VS Code Configuration -->
          <MpFlex direction="column" gap="3">
            <MpText size="h3" weight="semiBold"> Visual Studio Code </MpText>
            <ButtonAddMcp ide="vscode" />
            <MpText color="text.secondary">
              Or manually add the server to your VS Code MCP configuration
              <strong>(.vscode/mcp.json)</strong>:
            </MpText>
            <MpFlex direction="column" :class="codeBlockStyle">
              <MpText
                size="body-small"
                color="text.inverse"
                :style="{ fontFamily: 'monospace' }"
              >
                {
              </MpText>
              <MpText
                size="body-small"
                color="text.inverse"
                :style="{ fontFamily: 'monospace', paddingLeft: '16px' }"
              >
                "servers": {
              </MpText>
              <MpText
                size="body-small"
                color="text.inverse"
                :style="{ fontFamily: 'monospace', paddingLeft: '32px' }"
              >
                "pixel3": {
              </MpText>
              <MpText
                size="body-small"
                color="text.inverse"
                :style="{ fontFamily: 'monospace', paddingLeft: '48px' }"
              >
                "type": "http",
              </MpText>
              <MpText
                size="body-small"
                color="text.inverse"
                :style="{ fontFamily: 'monospace', paddingLeft: '48px' }"
              >
                "url": "https://pixel-mcp.netlify.app/mcp"
              </MpText>
              <MpText
                size="body-small"
                color="text.inverse"
                :style="{ fontFamily: 'monospace', paddingLeft: '32px' }"
              >
                }
              </MpText>
              <MpText
                size="body-small"
                color="text.inverse"
                :style="{ fontFamily: 'monospace', paddingLeft: '16px' }"
              >
                }
              </MpText>
              <MpText
                size="body-small"
                color="text.inverse"
                :style="{ fontFamily: 'monospace' }"
              >
                }
              </MpText>
            </MpFlex>
          </MpFlex>

          <!-- Cursor Configuration -->
          <MpFlex direction="column" gap="3">
            <MpText size="h3" weight="semiBold"> Cursor </MpText>
            <ButtonAddMcp ide="cursor" />
            <MpText color="text.secondary">
              Or manually add it to your Cursor settings
              <strong>(~/.cursor/mcp.json)</strong>:
            </MpText>
            <MpFlex direction="column" :class="codeBlockStyle">
              <MpText
                size="body-small"
                color="text.inverse"
                :style="{ fontFamily: 'monospace' }"
              >
                {
              </MpText>
              <MpText
                size="body-small"
                color="text.inverse"
                :style="{ fontFamily: 'monospace', paddingLeft: '16px' }"
              >
                "mcpServers": {
              </MpText>
              <MpText
                size="body-small"
                color="text.inverse"
                :style="{ fontFamily: 'monospace', paddingLeft: '32px' }"
              >
                "pixel3": {
              </MpText>
              <MpText
                size="body-small"
                color="text.inverse"
                :style="{ fontFamily: 'monospace', paddingLeft: '48px' }"
              >
                "type": "http",
              </MpText>
              <MpText
                size="body-small"
                color="text.inverse"
                :style="{ fontFamily: 'monospace', paddingLeft: '48px' }"
              >
                "url": "https://pixel-mcp.netlify.app/mcp"
              </MpText>
              <MpText
                size="body-small"
                color="text.inverse"
                :style="{ fontFamily: 'monospace', paddingLeft: '32px' }"
              >
                }
              </MpText>
              <MpText
                size="body-small"
                color="text.inverse"
                :style="{ fontFamily: 'monospace', paddingLeft: '16px' }"
              >
                }
              </MpText>
              <MpText
                size="body-small"
                color="text.inverse"
                :style="{ fontFamily: 'monospace' }"
              >
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
        padding="8"
        background="background.neutral"
        borderRadius="lg"
        boxShadow="lg"
      >
        <MpText as="h2" size="h2" weight="semiBold">
          Available MCP Tools
        </MpText>

        <MpFlex direction="column" gap="5">
          <!-- get-component tool -->
          <MpFlex direction="column" gap="2">
            <MpFlex align="center" gap="2">
              <MpText weight="semiBold" color="text.highlight">
                #get-component
              </MpText>
            </MpFlex>
            <MpText color="text.secondary">
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
              <MpText weight="semiBold" color="text.highlight">
                #get-docs
              </MpText>
            </MpFlex>
            <MpText color="text.secondary">
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
              <MpText weight="semiBold" color="text.highlight">
                #hello-pixel
              </MpText>
            </MpFlex>
            <MpText color="text.secondary">
              A simple test tool to verify MCP server connection.
            </MpText>
            <MpText size="body-small" color="text.warning">
              Example: "Hello Pixel, I'm Zakiy"
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
        padding="8"
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
            <MpFlex alignItems="center" gap="2">
              <MpText weight="semiBold" color="text.highlight">
                /implement-figma-to-pixel
              </MpText>
            </MpFlex>
            <MpText color="text.secondary">
              Generate complete implementation guide for converting Figma
              designs to Pixel 3 components. This prompt provides step-by-step
              instructions including design analysis, component mapping, styling
              hierarchy, and best practices.
            </MpText>
            <MpText size="body-small" color="text.warning">
              Example: /implement-figma-to-pixel https:figma.com/file/xyz123
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
        padding="8"
        background="background.neutral"
        borderRadius="md"
        boxShadow="lg"
      >
        <MpText as="h2" size="h2" weight="semiBold" :class="headingMargin">
          Usage Examples
        </MpText>

        <MpText color="text.secondary">
          Once configured, you can ask your AI assistant questions like:
        </MpText>
        <MpText color="text.secondary">
          • "How to setup Pixel in my project?"
        </MpText>
        <MpText color="text.secondary">
          • "Get MpButton component documentation"
        </MpText>
        <MpText color="text.secondary">
          • "What's the difference between design token 2.1 and 2.4?"
        </MpText>
      </MpFlex>

      <!-- Footer -->
      <MpFlex mt="12" textAlign="center">
        <MpText size="body-small" color="text.secondary">
          Built with ❤️ using Mekari Pixel Design System
        </MpText>
      </MpFlex>
    </MpFlex>
  </MpFlex>
</template>

<script setup lang="ts">
import { css, MpText, MpFlex, MpButton, MpButtonGroup } from "@mekari/pixel3";
import ButtonAddMcp from "~/components/ButtonAddMcp.vue";

const headingMargin = css({ mb: "4" });
const codeBlockStyle = css({
  background: "background.inverse",
  color: "text.inverse",
  padding: "4",
  borderRadius: "md",
  fontFamily: "monospace",
  fontSize: "body-small"
});
</script>
