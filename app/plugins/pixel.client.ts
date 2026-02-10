import { PixelPlugin, type PixelPluginConfig } from "@mekari/pixel3";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(PixelPlugin, {
    pixelTheme: true // Enable pixel theme watcher
  } as PixelPluginConfig);
});
