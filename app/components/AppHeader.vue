<template>
  <MpFlex
    as="header"
    alignItems="center"
    justify="space-between"
    padding="4"
    background="background.airene"
    borderBottomWidth="1px"
    borderColor="border.default"
    :class="
      css({
        flexWrap: { base: 'wrap', md: 'nowrap' },
        gap: { base: '4', md: '0' }
      })
    "
  >
    <NuxtLink to="/">
      <img
        :src="
          isDarkMode
            ? 'https://cdn.mekari.design/logo/pixel/white.svg'
            : 'https://cdn.mekari.design/logo/pixel/default.svg'
        "
        alt="Mekari Pixel Logo"
        :class="
          css({
            height: { base: '24px', md: '32px' }
          })
        "
      />
    </NuxtLink>

    <MpFlex
      alignItems="center"
      gap="4"
      :class="
        css({
          width: { base: '100%', md: 'auto' },
          flexDirection: { base: 'column', sm: 'row' },
          order: { base: '3', md: '0' }
        })
      "
    >
      <MpFlex
        alignItems="center"
        gap="2"
        flex="none"
        :class="
          css({
            width: { base: '100%', sm: 'auto' }
          })
        "
      >
        <MpText weight="semiBold" :class="css({ display: { base: 'none', sm: 'block' } })">
          Theme
        </MpText>
        <MpAutocomplete
          id="product-theme-select"
          v-model="productTheme"
          :data="productThemeOptions"
          placeholder="Select Theme"
          size="sm"
          :class="
            css({
              width: { base: '100%', sm: 'auto' }
            })
          "
        />
      </MpFlex>
      <MpFlex alignItems="center" gap="2" flex="none">
        <MpText weight="semiBold"> {{ isDarkMode ? 'Dark' : 'Light' }} </MpText>
        <MpToggle id="dark-mode-toggle" v-model:is-checked="isDarkMode" />
      </MpFlex>
    </MpFlex>
  </MpFlex>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue'
  import { MpFlex, MpText, MpToggle, MpAutocomplete, css } from '@mekari/pixel3'
  import { usePixelTheme } from '@mekari/pixel3'

  const { isDark, setDarkMode, setProductTheme } = usePixelTheme()

  const isDarkMode = ref(isDark.value)
  const productTheme = ref('default')
  const productThemeOptions = ['enterprise', 'default']

  // Watch for changes in isDark from usePixelTheme
  watch(isDarkMode, (newValue) => {
    setDarkMode(newValue)
  })

  // Watch for changes in productTheme
  watch(productTheme, (newValue) => {
    const theme = newValue === 'default' ? '' : newValue
    setProductTheme(theme as 'enterprise' | '')
  })
</script>
