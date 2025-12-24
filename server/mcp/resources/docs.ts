export default defineMcpResource({
  name: 'docs',
  description: 'Pixel Vue 3 documentation including FAQs, setup guides, and what\'s new',
  file: 'server/mcp/resources/llms-docs.txt'
})

export const designToken21 = defineMcpResource({
  name: 'design-token-2.1',
  description: 'Pixel Vue 3 Design Tokens version 2.1 reference',
  file: 'server/mcp/resources/llms-design-tokens-21.txt'
})

export const designToken24 = defineMcpResource({
  name: 'design-token-2.4',
  description: 'Pixel Vue 3 Design Tokens version 2.4 with dark mode support',
  file: 'server/mcp/resources/llms-design-tokens-24.txt'
})