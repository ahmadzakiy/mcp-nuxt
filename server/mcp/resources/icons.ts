export default defineMcpResource({
  name: "icons",
  title: "Pixel Icons",
  description:
    "Complete list of available Pixel Vue 3 icons names and categories",
  file: "public/llms-icons.txt",
  metadata: {
    mimeType: "text/plain"
  },
  cache: "1h"
});
