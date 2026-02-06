# Styling Hierarchy

**CRITICAL: Follow this exact order of preference:**

## 1. Mekari Pixel CSS Props (PRIMARY METHOD)

Use component props like `padding="4"`, `backgroundColor="background.surface"`, `gap="3"`

**Use for:** MpFlex, Pixel.div, and other layout components that support CSS Props

**Important:** Always use full property names, not shorthand:
- ✅ `alignItems`, `justifyContent`, `flexGrow`
- ❌ `align`, `justify`, `grow`

```vue
<MpFlex gap="3" padding="4" backgroundColor="background.surface">
  Hello World
</MpFlex>
```

## 2. Mekari Pixel CSS Function (SECONDARY METHOD)

Use `css()` function for custom styles with design tokens

**Use for:** Components that DON'T support CSS Props (MpButton, MpInput, MpText, etc.)

```vue
<MpButton :class="css({ marginTop: '4' })">
  Submit
</MpButton>
```

## 3. Design Tokens (ALL VALUES)

**Token Priority Order:**

1. **Design Token 2.4** (newest, preferred)
2. **Design Token 2.1** (fallback)
3. **Exact hex from Figma** (last resort)

**Enable Token 2.4:**

```typescript
import { usePixelTheme } from "@mekari/pixel3";
const { setNextTheme } = usePixelTheme();
setNextTheme(true); // Enable Design Token 2.4
```

## 4. NEVER DO

- ❌ Use CSS Function in `MpFlex` component or `Pixel.div`
- ❌ Use CSS Props for components that support CSS Props (MpButton, MpInput, etc)
- ❌ Define custom CSS classes in `<style>` blocks
- ❌ Use inline `style` attributes (e.g., `style="color: blue;"`)
- ❌ Use hard-coded values (e.g., `#FFF`, `16px`, `blue`)
- ❌ Use shorthand props: `align`, `justify`, `grow`, `shrink`, `basis`, `wrap`

**Always use full property names:**
- ✅ Use `alignItems` or `alignSelf` (never `align`)
- ✅ Use `justifyContent` or `justifyItems` (never `justify`)
- ✅ Use `flexGrow` (never `grow`)
- ✅ Use `flexShrink` (never `shrink`)
- ✅ Use `flexBasis` (never `basis`)
- ✅ Use `flexWrap` (never `wrap`)

## Implementation Rules

### ✅ DO

- Prioritize Pixel components over HTML elements
- **Explicitly import** all Pixel components in `<script setup>`
- Use CSS props as primary styling method (for components that support CSS Props)
- Apply Design Token 2.4 semantic tokens exclusively
- Match Figma spacing and layout exactly
- Place `<template>` block **BEFORE** `<script setup>` block
- Add mock event handlers for all component events
- Add mock data arrays for data-driven components
- Enable accessibility with `aria-*` attributes

### ❌ DON'T

- Use raw HTML elements (`<button>`, `<div>`, `<input>`)
- Use `<style>` blocks or inline `style` attributes
- Hardcode colors (`#FF0000`, `rgb(255,0,0)`)
- Hardcode spacing (`margin: 16px`, `padding: 24px`)
- Add elements not present in Figma design
- Create custom components when Pixel equivalent exists
- Skip importing Pixel components
