export default defineEventHandler(() => {
  const config = useRuntimeConfig()
  
  return {
    isHealthy: true,
    config,
  }
})
