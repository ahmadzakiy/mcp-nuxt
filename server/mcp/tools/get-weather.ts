import { z } from 'zod'
import { defineMcpTool } from '@nuxtjs/mcp-toolkit' // optional

export default defineMcpTool({
  description: 'Get current weather for a city',
  inputSchema: {
    city: z.string().describe('City name'),
  },
  cache: '15m',
  handler: async ({ city }) => {
    try {
      const data = await $fetch(`https://wttr.in/${city}?format=j1`)

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
  },
})
