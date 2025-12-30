<template>
  <MpFlex
    direction="column"
    minHeight="100vh"
    backgroundColor="background.subtle"
  >
    <!-- Header Navigation -->
    <Pixel.div backgroundColor="#104b32" paddingBottom="4">
      <!-- Top Bar -->
      <MpFlex
        alignItems="center"
        justifyContent="space-between"
        padding="4"
        paddingBottom="0"
      >
        <!-- Logo -->
        <MpFlex alignItems="center" gap="2">
          <Pixel.div
            width="10"
            height="10"
            backgroundColor="white"
            borderRadius="md"
          />
          <MpText :class="css({ color: 'white', fontSize: 'lg', fontWeight: 'bold' })">
            Mekari Superp
          </MpText>
        </MpFlex>

        <!-- Search Bar -->
        <MpFlex alignItems="center" flex="1" maxWidth="96" marginX="8">
          <Pixel.div
            display="flex"
            alignItems="center"
            width="100%"
            backgroundColor="#1e4339"
            borderRadius="md"
            paddingX="3"
            paddingY="2"
            gap="2"
          >
            <Pixel.div :class="css({ color: '#b1df6b' })">
              <MpIcon name="search" />
            </Pixel.div>
            <Pixel.input
              type="text"
              placeholder="Search anything..."
              :class="css({
                flex: '1',
                backgroundColor: 'transparent',
                border: 'none',
                color: 'white',
                outline: 'none',
                fontSize: 'sm',
                '&::placeholder': { color: '#a5b4ad' }
              })"
            />
          </Pixel.div>
        </MpFlex>

        <!-- User Avatar -->
        <MpFlex alignItems="center" gap="2">
          <Pixel.div
            width="8"
            height="8"
            borderRadius="full"
            backgroundColor="#b1df6b"
            display="flex"
            alignItems="center"
            justifyContent="center"
            :class="css({ color: '#104b32', fontWeight: 'bold', fontSize: 'sm' })"
          >
            RC
          </Pixel.div>
        </MpFlex>
      </MpFlex>

      <!-- Navigation Pills -->
      <MpFlex gap="2" paddingX="4" paddingTop="4">
        <Pixel.button
          v-for="(item, index) in navItems"
          :key="index"
          :class="css({
            paddingX: '4',
            paddingY: '2',
            borderRadius: 'full',
            fontSize: 'sm',
            fontWeight: '500',
            backgroundColor: item.active ? '#b1df6b' : 'transparent',
            color: item.active ? '#104b32' : 'white',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.2s',
            '&:hover': { backgroundColor: item.active ? '#b1df6b' : '#1e4339' }
          })"
        >
          {{ item.label }}
        </Pixel.button>
      </MpFlex>
    </Pixel.div>

    <!-- Main Content -->
    <Pixel.div
      flex="1"
      backgroundColor="white"
      borderTopLeftRadius="2xl"
      borderTopRightRadius="2xl"
      marginTop="-4"
      padding="6"
    >
      <!-- Statistics Cards -->
      <MpFlex gap="6" marginBottom="6">
        <Pixel.div v-for="(stat, index) in statistics" :key="index" flex="1">
          <MpText size="label-small" color="text.subdued" :class="css({ marginBottom: '1' })">
            {{ stat.label }}
          </MpText>
          <MpText
            as="div"
            size="h2"
            weight="semiBold"
            :color="stat.critical ? 'text.critical' : 'text.default'"
            :class="css({ marginBottom: '0.5' })"
          >
            {{ stat.value }}
          </MpText>
          <MpText size="label-small" color="text.subdued">
            {{ stat.subtitle }}
          </MpText>
        </Pixel.div>
      </MpFlex>

      <!-- Tabs -->
      <MpFlex
        gap="6"
        borderBottomWidth="1"
        borderBottomStyle="solid"
        borderColor="border.default"
        marginBottom="4"
      >
        <Pixel.button
          v-for="(tab, index) in tabs"
          :key="index"
          :class="css({
            paddingBottom: '3',
            fontSize: 'sm',
            fontWeight: '500',
            backgroundColor: 'transparent',
            border: 'none',
            borderBottom: '2px solid',
            borderColor: tab.active ? '#104b32' : 'transparent',
            color: tab.active ? '#2c3e50' : '#6b7280',
            cursor: 'pointer',
            transition: 'all 0.2s'
          })"
        >
          {{ tab.label }}
        </Pixel.button>
      </MpFlex>

      <!-- Filter Bar -->
      <MpFlex alignItems="center" justifyContent="space-between" marginBottom="4">
        <MpFlex alignItems="center" gap="2">
          <MpSelect placeholder="Status" width="40">
            <option value="all">All</option>
            <option value="paid">Paid</option>
            <option value="open">Open</option>
            <option value="overdue">Overdue</option>
          </MpSelect>
          <MpButton variant="secondary" left-icon="filter">Filter</MpButton>
          <MpButton variant="secondary" left-icon="filter">Filter</MpButton>
        </MpFlex>

        <MpFlex alignItems="center" flex="1" maxWidth="96" marginLeft="4">
          <Pixel.div
            display="flex"
            alignItems="center"
            width="100%"
            borderWidth="1"
            borderStyle="solid"
            borderColor="border.form"
            borderRadius="md"
            paddingX="3"
            paddingY="2"
            gap="2"
          >
            <MpIcon name="search" color="icon.subdued" />
            <Pixel.input
              type="text"
              placeholder="Search in sales invoice..."
              :class="css({
                flex: '1',
                backgroundColor: 'transparent',
                border: 'none',
                outline: 'none',
                fontSize: 'sm'
              })"
            />
          </Pixel.div>
        </MpFlex>
      </MpFlex>

      <!-- Table -->
      <Pixel.div
        borderWidth="1"
        borderStyle="solid"
        borderColor="border.default"
        borderRadius="md"
        overflow="hidden"
      >
        <!-- Table Header -->
        <MpFlex
          alignItems="center"
          backgroundColor="background.subtle"
          paddingY="3"
          paddingX="4"
          borderBottomWidth="1"
          borderBottomStyle="solid"
          borderColor="border.default"
        >
          <Pixel.div width="10">
            <MpCheckbox id="select-all" />
          </Pixel.div>
          <Pixel.div flex="1">
            <MpText size="label-small" weight="semiBold" color="text.subdued">DATE</MpText>
          </Pixel.div>
          <Pixel.div flex="1">
            <MpText size="label-small" weight="semiBold" color="text.subdued">NUMBER</MpText>
          </Pixel.div>
          <Pixel.div flex="2">
            <MpText size="label-small" weight="semiBold" color="text.subdued">CUSTOMER</MpText>
          </Pixel.div>
          <Pixel.div flex="1">
            <MpText size="label-small" weight="semiBold" color="text.subdued">DUE DATE</MpText>
          </Pixel.div>
          <Pixel.div flex="1">
            <MpText size="label-small" weight="semiBold" color="text.subdued">STATUS</MpText>
          </Pixel.div>
          <Pixel.div flex="1" textAlign="right">
            <MpText size="label-small" weight="semiBold" color="text.subdued">DUE</MpText>
          </Pixel.div>
          <Pixel.div flex="1" textAlign="right">
            <MpText size="label-small" weight="semiBold" color="text.subdued">PAID</MpText>
          </Pixel.div>
          <Pixel.div width="8" />
        </MpFlex>

        <!-- Table Rows -->
        <Pixel.div v-for="(invoice, index) in invoices" :key="index">
          <MpFlex
            alignItems="center"
            paddingY="3"
            paddingX="4"
            :borderBottomWidth="index < invoices.length - 1 ? '1' : '0'"
            borderBottomStyle="solid"
            borderColor="border.default"
            :class="css({ '&:hover': { backgroundColor: 'background.subtle' } })"
          >
            <Pixel.div width="10">
              <MpCheckbox :id="`invoice-${index}`" />
            </Pixel.div>
            <Pixel.div flex="1">
              <MpText size="body">{{ invoice.date }}</MpText>
            </Pixel.div>
            <Pixel.div flex="1">
              <MpText size="body" color="text.link" weight="semiBold">{{ invoice.number }}</MpText>
            </Pixel.div>
            <Pixel.div flex="2">
              <MpText size="body">{{ invoice.customer }}</MpText>
            </Pixel.div>
            <Pixel.div flex="1">
              <MpText size="body">{{ invoice.dueDate }}</MpText>
            </Pixel.div>
            <Pixel.div flex="1">
              <MpBadge
                for="tableStatus"
                :type="invoice.status === 'Paid' ? 'completed' : invoice.status === 'Overdue' ? 'critical' : 'warning'"
                size="sm"
              >
                {{ invoice.status }}
              </MpBadge>
            </Pixel.div>
            <Pixel.div flex="1" textAlign="right">
              <MpText size="body">{{ invoice.due }}</MpText>
            </Pixel.div>
            <Pixel.div flex="1" textAlign="right">
              <MpText size="body">{{ invoice.paid }}</MpText>
            </Pixel.div>
            <Pixel.div width="8">
              <MpButton variant="ghost" aria-label="Actions">⋮</MpButton>
            </Pixel.div>
          </MpFlex>
        </Pixel.div>
      </Pixel.div>

      <!-- Pagination -->
      <MpFlex alignItems="center" justifyContent="space-between" marginTop="4">
        <MpFlex alignItems="center" gap="2">
          <MpText size="body" color="text.subdued">Rows per page</MpText>
          <MpSelect v-model="rowsPerPage" width="20">
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </MpSelect>
        </MpFlex>

        <MpText size="body" color="text.subdued">
          Showing {{ startRow }}-{{ endRow }} of {{ totalRows }}
        </MpText>

        <MpFlex alignItems="center" gap="2">
          <MpButton variant="secondary" left-icon="chevrons-left" :is-disabled="currentPage === 1" aria-label="Previous page" />
          <MpText size="body" weight="semiBold">
            {{ currentPage }}
          </MpText>
          <MpButton variant="secondary" left-icon="chevrons-right" :is-disabled="currentPage === totalPages" aria-label="Next page" />
        </MpFlex>
      </MpFlex>
    </Pixel.div>
  </MpFlex>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  MpFlex,
  MpText,
  MpIcon,
  MpSelect,
  MpButton,
  MpCheckbox,
  MpBadge,
  Pixel,
  css
} from '@mekari/pixel3'
import { usePixelTheme } from '@mekari/pixel3'

// Enable Design Token 2.4
const { setNextTheme } = usePixelTheme()
setNextTheme(true)

// Navigation items
const navItems = ref([
  { label: 'Home', active: false },
  { label: 'Sales', active: true },
  { label: 'Purchases', active: false },
  { label: 'Expenses', active: false },
  { label: 'Accounting', active: false },
  { label: 'Inventory', active: false },
  { label: 'Orders', active: false },
  { label: 'Production', active: false },
  { label: 'Reports', active: false },
  { label: 'More', active: false }
])

// Statistics data
const statistics = ref([
  { label: 'Overdue', value: 'Rp39.7M', subtitle: '12 invoices', critical: true },
  { label: 'Unpaid', value: 'Rp51.3M', subtitle: '15 invoices', critical: false },
  { label: 'Payment received', value: 'Rp120.9M', subtitle: '43 invoices', critical: false },
  { label: 'Created', value: '5', subtitle: 'invoices this month', critical: false }
])

// Tabs data
const tabs = ref([
  { label: 'Sales invoices', active: true },
  { label: 'Sales deliveries', active: false },
  { label: 'Sales orders', active: false },
  { label: 'Sales quotes', active: false },
  { label: 'Awaiting approval', active: false }
])

// Invoice data
const invoices = ref([
  { date: '2 Nov 2024', number: 'SI-00001', customer: 'PT Mekari Integrasi Selaras', dueDate: '17 Nov 2024', status: 'Paid', due: 'Rp0', paid: 'Rp15.0M' },
  { date: '1 Nov 2024', number: 'SI-00002', customer: 'PT Mekari Integrasi Selaras', dueDate: '16 Nov 2024', status: 'Open', due: 'Rp12.5M', paid: 'Rp0' },
  { date: '31 Oct 2024', number: 'SI-00003', customer: 'PT Abadi Jaya', dueDate: '15 Nov 2024', status: 'Overdue', due: 'Rp8.3M', paid: 'Rp0' },
  { date: '30 Oct 2024', number: 'SI-00004', customer: 'CV Sejahtera', dueDate: '14 Nov 2024', status: 'Paid', due: 'Rp0', paid: 'Rp5.2M' },
  { date: '29 Oct 2024', number: 'SI-00005', customer: 'PT Karya Mandiri', dueDate: '13 Nov 2024', status: 'Open', due: 'Rp9.8M', paid: 'Rp0' },
  { date: '28 Oct 2024', number: 'SI-00006', customer: 'PT Sentosa Raya', dueDate: '12 Nov 2024', status: 'Paid', due: 'Rp0', paid: 'Rp11.2M' },
  { date: '27 Oct 2024', number: 'SI-00007', customer: 'CV Cahaya Baru', dueDate: '11 Nov 2024', status: 'Overdue', due: 'Rp6.7M', paid: 'Rp0' },
  { date: '26 Oct 2024', number: 'SI-00008', customer: 'PT Global Makmur', dueDate: '10 Nov 2024', status: 'Paid', due: 'Rp0', paid: 'Rp13.5M' },
  { date: '25 Oct 2024', number: 'SI-00009', customer: 'PT Nusantara Prima', dueDate: '9 Nov 2024', status: 'Open', due: 'Rp7.9M', paid: 'Rp0' },
  { date: '24 Oct 2024', number: 'SI-00010', customer: 'CV Harmoni Sejati', dueDate: '8 Nov 2024', status: 'Paid', due: 'Rp0', paid: 'Rp4.6M' },
  { date: '23 Oct 2024', number: 'SI-00011', customer: 'PT Sukses Bersama', dueDate: '7 Nov 2024', status: 'Overdue', due: 'Rp10.1M', paid: 'Rp0' },
  { date: '22 Oct 2024', number: 'SI-00012', customer: 'PT Mitra Sejahtera', dueDate: '6 Nov 2024', status: 'Paid', due: 'Rp0', paid: 'Rp8.8M' },
  { date: '21 Oct 2024', number: 'SI-00013', customer: 'CV Berkah Abadi', dueDate: '5 Nov 2024', status: 'Open', due: 'Rp5.4M', paid: 'Rp0' },
  { date: '20 Oct 2024', number: 'SI-00014', customer: 'PT Cahaya Sejahtera', dueDate: '4 Nov 2024', status: 'Paid', due: 'Rp0', paid: 'Rp9.3M' },
  { date: '19 Oct 2024', number: 'SI-00015', customer: 'PT Makmur Jaya', dueDate: '3 Nov 2024', status: 'Overdue', due: 'Rp7.2M', paid: 'Rp0' },
  { date: '18 Oct 2024', number: 'SI-00016', customer: 'CV Sentosa Mandiri', dueDate: '2 Nov 2024', status: 'Paid', due: 'Rp0', paid: 'Rp6.5M' },
  { date: '17 Oct 2024', number: 'SI-00017', customer: 'PT Harmoni Abadi', dueDate: '1 Nov 2024', status: 'Open', due: 'Rp8.7M', paid: 'Rp0' }
])

// Pagination state
const rowsPerPage = ref('25')
const currentPage = ref(1)
const totalRows = computed(() => invoices.value.length)
const totalPages = computed(() => Math.ceil(totalRows.value / parseInt(rowsPerPage.value)))
const startRow = computed(() => (currentPage.value - 1) * parseInt(rowsPerPage.value) + 1)
const endRow = computed(() => Math.min(currentPage.value * parseInt(rowsPerPage.value), totalRows.value))
</script>