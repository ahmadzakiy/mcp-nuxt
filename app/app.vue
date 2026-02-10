<template>
  <AppHeader />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <AppFooter />
</template>

<script setup lang="ts">
import { usePixelTheme } from "@mekari/pixel3";

const { setNextTheme } = usePixelTheme();

setNextTheme(true);
</script>
