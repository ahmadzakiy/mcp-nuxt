<template>
  <Comark
    class="markdown-content"
    :markdown="text"
    :streaming="isStreaming"
    :caret="isStreaming"
    :components="components"
  />
</template>

<script setup lang="ts">
import PixelChart from "~/components/chat/PixelChart.vue";

defineProps<{
  text: string;
  isStreaming?: boolean;
}>();

const components = {
  "pixel-chart": PixelChart
};
</script>

<style scoped>
.markdown-content {
  font-size: inherit;
  line-height: 1.6;
}

.markdown-content :deep(p) {
  margin: 0 0 0.75rem;
}

.markdown-content :deep(p:last-child) {
  margin-bottom: 0;
}

.markdown-content :deep(strong) {
  font-weight: 600;
}

.markdown-content :deep(em) {
  font-style: italic;
}

.markdown-content :deep(code) {
  background-color: rgba(0, 0, 0, 0.08);
  border-radius: 3px;
  padding: 0.125rem 0.25rem;
}

.markdown-content :deep(pre) {
  background-color: rgba(0, 0, 0, 0.06);
  border-radius: 8px;
  margin: 0.75rem 0;
  overflow: auto;
  padding: 0.75rem;
}

.markdown-content :deep(pre code) {
  background: transparent;
  padding: 0;
}
</style>
