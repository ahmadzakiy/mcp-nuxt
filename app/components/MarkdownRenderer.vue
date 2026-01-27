<template>
  <div v-html="renderedHtml" class="markdown-content"></div>
</template>

<script setup lang="ts">
import { marked } from "marked";

const props = defineProps<{
  text: string;
}>();

const renderedHtml = computed(() => {
  return marked.parse(props.text, {
    breaks: true, // Convert line breaks to <br>
    gfm: true, // GitHub Flavored Markdown
  });
});
</script>

<style scoped>
.markdown-content {
  /* Add any custom styling for markdown content */
  font-size: inherit;
}
.markdown-content strong {
  font-weight: bold;
}
.markdown-content em {
  font-style: italic;
}
.markdown-content code {
  background-color: rgba(0, 0, 0, 0.1);
  padding: 0.2em 0.4em;
  border-radius: 3px;
}
</style>
