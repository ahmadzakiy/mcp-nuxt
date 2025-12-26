export default defineMcpResource({
  name: 'docs',
  title: 'Pixel Documentation',
  description: 'Pixel Vue 3 documentation including FAQs, setup guides, and what\'s new',
  file: 'public/llms-docs.txt',
  metadata: {
    mimeType: 'text/plain'
  }
})

export const designToken21 = defineMcpResource({
  name: 'design-token-2.1',
  title: 'Design Tokens 2.1',
  description: 'Pixel Vue 3 Design Tokens version 2.1 reference',
  file: 'public/llms-design-tokens-21.txt',
  metadata: {
    mimeType: 'text/plain'
  }
})

export const designToken24 = defineMcpResource({
  name: 'design-token-2.4',
  title: 'Design Tokens 2.4',
  description: 'Pixel Vue 3 Design Tokens version 2.4 with dark mode support',
  file: 'public/llms-design-tokens-24.txt',
  metadata: {
    mimeType: 'text/plain'
  }
})