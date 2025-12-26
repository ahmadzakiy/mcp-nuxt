<template>
  <Pixel.div padding="8" backgroundColor="background.stage">
    <MpFlex direction="column" gap="8">
      <!-- Title -->
      <MpText size="h2" weight="semiBold" color="text.default">
        Split Button Component
      </MpText>

      <!-- Primary Variants -->
      <MpFlex direction="column" gap="4">
        <MpText size="body" weight="semiBold" color="text.default">
          Primary Variants
        </MpText>
        
        <!-- Primary - Default Size -->
        <MpButtonGroup is-split>
          <MpButton 
            variant="primary" 
            size="md"
            @click="handleMainAction"
          >
            Label
          </MpButton>
          <MpButton 
            variant="primary" 
            size="md"
            right-icon="chevrons-down"
            aria-label="More options"
            @click="handleDropdown"
          />
        </MpButtonGroup>

        <!-- Primary - Small Size -->
        <MpButtonGroup is-split>
          <MpButton 
            variant="primary" 
            size="sm"
            @click="handleMainAction"
          >
            Label
          </MpButton>
          <MpButton 
            variant="primary" 
            size="sm"
            right-icon="chevrons-down"
            aria-label="More options"
            @click="handleDropdown"
          />
        </MpButtonGroup>
      </MpFlex>

      <!-- Secondary Variants -->
      <MpFlex direction="column" gap="4">
        <MpText size="body" weight="semiBold" color="text.default">
          Secondary Variants
        </MpText>
        
        <!-- Secondary - Default Size -->
        <MpButtonGroup is-split>
          <MpButton 
            variant="secondary" 
            size="md"
            @click="handleMainAction"
          >
            Label
          </MpButton>
          <MpButton 
            variant="secondary" 
            size="md"
            right-icon="chevrons-down"
            aria-label="More options"
            @click="handleDropdown"
          />
        </MpButtonGroup>

        <!-- Secondary - Small Size -->
        <MpButtonGroup is-split>
          <MpButton 
            variant="secondary" 
            size="sm"
            @click="handleMainAction"
          >
            Label
          </MpButton>
          <MpButton 
            variant="secondary" 
            size="sm"
            right-icon="chevrons-down"
            aria-label="More options"
            @click="handleDropdown"
          />
        </MpButtonGroup>
      </MpFlex>

      <!-- Interactive Example -->
      <MpFlex direction="column" gap="4">
        <MpText size="body" weight="semiBold" color="text.default">
          Interactive Example
        </MpText>
        
        <MpButtonGroup is-split>
          <MpButton 
            variant="primary" 
            size="md"
            :is-loading="isLoading"
            @click="handleSaveAction"
          >
            Save
          </MpButton>
          <MpPopover id="split-button-popover">
            <MpPopoverTrigger>
              <MpButton 
                variant="primary" 
                size="md"
                right-icon="chevrons-down"
                aria-label="Save options"
              />
            </MpPopoverTrigger>
            <MpPopoverContent :class="css({ width: '200px' })">
              <MpPopoverList>
                <MpPopoverListItem @click="handleSaveAndNew">
                  Save and New
                </MpPopoverListItem>
                <MpPopoverListItem @click="handleSaveAndClose">
                  Save and Close
                </MpPopoverListItem>
                <MpPopoverListItem @click="handleSaveAsDraft">
                  Save as Draft
                </MpPopoverListItem>
              </MpPopoverList>
            </MpPopoverContent>
          </MpPopover>
        </MpButtonGroup>

        <!-- Status Message -->
        <MpText 
          v-if="statusMessage" 
          size="body" 
          color="text.secondary"
          :class="css({ marginTop: '2' })"
        >
          {{ statusMessage }}
        </MpText>
      </MpFlex>
    </MpFlex>
  </Pixel.div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { 
  MpButton, 
  MpButtonGroup, 
  MpFlex, 
  MpText,
  MpPopover,
  MpPopoverTrigger,
  MpPopoverContent,
  MpPopoverList,
  MpPopoverListItem,
  Pixel,
  css,
  usePixelTheme
} from '@mekari/pixel3'

// Enable Design Token 2.4
const { setNextTheme } = usePixelTheme()
setNextTheme(true)

// Reactive state
const isLoading = ref(false)
const statusMessage = ref('')

// Functions
const handleMainAction = () => {
  console.log('Main action clicked')
  statusMessage.value = 'Main button clicked'
  setTimeout(() => statusMessage.value = '', 2000)
}

const handleDropdown = () => {
  console.log('Dropdown clicked')
}

const handleSaveAction = async () => {
  isLoading.value = true
  statusMessage.value = 'Saving...'
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  isLoading.value = false
  statusMessage.value = 'Saved successfully!'
  setTimeout(() => statusMessage.value = '', 2000)
}

const handleSaveAndNew = () => {
  console.log('Save and New clicked')
  statusMessage.value = 'Save and New action triggered'
  setTimeout(() => statusMessage.value = '', 2000)
}

const handleSaveAndClose = () => {
  console.log('Save and Close clicked')
  statusMessage.value = 'Save and Close action triggered'
  setTimeout(() => statusMessage.value = '', 2000)
}

const handleSaveAsDraft = () => {
  console.log('Save as Draft clicked')
  statusMessage.value = 'Saved as draft'
  setTimeout(() => statusMessage.value = '', 2000)
}
</script>