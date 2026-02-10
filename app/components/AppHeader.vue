<template>
  <MpFlex
    as="header"
    :flexDirection="{ sm: 'column', md: 'row' }"
    :alignItems="{ sm: 'flex-start', md: 'center' }"
    justifyContent="space-between"
    :gap="{ sm: '4', md: '0' }"
    :flexWrap="{ sm: 'wrap', md: 'nowrap' }"
    padding="4"
    background="background.airene"
    borderBottomWidth="1px"
    borderColor="border.default"
  >
    <NuxtLink to="/">
      <MpFlex :height="{ sm: '36px', md: '36px' }" alignItems="center">
        <img
          :src="
            isDarkMode
              ? 'https://cdn.mekari.design/logo/pixel/white.svg'
              : 'https://cdn.mekari.design/logo/pixel/default.svg'
          "
          alt="Mekari Pixel Logo"
          style="height: 100%"
        />
      </MpFlex>
    </NuxtLink>

    <MpFlex
      :flexDirection="{ sm: 'column', md: 'row' }"
      :alignItems="{ sm: 'flex-start', md: 'center' }"
      gap="4"
    >
      <MpFlex alignItems="center" gap="2" flex="none">
        <MpText weight="semiBold"> Theme </MpText>
        <MpAutocomplete
          id="product-theme-select"
          v-model="productTheme"
          :data="productThemeOptions"
          placeholder="Select Theme"
          size="sm"
        />
      </MpFlex>
      <MpFlex alignItems="center" gap="2" flex="none">
        <MpText weight="semiBold"> {{ isDarkMode ? "Dark" : "Light" }} </MpText>
        <MpToggle id="dark-mode-toggle" v-model:is-checked="isDarkMode" />
      </MpFlex>
    </MpFlex>
  </MpFlex>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { MpFlex, MpText, MpToggle, MpAutocomplete } from "@mekari/pixel3";
import { usePixelTheme } from "@mekari/pixel3";

const { isDark, setDarkMode, setProductTheme } = usePixelTheme();

const isDarkMode = ref(isDark.value);
const productTheme = ref("default");
const productThemeOptions = ["enterprise", "default"];

// Watch for changes in isDark from usePixelTheme
watch(isDarkMode, (newValue) => {
  setDarkMode(newValue);
});

// Watch for changes in productTheme
watch(productTheme, (newValue) => {
  const theme = newValue === "default" ? "" : newValue;
  setProductTheme(theme as "enterprise" | "");
});
</script>
