<template>
  <MpFlex direction="column" gap="2" minHeight="100vh" background="background.surface" padding="4">
    <MpText as="h1" size="h1">Mekari Pixel MCP</MpText>
    <MpText>coming soon...</MpText>

    <MpButtonGroup>
      <ButtonAddMcp ide="cursor" />
      <ButtonAddMcp ide="vscode" />
    </MpButtonGroup>
  </MpFlex>
</template>

<script setup lang="ts">
  import { MpFlex, MpText, MpButtonGroup } from '@mekari/pixel3'
  import ButtonAddMcp from '~/components/ButtonAddMcp.vue'
</script>
