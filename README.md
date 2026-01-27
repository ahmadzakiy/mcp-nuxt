# Mekari Pixel 3 + MCP Server

A **Nuxt 4 application** with **Mekari Pixel 3 design system** and an integrated **MCP (Model Context Protocol) server** for AI-assisted Figma-to-Pixel component implementation and documentation.

## Tech Stack

- **Nuxt 4** - Latest Vue 3 framework
- **TypeScript** - Type safety
- **@mekari/pixel3** - Mekari Pixel 3 design system
- **MCP Server** - AI-powered documentation and component tools
- **pnpm** - Package manager

## Features

### Nuxt 4 Application

- Modern Vue 3 framework with auto-routing
- Server-side API endpoints
- Type-safe development with TypeScript

### Pixel 3 Integration

- Pre-configured Pixel 3 design system with Design Token 2.4
- Vue 3 Composition API with `<script setup>`
- CSS Props and CSS Function styling support
- Comprehensive component library

### MCP Server Integration

- Custom tools for Pixel component documentation
- Resources for design tokens and implementation guides
- Prompts for Figma-to-Pixel conversion workflow

### Application Pages

- `/` - Home page
- `/chat` - Interactive chat interface
- `/docs` - Documentation viewer
- `/result` - Implementation results display

### MCP Tools for AI Assistants

#### `get-component`

Retrieves Pixel component documentation from `llms-components.txt`.

**Parameters:**

- `componentName` (string): Component name (e.g., "Button", "MpButton", "mp-button")

**Example:**

```json
{ "componentName": "Button" }
```

#### `get-docs`

Retrieves Pixel documentation, answers questions about setup, design tokens, and usage.

**Parameters:**

- `query` (string): Search query (e.g., "how to setup Pixel", "dark mode", "token 2.4")

**Example:**

```json
{ "query": "difference between token 2.1 and 2.4" }
```

#### `get-weather`

Example tool for testing MCP integration (gets current weather for a city).

**Parameters:**

- `city` (string): City name

#### `hello-pixel`

Simple test tool to verify MCP connection.

**Parameters:**

- `name` (string): Name to greet

### MCP Resources

Documentation files in `public/`:

- `llms-components.txt` - Pixel component documentation
- `llms-design-tokens-21.txt` - Design Token 2.1 reference
- `llms-design-tokens-24.txt` - Design Token 2.4 reference
- `llms-docs.txt` - General Pixel documentation

### MCP Prompts

Guided workflows in `server/mcp/prompts/`:

- `implement-figma-to-pixel.ts` - Step-by-step Figma design implementation

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
│       ├── resources/            # MCP resources
│       ├── tools/                # MCP tool implementations
│       └── utils/                # Utility functions
│
├── public/                       # Static files & documentation
│   ├── llms-components.txt       # Pixel components documentation
│   ├── llms-design-tokens-21.txt # Design Token 2.1
│   ├── llms-design-tokens-24.txt # Design Token 2.4
│   ├── llms-docs.txt             # General documentation
│   └── templates/                # Code templates
│
├── test/                         # Test files
│   └── mcp.eval.ts               # MCP evaluation tests
│
├── AGENTS.md                     # AI agent implementation guides
└── nuxt.config.ts                # Nuxt configuration
```

## Setup

Install dependencies using pnpm:

```bash
pnpm install
```

## Development

Start the development server on `http://localhost:3200`:

```bash
pnpm dev
```

The application will be available at:

- Frontend: `http://localhost:3200`
- API endpoints: `http://localhost:3200/api/*`
- MCP server: integrated with the Nuxt server

## Production

Build for production:

```bash
pnpm build
```

Preview production build locally:

```bash
pnpm preview
```

## Netlify Deployment

This project is configured for deployment on Netlify with the Nitro Netlify preset.

### Deployment Steps

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Netlify will automatically detect the configuration from `netlify.toml` and deploy your application

Netlify will:

- Use the build command: `pnpm build`
- Deploy static assets from `dist/`
- Deploy serverless functions from `.netlify/functions-internal/` (including MCP endpoints)
- Use Node.js 20 as specified in `netlify.toml`

The MCP server endpoints will be available at `/mcp` in production, just as in development.

## Usage with AI Assistants

This MCP server can be used with AI assistants (like GitHub Copilot, Claude) to:

1. **Get component documentation** - Quick access to Pixel 3 component APIs
2. **Understand design tokens** - Learn about Design Token 2.1 vs 2.4
3. **Convert Figma to Pixel** - Guided workflow for implementing designs
4. **Learn best practices** - Styling with CSS Props, component patterns, accessibility

## Documentation

See [AGENTS.md](AGENTS.md) for comprehensive guides:

- **Application Overview** - Project structure and development workflow
- **Mekari Pixel Implementation Guide** - Step-by-step guide for implementing Figma designs with Pixel components

## API Endpoints

- `POST /api/chat` - Chat functionality
- `GET /api/health` - Health check endpoint
