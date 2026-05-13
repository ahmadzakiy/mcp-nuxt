export default defineEventHandler(() => {
  const { aiGatewayBaseUrl, aiGatewayModel, pixelMcpBaseUrl, mcp } =
    useRuntimeConfig();

  return {
    isHealthy: true,
    config: {
      aiGatewayBaseUrl,
      aiGatewayModel,
      pixelMcpBaseUrl,
      mcp
    }
  };
});
