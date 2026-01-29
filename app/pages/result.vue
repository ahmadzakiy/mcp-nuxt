<template>
  <MpFlex direction="column" backgroundColor="background.surface" width="100%" height="100vh">
    <!-- Header -->
    <MpFlex
      backgroundColor="background.stage"
      borderBottomWidth="1px"
      borderBottomStyle="solid"
      borderColor="border.default"
      height="56px"
      alignItems="center"
      justifyContent="space-between"
      paddingX="6"
      paddingY="3"
      flexShrink="0"
    >
      <!-- Left Content - Title -->
      <MpFlex flexGrow="1" alignItems="center">
        <MpText as="h1" size="h1">Create deal layout</MpText>
      </MpFlex>

      <!-- Center Content - Stepper -->
      <MpFlex alignItems="center" gap="4">
        <!-- Step 1: Fill layout details (Active) -->
        <MpFlex alignItems="center" gap="2">
          <MpIcon name="edit" variant="fill" color="background.brand.bold" size="sm" />
          <MpText weight="semiBold" color="text.default">Fill layout details</MpText>
        </MpFlex>

        <!-- Arrow separator -->
        <MpIcon name="arrows-right" color="text.secondary" size="sm" />

        <!-- Step 2: Set layout (Inactive) -->
        <MpFlex alignItems="center" gap="2">
          <MpIcon name="settings" color="text.secondary" size="sm" />
          <MpText color="text.secondary">Set layout</MpText>
        </MpFlex>
      </MpFlex>

      <!-- Right Content -->
      <MpFlex flexGrow="1" alignItems="center" justifyContent="flex-end" gap="3">
        <MpTextlink variant="primary" left-icon="help"> Learn how to create layout </MpTextlink>
        <MpButton variant="ghost" left-icon="close" aria-label="Close" @click="handleClose" />
      </MpFlex>
    </MpFlex>

    <!-- Main Content Container -->
    <MpFlex flexGrow="1" width="100%">
      <!-- Stage/Form Area -->
      <MpFlex
        backgroundColor="background.stage"
        borderRightWidth="1px"
        borderRightStyle="solid"
        borderColor="border.default"
        direction="column"
        gap="6"
        alignItems="center"
        justifyContent="center"
        paddingX="118px"
        width="707px"
        flexShrink="0"
      >
        <!-- Header Section -->
        <MpFlex direction="column" width="100%">
          <MpText as="h2" size="h2" color="text.default">Fill layout details</MpText>
          <MpText color="text.secondary">
            Customize field order, visibility, and required status to match your layout needs.
          </MpText>
        </MpFlex>

        <!-- Form Group -->
        <MpFlex direction="column" width="100%" gap="0">
          <!-- Layout Name Input -->
          <MpFlex direction="column" gap="1" width="100%">
            <MpFlex alignItems="center" justifyContent="space-between" width="100%">
              <MpFlex gap="0">
                <MpText weight="semiBold" color="text.default">Layout name</MpText>
                <MpText color="text.danger">*</MpText>
              </MpFlex>
              <MpText size="label-small" color="text.secondary">{{ layoutName.length }}/60</MpText>
            </MpFlex>
            <MpInput
              id="layout-name"
              v-model="layoutName"
              placeholder="Enter layout name"
              is-full-width
              :maxlength="60"
              aria-label="Layout name"
              aria-required="true"
              @input="handleLayoutNameInput"
            />
            <Pixel.div height="16px" />
          </MpFlex>

          <!-- Feature Select (Disabled) -->
          <MpFlex direction="column" gap="1" width="100%">
            <MpFlex gap="0">
              <MpText weight="semiBold" color="text.default">Feature</MpText>
              <MpText color="text.danger">*</MpText>
            </MpFlex>
            <MpSelect
              id="feature-select"
              v-model="selectedFeature"
              is-full-width
              is-disabled
              aria-label="Feature"
              aria-required="true"
            >
              <option value="deals">Deals</option>
            </MpSelect>
            <Pixel.div height="16px" />
          </MpFlex>

          <!-- Pipeline Select -->
          <MpFlex direction="column" gap="1" width="100%">
            <MpFlex gap="0">
              <MpText weight="semiBold" color="text.default">Pipeline</MpText>
              <MpText color="text.danger">*</MpText>
            </MpFlex>
            <MpSelect
              id="pipeline-select"
              v-model="selectedPipeline"
              is-full-width
              aria-label="Pipeline"
              aria-required="true"
              @change="handlePipelineChange"
            >
              <option value="">Select pipeline</option>
              <option
                v-for="pipeline in pipelineOptions"
                :key="pipeline.value"
                :value="pipeline.value"
              >
                {{ pipeline.label }}
              </option>
            </MpSelect>
            <Pixel.div height="16px" />
          </MpFlex>

          <!-- Teams Select with Tags -->
          <MpFlex direction="column" gap="1" width="100%">
            <MpFlex gap="0">
              <MpText weight="semiBold" color="text.default">Teams</MpText>
              <MpText color="text.danger">*</MpText>
            </MpFlex>
            <MpAutocomplete
              id="teams-select"
              v-model="selectedTeams"
              :data="teamOptions"
              label-prop="label"
              value-prop="value"
              is-full-width
              is-searchable
              is-clearable
              placeholder="Select teams"
              aria-label="Teams"
              aria-required="true"
              @change="handleTeamsChange"
            />
            <!-- Display selected teams as tags -->
            <MpFlex v-if="selectedTeamsList.length > 0" gap="1" flexWrap="wrap" marginTop="2">
              <MpTag
                v-for="team in displayedTeams"
                :key="team.value"
                :id="`team-tag-${team.value}`"
                size="sm"
              >
                {{ team.label }}
              </MpTag>
              <MpTextlink v-if="remainingTeamsCount > 0" variant="primary">
                &amp; {{ remainingTeamsCount }} more
              </MpTextlink>
            </MpFlex>
            <MpText size="label-small" color="text.secondary">
              Available teams depend on their permissions for the selected pipeline
            </MpText>
            <Pixel.div height="16px" />
          </MpFlex>
        </MpFlex>
      </MpFlex>

      <!-- Right Panel (Surface background) -->
      <MpFlex backgroundColor="background.surface" flexGrow="1" />
    </MpFlex>

    <!-- Footer Action Group -->
    <MpFlex
      backgroundColor="background.stage"
      borderTopWidth="1px"
      borderTopStyle="solid"
      borderColor="border.default"
      alignItems="center"
      paddingX="6"
      paddingY="4"
      flexShrink="0"
    >
      <MpFlex flexGrow="1" justifyContent="flex-end" gap="3">
        <MpButton variant="primary" aria-label="Continue to next step" @click="handleContinue">
          Continue
        </MpButton>
      </MpFlex>
    </MpFlex>
  </MpFlex>
</template>

<script setup lang="ts">
  // 1. Imports
  import { ref, computed, onMounted } from 'vue'
  import {
    MpFlex,
    MpText,
    MpButton,
    MpIcon,
    MpInput,
    MpSelect,
    MpTextlink,
    MpTag,
    MpAutocomplete,
    Pixel
  } from '@mekari/pixel3'
  import { usePixelTheme } from '@mekari/pixel3'

  // 4. Reactive state
  const layoutName = ref('TS Jabodetabekkajur view')
  const selectedFeature = ref('deals')
  const selectedPipeline = ref('support-pipeline')
  const selectedTeams = ref('')

  // Mock data for pipeline options
  const pipelineOptions = ref([
    { value: 'support-pipeline', label: 'Support pipeline' },
    { value: 'sales-pipeline', label: 'Sales pipeline' },
    { value: 'marketing-pipeline', label: 'Marketing pipeline' }
  ])

  // Mock data for team options
  const teamOptions = ref([
    { value: 'jakarta', label: 'Jakarta' },
    { value: 'bogor', label: 'Bogor' },
    { value: 'depok', label: 'Depok' },
    { value: 'tangerang', label: 'Tangerang' },
    { value: 'bekasi', label: 'Bekasi' },
    { value: 'karawang', label: 'Karawang' },
    { value: 'cianjur', label: 'Cianjur' }
  ])

  // Mock selected teams list (pre-selected for demo)
  const selectedTeamsList = ref([
    { value: 'jakarta', label: 'Jakarta' },
    { value: 'bogor', label: 'Bogor' },
    { value: 'depok', label: 'Depok' },
    { value: 'tangerang', label: 'Tangerang' },
    { value: 'bekasi', label: 'Bekasi' },
    { value: 'karawang', label: 'Karawang' },
    { value: 'cianjur', label: 'Cianjur' }
  ])

  // 5. Computed properties
  const displayedTeams = computed(() => {
    return selectedTeamsList.value.slice(0, 5)
  })

  const remainingTeamsCount = computed(() => {
    return Math.max(0, selectedTeamsList.value.length - 5)
  })

  // 7. Lifecycle hooks
  onMounted(() => {
    // Enable Design Token 2.4
    const { setNextTheme } = usePixelTheme()
    setNextTheme(true)
  })

  // 8. Functions (Event handlers)
  const handleLayoutNameInput = (event: Event) => {
    const target = event.target as HTMLInputElement
    console.log('Layout name changed:', target.value)
  }

  const handlePipelineChange = (event: Event) => {
    const target = event.target as HTMLSelectElement
    console.log('Pipeline changed:', target.value)
  }

  const handleTeamsChange = (value: string) => {
    console.log('Teams changed:', value)
  }

  const handleContinue = () => {
    console.log('Continue clicked')
    console.log('Form data:', {
      layoutName: layoutName.value,
      feature: selectedFeature.value,
      pipeline: selectedPipeline.value,
      teams: selectedTeamsList.value
    })
  }

  const handleClose = () => {
    console.log('Close clicked')
  }
</script>
