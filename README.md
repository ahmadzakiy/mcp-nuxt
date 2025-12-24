# Mekari Pixel 3 + MCP Server

A Nuxt 3 application with Mekari Pixel 3 design system and an integrated MCP (Model Context Protocol) server for AI-assisted component documentation.

## Tech Stack

- **Nuxt 3** - Vue 3 framework
- **TypeScript** - Type safety
- **@mekari/pixel3** - Mekari Pixel 3 design system
- **MCP Server** - AI-powered documentation tools

## Features

### Pixel 3 Integration
- Pre-configured Pixel 3 design system with Design Token 2.4
- Vue 3 Composition API with `<script setup>`
- CSS Props and CSS Function styling support

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

#### `hello-pixel`
Simple test tool to verify MCP connection.

### MCP Resources

Located in `server/mcp/resources/`:
- `llms-components.txt` - Component documentation
- `llms-design-tokens-21.txt` - Design Token 2.1 reference
- `llms-design-tokens-24.txt` - Design Token 2.4 reference
- `llms-docs.txt` - General documentation

## Project Structure

```
├── app/
│   ├── assets/css/pixel.css    # Pixel CSS imports
│   ├── components/             # Vue components
│   ├── pages/                  # Nuxt pages
│   └── plugins/pixel.client.ts # Pixel plugin setup
├── server/
│   └── mcp/
│       ├── prompts/            # MCP prompts
│       ├── resources/          # Documentation files
│       ├── tools/              # MCP tool implementations
│       └── utils/              # Utility functions
└── nuxt.config.ts
```

## Setup

Install dependencies:

```bash
npm install
```

## Development

Start the development server on `http://localhost:3200`:

```bash
npm run dev
```

## Production

Build for production:

```bash
npm run build
```

**Note**: This project uses the Netlify preset, which is optimized for deployment on Netlify. For local testing, use the development server (`npm run dev`).

## Netlify Deployment

This project is configured for deployment on Netlify with the Nitro Netlify preset.

### Deployment Steps

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Netlify will automatically detect the configuration from `netlify.toml` and deploy your application

Netlify will:
- Use the build command: `npm run build`
- Deploy static assets from `dist/`
- Deploy serverless functions from `.netlify/functions-internal/` (including MCP endpoints)
- Use Node.js 20 as specified in `netlify.toml`

The MCP server endpoints will be available at `/mcp` in production, just as in development.

## Usage with AI Assistants

This MCP server can be used with AI assistants (like GitHub Copilot, Claude) to:

1. Get component documentation quickly
2. Understand Pixel 3 design tokens
3. Convert Figma designs to Pixel 3 components
4. Learn best practices for styling with CSS Props

See `figma-to-pixel-instructions.md` for detailed Figma-to-Pixel conversion guidelines.
