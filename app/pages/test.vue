<template>
  <MpFlex direction="column" width="100%" minHeight="100vh" backgroundColor="background.surface">
    <!-- Header -->
    <MpFlex
      as="header"
      height="56px"
      paddingX="6"
      paddingY="3"
      backgroundColor="background.stage"
      borderBottomWidth="1px"
      borderBottomStyle="solid"
      borderColor="border.default"
      alignItems="center"
      justify="space-between"
    >
      <!-- Left: Title -->
      <MpText as="h1" size="h1" weight="semiBold">Create deal layout</MpText>

      <!-- Center: Stepper -->
      <MpFlex alignItems="center" gap="4">
        <!-- Step 1: Active -->
        <MpFlex alignItems="center" gap="2">
          <MpIcon name="edit" variant="fill" color="icon.brand" size="sm" />
          <MpText size="label" weight="semiBold">Fill layout details</MpText>
        </MpFlex>

        <!-- Separator -->
        <MpFlex width="14px" height="1px" backgroundColor="border.bold" />

        <!-- Step 2: Inactive -->
        <MpFlex alignItems="center" gap="2">
          <MpIcon name="settings" variant="outline" color="icon.default" size="sm" />
          <MpText size="label" color="text.secondary">Set layout</MpText>
        </MpFlex>
      </MpFlex>

      <!-- Right: Link and close button -->
      <MpFlex alignItems="center" gap="3">
        <MpTextlink variant="primary" left-icon="tips">
          Learn how to create layout
        </MpTextlink>
        <MpButton
          aria-label="Close"
          left-icon="close"
          variant="ghost"
          size="sm"
          :class="css({ padding: '1' })"
        />
      </MpFlex>
    </MpFlex>

    <!-- Main Content -->
    <MpFlex direction="row" flexGrow="1" width="100%">
      <!-- Form Section -->
      <MpFlex
        direction="column"
        width="707px"
        paddingX="118px"
        paddingY="6"
        backgroundColor="background.stage"
        borderRightWidth="1px"
        borderRightStyle="solid"
        borderColor="border.default"
        gap="6"
      >
        <!-- Section Header -->
        <MpFlex direction="column" gap="1">
          <MpText as="h2" size="h2" weight="semiBold">Fill layout details</MpText>
          <MpText size="label" color="text.secondary">
            Customize field order, visibility, and required status to match your layout needs.
          </MpText>
        </MpFlex>

        <!-- Form Fields -->
        <MpFlex direction="column" gap="0" width="100%">
          <!-- Layout Name Input -->
          <MpFlex direction="column" gap="1" width="100%">
            <MpFlex justify="space-between" alignItems="center">
              <MpFlex gap="0">
                <MpText size="label" weight="semiBold">Layout name</MpText>
                <MpText size="label" weight="semiBold" color="text.danger">*</MpText>
              </MpFlex>
              <MpText size="label-small" color="text.secondary">{{ layoutName.length }}/60</MpText>
            </MpFlex>
            <MpInput
              id="layout-name"
              v-model="layoutName"
              placeholder="Enter layout name"
              is-full-width
              maxlength="60"
            />
            <MpFlex height="16px" />
          </MpFlex>

          <!-- Feature Dropdown (Disabled) -->
          <MpFlex direction="column" gap="1" width="100%">
            <MpFlex gap="0">
              <MpText size="label" weight="semiBold">Feature</MpText>
              <MpText size="label" weight="semiBold" color="text.danger">*</MpText>
            </MpFlex>
            <MpSelect
              id="feature"
              v-model="feature"
              is-full-width
            >
              <option value="deals">Deals</option>
              <option value="deals">Ticket</option>
            </MpSelect>
            <MpFlex height="16px" />
          </MpFlex>

          <!-- Pipeline Dropdown -->
          <MpFlex direction="column" gap="1" width="100%">
            <MpFlex gap="0">
              <MpText size="label" weight="semiBold">Pipeline</MpText>
              <MpText size="label" weight="semiBold" color="text.danger">*</MpText>
            </MpFlex>
            <MpSelect
              id="pipeline"
              v-model="pipeline"
              placeholder="Select pipeline"
              is-full-width
            >
              <option value="sales">Sales Pipeline</option>
              <option value="support">Support Pipeline</option>
            </MpSelect>
            <MpFlex height="16px" />
          </MpFlex>

          <!-- Teams Dropdown -->
          <MpFlex direction="column" gap="1" width="100%">
            <MpFlex gap="0">
              <MpText size="label" weight="semiBold">Teams</MpText>
              <MpText size="label" weight="semiBold" color="text.danger">*</MpText>
            </MpFlex>
            <MpSelect
              id="teams"
              v-model="teams"
              placeholder="Select teams"
              is-full-width
            >
              <option value="team1">Team 1</option>
              <option value="team2">Team 2</option>
            </MpSelect>
            <MpText size="label-small" color="text.secondary" :class="css({ marginTop: '1' })">
              Available teams depend on their permissions for the selected pipeline
            </MpText>
            <MpFlex height="16px" />
          </MpFlex>
        </MpFlex>
      </MpFlex>

      <!-- Right Panel (Empty/Preview) -->
      <MpFlex flexGrow="1" backgroundColor="background.surface" />
    </MpFlex>

    <!-- Footer -->
    <MpFlex
      height="64px"
      paddingX="6"
      paddingY="4"
      backgroundColor="background.stage"
      borderTopWidth="1px"
      borderTopStyle="solid"
      borderColor="border.default"
      justifyContent="flex-end"
    >
      <MpButton
        variant="primary"
        :is-disabled="!isFormValid"
        @click="handleContinue"
      >
        Continue
      </MpButton>
    </MpFlex>
  </MpFlex>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  css,
  MpFlex,
  MpText,
  MpInput,
  MpSelect,
  MpButton,
  MpIcon,
  MpTextlink
} from '@mekari/pixel3'
import { usePixelTheme } from '@mekari/pixel3'

// Enable Design Token 2.4
const { isNextTheme, setNextTheme } = usePixelTheme()
setNextTheme(true)

// Form state
const layoutName = ref('')
const feature = ref('deals')
const pipeline = ref('')
const teams = ref('')

// Computed properties
const isFormValid = computed(() => {
  return layoutName.value.trim().length > 0 &&
    feature.value.length > 0 &&
    pipeline.value.length > 0 &&
    teams.value.length > 0
})

// Functions
const handleContinue = () => {
  if (isFormValid.value) {
    console.log('Form submitted:', {
      layoutName: layoutName.value,
      feature: feature.value,
      pipeline: pipeline.value,
      teams: teams.value
    })
  }
}
</script>