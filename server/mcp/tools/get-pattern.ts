import { z } from 'zod'

export default defineMcpTool({
  description: 'Retrieves Pixel UI pattern documentation and code examples from llms-patterns.txt',
  inputSchema: {
    patternName: z
      .string()
      .describe('The name of the pattern (e.g., "beaker", "input otp", "summary box")')
  },
  async handler({ patternName }) {
    try {
      // Normalize to slug: lowercase, collapse whitespace/underscores into hyphens
      const slugify = (s: string) =>
        s
          .toLowerCase()
          .trim()
          .replace(/[\s_]+/g, '-')

      // Strip all separators for loose matching ("datatable" == "data-table")
      const toKey = (s: string) => slugify(s).replace(/-/g, '')

      const normalizedName = slugify(patternName)
      const normalizedKey = toKey(patternName)

      const config = useRuntimeConfig()
      const baseUrl = config.pixelMcpBaseUrl
      const fileContent = await $fetch<string>(`${baseUrl}/llms-patterns.txt`, {
        responseType: 'text'
      })

      // Split content by pattern headers (lines starting with "# Pattern: ")
      const sections = fileContent.split(/\n(?=# Pattern: )/)

      // Build an index of all patterns for matching
      type PatternEntry = { rawName: string; slugName: string; keyName: string; section: string }
      const patternIndex: PatternEntry[] = []

      for (const section of sections) {
        const firstLine = section.split('\n')[0]
        if (firstLine.startsWith('# Pattern: ')) {
          const rawName = firstLine.replace('# Pattern: ', '').trim()
          patternIndex.push({
            rawName,
            slugName: slugify(rawName),
            keyName: toKey(rawName),
            section
          })
        }
      }

      // Match priority:
      // 1. Exact slug/key match  ("floating-bulk-action" == "floating-bulk-action")
      // 2. Starts-with match     ("floating" -> "floating-bulk-action")
      // 3. Contains match        ("bulk" -> "floating-bulk-action")
      const exact = patternIndex.find(
        (p) => p.slugName === normalizedName || p.keyName === normalizedKey
      )
      const startsWith = !exact
        ? patternIndex.filter(
            (p) => p.slugName.startsWith(normalizedName) || p.keyName.startsWith(normalizedKey)
          )
        : []
      const contains =
        !exact && startsWith.length === 0
          ? patternIndex.filter(
              (p) => p.slugName.includes(normalizedName) || p.keyName.includes(normalizedKey)
            )
          : []

      const matches = exact ? [exact] : startsWith.length > 0 ? startsWith : contains

      if (matches.length === 0) {
        const availablePatterns = patternIndex.map((p) => p.rawName)
        return errorResult(
          `Pattern '${patternName}' not found in documentation. Available patterns: ${availablePatterns.join(
            ', '
          )}`
        )
      }

      // Multiple matches — return a list so the caller can refine
      if (matches.length > 1) {
        return jsonResult({
          query: patternName,
          message: `Found ${matches.length} patterns matching '${patternName}'. Please refine your query.`,
          matches: matches.map((p) => p.rawName)
        })
      }

      const match = matches[0]
      return jsonResult({
        name: match.rawName,
        documentation: match.section.trim()
      })
    } catch (error) {
      return errorResult(
        `Error reading pattern documentation: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`
      )
    }
  }
})
