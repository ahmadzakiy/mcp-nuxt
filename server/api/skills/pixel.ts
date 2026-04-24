import { readFile } from "node:fs/promises";
import { join } from "node:path";

async function readSkillFile(relativePath: string): Promise<string> {
  if (process.env.NODE_ENV !== "production") {
    return readFile(
      join(process.cwd(), "public", "skills", relativePath),
      "utf8"
    );
  }
  const url = `https://pixel-mcp.netlify.app/skills/${relativePath}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch skill file: ${res.statusText}`);
  return res.text();
}

export default defineEventHandler(async () => {
  try {
    const content = await readSkillFile("pixel/SKILL.md");

    // Extract metadata from frontmatter
    const metadataMatch = content.match(/---\n([\s\S]*?)\n---/);
    let metadata = {
      version: "2026.4.14",
      author: "Ahmad Zakiy",
      source: "https://pixel-mcp.netlify.app/skills/"
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
