# Pixel Components Catalog

## Component Mapping

Map Figma elements to Pixel components for implementation:

| Figma Element  | Pixel Component             | Use Case                             |
| -------------- | --------------------------- | ------------------------------------ |
| Text/Heading   | `<MpText>`                  | All text and headings                |
| Icon           | `<MpIcon>`                  | Icons and visual indicators          |
| Button         | `<MpButton>`                | Primary, secondary, tertiary actions |
| Text Link      | `<MpTextlink>`              | Inline and standalone links          |
| Input Field    | `<MpInput>`                 | Text inputs, email, password fields  |
| Dropdown       | `<MpSelect>`                | Select dropdowns and pickers         |
| Checkbox/Radio | `<MpCheckbox>`, `<MpRadio>` | Boolean and option selection         |
| Modal/Dialog   | `<MpModal>`                 | Overlay dialogs and confirmations    |
| Drawer         | `<MpDrawer>`                | Side panels and navigation           |
| Flex Layout    | `<MpFlex>`                  | Flexible layouts with gap/align      |
| Box Layout     | `<Pixel.div>`               | Custom containers with tokens        |

## Common Usage Patterns

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

  <MpFlex align="center" gap="2">
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

## MCP Tools for Components

Use these MCP tools to get component documentation:

- `get-component` - Get detailed component API, props, events, and usage
- `get-docs` - Get general Pixel setup, installation, and design system docs

**Example usage:**

```
Use get-component for MpButton, MpInput, and MpModal
```
