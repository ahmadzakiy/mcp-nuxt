import { readFile } from "fs/promises";
import { join } from "path";

export default defineEventHandler(async (event) => {
  try {
    // Read from public/skills instead of .agents/skills for production compatibility
    const skillPath = join(process.cwd(), "public/skills/pixel/SKILL.md");
    console.log("Reading skill from:", skillPath);

    const content = await readFile(skillPath, "utf-8");

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
      path: join(process.cwd(), "public/skills/pixel/SKILL.md")
    };
  }
});
