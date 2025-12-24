import { z } from 'zod'
import { readFile } from 'fs/promises'
import { join } from 'path'
import { normalizeComponentName } from '../utils/normalizeComponentName'

export default defineMcpTool({
  description: 'Retrieves Pixel component documentation and details from llms-components.txt',
  inputSchema: {
    componentName: z.string().describe('The name of the component (e.g., "Button", "MpButton", "mp-button")')
  },
  // cache: '30m',
  async handler({ componentName }) {
    try {
      // Normalize component name
      const normalizedName = normalizeComponentName(componentName)
      
      // Read the llms-components.txt file
      const filePath = join(process.cwd(), 'server/mcp/resources/llms-components.txt')
      const fileContent = await readFile(filePath, 'utf-8')
      
      // Split content by main component headers (lines starting with "# ")
      const sections = fileContent.split(/\n(?=# )/)
      
      // Find the section that matches the component name
      let componentSection = null
      for (const section of sections) {
        const firstLine = section.split('\n')[0]
        if (firstLine.startsWith('# ')) {
          const sectionName = firstLine.replace('# ', '').trim()
          // Check if the section name matches (case-insensitive)
          // Match both the base name (e.g., "Button") and the original input
          if (sectionName.toLowerCase() === normalizedName.toLowerCase() || 
              sectionName.toLowerCase() === componentName.toLowerCase()) {
            componentSection = section
            break
          }
        }
      }
      
      if (!componentSection) {
        return errorResult(`Component '${componentName}' not found in documentation. Please check the component name and try again.`)
      }
      
      return jsonResult({
        name: normalizedName,
        componentName: componentName,
        documentation: componentSection.trim(),
        documentation_url: `https://docs.mekari.design/components/${normalizedName.toLowerCase()}.html`
      })
    } catch (error) {
      return errorResult(`Error reading component documentation: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }
})
