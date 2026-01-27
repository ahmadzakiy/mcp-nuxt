import {
  PixelPlugin,
  type PixelPluginConfig,
  usePixelTheme,
} from "@mekari/pixel3";

const { setNextTheme, setDarkMode, setProductTheme } = usePixelTheme();

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(PixelPlugin, {
    pixelTheme: true, // Enable pixel theme watcher
  } as PixelPluginConfig);

  setNextTheme(true); // Enable Design Token v2.4
  setDarkMode(false); // Set dark mode to false
  setProductTheme("enterprise"); // Set product theme to enterprise
});
