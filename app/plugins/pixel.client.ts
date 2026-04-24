import { PixelPlugin, type PixelPluginConfig } from "@mekari/pixel3";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(PixelPlugin, {
    pixelTheme: true,
    toastManager: true,
    tooltipDirective: true,
    maskDirective: true
  } as PixelPluginConfig);
});
