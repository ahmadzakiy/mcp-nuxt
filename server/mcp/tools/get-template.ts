import { z } from 'zod'

export default defineMcpTool({
  description:
    'Retrieves Pixel UI template documentation and code examples from llms-templates.txt',
  inputSchema: {
    templateName: z
      .string()
      .describe('The name of the template (e.g., "base layout", "qontak inbox", "jurnal layout")')
  },
  async handler({ templateName }) {
    try {
      // Normalize to slug: lowercase, collapse whitespace/underscores into hyphens
      const slugify = (s: string) =>
        s
          .toLowerCase()
          .trim()
          .replace(/[\s_]+/g, '-')

      // Strip all separators for loose matching ("reportindex" == "report-index")
      const toKey = (s: string) => slugify(s).replace(/[-/]/g, '')

      const normalizedName = slugify(templateName)
      const normalizedKey = toKey(templateName)

      const config = useRuntimeConfig()
      const baseUrl = config.pixelMcpBaseUrl
      const fileContent = await $fetch<string>(`${baseUrl}/llms-templates.txt`, {
        responseType: 'text'
      })

      // Split content by template headers (lines starting with "# Template: ")
      const sections = fileContent.split(/\n(?=# Template: )/)

      // Build an index of all templates for matching
      type TemplateEntry = { rawName: string; slugName: string; keyName: string; section: string }
      const templateIndex: TemplateEntry[] = []

      for (const section of sections) {
        const firstLine = section.split('\n')[0]
        if (firstLine.startsWith('# Template: ')) {
          const rawName = firstLine.replace('# Template: ', '').trim()
          templateIndex.push({
            rawName,
            slugName: slugify(rawName),
            keyName: toKey(rawName),
            section
          })
        }
      }

      // Match priority:
      // 1. Exact slug/key match  ("report-index" == "report-index")
      // 2. Starts-with match     ("report" -> "report-index")
      // 3. Contains match        ("index" -> "report-index")
      const exact = templateIndex.find(
        (t) => t.slugName === normalizedName || t.keyName === normalizedKey
      )
      const startsWith = !exact
        ? templateIndex.filter(
            (t) => t.slugName.startsWith(normalizedName) || t.keyName.startsWith(normalizedKey)
          )
        : []
      const contains =
        !exact && startsWith.length === 0
          ? templateIndex.filter(
              (t) => t.slugName.includes(normalizedName) || t.keyName.includes(normalizedKey)
            )
          : []

      const matches = exact ? [exact] : startsWith.length > 0 ? startsWith : contains

      if (matches.length === 0) {
        const availableTemplates = templateIndex.map((t) => t.rawName)
        return errorResult(
          `Template '${templateName}' not found in documentation. Available templates: ${availableTemplates.join(
            ', '
          )}`
        )
      }

      // Multiple matches — return a list so the caller can refine
      if (matches.length > 1) {
        return jsonResult({
          query: templateName,
          message: `Found ${matches.length} templates matching '${templateName}'. Please refine your query.`,
          matches: matches.map((t) => t.rawName)
        })
      }

      const match = matches[0]
      return jsonResult({
        name: match.rawName,
        documentation: match.section.trim()
      })
    } catch (error) {
      return errorResult(
        `Error reading template documentation: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`
      )
    }
  }
})
