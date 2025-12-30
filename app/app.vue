<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
  // import "~/assets/css/pixel.css";
  
  const config = useRuntimeConfig()
  // Only public values are accessible on client
  console.log('Public config:', config.public)
</script>