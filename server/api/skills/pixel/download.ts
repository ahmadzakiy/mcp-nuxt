import archiver from "archiver";

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

    // Get base URL from runtime config
    const config = useRuntimeConfig();
    const baseUrl = `${config.pixelMcpBaseUrl}/skills/pixel`;
    console.log("Creating skill archive from:", baseUrl);

    // Fetch and add each file to the archive
    for (const filePath of skillFiles) {
      try {
        const fileUrl = `${baseUrl}/${filePath}`;
        console.log("Fetching:", fileUrl);

        const content = await $fetch(fileUrl, {
          responseType: "text"
        });

        // Add file to archive
        archive.append(content as string, { name: `pixel/${filePath}` });
      } catch (error) {
        console.warn(`Failed to fetch ${filePath}:`, error);
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
