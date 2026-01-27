<template>
  <div>
    <AppHeader />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
// import "~/assets/css/pixel.css";
// import { usePixelTheme } from "@mekari/pixel3";

const config = useRuntimeConfig();
// Only public values are accessible on client
console.log("Public config:", config.public);

// const { isDark, isNextTheme, setNextTheme } = usePixelTheme();
// console.log("isDark:", isDark.value);
// console.log("isNextTheme:", isNextTheme.value);

// setNextTheme(true);

// function showLightMode() {
//   document.documentElement.classList.add("light");
//   document.documentElement.classList.remove("dark");
// }
// function showDarkMode() {
//   document.documentElement.classList.add("dark");
//   document.documentElement.classList.remove("light");
// }
// function applyNextTheme() {
//   document.documentElement.setAttribute("data-panda-theme", "next");
// }
// function removeNextTheme() {
//   document.documentElement.removeAttribute("data-panda-theme");
// }

// onMounted(() => {
//   // Example: Apply Token 2.4 with Dark Mode
//   applyNextTheme();
//   showDarkMode();
// });
</script>
