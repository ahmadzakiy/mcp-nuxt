# Figma to Pixel Implementation Guide

**Purpose**: Convert Figma designs to Mekari Pixel3 components with pixel-perfect accuracy.

**Stack**: Nuxt 3 + TypeScript + `@mekari/pixel3`

---

## Quick Start Workflow

### 1. Analyze Figma Design

**If using MCP Tools:**

```
- Call Figma MCP tools `get_design_context` and `get_screenshot` to get design details
- Call Pixel MCP tools `get_docs` and `get_component` to get component suggestions
```

**Manual approach:**

- Inspect Figma layers and properties
- Note colors, spacing, typography, and layout structure
- Identify interactive elements (text, icon, button, input, modal)

### 2. Map to Pixel Components

| Figma Element  | Pixel Component             |
| -------------- | --------------------------- |
| Text/Heading   | `<MpText>`                  |
| Icon           | `<MpIcon>`                  |
| Button         | `<MpButton>`                |
| Text Link      | `<MpTextlink>`              |
| Input Field    | `<MpInput>`                 |
| Dropdown       | `<MpSelect>`                |
| Checkbox/Radio | `<MpCheckbox>`, `<MpRadio>` |
| Modal/Dialog   | `<MpModal>`                 |
| Drawer         | `<MpDrawer>`                |
| Flex Layout    | `<MpFlex>`                  |
| Box Layout     | `<Pixel.div>`               |
| Grid Layout    | `<Pixel.div>`               |

### 3. Apply Design Tokens

**Token Priority Order:**

1. **Design Token 2.4** (newest, preferred)
2. **Design Token 2.1** (fallback)
3. **Exact hex from Figma** (last resort)

**Enable Token 2.4:**

```vue
<script setup lang="ts">
import { usePixelTheme } from "@mekari/pixel3";

const { setNextTheme } = usePixelTheme();
setNextTheme(true); // Enable Design Token 2.4
</script>
```

---

## Design Token Reference

### Colors Usage

```vue
<!-- Text -->
<MpText>Default text color</MpText>
<MpText color="text.warning">Warning text color</MpText>
<MpText color="text.danger">Danger text color</MpText>

<!-- Background -->
<MpFlex bg="background.primary">Primary Background</MpFlex>
<MpFlex bg="background.surface">Surface Background</MpFlex>
```

### Spacing

Use semantic spacing props: `space.2`, `space.4`, `space.6`, `space.8`, `space.12`, `space.16`

```vue
<MpFlex gap="4" p="6">
  <!-- gap="4" = 16px, p="6" = 24px -->
</MpFlex>
```

### Typography

```vue
<MpText size="h1">Heading 1</MpText>
<MpText size="h2">Heading 2</MpText>
<MpText size="body">Body text</MpText>
<MpText size="caption">Small text</MpText>
```

---

## Styling Hierarchy (Strict)

Apply styles in this **exact order of preference**:

1. **Mekari Pixel CSS Props** (Primary Method)
   - Use props like `padding="4"`, `backgroundColor="background.surface"`, `gap="3"`
   - Example:
     ```vue
     <MpFlex gap="3" padding="4" backgroundColor="background.surface">
       Hello World
     </MpFlex>
     ```

2. **Mekari Pixel CSS Function** (Secondary Method for custom styles)
   - Use props like `marginTop="4"
   - Example:
     ```vue
     <MpButton :class="css({ marginTop: '4' })">
       Submit
     </MpButton>
     ```

3. **Design Tokens** (All Values)
   - All values **must** come from Design Token 2.4

4. **NEVER:**
   - Use CSS Function in `MpFlex` component or `Pixel.div`
   - Use CSS Popps for component that support CSS Props (MpButton, MpInput, etc)
   - Define custom CSS classes in `<style>` blocks
   - Use inline `style` attributes (e.g., `style="color: blue;"`)
   - Use hard-coded values (e.g., `#FFF`, `16px`, `blue`)

## Implementation Rules

### ✅ DO

- Prioritize Pixel components over HTML elements
- **Explicitly import** all Pixel components in `<script setup>`
- Use CSS props as primary styling method (for component that support CSS Props)
- Apply Design Token 2.4 semantic tokens exclusively
- Match Figma spacing and layout exactly
- Place `<template>` block **before** `<script setup>` block
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

---

## File Structure Rules

**CRITICAL**: In all `.vue` files, the `<template>` block **must** be defined first, before the `<script setup>` block.

```vue
<!-- ✅ Correct Order -->
<template>
  <!-- Template content -->
</template>

<script setup lang="ts">
// Script content
</script>

<!-- ❌ Wrong Order -->
<script setup lang="ts">
// This is incorrect!
</script>

<template>
  <!-- Template content -->
</template>
```

### Script Setup Order

Code within `<script setup lang="ts">` **must** follow this order:

1. Imports
2. Props (`defineProps`)
3. Emits (`defineEmits`)
4. Reactive state (`ref`, `reactive`)
5. Computed properties (`computed`)
6. Watchers (`watch`, `watchEffect`)
7. Lifecycle hooks (e.g., `onMounted`)
8. Functions (methods)

**Example:**

```vue
<script setup lang="ts">
// 1. Imports
import { ref, computed, onMounted } from "vue";
import { MpButton, MpInput } from "@mekari/pixel3";

// 2. Props
const props = defineProps<{
  title: string;
}>();

// 3. Emits
const emit = defineEmits<{
  submit: [value: string];
}>();

// 4. Reactive state
const inputValue = ref("");

// 5. Computed properties
const isValid = computed(() => inputValue.value.length > 0);

// 6. Watchers
watch(inputValue, (newVal) => {
  console.log("Input changed:", newVal);
});

// 7. Lifecycle hooks
onMounted(() => {
  console.log("Component mounted");
});

// 8. Functions
const onSubmit = () => {
  emit("submit", inputValue.value);
};
</script>
```

---

## Common Patterns

### Form with Validation

```vue
<template>
  <MpFlex direction="column" gap="4">
    <MpInput
      id="email"
      v-model="email"
      type="email"
      placeholder="name@company.com"
      :is-error="isError"
      is-required
    />
    <MpButton variant="primary" size="md" @click="onSubmit">Submit</MpButton>
  </MpFlex>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { MpInput, MpButton, MpFlex } from "@mekari/pixel3";

const email = ref("");
const isError = ref(false);

const onSubmit = () => {
  // Handle form submission
  console.log("Form submitted:", email.value);
};
</script>
```

### Card Layout

```vue
<template>
  <MpFlex direction="column" gap="4">
    <MpText size="h3" color="text.primary">Card Title</MpText>
    <MpText size="body" color="text.secondary">
      Card description text goes here
    </MpText>
    <MpButton variant="outline" size="sm" @click="onAction">Action</MpButton>
  </MpFlex>
</template>

<script setup lang="ts">
import { MpFlex, MpText, MpButton } from "@mekari/pixel3";

const onAction = () => {
  console.log("Action clicked");
};
</script>
```

### Modal Dialog

```vue
<template>
  <MpButton @click="onOpenModal">Open Modal</MpButton>

  <MpModal v-model="isOpen">
    <MpModalHeader title="Modal Title" />
    <MpModalContent>
      <MpText>Modal content goes here</MpText>
    </MpModalContent>
  </MpModal>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  MpModal,
  MpModalContent,
  MpModalHeader,
  MpButton,
  MpText
} from "@mekari/pixel3";

const isOpen = ref(false);

const onOpenModal = () => {
  isOpen.value = true;
};
</script>
```

### Icon with Text

```vue
<template>
  <MpButton left-icon="search" variant="primary" size="md" @click="onSearch">
    Search
  </MpButton>

  <MpFlex alignItems="center" gap="2">
    <MpIcon name="circular-add" />
    <MpText color="text.danger">Add Item</MpText>
  </MpFlex>
</template>

<script setup lang="ts">
import { MpButton, MpText, MpFlex, MpIcon } from "@mekari/pixel3";

const onSearch = () => {
  console.log("Search clicked");
};
</script>
```

---

## Resources

- **Documentation**: [docs.mekari.design](https://docs.mekari.design/)
- **Design Tokens 2.4**: [Design Token v2.4](https://docs.mekari.design/docs/design-token-v2-4.html)
- **Design Tokens 2.1**: [Design Token](https://docs.mekari.design/docs/design-token.html)
- **Components**: [Component Gallery](https://docs.mekari.design/components/accordion.html)

---

## Checklist

Before completing implementation:

- [ ] All UI elements from Figma are implemented
- [ ] Template block placed **before** script block
- [ ] Using Pixel components exclusively (no raw HTML)
- [ ] All Pixel components explicitly imported
- [ ] Styling uses utility props (no `<style>` blocks)
- [ ] Design tokens applied (no hardcoded values)
- [ ] Spacing matches Figma exactly
- [ ] Typography sizes match Figma
- [ ] Colors use Design Token 2.4 semantic tokens
- [ ] Icons imported from `@mekari/pixel3-icons`
- [ ] Mock event handlers added for all component events
- [ ] Mock data arrays added for data-driven components
- [ ] Accessibility attributes added (`aria-*`)
- [ ] Code follows TypeScript best practices
- [ ] Script setup follows proper code order
- [ ] Design Token 2.4 enabled with `setNextTheme(true)`
