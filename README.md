# Mekari Pixel MCP

A **remote MCP (Model Context Protocol) server** hosted on Netlify, providing AI assistants with access to **Mekari Pixel 3 design system** documentation, tools, and implementation guides. Built with **Nuxt 4** and the **Pixel 3 design system**.

🔗 **Live Demo:** https://pixel-mcp.netlify.app

## What is This?

Mekari Pixel MCP is a remote MCP server that enables AI assistants (Claude Desktop, VS Code Copilot, Cursor) to access Pixel component documentation and implementation guides. Unlike local MCP servers, it's hosted on the internet and requires no local installation.

## Tech Stack

- **Nuxt 4** - Full-stack Vue 3 framework
- **TypeScript** - Type safety
- **@mekari/pixel3** - Mekari Pixel 3 design system with Design Token 2.4
- **MCP Toolkit** - Model Context Protocol implementation
- **pnpm** - Package manager
- **Netlify** - Serverless deployment

## Features

### 🌐 Remote MCP Server

- HTTP-based MCP server accessible from anywhere
- No local installation required
- Tools, resources, and prompts for Pixel development
- Integrated with AI assistants (Claude Desktop, VS Code, Cursor)

### 🎨 Pixel 3 Design System

- Pre-configured with Design Token 2.4
- Vue 3 Composition API with `<script setup>`
- CSS Props and CSS Function styling hierarchy
- Complete component library documentation

### 📚 Agent Skills

- Downloadable Pixel skill for AI agents
- Comprehensive implementation guides
- Component mapping and best practices
- Figma-to-code workflow integration

### 📄 Application Pages

- `/` - Home page with MCP setup instructions
- `/chat` - Interactive AI chat interface
- `/skills` - Agent Skills documentation and download
- `/docs` - Documentation viewer (coming soon)
- `/result/*` - Implementation examples

### 🛠️ MCP Tools

AI assistants can use these tools when connected to the MCP server:

#### `get-component`

Retrieves detailed Pixel component documentation including props, slots, events, and usage examples.

**Parameters:**

- `componentName` (string): Component name (e.g., "Button", "MpButton", "mp-button")

**Example usage:**

```
"Get MpButton component documentation"
```

#### `get-docs`

Answers questions about Pixel setup, component usage, design tokens (v2.1 vs v2.4), and implementation guides.

**Parameters:**

- `query` (string): Search query

**Example usage:**

```
"How to setup Pixel?"
"Difference between token 2.1 and 2.4"
"How to use dark mode?"
```

#### `hello-pixel`

Simple test tool to verify MCP server connection.

**Parameters:**

- `name` (string): Name to greet

**Example usage:**

```
"Hello Pixel, I'm testing the connection"
```

### MCP Resources

Documentation files in `public/`:

- `llms-components.txt` - Pixel component documentation
- `llms-design-tokens-21.txt` - Design Token 2.1 reference
- `llms-design-tokens-24.txt` - Design Token 2.4 reference
- `llms-docs.txt` - General Pixel documentation

### MCP Prompts

Guided workflows in `server/mcp/prompts/`:

- `i💡 MCP Prompts

Pre-built workflows that guide AI assistants through complex tasks:

#### `/implement-figma-to-pixel`

Comp.agents/ # Agent Skills directory
│ └── skills/ # Installed agent skills
│ ├── pixel/ # Pixel implementation skill
│ ├── figma/ # Figma MCP integration skill
│ ├── frontend-design/ # Frontend design best practices
│ ├── nuxt/ # Nuxt development skill
│ └── web-design-guidelines/ # UI/UX guidelines
│
├── app/ # Nuxt 4 application
│ ├── app.vue # Root app component
│ ├── assets/css/ # Global styles
│ │ └── pixel.css # Pixel design system styles
│ ├── components/ # Vue components
│ │ ├── AppHeader.vue # Global header
│ │ ├── AppFooter.vue # Global footer
│ │ ├── ButtonAddMcp.vue # MCP configuration helper
│ │ └── MarkdownRenderer.vue # Markdown renderer
│ ├── pages/ # Nuxt pages (auto-routing)
│ │ ├── index.vue # Home page
│ │ ├── chat.vue # AI chat interface
│ │ ├── skills.vue # Agent Skills info & download
│ │ ├── docs.vue # Documentation viewer
│ │ └── result/ # Implementation examples
│ │ ├── test-0.vue # Figma implementation example
│ │ ├── test-1.vue # Modal example
│ │ └── test-2.vue # Login form example
│ └── plugins/ # Nuxt plugins
│ └── pixel.client.ts # Pixel client setup (Token 2.4)
│
├── server/ # Nitro server
│ ├── api/ # API endpoints
│ │ ├── chat.ts # Chat API
│ │ ├── health.ts # Health check
│ │ └── skills/ # Skills API
│ │ └── pixel.ts # Pixel skill endpoint
│ │ └── pixel/download.ts # Skill download (ZIP)
│ └── mcp/ # MCP server implementation
│ ├── prompts/ # MCP prompts
│ │ ├── implement-figma-to-pixel.ts
│ │ └── create-design-to-pixel.ts
│ ├── resources/ # MCP resources
│ │ ├── component.ts # Component documentation
│ │ ├── docs.ts # General docs
│ │ ├── token21.ts # Design Token 2.1
│ │ └── token24.ts # Design Token 2.4
│ ├── tools/ # MCP tool implementations
│ │ ├── get-component.ts # Component info tool
│ │ ├── get-docs.ts # Documentation tool
│ │ └── hello-pixel.ts # Test tool
│ └── utils/ # Utilities
│ └── normalizeComponentName.ts
│
├── public/ # Static files served at /
│ ├── skills/ # Agent Skills (public access)
│ │ ├── pixel/ # Pixel skill files
│ │ │ ├── SKILL.md
│ │ │ └── references/ # Reference docs
│ ├── llms-components.txt # Pixel components LLM doc
│ ├── llms-design-tokens-21.txt # Token 2.1 LLM doc
│ ├── llms-design-tokens-24.txt # Token 2.4 LLM doc
│ └── llms-docs.txt # General LLM documentation
│
├── AGENTS.md # Agent/skill overview
├── nuxt.config.ts # Nuxt configuration
└── package.json # Dependencies
│ ├── resources/ # MCP resources
│ ├── tools/ # MCP tool implementations
│ └── utils/ # Utility functions
│
├── public/ # Static files & documentation
│ ├── llms-components.txt # Pixel components documentation
│ ├── llms-design-tokens-21.txt # Design Token 2.1
│ ├── llms-design-tokens-24.txt # Design Token 2.4
│ ├── llms-docs.txt # General documentation
│ └── templates/ # Code templates
│
├── test/ # Test files
│ └── mcp.eval.ts # MCP evaluation tests
│
├── AGENTS.md # AI agent implementation guides
└── nuxt.config.ts # Nuxt configuration

````

## Setup

Install dependencies using pnpm:

```bash
pnpDeployment

### Netlify (Recommended)

This project uses the Nitro Netlify preset for serverless deployment:

1. **Build Command:** `pnpm build`
2. **Publish Directory:** `dist/`
3. **Functions Directory:** `.netlify/functions-internal/`
4. **Node Version:** 20.x

The MCP server is automatically available at `/mcp` in production.

### Environment Variables

Configure in `nuxt.config.ts` via runtime config:

- `pixelMcpBaseUrl` - Base URL for Pixel MCP server
  - Development: `http://localhost:3200`
  - Production: `https://pixel-mcp.netlify.app`

### Manual Deployment

```bash
# Build for production
pnpm build

# Preview locally
pnpm preview

# Deploy to Netlify
netlify deploy --prod
````

BuiConnecting Your AI Assistant

### Visual Studio Code

Add to your `.vscode/mcp.json`:

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

### Cursor

Add to your `~/.cursor/mcp.json`:

````json
{
  "mcpServers": {
    "pixel3": {
      "type": "http",
      "url": "https://pixel-mcp.netlify.app/mcp"
- **[AGENTS.md](AGENTS.md)** - Application overview and implementation guides
- **[Agent Skills](/.agents/skills/)** - Specialized knowledge domains
  - `pixel` - Pixel implementation guide
  - `figma` - Figma MCP integration
  - `frontend-design` - UI/UX best practices
  - `nuxt` - Nuxt development
  - `web-design-guidelines` - Accessibility guidelines

## API Endpoints

### Public API

- `GET /api/health` - Health check endpoint
- `POST /api/chat` - AI chat functionality
- `GET /api/skills/pixel` - Get Pixel skill content
- `GET /api/skills/pixel/download` - Download Pixel skill as ZIP

### MCP Server

- `POST /mcp` - MCP server endpoint (tools, resources, prompts)

## Contributing

Contributions are welcome! Please read the [AGENTS.md](AGENTS.md) file for development guidelines.

## License

MIT License - see LICENSE file for details

## Links

- 🌐 [Live Demo](https://pixel-mcp.netlify.app)
- 📦 [GitHub Repository](https://github.com/ahmadzakiy/mcp-nuxt)
- 📚 [Pixel Design System](https://docs.mekari.design)
- 🔧 [MCP Protocol](https://modelcontextprotocol.io)
- 🎯 [Agent Skills](https://skills.sh)
```json
{
  "mcpServers": {
    "pixel3": {
      "type": "http",
      "url": "https://pixel-mcp.netlify.app/mcp"
    }
  }
}
````

## Installing Agent Skills

The Pixel skill provides comprehensive implementation guides that can be used by AI assistants:

```bash
# Install globally for your user
npx skills add https://github.com/ahmadzakiy/mcp-nuxt/.agents/skills/pixel -g

# Or download from the web interface
# Visit https://pixel-mcp.netlify.app/skills
```

## Usage Examples

Once connected, ask your AI assistant:

- "Get MpButton component documentation"
- "How to setup Pixel in my project?"
- "What's the difference between design token 2.1 and 2.4?"
- "/implement-figma-to-pixel https://figma.com/file/xyz"
- "/create-design-to-pixel a user profile card with avatar and edit button"

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
