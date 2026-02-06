import { z } from "zod";

const PROMPT_TEMPLATE = `You are an expert frontend engineer specializing in implementing Figma designs with the Mekari Pixel 3 design system.

## Stack
- Nuxt 3 + TypeScript + @mekari/pixel3
- Vue 3 Composition API with <script setup>

## Input Details
- **Figma Link**: {{figmaLink}}
- **Target Component**: {{componentName}}

---

## Step 1: Analyze Figma Design

1. Use Figma MCP tool #get_design_context and #get_screenshot to get design details
2. Extract node ID from URL (e.g., node-id=1-2 becomes 1:2)
3. Analyze visual hierarchy, layout, colors, typography, spacing
4. Identify all interactive elements and their states
5. {{componentValidation}}

## Step 2: Get Pixel 3 Component Documentation

1. {{componentDocStep1}}
2. {{componentDocStep2}}
3. Review component props, slots, events, and usage examples
4. Use #get-docs MCP tool for design tokens and additional context

## Step 3: Map Figma to Pixel 3 Components

| Figma Element | Pixel Component |
|--------------|-----------------|
| Text/Heading | \`<MpText>\` |
| Icon | \`<MpIcon>\` |
| Button | \`<MpButton>\` |
| Text Link | \`<MpTextlink>\` |
| Input Field | \`<MpInput>\` |
| Dropdown | \`<MpSelect>\` |
| Checkbox/Radio | \`<MpCheckbox>\`, \`<MpRadio>\` |
| Modal/Dialog | \`<MpModal>\` |
| Drawer | \`<MpDrawer>\` |
| Flex Layout | \`<MpFlex>\` |
| Box Layout | \`<Pixel.div>\` |

## Step 4: Apply Styling (STRICT HIERARCHY)

**CRITICAL: Follow this exact order of preference:**

### 1. Mekari Pixel CSS Props (PRIMARY METHOD)
Use component props like \`padding="4"\`, \`backgroundColor="background.surface"\`, \`gap="3"\`
**Use for:** MpFlex, Pixel.div, and other layout components that support CSS Props

\`\`\`vue
<MpFlex gap="3" padding="4" backgroundColor="background.surface">
  Hello World
</MpFlex>
\`\`\`

### 2. Mekari Pixel CSS Function (SECONDARY METHOD)
Use \`css()\` function for custom styles with design tokens
**Use for:** Components that DON'T support CSS Props (MpButton, MpInput, MpText, etc.)

\`\`\`vue
<MpButton :class="css({ marginTop: '4' })">
  Submit
</MpButton>
\`\`\`

### 3. Design Tokens (ALL VALUES)
**Token Priority Order:**
1. **Design Token 2.4** (newest, preferred)
2. **Design Token 2.1** (fallback)
3. **Exact hex from Figma** (last resort)

**Enable Token 2.4:**
\`\`\`typescript
import { usePixelTheme } from '@mekari/pixel3'
const { setNextTheme } = usePixelTheme()
setNextTheme(true) // Enable Design Token 2.4
\`\`\`

### 4. NEVER DO
- ❌ Use CSS Function in \`MpFlex\` component or \`Pixel.div\`
- ❌ Use CSS Props for components that support CSS Props (MpButton, MpInput, etc)
- ❌ Define custom CSS classes in \`<style>\` blocks
- ❌ Use inline \`style\` attributes (e.g., \`style="color: blue;"\`)
- ❌ Use hard-coded values (e.g., \`#FFF\`, \`16px\`, \`blue\`)
- ❌ Use \`borderTop\` (use \`borderTopWidth\` with \`borderTopStyle\` and \`borderColor\` instead)
- ❌ Use \`grow\` (use \`flexGrow\` instead)
- ❌ Use \`align\` (use \`alignItems\` or \`alignSelf\` instead)
- ❌ Use \`justify\` (use \`justifyItems\` or \`justifyContent\` instead)
## Step 5: Implementation Rules

### ✅ DO
- Prioritize Pixel components over HTML elements
- **Explicitly import** all Pixel components in \`<script setup>\`
- Use CSS props as primary styling method (for components that support CSS Props)
- Apply Design Token 2.4 semantic tokens exclusively
- Match Figma spacing and layout exactly
- Place \`<template>\` block **BEFORE** \`<script setup>\` block
- Add mock event handlers for all component events
- Add mock data arrays for data-driven components
- Enable accessibility with \`aria-*\` attributes

### ❌ DON'T
- Use raw HTML elements (\`<button>\`, \`<div>\`, \`<input>\`)
- Use \`<style>\` blocks or inline \`style\` attributes
- Hardcode colors (\`#FF0000\`, \`rgb(255,0,0)\`)
- Hardcode spacing (\`margin: 16px\`, \`padding: 24px\`)
- Add elements not present in Figma design
- Create custom components when Pixel equivalent exists
- Skip importing Pixel components

## Step 6: File Structure (CRITICAL)

### Vue SFC Order
\`\`\`vue
<!-- ✅ Correct Order -->
<template>
  <!-- Template content -->
</template>

<script setup lang="ts">
// Script content
</script>
\`\`\`

### Script Setup Order
Within \`<script setup lang="ts">\`, follow this order:
1. Imports
2. Props (\`defineProps\`)
3. Emits (\`defineEmits\`)
4. Reactive state (\`ref\`, \`reactive\`)
5. Computed properties (\`computed\`)
6. Watchers (\`watch\`, \`watchEffect\`)
7. Lifecycle hooks (e.g., \`onMounted\`)
8. Functions (methods)

**Example:**
\`\`\`typescript
// 1. Imports
import { ref, computed, onMounted } from 'vue'
import { MpButton, MpInput } from '@mekari/pixel3'

// 2. Props
const props = defineProps<{ title: string }>()

// 3. Emits
const emit = defineEmits<{ submit: [value: string] }>()

// 4. Reactive state
const inputValue = ref('')

// 5. Computed properties
const isValid = computed(() => inputValue.value.length > 0)

// 6. Watchers
watch(inputValue, (newVal) => console.log(newVal))

// 7. Lifecycle hooks
onMounted(() => console.log('Mounted'))

// 8. Functions
const onSubmit = () => emit('submit', inputValue.value)
\`\`\`

## Step 7: Design Tokens Reference

### Colors
\`\`\`vue
<MpText>Default text</MpText>
<MpText color="text.warning">Warning text</MpText>
<MpText color="text.danger">Danger text</MpText>
<MpFlex bg="background.primary">Primary Background</MpFlex>
\`\`\`

### Spacing
Use: \`space.2\`, \`space.4\`, \`space.6\`, \`space.8\`, \`space.12\`, \`space.16\`

\`\`\`vue
<MpFlex gap="4" p="6">
  <!-- gap="4" = 16px, p="6" = 24px -->
</MpFlex>
\`\`\`

### Typography
\`\`\`vue
<MpText size="h1">Heading 1</MpText>
<MpText size="h2">Heading 2</MpText>
<MpText size="body">Body text</MpText>
<MpText size="caption">Small text</MpText>
\`\`\`

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
- [ ] All UI elements from Figma implemented
- [ ] Template block placed **before** script block
- [ ] Using Pixel components exclusively (no raw HTML)
- [ ] All Pixel components explicitly imported
- [ ] Styling uses utility props (no \`<style>\` blocks)
- [ ] Design tokens applied (no hardcoded values)
- [ ] Spacing matches Figma exactly
- [ ] Typography sizes match Figma
- [ ] Colors use Design Token 2.4 semantic tokens
- [ ] Mock event handlers added for all component events
- [ ] Mock data arrays added for data-driven components
- [ ] Accessibility attributes added (\`aria-*\`)
- [ ] Code follows TypeScript best practices
- [ ] Script setup follows proper code order
- [ ] Design Token 2.4 enabled with \`setNextTheme(true)\`

---

Start by analyzing the Figma design using MCP tools, then gather Pixel 3 component documentation.`;

export default defineMcpPrompt({
  name: "implement-figma-to-pixel",
  title: "Implement Figma Design with Pixel 3",
  description:
    "Convert Figma design selection to Vue component code using Pixel 3 design system",

  inputSchema: {
    figmaLink: z
      .string()
      .describe(
        "Figma design link or node URL (e.g., https://figma.com/design/file-key/file-name?node-id=1-2)"
      ),
    componentName: z
      .string()
      .optional()
      .describe(
        "(Optional) Target Pixel 3 component name to implement (e.g., MpButton, MpCard, MpInput). If not provided, will be determined from Figma design"
      )
  },

  handler: async ({ figmaLink, componentName }) => {
    // Replace placeholders in template
    const promptText = PROMPT_TEMPLATE.replace("{{figmaLink}}", figmaLink)
      .replace(
        "{{componentName}}",
        componentName || "To be determined from Figma design"
      )
      .replace(
        "{{componentValidation}}",
        componentName
          ? "Validate design matches specified component type"
          : "Identify appropriate Pixel 3 components (buttons, inputs, modals, etc.)"
      )
      .replace(
        "{{componentDocStep1}}",
        componentName
          ? `Use #get-component MCP tool for \`${componentName}\``
          : "Identify needed Pixel 3 components from design"
      )
      .replace(
        "{{componentDocStep2}}",
        componentName
          ? ""
          : "Use #get-component MCP tool for each identified component"
      );

    return {
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: promptText
          }
        }
      ]
    };
  }
});
