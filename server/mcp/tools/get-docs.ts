import { z } from "zod";

export default defineMcpTool({
  description:
    "Retrieves Pixel documentation, answers questions about setup, component usage, design tokens (2.1 vs 2.4), and other Pixel-related queries",
  inputSchema: {
    query: z
      .string()
      .describe(
        'Your question or search query (e.g., "how to setup Pixel", "difference between token 2.1 and 2.4", "MpButton", "dark mode")'
      )
  },
  async handler({ query }) {
    try {
      const normalizedQuery = query.toLowerCase().trim();

      // Base URL for fetching resources
      const config = useRuntimeConfig();
      const baseUrl = config.pixelMcpBaseUrl;

      // Determine what type of query this is
      const isTokenQuery =
        /token|design.?token|2\.1|2\.4|v2\.1|v2\.4|semantic.?token|color.?system|spacing|design.?system/i.test(
          normalizedQuery
        );

      const relevantContent = [];
      const searchResults = [];

      // If token-related query, prioritize token documentation
      if (isTokenQuery) {
        const token21Content = await $fetch<string>(
          `${baseUrl}/llms-design-tokens-21.txt`,
          { responseType: "text" }
        );
        const token24Content = await $fetch<string>(
          `${baseUrl}/llms-design-tokens-24.txt`,
          { responseType: "text" }
        );

        // Determine which token version is more relevant
        const isToken21Specific = /2\.1|v2\.1|old.?token|legacy.?token/i.test(
          normalizedQuery
        );
        const isToken24Specific =
          /2\.4|v2\.4|new.?token|latest.?token|next.?theme/i.test(
            normalizedQuery
          );

        if (isToken21Specific && isToken24Specific) {
          // Comparison query
          relevantContent.push({
            title: "Design Tokens v2.1 vs v2.4 Comparison",
            content: `# Design Tokens Comparison\n\n## Design Token 2.1 (Legacy)\n${token21Content.substring(0, 2000)}\n\n## Design Token 2.4 (Latest)\n${token24Content.substring(0, 2000)}\n\n**Recommendation:** Use Design Token 2.4 for new projects. Enable with \`setNextTheme(true)\`.`
          });
        } else if (isToken21Specific) {
          relevantContent.push({
            title: "Design Tokens v2.1 (Legacy)",
            content: token21Content
          });
        } else if (isToken24Specific || !isToken21Specific) {
          // Default to 2.4 if not specified
          relevantContent.push({
            title: "Design Tokens v2.4 (Latest)",
            content: token24Content
          });
        }
      }

      // Fetch and search main docs
      const docsContent = await $fetch<string>(`${baseUrl}/llms-docs.txt`, {
        responseType: "text"
      });

      const sections = splitIntoSections(docsContent);

      for (const section of sections) {
        const sectionLower = section.toLowerCase();
        const title = extractTitle(section);

        // Score each section based on relevance
        let relevanceScore = 0;

        // Check for query terms in the section
        const queryTerms = normalizedQuery
          .split(" ")
          .filter((term) => term.length > 2);
        for (const term of queryTerms) {
          if (sectionLower.includes(term)) {
            relevanceScore += 1;
          }
          if (title.toLowerCase().includes(term)) {
            relevanceScore += 3; // Title matches are more relevant
          }
        }

        if (relevanceScore > 0) {
          searchResults.push({
            title,
            content: section,
            score: relevanceScore
          });
        }
      }

      // Sort by relevance
      searchResults.sort((a, b) => b.score - a.score);

      // Add top search results from docs (only if we need more content)
      if (searchResults.length > 0) {
        // If token query, take fewer doc results (top 2-3)
        // Otherwise take top 3-5 results
        const maxResults = isTokenQuery ? 3 : 5;
        const topResults = searchResults.slice(
          0,
          Math.min(maxResults, searchResults.length)
        );
        relevantContent.push(...topResults);
      }

      // If no results found, provide general help
      if (relevantContent.length === 0) {
        return jsonResult({
          query: query,
          found: false,
          message:
            "No specific documentation found for your query. Here are some suggestions:",
          suggestions: [
            'For setup: "how to setup Pixel library" or "installation guide"',
            'For components: "MpButton" or "Button component usage"',
            'For Design Token 2.4: "design token 2.4" or "latest tokens"',
            'For Design Token 2.1: "design token 2.1" or "legacy tokens"',
            'For token comparison: "difference between token 2.1 and 2.4"',
            'For theming: "how to use dark mode" or "theme management"',
            'For styling: "how to write custom styles" or "CSS props"'
          ],
          available_resources: [
            "docs - General Pixel documentation",
            "design-token-2.1 - Design Tokens version 2.1",
            "design-token-2.4 - Design Tokens version 2.4 (recommended)"
          ],
          documentation_url: "https://docs.mekari.design/"
        });
      }

      // Format the response
      const formattedResults = relevantContent.map((result) => ({
        title: result.title,
        content: result.content.trim()
      }));

      return jsonResult({
        query: query,
        found: true,
        results_count: formattedResults.length,
        results: formattedResults,
        resources_used: isTokenQuery
          ? ["docs", "design-token-2.1", "design-token-2.4"]
          : ["docs"],
        documentation_url: "https://docs.mekari.design/"
      });
    } catch (error) {
      return errorResult(
        `Error reading documentation: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  }
});

/**
 * Split content into logical sections based on headers
 */
function splitIntoSections(content: string): string[] {
  // Split by main headers (# or ##)
  const sections = content.split(/\n(?=#{1,2} [^#])/);
  return sections.filter((section) => section.trim().length > 0);
}

/**
 * Extract title from a section
 */
function extractTitle(section: string): string {
  const lines = section.split("\n");
  for (const line of lines) {
    if (line.match(/^#{1,3} /)) {
      return line.replace(/^#{1,3} /, "").trim();
    }
  }
  return "Untitled Section";
}
