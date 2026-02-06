---
name: pixel
description: Implement designs (Figma or general) using Mekari Pixel 3 design system to Vue 3 and Nuxt web applications.
metadata:
  author: UXE Team
  version: "1.0.8"
  source: https://docs.mekari.design/
---

Mekari Pixel 3 is a comprehensive design system for building consistent, accessible user interfaces in Vue.js applications. It provides a complete set of components, design tokens, and styling utilities following Mekari's design principles.

**Important:** Before implementing with Pixel, agents should check the project's `plugins/pixel.client.ts` to understand theme configuration (Design Token 2.1 vs 2.4) and available setup. If unclear, start by using the MCP tools (`get-docs`, `get-component`) to gather component documentation and design token information.

> This skill is based on Mekari Pixel 3, targeting Vue 3 Composition API with Nuxt integration.

# UXE: Design to Pixel 3 Implementation Guide

You are an expert design engineer specializing in implementing complex designs with the Mekari Pixel 3 design system.

## Stack

- Nuxt 3 + TypeScript + @mekari/pixel3
- Vue 3 Composition API with <script setup>

## Core Topics

| Topic             | Description                                            | Reference                                      |
| ----------------- | ------------------------------------------------------ | ---------------------------------------------- |
| Styling Hierarchy | CSS Props, CSS Function, and Design Tokens usage rules | [styling](references/styling.md)               |
| Components        | Pixel component catalog and usage patterns             | [components](references/components.md)         |
| Design Tokens     | Color, spacing, and typography token system            | [design-tokens](references/design-tokens.md)   |
| File Structure    | Vue SFC organization and script setup order            | [file-structure](references/file-structure.md) |

---

## Step 1: Analyze Design

### For Figma Designs (Recommended)

**Use Figma MCP tools to extract design details:**

1. **Extract node ID** from Figma URL
   - Format: `https://figma.com/design/file-key?node-id=1-2` → Node ID: `1:2`
   - Replace hyphens with colons: `1-2` becomes `1:2`

2. **Use Figma MCP tools:**
   - `get_design_context(nodeId: "1:2")` - Get structured design data
   - `get_screenshot(nodeId: "1:2")` - Get visual reference

3. **Analyze design details:**
   - Visual hierarchy and layout structure
   - Colors, typography, spacing values
   - Interactive elements and their states
   - Responsive behavior

> For complete Figma-to-code workflow, use the **figma-implement-design** skill.

### For General Designs (Manual Analysis)

1. Analyze the design requested (ex: create a login form)
2. Analyze visual hierarchy, layout, colors, typography, spacing
3. Identify all components needed to implement the design (ex: buttons, inputs, modals, etc.)

## Step 2: Get Pixel 3 Component Documentation

1. Use #get-docs MCP tool for setup Pixel design system if needed (ex: installation, theme setup, etc.)
2. Use #get-component MCP tool for each identified component (ex: buttons, inputs, modals, etc.)
3. Use #get-docs MCP tool for design tokens and additional context (ex: colors, spacing, typography, etc.)

## Step 3: Map Design to Pixel 3 Components

Map design elements to appropriate Pixel components:

| Design Element | Pixel Component             | Notes                                           |
| -------------- | --------------------------- | ----------------------------------------------- |
| Text/Heading   | `<MpText>`                  | Use size prop: h1, h2, h3, body, caption        |
| Icon           | `<MpIcon>`                  | Use name prop for icon identifier               |
| Button         | `<MpButton>`                | Variants: primary, secondary, tertiary, outline |
| Text Link      | `<MpTextlink>`              | For inline and standalone links                 |
| Input Field    | `<MpInput>`                 | Supports text, email, password types            |
| Dropdown       | `<MpSelect>`                | For select/dropdown menus                       |
| Checkbox/Radio | `<MpCheckbox>`, `<MpRadio>` | Boolean and option selection                    |
| Modal/Dialog   | `<MpModal>`                 | Overlay dialogs with header/content             |
| Drawer         | `<MpDrawer>`                | Side panels and navigation                      |
| Flex Layout    | `<MpFlex>`                  | Flexible layouts with gap/alignItems/justifyContent |
| Box Layout     | `<Pixel.div>`               | Custom containers with design tokens            |

> **For Figma designs:** Use the **figma-implement-design** skill for detailed element identification and design extraction.

## Step 4: Apply Styling

Follow the styling hierarchy defined in [styling reference](references/styling.md):

1. **Pixel CSS Props** (primary for MpFlex, Pixel.div)
2. **Pixel CSS Function** (secondary for other components)
3. **Design Token 2.4** (all values must use semantic tokens)

Quick reference:

```vue
<!-- CSS Props for layouts -->
<MpFlex gap="3" padding="4" backgroundColor="background.surface">
  Content
</MpFlex>

<!-- CSS Function for components -->
<MpButton :class="css({ marginTop: '4' })">Submit</MpButton>
```

See [styling.md](references/styling.md) for complete rules and examples.

## Step 5: Implement Components

Use Pixel components exclusively. See [components reference](references/components.md) for:

- Component mapping table (Figma → Pixel)
- Common usage patterns (forms, cards, modals, icons)
- MCP tool usage for component docs

## Step 6: Apply Design Tokens

Use semantic tokens from Design Token 2.4. See [design-tokens reference](references/design-tokens.md) for:

- Color tokens (text, background, border)
- Spacing scale (space.2 to space.16)
- Typography sizes and weights

## Step 7: Follow File Structure

Organize Vue SFC files correctly. See [file-structure reference](references/file-structure.md) for:

- Vue SFC block order (template first!)
- Script setup code organization
- TypeScript best practices

---

## Quick Reference

### Component Patterns

For complete examples, see [components.md](references/components.md)

**Form Pattern:**

```vue
<MpFlex direction="column" gap="4">
  <MpInput v-model="value" :is-error="isError" />
  <MpButton variant="primary" @click="onSubmit">Submit</MpButton>
</MpFlex>
```

**Card Pattern:**

```vue
<MpFlex direction="column" gap="4">
  <MpText size="h3">Title</MpText>
  <MpText size="body">Description</MpText>
  <MpButton variant="outline" size="sm">Action</MpButton>
</MpFlex>
```

**Note:** Always use full property names: `alignItems`, `justifyContent`, `flexGrow`, etc. Never use shorthand props like `align`, `justify`, `grow`.

**Modal Pattern:**

```vue
<MpModal v-model="isOpen">
  <MpModalHeader title="Title" />
  <MpModalContent>Content</MpModalContent>
</MpModal>
```

---

## Output Format

Provide complete implementation with:

1. **Vue Component Code** (following file structure rules)
2. **Pixel Components Used** (list all imported components)
3. **Design Tokens Applied** (colors, spacing, typography used)
4. **Props & Events** (TypeScript interfaces)
5. **Usage Example** (how to use the component)
6. **Implementation Notes** (decisions, assumptions, limitations)

## Implementation Checklist

Before completing:

- [ ] Design analyzed (Figma MCP tools used if applicable)
- [ ] All UI elements identified and mapped to Pixel components
- [ ] Template block placed **before** script block
- [ ] Using Pixel components exclusively (no raw HTML)
- [ ] All Pixel components explicitly imported
- [ ] Styling uses CSS Props/Function hierarchy correctly
- [ ] Design tokens applied (no hardcoded values)
- [ ] Spacing matches design (mapped to space tokens)
- [ ] Typography matches design (mapped to size/weight)
- [ ] Colors use Design Token 2.4 semantic tokens
- [ ] Mock event handlers added for all component events
- [ ] Mock data arrays added for data-driven components
- [ ] Accessibility attributes added (`aria-*`)
- [ ] Code follows TypeScript best practices
- [ ] Script setup follows proper code order
- [ ] Design Token 2.4 enabled with `setNextTheme(true)`
- [ ] Visual verification against design (Figma screenshot if available)

---

## MCP Tools Reference

### Pixel MCP Tools

- `get-component` - Get Pixel component documentation and API
- `get-docs` - Get Pixel setup, tokens, and general docs

### Figma MCP Tools (if working with Figma designs)

- `get_design_context` - Extract structured design data from Figma
- `get_screenshot` - Get visual reference from Figma node
- `get_metadata` - Get high-level node map for large designs

See [figma-integration.md](references/figma-integration.md) for complete Figma workflow.

---

Start by analyzing the design (use Figma MCP tools if available), then gather Pixel 3 component documentation.
