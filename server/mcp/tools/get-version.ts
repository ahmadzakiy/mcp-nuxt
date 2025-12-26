export default defineMcpTool({
  name: 'get-version',
  description: 'Get the MCP server version and configuration',
  inputSchema: {},
  handler: async () => {
    const config = useRuntimeConfig()
    
    return jsonResult({
      version: config.public.mcpVersion,
      pixelMcpBaseUrl: config.pixelMcpBaseUrl,
    })
  },
})
