import archiver from "archiver";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

async function readSkillFile(relativePath: string): Promise<string> {
  const storage = useStorage("assets:skills");
  const content = (await storage.getItem(relativePath)) as string | null;
  if (content !== null) return content;
  // Dev fallback: read from filesystem
  return readFile(
    join(process.cwd(), "public", "skills", relativePath),
    "utf8"
  );
}

// Define the skill file structure
const skillFiles = [
  "SKILL.md",
  "references/components.md",
  "references/design-tokens.md",
  "references/styling.md",
  "references/code-structure.md"
];

export default defineEventHandler(async (event) => {
  try {
    // Set response headers for zip download
    setResponseHeaders(event, {
      "Content-Type": "application/zip",
      "Content-Disposition": 'attachment; filename="pixel-skill.zip"'
    });

    // Create archiver instance
    const archive = archiver("zip", {
      zlib: { level: 9 } // Maximum compression
    });

    // Handle archiver warnings and errors
    archive.on("warning", (err) => {
      if (err.code === "ENOENT") {
        console.warn("Archiver warning:", err);
      } else {
        throw err;
      }
    });

    archive.on("error", (err) => {
      throw err;
    });

    // Read and add each file from server assets (with fs fallback in dev)
    for (const filePath of skillFiles) {
      try {
        const content = await readSkillFile(`pixel/${filePath}`);
        if (content) {
          archive.append(content, { name: `pixel/${filePath}` });
        }
      } catch (error) {
        console.warn(`Failed to read ${filePath}:`, error);
        // Continue with other files even if one fails
      }
    }

    // Finalize the archive
    archive.finalize();

    // Return the archive stream
    return sendStream(event, archive);
  } catch (error: any) {
    console.error("Error creating skill zip:", error);

    // Return error response
    setResponseStatus(event, 500);
    return {
      success: false,
      error: "Failed to create skill archive",
      details: error?.message || "Unknown error"
    };
  }
});
