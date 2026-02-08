import archiver from "archiver";
import { join } from "path";
import { stat } from "fs/promises";

export default defineEventHandler(async (event) => {
  try {
    const skillPath = join(process.cwd(), ".agents/skills/pixel");

    // Verify the directory exists
    const dirStats = await stat(skillPath);
    if (!dirStats.isDirectory()) {
      throw new Error("Skill directory not found");
    }

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

    // Add the entire pixel directory to the zip
    archive.directory(skillPath, "pixel");

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
