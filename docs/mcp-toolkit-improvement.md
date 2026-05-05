# MCP Toolkit Improvement Summary

## Dependency Upgrade

|                       | Before  | After     |
| --------------------- | ------- | --------- |
| `@nuxtjs/mcp-toolkit` | `0.6.0` | `^0.15.0` |

Also added `nitro.experimental.asyncContext: true` in `nuxt.config.ts` to enable `useMcpServer()` composable support.

---

## Deprecated API Migration

All tools migrated away from deprecated helpers:

| Deprecated             | Replacement                                  |
| ---------------------- | -------------------------------------------- |
| `jsonResult(obj)`      | Direct object/string return                  |
| `errorResult(msg)`     | `throw createError({ statusCode, message })` |
| `CallToolResult` shape | Plain string return (for `hello-pixel`)      |

**Files updated:** `get-component.ts`, `get-docs.ts`, `get-icon-name.ts`, `get-pattern.ts`, `get-template.ts`, `hello-pixel.ts`

---

## New Features

### Annotations

Added to all tools to help MCP clients decide when to prompt for confirmation:

```ts
annotations: {
  readOnlyHint: true,
  destructiveHint: false,
  idempotentHint: true,
  openWorldHint: true, // false for hello-pixel (no external calls)
}
```

### Input Examples

Added `inputExamples` to all tools for better model parameter inference:

| Tool            | Examples                                                                                                    |
| --------------- | ----------------------------------------------------------------------------------------------------------- |
| `get-component` | `'Button'`, `'mp-input'`, `'a delete button inside a modal'`, `'list all components'`                       |
| `get-docs`      | `'how to setup Pixel'`, `'difference between token 2.1 and 2.4'`, `'MpButton usage'`, `'dark mode theming'` |
| `get-icon-name` | `'delete'`, `'edit'`, `'close'`, `'list all icons'`                                                         |
| `get-pattern`   | `'input otp'`, `'summary box'`, `'list all patterns'`                                                       |
| `get-template`  | `'base layout'`, `'qontak inbox'`, `'list all templates'`                                                   |
| `hello-pixel`   | `'World'`, `'Pixel'`                                                                                        |

### Caching

Enabled `cache: '30m'` on all 5 documentation tools. All tools fetch static `.txt` files from a public CDN, making aggressive caching safe and beneficial for performance.

### Observability (`useMcpLogger`)

Added `useMcpLogger` to all 5 documentation tools:

- `notify.info` — sent to the connected MCP client on successful responses
- `notify.error` — sent on caught errors before re-throwing

No additional packages required — `notify` works without `evlog` installed.

```ts
const log = useMcpLogger("get-component");
// ...
await log.notify.info({ msg: `Found component: ${matchedName}` });
// on error:
await log.notify.error({ msg: `Error: ${error.message}` });
throw error;
```
