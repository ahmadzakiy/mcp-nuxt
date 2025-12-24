# Mekari Pixel MCP Server

MCP (Model Context Protocol) server for Mekari Pixel component library documentation.

## Features

- **Get Component Documentation**: Retrieve detailed documentation for any Pixel component from `llms-components.txt`
- **Component Search**: Search by component name (e.g., "Accordion", "MpAccordion", "Button")
- **Complete Documentation**: Returns props, events, slots, and usage examples

## MCP Tools

### get-component

Retrieves component documentation and details from llms-components.txt.

**Parameters:**
- `componentName` (string): The name of the component (e.g., "Accordion", "MpAccordion", "Button")

**Example Usage:**
```json
{
  "componentName": "Accordion"
}
```

The tool will return complete documentation including props, events, slots, and usage examples for the requested component.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
