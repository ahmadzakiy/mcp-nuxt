# Design Tokens

Design tokens provide semantic values for colors, spacing, typography, and other design properties. Always prefer Design Token 2.4 over hardcoded values.

## Colors

### Text Colors

```vue
<MpText>Default text</MpText>
<MpText color="text.primary">Primary text</MpText>
<MpText color="text.secondary">Secondary text</MpText>
<MpText color="text.warning">Warning text</MpText>
<MpText color="text.danger">Danger text</MpText>
<MpText color="text.success">Success text</MpText>
```

### Background Colors

```vue
<MpFlex bg="background.primary">Primary Background</MpFlex>
<MpFlex bg="background.surface">Surface Background</MpFlex>
<MpFlex bg="background.secondary">Secondary Background</MpFlex>
```

### Border Colors

```vue
<Pixel.div borderColor="border.primary" borderWidth="1px" borderStyle="solid">
  Content with border
</Pixel.div>
```

## Spacing Scale

Use semantic spacing tokens instead of hardcoded pixel values:

| Token      | Value | Use Case                         |
| ---------- | ----- | -------------------------------- |
| `space.2`  | 8px   | Tight spacing, compact layouts   |
| `space.4`  | 16px  | Default spacing between elements |
| `space.6`  | 24px  | Section spacing                  |
| `space.8`  | 32px  | Large component spacing          |
| `space.12` | 48px  | Major section separation         |
| `space.16` | 64px  | Page-level spacing               |

### Usage Example

```vue
<MpFlex gap="4" p="6" m="8">
  <!-- gap="4" = 16px, padding="6" = 24px, margin="8" = 32px -->
  <MpText>Content</MpText>
</MpFlex>
```

## Typography

### Text Sizes

```vue
<!-- Headings -->
<MpText size="h1">Heading 1 - 32px</MpText>
<MpText size="h2">Heading 2 - 24px</MpText>
<MpText size="h3">Heading 3 - 20px</MpText>
<MpText size="h4">Heading 4 - 18px</MpText>

<!-- Body text -->
<MpText size="body">Body text - 14px</MpText>
<MpText size="body-lg">Large body - 16px</MpText>
<MpText size="body-sm">Small body - 12px</MpText>

<!-- Utility -->
<MpText size="caption">Caption - 12px</MpText>
<MpText size="overline">Overline - 10px</MpText>
```

### Font Weights

```vue
<MpText weight="regular">Regular - 400</MpText>
<MpText weight="medium">Medium - 500</MpText>
<MpText weight="semibold">Semibold - 600</MpText>
<MpText weight="bold">Bold - 700</MpText>
```

## Token Resources

- **Design Token 2.4**: Latest semantic tokens (preferred)
- **Design Token 2.1**: Legacy tokens (fallback)

Access token documentation via:

- MCP tool: `get-docs` with query "design tokens"
- Documentation: https://docs.mekari.design/docs/design-token-v2-4.html

## Enabling Design Token 2.4

```typescript
import { usePixelTheme } from "@mekari/pixel3";

const { setNextTheme } = usePixelTheme();
setNextTheme(true); // Enable Design Token 2.4
```
