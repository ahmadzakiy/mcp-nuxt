<template>
  <MpFlex
    direction="column"
    width="100%"
    height="100vh"
    backgroundColor="background.surface"
  >
    <!-- Header -->
    <MpFlex
      as="header"
      alignItems="center"
      justifyContent="space-between"
      paddingX="6"
      paddingY="3"
      backgroundColor="background.stage"
      borderBottomWidth="1"
      borderBottomStyle="solid"
      borderColor="border.default"
      height="56px"
    >
      <!-- Left: Title -->
      <MpText as="h1" size="h1" weight="semiBold">
        Create deal layout
      </MpText>

      <!-- Center: Stepper -->
      <MpFlex alignItems="center" gap="4">
        <!-- Step 1: Fill layout details (Active) -->
        <MpFlex alignItems="center" gap="2">
          <MpIcon name="edit" variant="fill" color="text.link" size="sm" />
          <MpText size="label" weight="semiBold">
            Fill layout details
          </MpText>
        </MpFlex>

        <!-- Divider line -->
        <Pixel.div width="13.5px" height="1px" backgroundColor="border.subtle" />

        <!-- Step 2: Set layout (Inactive) -->
        <MpFlex alignItems="center" gap="2">
          <MpIcon name="settings" variant="outline" color="text.secondary" size="sm" />
          <MpText size="label" color="text.secondary">
            Set layout
          </MpText>
        </MpFlex>
      </MpFlex>

      <!-- Right: Learn link and close button -->
      <MpFlex alignItems="center" gap="3" justifyContent="flex-end">
        <MpTextlink
          variant="primary"
          left-icon="help"
          @click="handleLearnClick"
        >
          Learn how to create layout
        </MpTextlink>
        <MpButton
          variant="ghost"
          left-icon="close"
          aria-label="Close dialog"
          @click="handleClose"
        />
      </MpFlex>
    </MpFlex>

    <!-- Main Content -->
    <MpFlex flexGrow="1" width="100%" borderTopWidth="1" borderTopStyle="solid" borderColor="border.default">
      <MpFlex
        direction="column"
        width="707px"
        backgroundColor="background.stage"
        borderRightWidth="1"
        borderRightStyle="solid"
        borderColor="border.default"
        paddingX="30"
        paddingY="6"
        gap="6"
        justifyContent="center"
      >
        <!-- Section Header -->
        <Pixel.div>
          <MpText as="h2" size="h2" weight="semiBold" :class="css({ marginBottom: '1' })">
            Fill layout details
          </MpText>
          <MpText color="text.secondary">
            Customize field order, visibility, and required status to match your layout needs.
          </MpText>
        </Pixel.div>

        <!-- Form Fields -->
        <MpFlex direction="column" gap="4">
          <!-- Layout Name Input -->
          <Pixel.div>
            <MpFlex alignItems="center" justifyContent="space-between" :class="css({ marginBottom: '1' })">
              <MpFlex alignItems="center" gap="0">
                <MpText size="label" weight="semiBold">Layout name</MpText>
                <MpText color="text.danger">*</MpText>
              </MpFlex>
              <MpText size="label-small" color="text.secondary">
                {{ layoutName.length }}/60
              </MpText>
            </MpFlex>
            <MpInput
              id="layout-name"
              v-model="layoutName"
              placeholder="Enter layout name"
              is-full-width
              @input="handleLayoutNameInput"
            />
          </Pixel.div>

          <!-- Feature Select (Disabled) -->
          <Pixel.div>
            <MpFlex alignItems="center" gap="0" :class="css({ marginBottom: '1' })">
              <MpText size="label" weight="semiBold">Feature</MpText>
              <MpText color="text.danger">*</MpText>
            </MpFlex>
            <MpSelect
              id="feature"
              v-model="selectedFeature"
              is-disabled
              is-full-width
            >
              <option value="deals">Deals</option>
            </MpSelect>
          </Pixel.div>

          <!-- Pipeline Select -->
          <Pixel.div>
            <MpFlex alignItems="center" gap="0" :class="css({ marginBottom: '1' })">
              <MpText size="label" weight="semiBold">Pipeline</MpText>
              <MpText color="text.danger">*</MpText>
            </MpFlex>
            <MpSelect
              id="pipeline"
              v-model="selectedPipeline"
              is-full-width
              @change="handlePipelineChange"
            >
              <option value="">Select pipeline</option>
              <option value="support">Support pipeline</option>
              <option value="sales">Sales pipeline</option>
              <option value="marketing">Marketing pipeline</option>
            </MpSelect>
          </Pixel.div>

          <!-- Teams Select with Tags -->
          <Pixel.div>
            <MpFlex alignItems="center" gap="0" :class="css({ marginBottom: '1' })">
              <MpText size="label" weight="semiBold">Teams</MpText>
              <MpText color="text.danger">*</MpText>
            </MpFlex>
            
            <!-- Custom select-like display with tags -->
            <MpFlex
              direction="row"
              alignItems="center"
              gap="2"
              paddingLeft="2"
              paddingRight="3"
              paddingY="2"
              backgroundColor="background.neutral"
              borderWidth="1"
              borderStyle="solid"
              borderColor="border.form"
              borderRadius="6px"
              :class="css({ cursor: 'pointer' })"
              @click="handleTeamsClick"
            >
              <MpFlex flexWrap="wrap" gap="1" flexGrow="1" alignItems="center">
                <MpTag
                  v-for="team in displayedTeams"
                  :key="team"
                  :id="`tag-${team}`"
                  size="sm"
                >
                  {{ team }}
                </MpTag>
                <MpTextlink
                  v-if="remainingTeamsCount > 0"
                  variant="primary"
                  @click.stop="handleMoreTeamsClick"
                >
                  & {{ remainingTeamsCount }} more
                </MpTextlink>
              </MpFlex>
              <MpIcon name="chevrons-down" size="sm" color="text.secondary" />
            </MpFlex>
            
            <MpText size="label-small" color="text.secondary" :class="css({ marginTop: '1' })">
              Available teams depend on their permissions for the selected pipeline
            </MpText>
          </Pixel.div>
        </MpFlex>
      </MpFlex>

      <!-- Right side (empty preview area) -->
      <MpFlex flexGrow="1" backgroundColor="background.surface" />
    </MpFlex>

    <!-- Footer -->
    <MpFlex
      alignItems="center"
      justifyContent="flex-end"
      gap="3"
      paddingX="6"
      paddingY="4"
      backgroundColor="background.stage"
      borderTopWidth="1"
      borderTopStyle="solid"
      borderColor="border.default"
    >
      <MpButton variant="primary" @click="handleContinue">
        Continue
      </MpButton>
    </MpFlex>
  </MpFlex>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  css,
  MpButton,
  MpFlex,
  MpIcon,
  MpInput,
  MpSelect,
  MpTag,
  MpText,
  MpTextlink,
  Pixel
} from '@mekari/pixel3'
import { usePixelTheme } from '@mekari/pixel3'

// Enable Design Token 2.4
const { setNextTheme } = usePixelTheme()
setNextTheme(true)

// Reactive state
const layoutName = ref('TS Jabodetabekkajur view')
const selectedFeature = ref('deals')
const selectedPipeline = ref('support')
const selectedTeams = ref(['Jakarta', 'Bogor', 'Depok', 'Tangerang', 'Bekasi', 'Bandung', 'Surabaya'])

// Computed properties
const displayedTeams = computed(() => selectedTeams.value.slice(0, 5))
const remainingTeamsCount = computed(() => Math.max(0, selectedTeams.value.length - 5))

// Functions
const handleLayoutNameInput = () => {
  // Limit to 60 characters
  if (layoutName.value.length > 60) {
    layoutName.value = layoutName.value.slice(0, 60)
  }
}

const handlePipelineChange = () => {
  console.log('Pipeline changed to:', selectedPipeline.value)
}

const handleTeamsClick = () => {
  console.log('Teams selector clicked')
  // This would open a teams selection modal/dropdown
}

const handleMoreTeamsClick = () => {
  console.log('Show all teams clicked')
  // This would show all selected teams
}

const handleLearnClick = () => {
  console.log('Learn how to create layout clicked')
  window.open('https://docs.mekari.design/', '_blank')
}

const handleClose = () => {
  console.log('Close dialog clicked')
  // This would close the modal/dialog
}

const handleContinue = () => {
  console.log('Continue clicked with data:', {
    layoutName: layoutName.value,
    feature: selectedFeature.value,
    pipeline: selectedPipeline.value,
    teams: selectedTeams.value
  })
  // This would proceed to the next step
}
</script>