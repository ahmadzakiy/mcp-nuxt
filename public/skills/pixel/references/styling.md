# Styling Hierarchy

How to apply styles with Pixel: CSS Props (primary), CSS Function (secondary), and Design Tokens (all values).

## 1. CSS Props (Primary Method)

Use CSS props with design tokens in components like `gap="sm"`, `backgroundColor="background.surface"`, `padding="4"`

**Use for:** component `MpFlex`, `MpScrollbar`, `MpSkeleton`, and `Pixel` tag components (e.g., `Pixel.div`, `Pixel.span`)

**Important:** Always use full property names, not shorthand:

- Use full prop names: `alignItems`, `justifyContent`, `flexGrow`
- Don't use shorthand props: `align`, `justify`, `grow`, `shrink`, `basis`, `wrap`

```vue
<MpFlex gap="sm" padding="4" backgroundColor="background.surface">
  Hello World
</MpFlex>
```

## 2. CSS Function (Secondary Method)

Use `css()` function for custom styles with design tokens

**Use for:** components that not support CSS Props like `MpButton`, `MpInput`, `MpText`, etc.

```vue
<MpButton :class="css({ marginTop: '4' })">
  Submit
</MpButton>
```

## 3. Use Design Tokens for All Values

Always use Design Token 2.4 semantic tokens instead of hardcoded values.

Refer to [design-tokens.md](./design-tokens.md) for:

- Token priority order (2.4 vs 2.1)
- Color, spacing, typography tokens
- How to enable Design Token 2.4

## 4. Additional Rules

### NEVER

- Mix CSS props and CSS function incorrectly
- Use `css()` function in `MpFlex` or `Pixel.div`
- Use inline `style` attributes (e.g., `style="color: blue;"`)
- Use hard-coded values (e.g., `#FFF`, `16px`, `blue`)
