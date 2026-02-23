# MCP Nuxt Application Overview

This document gives coding agents and contributors a quick orientation to the `mcp-nuxt` workspace.

> For implementation playbooks, use the skill docs in `.agents/skills/` and `public/skills/`.

---

## About This App

This is a **Nuxt 4** application integrated with a **Model Context Protocol (MCP)** server for the **Mekari Pixel 3** design system.

The project provides:

- A UI for chat/docs/skills/demo pages
- MCP tools/resources/prompts for Pixel workflows
- Public skill assets and references for agent consumption

## Tech Stack

- **Framework**: Nuxt 4 (Vue 3)
- **Styling System**: `@mekari/pixel3` + `@mekari/pixel3-postcss`
- **Language**: TypeScript
- **MCP Integration**: `@nuxtjs/mcp-toolkit`
- **Package Manager**: pnpm
- **Deployment Target**: Netlify (Nitro preset)

## Current Project Structure

```text
mcp-nuxt/
├── app/
│   ├── app.vue
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
│
├── docs/
│   ├── figma-to-pixel-instructions.md
│   └── skills-vs-mcp-prompts.md
│
├── public/
│   ├── llms-components.txt
│   ├── llms-design-tokens-21.txt
│   ├── llms-design-tokens-24.txt
│   ├── llms-docs.txt
│   ├── robots.txt
│   └── skills/pixel/
│       ├── SKILL.md
│       └── references/
│
├── server/
│   ├── api/
│   │   ├── chat.ts
│   │   ├── health.ts
│   │   └── skills/
│   │       ├── pixel.ts
│   │       └── pixel/download.ts
│   └── mcp/
│       ├── prompts/
│       │   ├── create-design-to-pixel.ts
│       │   └── implement-figma-to-pixel.ts
│       ├── resources/
│       │   ├── component.ts
│       │   ├── docs.ts
│       │   ├── patterns.ts
│       │   ├── templates.ts
│       │   ├── token21.ts
│       │   └── token24.ts
│       ├── tools/
│       │   ├── get-component.ts
│       │   ├── get-docs.ts
│       │   ├── get-pattern.ts
│       │   ├── get-template.ts
│       │   └── hello-pixel.ts
│       └── utils/normalizeComponentName.ts
│
└── test/mcp.eval.ts
```

## Routes

- `/` — Home page
- `/chat` — Chat interface
- `/docs` — Docs page
- `/skills` — Skill info and download page
- `/result/test-0` to `/result/test-3` — Implementation examples

## API Endpoints

- `POST /api/chat`
- `GET /api/health`
- `GET /api/skills/pixel`
- `GET /api/skills/pixel/download`

## MCP Capabilities

### Tools

- `get-component`
- `get-docs`
- `get-pattern`
- `get-template`
- `hello-pixel`

### Resources

- `component`
- `docs`
- `patterns`
- `templates`
- `token21`
- `token24`

### Prompts

- `create-design-to-pixel`
- `implement-figma-to-pixel`

## Development Workflow

1. **Add pages** in `app/pages/` (file-based routing)
2. **Add components** in `app/components/`
3. **Add APIs** in `server/api/`
4. **Extend MCP** in `server/mcp/tools|resources|prompts`
5. **Use Pixel styles** via global `app/assets/css/pixel.css`

## Local Commands

```bash
pnpm install
pnpm dev
pnpm build
pnpm preview
pnpm eval
pnpm eval:ui
```

## Runtime Notes

- `ssr: false`
- Nitro preset: `netlify`
- MCP route: `/mcp`
- Dev server port: `3200`

## Skill References

Primary guides available in this repo:

- `.agents/skills/nuxt/SKILL.md`
- `.agents/skills/pixel/SKILL.md`
- `.agents/skills/mcp-builder/SKILL.md`
- `.agents/skills/web-design-guidelines/SKILL.md`

Public skill package files:

- `public/skills/pixel/SKILL.md`
- `public/skills/pixel/references/*`
