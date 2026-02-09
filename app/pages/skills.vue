<template>
  <MpFlex
    direction="column"
    alignItems="center"
    minHeight="100vh"
    background="background.surface"
    padding="4"
  >
    <MpFlex
      direction="column"
      alignItems="center"
      gap="8"
      :width="{ base: '100%', md: '800px' }"
    >
      <!-- Page Header -->
      <MpFlex direction="column" alignItems="center" gap="4">
        <MpText as="h1" size="h1" weight="semiBold">Agent Skills</MpText>
        <MpText size="body" color="text.secondary">
          Learn about Agent Skills and how to use the Pixel skill for
          implementing designs with Mekari Pixel 3 design system.
        </MpText>
      </MpFlex>

      <!-- What are Skills Section -->
      <MpFlex
        direction="column"
        gap="4"
        padding="6"
        backgroundColor="background.neutral"
        borderRadius="lg"
        borderWidth="1px"
        borderColor="border.default"
      >
        <MpText as="h2" size="h2" weight="semiBold">
          What are Agent Skills?
        </MpText>
        <MpText size="body" color="text.primary">
          Agent Skills are a lightweight, open format for extending AI agent
          capabilities with specialized knowledge and workflows. At its core, a
          skill is a folder containing a
          <code>SKILL.md</code> file with metadata and instructions that tell an
          agent how to perform a specific task.
        </MpText>

        <MpFlex direction="column" gap="3">
          <MpText size="label" weight="semiBold">How Skills Work:</MpText>
          <MpFlex direction="column" gap="2">
            <MpFlex gap="3" alignItems="start">
              <MpIcon name="done" variant="fill" color="icon.success" />
              <MpFlex direction="column" gap="1">
                <MpText size="body" weight="semiBold">Discovery</MpText>
                <MpText size="body-small" color="text.secondary">
                  At startup, agents load only the name and description of each
                  available skill.
                </MpText>
              </MpFlex>
            </MpFlex>

            <MpFlex gap="3" alignItems="start">
              <MpIcon name="done" variant="fill" color="icon.success" />
              <MpFlex direction="column" gap="1">
                <MpText size="body" weight="semiBold">Activation</MpText>
                <MpText size="body-small" color="text.secondary">
                  When a task matches a skill's description, the agent reads the
                  full instructions.
                </MpText>
              </MpFlex>
            </MpFlex>

            <MpFlex gap="3" alignItems="start">
              <MpIcon name="done" variant="fill" color="icon.success" />
              <MpFlex direction="column" gap="1">
                <MpText size="body" weight="semiBold">Execution</MpText>
                <MpText size="body-small" color="text.secondary">
                  The agent follows the instructions, optionally loading
                  referenced files as needed.
                </MpText>
              </MpFlex>
            </MpFlex>
          </MpFlex>
        </MpFlex>

        <MpText size="body-small" color="text.secondary">
          Learn more at
          <MpText
            as="a"
            href="https://agentskills.io/what-are-skills"
            target="_blank"
            color="text.link"
            is-text-link
          >
            agentskills.io
          </MpText>
        </MpText>
      </MpFlex>

      <!-- About Pixel Skill Section -->
      <MpFlex
        direction="column"
        gap="4"
        padding="6"
        backgroundColor="background.neutral"
        borderRadius="lg"
        borderWidth="1px"
        borderColor="border.default"
      >
        <MpText as="h2" size="h2" weight="semiBold">
          What is the Pixel Skill?
        </MpText>
        <MpText size="body" color="text.primary">
          The Pixel skill is a specialized Agent Skills implementation for
          translating designs into production-ready code using the Mekari Pixel
          3 design system. It provides comprehensive guidance for implementing
          designs in Vue 3 and Nuxt applications.
        </MpText>

        <MpFlex direction="column" gap="3">
          <MpText size="label" weight="semiBold">Key Features:</MpText>
          <MpFlex direction="column" gap="2">
            <MpFlex gap="2" alignItems="center">
              <MpIcon name="check" color="icon.success" />
              <MpText size="body">
                Component (mapping figma element to pixel, common usage
                patterns)
              </MpText>
            </MpFlex>
            <MpFlex gap="2" alignItems="center">
              <MpIcon name="check" color="icon.success" />
              <MpText size="body">
                Styling hierarchy (CSS Props, CSS Functions)
              </MpText>
            </MpFlex>
            <MpFlex gap="2" alignItems="center">
              <MpIcon name="check" color="icon.success" />
              <MpText size="body"
                >Design tokens (semantic token, foundation colors,
                spacing)</MpText
              >
            </MpFlex>
            <MpFlex gap="2" alignItems="center">
              <MpIcon name="check" color="icon.success" />
              <MpText size="body">
                Code structure (Vue SFC order, TypeScript best practices)
              </MpText>
            </MpFlex>
          </MpFlex>
        </MpFlex>
      </MpFlex>

      <!-- Skill Content Preview -->
      <MpFlex
        width="full"
        direction="column"
        gap="4"
        padding="6"
        backgroundColor="background.neutral"
        borderRadius="lg"
        borderWidth="1px"
        borderColor="border.default"
      >
        <MpFlex justifyContent="space-between" alignItems="center">
          <MpText as="h2" size="h2" weight="semiBold">Pixel Skill</MpText>
          <MpButton
            variant="primary"
            size="sm"
            left-icon="download"
            :is-disabled="isLoading || !fullSkillContent"
            @click="downloadSkill"
          >
            Download ZIP
          </MpButton>
        </MpFlex>

        <MpText>
          The Pixel skill includes a comprehensive <code>SKILL.md</code> with a
          set of references included as <code>components.md</code>,
          <code>styling.md</code> and etc. Download as a zip file to get the
          complete skill with all reference files.
        </MpText>

        <MpFlex
          v-if="isLoading"
          justifyContent="center"
          alignItems="center"
          padding="8"
          backgroundColor="background.inverse"
          borderRadius="md"
        >
          <MpText size="body" color="text.inverse">
            Loading skill content...
          </MpText>
        </MpFlex>

        <MpFlex
          v-else
          direction="column"
          padding="4"
          backgroundColor="background.inverse"
          borderRadius="md"
          maxHeight="400px"
          overflow="auto"
        >
          <pre
            :class="
              css({
                fontSize: '12px',
                lineHeight: '1.5',
                margin: '0',
                color: 'text.inverse'
              })
            "
          ><code>{{ skillFilePreview }}</code></pre>
        </MpFlex>
      </MpFlex>

      <!-- Usage Instructions -->
      <MpFlex
        width="full"
        direction="column"
        gap="4"
        padding="6"
        backgroundColor="background.information"
        borderRadius="lg"
        borderWidth="1px"
        borderColor="border.default"
      >
        <MpFlex gap="2" alignItems="start">
          <MpFlex direction="column" gap="3">
            <MpText size="h2" weight="semiBold">How to Use Pixel Skill</MpText>
            <MpFlex direction="column" gap="2">
              <MpText color="text.primary">
                1. Download the skill ZIP file and extract it to your project's
                <code>.agents/skills/</code> directory
              </MpText>
              <MpText color="text.primary">
                2. Ensure your AI agent supports Agent Skills format
              </MpText>
              <MpText color="text.primary">
                3. Simply mention "Use the pixel skill" or "Implement this with
                Pixel" in your prompts
              </MpText>
              <MpText color="text.primary">
                4. The agent will automatically follow the Pixel implementation
                guidelines
              </MpText>
            </MpFlex>
          </MpFlex>
        </MpFlex>
      </MpFlex>
    </MpFlex>
  </MpFlex>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { MpFlex, MpText, MpButton, MpIcon, css } from "@mekari/pixel3";

// Skill metadata
const skillMetadata = ref({
  version: "1.0.8",
  author: "UXE Team",
  source: "https://docs.mekari.design/"
});

// Loading state
const isLoading = ref(true);

// Skill file content
const skillFilePreview = ref("");
const fullSkillContent = ref("");

// Fetch skill content from API
onMounted(async () => {
  try {
    const response = await fetch("/api/skills/pixel");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.success) {
      skillMetadata.value = data.metadata;
      skillFilePreview.value = data.preview;
      fullSkillContent.value = data.fullContent;
    } else {
      console.error("Failed to load skill:", data.error, data.details);
      // Show error details in preview
      skillFilePreview.value = `Failed to load skill content\nError: ${data.error}\nDetails: ${data.details || "N/A"}\nPath: ${data.path || "N/A"}`;
      fullSkillContent.value = "";
    }
  } catch (error: any) {
    console.error("Error fetching skill:", error);
    skillFilePreview.value = `Error loading skill content\n${error?.message || "Unknown error"}`;
    fullSkillContent.value = "";
  } finally {
    isLoading.value = false;
  }
});

// Download skill file as zip
const downloadSkill = async () => {
  try {
    // Fetch the zip file from the API
    const response = await fetch("/api/skills/pixel/download");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Get the blob from the response
    const blob = await response.blob();

    // Create download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "pixel-skill.zip";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Failed to download skill:", error);
    alert("Failed to download skill archive. Please try again.");
  }
};
</script>
