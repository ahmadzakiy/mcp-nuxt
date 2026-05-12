export default defineEventHandler(() => {
  const { aiGatewayBaseUrl, aiGatewayModel, pixelMcpBaseUrl } =
    useRuntimeConfig();

  return {
    isHealthy: true,
    config: {
      aiGatewayBaseUrl,
      aiGatewayModel,
      pixelMcpBaseUrl
    }
  };
});
