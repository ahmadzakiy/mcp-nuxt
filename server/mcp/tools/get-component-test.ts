export default defineMcpTool({
  description: 'Retrieves Pixel component documentation and details from llms-components.txt',
  async handler() {
    try {
      const config = useRuntimeConfig()
      const baseUrl = config.pixelMcpBaseUrl
      const response = await fetch(`${baseUrl}/llms.txt`)
      const data = await response.text()

      return {
        content: [{
          type: 'text',
          text: data,
        }],
      }
    }
    catch (error) {
      return {
        content: [{
          type: 'text',
          text: `Error: ${error instanceof Error ? error.message : String(error)}`,
        }],
        isError: true,
      }
    }
  },
})
