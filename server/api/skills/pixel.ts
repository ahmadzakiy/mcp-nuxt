export default defineEventHandler(async (event) => {
  try {
    // Get base URL from runtime config
    const config = useRuntimeConfig();
    const baseUrl = `${config.pixelMcpBaseUrl}/skills/pixel`;
    const skillUrl = `${baseUrl}/SKILL.md`;

    console.log("Fetching skill from:", skillUrl);
    const content = (await $fetch(skillUrl, {
      responseType: "text"
    })) as string;

    // Extract metadata from frontmatter
    const metadataMatch = content.match(/---\n([\s\S]*?)\n---/);
    let metadata = {
      version: "1.0.8",
      author: "UXE Team",
      source: "https://docs.mekari.design/"
    };

    if (metadataMatch) {
      const frontmatter = metadataMatch[1];
      const versionMatch = frontmatter.match(/version:\s*["'](.+?)["']/);
      const authorMatch = frontmatter.match(/author:\s*(.+)/);
      const sourceMatch = frontmatter.match(/source:\s*(.+)/);

      if (versionMatch) metadata.version = versionMatch[1];
      if (authorMatch) metadata.author = authorMatch[1].trim();
      if (sourceMatch) metadata.source = sourceMatch[1].trim();
    }

    // Get preview (first 30 lines for display)
    const lines = content.split("\n");
    const preview =
      lines.slice(0, 30).join("\n") + "\n\n...and more implementation guidance";

    return {
      success: true,
      metadata,
      preview,
      fullContent: content
    };
  } catch (error: any) {
    console.error("Error reading skill file:", error);

    // Return detailed error for debugging
    return {
      success: false,
      error: "Failed to load skill file",
      details: error?.message || "Unknown error",
      code: error?.statusCode || error?.code || "UNKNOWN",
      cwd: process.cwd(),
      platform: process.platform,
      nodeEnv: process.env.NODE_ENV
    };
  }
});
