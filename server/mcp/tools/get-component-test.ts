import { z } from 'zod'
import { normalizeComponentName } from '../utils/normalizeComponentName'

const FETCH_TIMEOUT_MS = 5000

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error(`Fetch timed out after ${ms}ms`))
    }, ms)

    promise
      .then((value) => {
        clearTimeout(timer)
        resolve(value)
      })
      .catch((err) => {
        clearTimeout(timer)
        reject(err)
      })
  })
}

export default defineMcpTool({
  description: 'Test: Retrieves Pixel component documentation and details from llms-components.txt with timeout and logging',
  inputSchema: {
    componentName: z
      .string()
      .describe('The name of the component (e.g., "Button", "MpButton", "mp-button")'),
  },
  async handler({ componentName }) {
    try {
      console.log('[MCP get-component-test] start', { componentName })

      const config = useRuntimeConfig()
      const baseUrl: string = config.pixelMcpBaseUrl || ''
      console.log('[MCP get-component-test] pixelMcpBaseUrl', baseUrl)

      if (!baseUrl) {
        console.error('[MCP get-component-test] pixelMcpBaseUrl is empty')
        return errorResult(
          'Server configuration error: pixelMcpBaseUrl is not set in runtimeConfig.'
        )
      }

      const normalizedName = normalizeComponentName(componentName)

      // Build URL safely (avoid double slashes)
      const url = `${baseUrl}/llms-components.txt`.replace(/([^:]\/)\/+/g, '$1')
      console.log('[MCP get-component-test] fetching', url)

      const res = await withTimeout(fetch(url), FETCH_TIMEOUT_MS).catch((err) => {
        console.error('[MCP get-component-test] fetch threw', err)
        throw err
      })

      if (!res.ok) {
        console.error('[MCP get-component-test] fetch failed', res.status, res.statusText)
        return errorResult(
          `Failed to load llms-components.txt from ${url} (status ${res.status} ${res.statusText}).`
        )
      }

      const fileContent = await res.text()
      console.log('[MCP get-component-test] file loaded, length', fileContent.length)

      if (!fileContent.trim()) {
        console.error('[MCP get-component-test] file is empty')
        return errorResult('Component documentation file is empty.')
      }

      // Split content by main component headers (lines starting with "# ")
      const sections = fileContent.split(/\n(?=# )/)
      console.log('[MCP get-component-test] number of sections', sections.length)

      let componentSection: string | null = null
      for (const section of sections) {
        const firstLine = section.split('\n')[0]
        if (firstLine.startsWith('# ')) {
          const sectionName = firstLine.replace('# ', '').trim()
          if (
            sectionName.toLowerCase() === normalizedName.toLowerCase() ||
            sectionName.toLowerCase() === componentName.toLowerCase()
          ) {
            componentSection = section
            break
          }
        }
      }

      if (!componentSection) {
        console.log('[MCP get-component-test] no section found', {
          normalizedName,
          componentName,
        })
        return errorResult(
          `Component '${componentName}' not found in documentation. ` +
            `Please check the component name and try again.`
        )
      }

      console.log('[MCP get-component-test] found section for', normalizedName)

      return jsonResult({
        name: normalizedName,
        componentName,
        documentation: componentSection.trim(),
        documentation_url: `https://docs.mekari.design/components/${normalizedName.toLowerCase()}.html`,
      })
    } catch (error) {
      console.error('[MCP get-component-test] error', error)
      return errorResult(
        `Error reading component documentation: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`
      )
    }
  },
})