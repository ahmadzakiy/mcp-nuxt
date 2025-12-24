import { PixelPlugin, type PixelPluginConfig, usePixelTheme } from '@mekari/pixel3'

export default defineNuxtPlugin((nuxtApp) => {
  // Register Pixel plugin
  nuxtApp.vueApp.use(PixelPlugin, {
    pixelTheme: true // Enable pixel theme watcher
  } as PixelPluginConfig)

  // Enable Design Token 2.4
  const { setNextTheme } = usePixelTheme()
  setNextTheme(true) // Enable Design Token v2.4
})
