# Components Catalog

Complete reference of Pixel components with mapping from Figma elements and common usage patterns.

## 1. Component Mapping (if working with Figma designs)

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
| Flex Layout    | `<MpFlex>`                  | Flexible layouts with gap/alignItems |
| Box Layout     | `<Pixel.div>`               | Custom containers with tokens        |

## 2. Common Usage Patterns

### Form with Validation

```vue
<template>
  <MpFlex direction="column" gap="4">
    <MpFormControl id="email-input" :is-error="isError" is-required>
      <MpFormLabel>Email</MpFormLabel>
      <MpInput v-model="email" type="email" placeholder="name@company.com" />
      <MpFormErrorMessage>You must fill in email</MpFormErrorMessage>
      <MpFormHelpText>The email field is required</MpFormHelpText>
    </MpFormControl>
    <MpButton variant="primary" size="md" @click="onSubmit">Submit</MpButton>
  </MpFlex>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  MpButton,
  MpFlex,
  MpFormControl,
  MpFormLabel,
  MpFormHelpText,
  MpFormErrorMessage
  MpInput,
} from "@mekari/pixel3";

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
import { MpButton, MpFlex, MpText } from "@mekari/pixel3";

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
    <MpModalHeader>
      Modal title goes here

      <MpModalCloseButton />
    </MpModalHeader>
    <MpModalContent>
      <MpModalBody>
        <MpText>Modal content goes here</MpText>
      </MpModalBody>
      <MpModalFooter>
        <MpButtonGroup>
          <MpButton variant="secondary" @click="onClose"> Cancel </MpButton>
          <MpButton> Approve </MpButton>
        </MpButtonGroup>
      </MpModalFooter>
    </MpModalContent>
  </MpModal>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  MpButton,
  MpModal,
  MpModalContent,
  MpModalHeader,
  MpModalCloseButton,
  MpModalBody,
  MpModalFooter,
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
    <MpIcon name="delete" />
    <MpText color="text.danger">Delete item</MpText>
  </MpFlex>
</template>

<script setup lang="ts">
import { MpButton, MpFlex, MpIcon, MpText } from "@mekari/pixel3";

const onSearch = () => {
  console.log("Search clicked");
};
</script>
```

## 3. Additional Rules

### NEVER

- Use raw HTML elements (e.g., `<div>`, `<span>`, `<button>`) instead of Pixel components.
