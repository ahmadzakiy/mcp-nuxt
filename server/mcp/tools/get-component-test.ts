import { z } from 'zod'
import { normalizeComponentName } from '../utils/normalizeComponentName'

export default defineMcpTool({
  description: 'Retrieves Pixel component documentation and details from llms-components.txt',
  inputSchema: {
    componentName: z.string().describe('The name of the component (e.g., "Button", "MpButton", "mp-button")')
  },
  // cache: '30m',
  async handler({ componentName }, extra) {
  try {
    console.log('[MCP get-component] start', { componentName })
    const config = useRuntimeConfig()
    console.log('[MCP get-component] pixelMcpBaseUrl', config.pixelMcpBaseUrl)

    const normalizedName = normalizeComponentName(componentName)
    const fileContent = await $fetch<string>(`${config.pixelMcpBaseUrl}/llms-components.txt`, {
      responseType: 'text'
    })
    console.log('[MCP get-component] file loaded, length', fileContent.length)

    return jsonResult({
      name: normalizedName,
      componentName: componentName,
      documentation: '...rest of documentation...',
      documentation_url: `https://docs.mekari.design/components/${normalizedName.toLowerCase()}.html`
    })

    // ...rest of logic...
  } catch (error) {
    console.error('[MCP get-component] error', error)
    return errorResult(
      `Error reading component documentation: ${error instanceof Error ? error.message : 'Unknown error'}`
    )
  }
}
})
