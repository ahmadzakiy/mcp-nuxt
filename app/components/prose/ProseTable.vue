<template>
  <MpTableContainer has-shadow class="chat-table-container">
    <MpTable :is-hoverable="false">
      <slot />
    </MpTable>
  </MpTableContainer>
</template>

<script setup lang="ts">
import { MpTable, MpTableContainer } from "@mekari/pixel3";
</script>

<style scoped>
.chat-table-container {
  margin: 0.75rem 0;
  max-width: 100%;
}
</style>
