<template>
  <MpButton @click="openDeeplink" :variant="variant" left-icon="add">
    {{ buttonLabel }}
  </MpButton>
</template>

<script setup lang="ts">
  import { MpButton } from '@mekari/pixel3'

  interface Props {
    ide: 'cursor' | 'vscode'
    serverUrl: string
    serverName: string
    label?: string
    variant?: string
  }

  const props = withDefaults(defineProps<Props>(), {
    variant: 'tertiary',
    serverUrl: 'https://pixel-mcp.netlify.app/mcp',
    serverName: 'pixel3'
  })

  const generateDeeplink = () => {
    if (props.ide === 'cursor') {
      // Cursor deeplink format: cursor://anysphere.cursor-deeplink/mcp/install?name=SERVER_NAME&config=BASE64_CONFIG
      const cursorConfig = { type: 'http', url: props.serverUrl }
      const cursorConfigBase64 = btoa(JSON.stringify(cursorConfig))
      return `cursor://anysphere.cursor-deeplink/mcp/install?name=${props.serverName}&config=${cursorConfigBase64}`
    } else {
      // VS Code deeplink format: vscode:mcp/install?URL_ENCODED_JSON
      const vscodeConfig = { name: props.serverName, type: 'http', url: props.serverUrl }
      return `vscode:mcp/install?${encodeURIComponent(JSON.stringify(vscodeConfig))}`
    }
  }

  const openDeeplink = () => {
    window.location.href = generateDeeplink()
  }

  const buttonLabel =
    props.label || `Install MCP in ${props.ide === 'cursor' ? 'Cursor' : 'VS Code'}`
</script>
