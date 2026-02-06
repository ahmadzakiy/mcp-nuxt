# MCP Nuxt Application Overview

This document provides an overview of the MCP Nuxt application structure and development workflow.

> **For implementation guides:** See the `.agents/skills/` directory for specialized implementation guides (Figma, Pixel, Nuxt, etc.)

---

# Application Overview

## About This Application

This is a **Nuxt 4 application** integrated with **Model Context Protocol (MCP)** server that provides tools and resources for working with the **Mekari Pixel Design System**. The application serves as a development environment for implementing Figma designs using Pixel components.

## Tech Stack

- **Framework**: Nuxt 4 (Vue 3)
- **Design System**: Mekari Pixel 3 (`@mekari/pixel3`)
- **Package Manager**: pnpm
- **Type Safety**: TypeScript
- **MCP Integration**: Custom MCP server with tools and resources

## Project Structure

```
mcp-nuxt/
├── app/                          # Nuxt application
│   ├── app.vue                   # Root app component
│   ├── assets/css/               # Global styles
│   │   └── pixel.css             # Pixel design system styles
│   ├── components/               # Vue components
│   │   └── MarkdownRenderer.vue  # Markdown rendering component
│   ├── pages/                    # Nuxt pages (auto-routing)
│   │   ├── index.vue             # Home page
│   │   ├── chat.vue              # Chat interface
│   │   ├── docs.vue              # Documentation viewer
│   │   └── result.vue            # Results display
│   └── plugins/                  # Nuxt plugins
│       └── pixel.client.ts       # Pixel client setup
│
├── server/                       # Server-side code
│   ├── api/                      # API endpoints
│   │   ├── chat.ts               # Chat API
│   │   └── health.ts             # Health check
│   └── mcp/                      # MCP server implementation
│       ├── prompts/              # MCP prompts
│       │   └── implement-figma-to-pixel.ts
│       ├── resources/            # MCP resources
│       │   ├── component.ts      # Component resources
│       │   └── docs.ts           # Documentation resources
│       ├── tools/                # MCP tools
│       │   ├── get-component.ts  # Get Pixel component info
│       │   ├── get-docs.ts       # Get documentation
│       │   ├── get-weather.ts    # Example tool
│       │   └── hello-pixel.ts    # Test tool
│       └── utils/                # Utilities
│           └── normalizeComponentName.ts
│
├── public/                       # Static files
│   ├── llms-components.txt       # Pixel components documentation
│   ├── llms-design-tokens-21.txt # Design Token 2.1
│   ├── llms-design-tokens-24.txt # Design Token 2.4
│   ├── llms-docs.txt             # General documentation
│   └── templates/                # Code templates
│       └── implement-figma-to-pixel.md
│
└── test/                         # Test files
    └── mcp.eval.ts               # MCP evaluation tests
```

## Key Features

### 1. **MCP Server Integration**

- Custom MCP tools for Pixel components (`get-component`, `get-docs`)
- Resources for accessing documentation and component information
- Prompts for guided Figma-to-Pixel implementation

### 2. **Page Routes**

- `/` - Home/landing page
- `/chat` - Interactive chat interface
- `/docs` - Documentation browser
- `/result` - Display implementation results

### 3. **API Endpoints**

- `POST /api/chat` - Chat functionality
- `GET /api/health` - Health check endpoint

### 4. **Design System Resources**

- Pre-loaded Pixel component documentation
- Design Token 2.1 and 2.4 references
- Implementation templates

## Development Workflow

1. **Adding New Pages**: Create `.vue` files in `app/pages/` (auto-routing enabled)
2. **Adding Components**: Create reusable components in `app/components/`
3. **API Development**: Add endpoints in `server/api/`
4. **MCP Tools**: Extend MCP functionality in `server/mcp/tools/`
5. **Styling**: Use Pixel components with Design Token 2.4 (configured in `pixel.client.ts`)

## Environment Setup

- **Node.js**: Required for running the application
- **pnpm**: Package manager (install with `npm install -g pnpm`)
- **MCP Server**: Runs alongside Nuxt dev server

## Running the Application

```bash
# Install dependencies
pnpm install

# Development mode
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

---

## Implementation Guides

For specialized implementation guides, refer to the skills in the `.agents/skills/` directory:

- **`pixel`** - Implementing designs with Mekari Pixel 3 design system
- **`figma`** - Working with Figma MCP server
- **`figma-implement-design`** - Translating Figma designs to code
- **`nuxt`** - Nuxt full-stack framework development
- **`web-design-guidelines`** - UI/UX best practices and accessibility

Each skill contains detailed workflows, best practices, and code examples for its specific domain.
