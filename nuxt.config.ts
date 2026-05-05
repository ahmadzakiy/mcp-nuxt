// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: "2025-07-15",
  devtools: {
    enabled: process.env.NODE_ENV === "development"
  },
  runtimeConfig: {
    aiGatewayApiKey: process.env.AI_GATEWAY_API_KEY || "",
    aiGatewayModel:
      process.env.AI_GATEWAY_MODEL || "deepseek/deepseek-v4-flash",
    pixelMcpBaseUrl:
      process.env.PIXEL_MCP_BASE_URL || "https://pixel-mcp.netlify.app"
  },
  modules: ["@nuxtjs/mcp-toolkit"],
  css: ["~/assets/css/pixel.css"],
  postcss: {
    plugins: {
      "@mekari/pixel3-postcss": {
        include: [
          "./app/**/*.{js,jsx,ts,tsx,vue}" // Nuxt 4 app directory
        ]
        // replaceConfig: ["include"]
      }
    }
  },
  nitro: {
    // Nuxt 4 still uses Nitro. Use the Netlify preset:
    preset: "netlify",
    experimental: {
      asyncContext: true
    },
    bundledStorage: [],
    externals: {
      inline: ["@modelcontextprotocol/sdk", "@ai-sdk/mcp", "ai"]
    }
  },
  mcp: {
    version: "0.1.0",
    name: "pixel3-mcp-server",
    route: "/mcp", // Default route for the MCP server
    dir: "mcp", // Base directory for MCP definitions (relative to server/)
    browserRedirect: "/" // Redirect root MCP server route to docs page
  }
});
