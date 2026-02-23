# Mekari Pixel MCP (Nuxt)

Remote MCP server and web UI for working with the Mekari Pixel 3 design system.

- Live MCP endpoint: `https://pixel-mcp.netlify.app/mcp`
- Local dev URL: `http://localhost:3200`

## Overview

This project is a Nuxt 4 app that serves:

- A browser UI (`/`, `/chat`, `/docs`, `/skills`, `/result/*`)
- MCP tools/resources/prompts for Pixel-focused AI workflows
- Downloadable skill assets for agent usage

## Tech Stack

- Nuxt 4 + Vue 3
- TypeScript
- `@mekari/pixel3` + `@mekari/pixel3-postcss`
- `@nuxtjs/mcp-toolkit`
- pnpm
- Netlify Nitro preset

## Scripts

```bash
pnpm install
pnpm dev        # nuxi dev --port 3200
pnpm build      # production build
pnpm preview    # preview build
pnpm start      # run output server
pnpm generate   # static generation
pnpm eval       # evalite tests
pnpm eval:ui    # evalite watch UI
```

## Routes

- `/` — Home
- `/chat` — Chat interface
- `/docs` — Documentation page
- `/skills` — Skill documentation/download
- `/result/test-0` to `/result/test-3` — Implementation examples

## MCP Server

Configured in `nuxt.config.ts`:

- `name`: `pixel3-mcp-server`
- `route`: `/mcp`
- `dir`: `server/mcp`

### MCP Tools

- `get-component`
- `get-docs`
- `get-pattern`
- `get-template`
- `hello-pixel`

### MCP Resources

- `component`
- `docs`
- `patterns`
- `templates`
- `token21`
- `token24`

### MCP Prompts

- `implement-figma-to-pixel`
- `create-design-to-pixel`

## API Endpoints

- `GET /api/health`
- `POST /api/chat`
- `GET /api/skills/pixel`
- `GET /api/skills/pixel/download`

## Project Structure

```text
mcp-nuxt/
├── app/
│   ├── assets/css/pixel.css
│   ├── components/
│   │   ├── AppFooter.vue
│   │   ├── AppHeader.vue
│   │   ├── ButtonAddMcp.vue
│   │   └── MarkdownRenderer.vue
│   ├── pages/
│   │   ├── index.vue
│   │   ├── chat.vue
│   │   ├── docs.vue
│   │   ├── skills.vue
│   │   └── result/
│   │       ├── test-0.vue
│   │       ├── test-1.vue
│   │       ├── test-2.vue
│   │       └── test-3.vue
│   └── plugins/pixel.client.ts
├── docs/
├── public/
│   ├── llms-components.txt
│   ├── llms-design-tokens-21.txt
│   ├── llms-design-tokens-24.txt
│   ├── llms-docs.txt
│   └── skills/pixel/
├── server/
│   ├── api/
│   │   ├── chat.ts
│   │   ├── health.ts
│   │   └── skills/
│   │       ├── pixel.ts
│   │       └── pixel/download.ts
│   └── mcp/
│       ├── prompts/
│       ├── resources/
│       ├── tools/
│       └── utils/
└── test/mcp.eval.ts
```

## Runtime Config

`nuxt.config.ts` includes:

- `AI_GATEWAY_API_KEY` (server-only)
- `pixelMcpBaseUrl`
  - development: `http://localhost:3200`
  - production: `https://pixel-mcp.netlify.app`

## VS Code MCP Setup

Create/update `.vscode/mcp.json`:

```json
{
  "servers": {
    "pixel3": {
      "type": "http",
      "url": "https://pixel-mcp.netlify.app/mcp"
    }
  }
}
```

## Notes

- SSR is disabled (`ssr: false`).
- Nitro preset is set to `netlify`.
- Pixel styles are loaded globally via `app/assets/css/pixel.css`.
