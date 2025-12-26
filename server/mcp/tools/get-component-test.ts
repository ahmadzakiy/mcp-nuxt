import { z } from 'zod'

export default defineMcpTool({
  description: 'Retrieves Pixel component documentation and details from llms-components.txt',
  async handler() {
  try {
      const config = useRuntimeConfig()
      const baseUrl = config.pixelMcpBaseUrl
      const data = await $fetch<string>(`${baseUrl}/llms.txt`)

      return {
        content: [{
          type: 'text',
          text: JSON.stringify(data, null, 2),
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
}
})
