// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  compatibilityDate: "2025-07-15",
  devtools: {
    enabled: process.env.NODE_ENV === "development"
  },
  runtimeConfig: {
    // Server-only keys (secure, not exposed to client)
    aiGatewayApiKey: process.env.AI_GATEWAY_API_KEY || "",
    pixelMcpBaseUrl:
      process.env.NODE_ENV === "development"
        ? "http://localhost:3200"
        : "https://pixel-mcp.netlify.app",
    public: {
      // Public keys (exposed to client - only use for non-sensitive data)
      // WARNING: Don't put API keys here!
      apiSecret: "123"
    }
  },
  modules: ["@nuxtjs/mcp-toolkit"],
  css: ["~/assets/css/pixel.css"],
  postcss: {
    plugins: {
      "@mekari/pixel3-postcss": {
        include: [
          "./app/**/*.{js,jsx,ts,tsx,vue}" // Nuxt 4 app directory
        ]
      }
    }
  },
  nitro: {
    // Nuxt 4 still uses Nitro. Use the Netlify preset:
    preset: "netlify"
  },
  mcp: {
    version: "0.0.1",
    name: "pixel3-mcp-server",
    route: "/mcp", // Default route for the MCP server
    dir: "mcp", // Base directory for MCP definitions (relative to server/)
    browserRedirect: "/" // Redirect root MCP server route to docs page
  }
});
