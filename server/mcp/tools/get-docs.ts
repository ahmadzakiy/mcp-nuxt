import { z } from "zod";

export default defineMcpTool({
  description:
    "Retrieves Pixel documentation, answers questions about setup, component usage, design tokens (2.1 vs 2.4), and other Pixel-related queries",
  inputSchema: {
    query: z
      .string()
      .describe(
        'Your question or search query (e.g., "how to setup Pixel", "difference between token 2.1 and 2.4", "MpButton", "dark mode")',
      ),
  },
  async handler({ query }) {
    try {
      const normalizedQuery = query.toLowerCase().trim();

      // Base URL for fetching resources
      const config = useRuntimeConfig();
      const baseUrl = config.pixelMcpBaseUrl;

      // Fetch all relevant files
      const docsContent = await $fetch<string>(`${baseUrl}/llms-docs.txt`, {
        responseType: "text",
      });

      // Determine what type of query this is
      const isTokenQuery = /token|design token|2\.1|2\.4|v2\.1|v2\.4/i.test(
        normalizedQuery,
      );

      let relevantContent = [];
      let searchResults = [];

      // Search through the main docs
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
            score: relevanceScore,
          });
        }
      }

      // Sort by relevance
      searchResults.sort((a, b) => b.score - a.score);

      // If token-related query, include token documentation
      if (isTokenQuery) {
        const token21Content = await $fetch<string>(
          `${baseUrl}/llms-design-tokens-21.txt`,
          { responseType: "text" },
        );
        const token24Content = await $fetch<string>(
          `${baseUrl}/llms-design-tokens-24.txt`,
          { responseType: "text" },
        );

        relevantContent.push({
          title: "Design Tokens v2.1 vs v2.4 Comparison",
          content: `# Design Tokens Comparison\n\n## Token 2.1\n${token21Content.substring(0, 1500)}\n\n## Token 2.4\n${token24Content.substring(0, 1500)}\n\nFor complete token documentation, please refer to the full design token files.`,
        });
      }

      // Add top search results
      if (searchResults.length > 0) {
        // Take top 3-5 most relevant sections
        const topResults = searchResults.slice(
          0,
          Math.min(5, searchResults.length),
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
            'For setup: Ask "how to setup Pixel library"',
            'For components: Ask about specific component like "MpButton" or "Button component"',
            'For tokens: Ask "difference between token 2.1 and 2.4"',
            'For theming: Ask "how to use dark mode" or "theme management"',
            'For styling: Ask "how to write custom styles"',
          ],
          documentation_url: "https://docs.mekari.design/",
        });
      }

      // Format the response
      const formattedResults = relevantContent.map((result) => ({
        title: result.title,
        content: result.content.trim(),
      }));

      return jsonResult({
        query: query,
        found: true,
        total_documentation: formattedResults.length,
        documentation: formattedResults,
        documentation_url: "https://docs.mekari.design/",
      });
    } catch (error) {
      return errorResult(
        `Error reading documentation: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  },
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
