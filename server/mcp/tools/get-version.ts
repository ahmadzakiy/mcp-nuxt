export default defineMcpTool({
  name: 'get-version',
  description: 'Get the MCP server version and configuration',
  inputSchema: {},
  handler: async () => {
    const config = useRuntimeConfig()
    const mcpConfig = useAppConfig().mcp
    
    return jsonResult({
      version: mcpConfig?.version || '0.0.1',
      pixelMcpBaseUrl: config.pixelMcpBaseUrl,
    })
  },
})
