<template>
  <MpFlex
    direction="column"
    :class="
      css({
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: 'background.surface'
      })
    "
  >
    <!-- Header Bar -->
    <MpFlex
      as="header"
      alignItems="center"
      gap="6"
      :class="
        css({
          height: '56px',
          paddingX: '6',
          backgroundColor: 'background.stage',
          borderBottom: '1px solid',
          borderColor: 'border.default',
          flexShrink: '0',
          zIndex: '2'
        })
      "
    >
      <!-- Left: Logo -->
      <MpFlex flex="1 0 0" alignItems="center">
        <MpFlex alignItems="center" gap="1">
          <MpText
            as="span"
            weight="semiBold"
            :class="
              css({
                color: 'text.link',
                fontSize: 'pxl-font-size-lg',
                lineHeight: 'pxl-line-height-md'
              })
            "
            >mekari</MpText
          >
          <MpText
            as="span"
            weight="semiBold"
            :class="
              css({
                color: 'text.default',
                fontSize: 'pxl-font-size-lg',
                lineHeight: 'pxl-line-height-md'
              })
            "
            >qontak</MpText
          >
        </MpFlex>
      </MpFlex>

      <!-- Right Actions -->
      <MpFlex alignItems="center" gap="2">
        <!-- Online status pill -->
        <MpFlex
          alignItems="center"
          gap="2"
          :class="
            css({
              backgroundColor: 'background.success',
              paddingX: '4',
              paddingY: '2',
              borderRadius: 'full',
              cursor: 'pointer'
            })
          "
        >
          <MpText color="text.success">Online</MpText>
          <MpIcon name="chevrons-down" size="sm" />
        </MpFlex>

        <!-- Notification Bell with Badge -->
        <MpFlex :class="css({ position: 'relative' })">
          <MpButton
            aria-label="Notifications"
            left-icon="notification"
            variant="ghost"
          />
          <MpBadge
            for="indicator"
            type="critical"
            :class="css({ position: 'absolute', top: '-4px', right: '-4px' })"
            >9+</MpBadge
          >
        </MpFlex>

        <!-- Apps Grid -->
        <MpButton
          aria-label="Apps"
          left-icon="connected_apps"
          variant="ghost"
        />

        <!-- User Snapshot -->
        <MpFlex
          alignItems="center"
          gap="3"
          :class="
            css({
              paddingX: '2',
              paddingY: '1',
              borderRadius: 'md',
              cursor: 'pointer'
            })
          "
        >
          <MpAvatar id="avatar-rizal" size="sm" />
          <MpFlex direction="column">
            <MpText weight="semiBold">Rizal Candra</MpText>
            <MpText size="label-small" color="text.secondary"
              >PT Central Perk Indonesia</MpText
            >
          </MpFlex>
        </MpFlex>
      </MpFlex>
    </MpFlex>

    <!-- Body -->
    <MpFlex
      :class="
        css({ flex: '1 0 0', minHeight: '0', overflow: 'hidden', zIndex: '1' })
      "
    >
      <!-- Navigation -->
      <MpFlex as="nav" :class="css({ height: 'full', zIndex: '2' })">
        <!-- Icon Nav Column -->
        <MpFlex
          direction="column"
          :class="
            css({
              backgroundColor: 'background.nav-parent',
              borderRight: '1px solid',
              borderColor: 'border.default',
              flexShrink: '0',
              overflowY: 'auto',
              overflowX: 'clip',
              paddingX: '2',
              paddingBottom: '80px',
              height: 'full',
              position: 'relative',
              zIndex: '2'
            })
          "
        >
          <!-- Group 1: Main Chat -->
          <MpFlex
            direction="column"
            gap="0.5"
            :class="
              css({
                paddingY: '4',
                borderBottom: '1px solid',
                borderColor: 'border.default'
              })
            "
          >
            <MpButton
              aria-label="Home"
              left-icon="home"
              variant="ghost"
              size="sm"
            />
            <MpButton
              aria-label="Inbox"
              left-icon="inbox"
              variant="ghost"
              size="sm"
            />
            <MpButton
              aria-label="Phone"
              left-icon="phone"
              variant="ghost"
              size="sm"
            />
            <MpButton
              aria-label="Broadcast"
              left-icon="broadcast"
              variant="ghost"
              size="sm"
            />
            <MpButton
              aria-label="Chatbot"
              left-icon="chatbot"
              variant="ghost"
              size="sm"
              :class="css({ backgroundColor: 'background.brand-selected' })"
            />
          </MpFlex>

          <!-- Group 2: HR -->
          <MpFlex
            direction="column"
            gap="0.5"
            :class="
              css({
                paddingY: '4',
                borderBottom: '1px solid',
                borderColor: 'border.default'
              })
            "
          >
            <MpButton
              aria-label="Team"
              left-icon="team"
              variant="ghost"
              size="sm"
            />
            <MpButton
              aria-label="Talent"
              left-icon="productivity"
              variant="ghost"
              size="sm"
            />
            <MpButton
              aria-label="Reports"
              left-icon="reports"
              variant="ghost"
              size="sm"
            />
          </MpFlex>

          <!-- Group 3: Sales -->
          <MpFlex
            direction="column"
            gap="0.5"
            :class="
              css({
                paddingY: '4',
                borderBottom: '1px solid',
                borderColor: 'border.default'
              })
            "
          >
            <MpButton
              aria-label="Sales"
              left-icon="sales"
              variant="ghost"
              size="sm"
            />
            <MpButton
              aria-label="Voucher"
              left-icon="voucher"
              variant="ghost"
              size="sm"
            />
            <MpButton
              aria-label="Competencies"
              left-icon="task-todo"
              variant="ghost"
              size="sm"
            />
          </MpFlex>

          <!-- Group 4: Resources -->
          <MpFlex
            direction="column"
            gap="0.5"
            :class="
              css({
                paddingY: '4',
                borderBottom: '1px solid',
                borderColor: 'border.default'
              })
            "
          >
            <MpButton
              aria-label="Shop"
              left-icon="shop"
              variant="ghost"
              size="sm"
            />
            <MpButton
              aria-label="Knowledge Base"
              left-icon="book"
              variant="ghost"
              size="sm"
            />
            <MpButton
              aria-label="Doc"
              left-icon="doc"
              variant="ghost"
              size="sm"
            />
            <MpButton
              aria-label="Product"
              left-icon="products"
              variant="ghost"
              size="sm"
            />
            <MpButton
              aria-label="Expense"
              left-icon="expenses"
              variant="ghost"
              size="sm"
            />
          </MpFlex>

          <!-- Group 5: Officeless -->
          <MpFlex
            direction="column"
            gap="0.5"
            :class="
              css({
                paddingY: '4',
                borderBottom: '1px solid',
                borderColor: 'border.default'
              })
            "
          >
            <MpButton
              aria-label="Officeless"
              left-icon="officeless"
              variant="ghost"
              size="sm"
            />
          </MpFlex>

          <!-- Group 6: Settings -->
          <MpFlex direction="column" gap="0.5" :class="css({ paddingY: '4' })">
            <MpButton
              aria-label="Transfer"
              left-icon="transfer"
              variant="ghost"
              size="sm"
            />
            <MpButton
              aria-label="Settings"
              left-icon="settings"
              variant="ghost"
              size="sm"
            />
          </MpFlex>

          <!-- Collapse button (pinned at bottom) -->
          <MpFlex
            :class="
              css({
                position: 'absolute',
                bottom: '0',
                left: '0',
                right: '0',
                borderTop: '1px solid',
                borderColor: 'border.default',
                backgroundColor: 'background.nav-parent'
              })
            "
          >
            <MpButton
              aria-label="Collapse navigation"
              left-icon="arrows-left"
              variant="ghost"
              :class="css({ width: 'full', borderRadius: '0' })"
            />
          </MpFlex>
        </MpFlex>

        <!-- Submenu Column -->
        <MpFlex
          direction="column"
          gap="0.5"
          :class="
            css({
              width: '212px',
              backgroundColor: 'background.surface',
              flexShrink: '0',
              height: 'full',
              overflowY: 'auto',
              paddingX: '2',
              paddingTop: '4',
              paddingBottom: '60px',
              position: 'relative',
              zIndex: '1'
            })
          "
        >
          <!-- Section Header: BOT & AUTOMATION -->
          <MpFlex
            alignItems="center"
            :class="css({ minHeight: '36px', padding: '2', width: 'full' })"
          >
            <MpText size="overline" weight="semiBold" color="text.link">
              BOT &amp; AUTOMATION
            </MpText>
          </MpFlex>

          <!-- Conversations -->
          <MpFlex
            alignItems="center"
            gap="2"
            :class="
              css({
                padding: '2',
                borderRadius: 'md',
                cursor: 'pointer',
                width: 'full'
              })
            "
          >
            <MpText color="text.default">Conversations</MpText>
          </MpFlex>

          <!-- AI agents (active) -->
          <MpFlex
            alignItems="center"
            gap="2"
            :class="
              css({
                padding: '2',
                borderRadius: 'md',
                cursor: 'pointer',
                width: 'full',
                backgroundColor: 'background.brand-selected'
              })
            "
          >
            <MpText weight="semiBold" color="text.link">AI agents</MpText>
          </MpFlex>

          <!-- Custom instructions -->
          <MpFlex
            alignItems="center"
            gap="2"
            :class="
              css({
                padding: '2',
                borderRadius: 'md',
                cursor: 'pointer',
                width: 'full'
              })
            "
          >
            <MpText color="text.default">Custom instructions</MpText>
          </MpFlex>

          <!-- Settings (external link) -->
          <MpFlex
            alignItems="center"
            gap="2"
            :class="
              css({
                padding: '2',
                borderRadius: 'md',
                cursor: 'pointer',
                width: 'full'
              })
            "
          >
            <MpText :class="css({ flex: '1 0 0' })" color="text.default"
              >Settings</MpText
            >
            <MpIcon name="newtab" size="sm" />
          </MpFlex>

          <!-- Collapse submenu (pinned at bottom) -->
          <MpFlex
            :class="
              css({
                position: 'absolute',
                bottom: '0',
                left: '0',
                right: '0',
                padding: '3',
                justifyContent: 'flex-end'
              })
            "
          >
            <MpButton
              aria-label="Collapse submenu"
              left-icon="chevrons-left"
              variant="ghost"
              size="sm"
            />
          </MpFlex>
        </MpFlex>
      </MpFlex>

      <!-- Main Content -->
      <MpFlex
        direction="column"
        :class="
          css({ flex: '1 0 0', height: 'full', minWidth: '0', zIndex: '1' })
        "
      >
        <!-- Page Title Bar -->
        <MpFlex
          alignItems="center"
          gap="3"
          :class="
            css({
              height: '72px',
              maxHeight: '72px',
              paddingX: '6',
              flexShrink: '0'
            })
          "
        >
          <MpFlex
            :class="css({ flex: '1 0 0' })"
            alignItems="center"
            minWidth="0"
          >
            <MpText as="h1" size="h1" weight="semiBold" color="text.default"
              >AI agent</MpText
            >
          </MpFlex>
          <MpButton variant="primary">Create AI agent</MpButton>
        </MpFlex>

        <!-- Stage -->
        <MpFlex
          direction="column"
          gap="6"
          :class="
            css({
              flex: '1 0 0',
              minHeight: '0',
              overflowY: 'auto',
              padding: '6',
              backgroundColor: 'background.stage',
              borderLeft: '1px solid',
              borderTop: '1px solid',
              borderColor: 'border.default',
              borderTopLeftRadius: 'md'
            })
          "
        >
          <!-- Stats Card -->
          <MpFlex
            alignItems="center"
            :class="
              css({
                border: '1px solid',
                borderColor: 'border.default',
                borderRadius: 'md',
                padding: '6',
                height: '100px',
                flexShrink: '0'
              })
            "
          >
            <MpFlex direction="column" gap="0.5">
              <MpText color="text.secondary">Total created</MpText>
              <MpText
                as="p"
                weight="semiBold"
                :class="
                  css({ fontSize: 'pxl-font-size-xl', color: 'text.default' })
                "
              >
                3 agents
              </MpText>
            </MpFlex>
            <div
              :class="
                css({
                  width: '1px',
                  height: '52px',
                  backgroundColor: 'border.default',
                  marginX: '10',
                  flexShrink: '0'
                })
              "
            />
            <MpFlex direction="column" gap="0.5">
              <MpText color="text.secondary">Active</MpText>
              <MpText
                as="p"
                weight="semiBold"
                :class="
                  css({ fontSize: 'pxl-font-size-xl', color: 'text.default' })
                "
              >
                2 agents
              </MpText>
            </MpFlex>
            <div
              :class="
                css({
                  width: '1px',
                  height: '52px',
                  backgroundColor: 'border.default',
                  marginX: '10',
                  flexShrink: '0'
                })
              "
            />
            <MpFlex direction="column" gap="0.5">
              <MpText color="text.secondary">Inactive</MpText>
              <MpText
                as="p"
                weight="semiBold"
                :class="
                  css({ fontSize: 'pxl-font-size-xl', color: 'text.default' })
                "
              >
                1 agent
              </MpText>
            </MpFlex>
          </MpFlex>

          <!-- Filters Row -->
          <MpFlex
            alignItems="center"
            gap="3"
            :class="css({ flexShrink: '0', width: 'full' })"
          >
            <MpFlex :class="css({ flex: '1 0 0' })" alignItems="center" gap="3">
              <MpSelect
                id="filter-status"
                v-model="statusFilter"
                placeholder="All status"
                :class="css({ width: '240px' })"
              >
                <option value="">All status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </MpSelect>
            </MpFlex>
            <MpFlex gap="3">
              <MpInputGroup
                id="search-agent-group"
                size="md"
                :class="css({ width: '240px' })"
              >
                <MpInputLeftAddon id="search-agent-addon">
                  <MpIcon name="search" size="sm" />
                </MpInputLeftAddon>
                <MpInput
                  id="search-agent-input"
                  v-model="searchQuery"
                  placeholder="Search..."
                  is-full-width
                />
              </MpInputGroup>
            </MpFlex>
          </MpFlex>

          <!-- Table -->
          <MpTableContainer :class="css({ width: 'full', flexShrink: '0' })">
            <MpTable is-hoverable>
              <MpTableHead>
                <MpTableRow>
                  <MpTableCell as="th">
                    <MpText weight="semiBold">AI agent name</MpText>
                  </MpTableCell>
                  <MpTableCell as="th">
                    <MpFlex alignItems="center" gap="1">
                      <MpText weight="semiBold">Accuracy rate</MpText>
                      <MpIcon name="info" size="sm" />
                    </MpFlex>
                  </MpTableCell>
                  <MpTableCell as="th">
                    <MpText weight="semiBold">Status</MpText>
                  </MpTableCell>
                  <MpTableCell as="th">
                    <MpText weight="semiBold">Usage</MpText>
                  </MpTableCell>
                  <MpTableCell as="th">
                    <MpFlex alignItems="center" gap="1">
                      <MpText weight="semiBold">Last updated</MpText>
                      <MpIcon name="table-view-sort" size="sm" />
                    </MpFlex>
                  </MpTableCell>
                  <MpTableCell as="th"><!-- actions spacer --></MpTableCell>
                </MpTableRow>
              </MpTableHead>
              <MpTableBody>
                <MpTableRow v-for="agent in filteredAgents" :key="agent.id">
                  <MpTableCell as="td">
                    <MpText>{{ agent.name }}</MpText>
                  </MpTableCell>
                  <MpTableCell as="td">
                    <MpFlex alignItems="center" gap="2">
                      <MpText>{{ agent.accuracy }}%</MpText>
                      <MpBadge
                        for="additionalInformation"
                        :type="agent.accuracyBadgeType"
                      >
                        {{ agent.accuracyLabel }}
                      </MpBadge>
                    </MpFlex>
                  </MpTableCell>
                  <MpTableCell as="td">
                    <MpBadge for="tableStatus" :type="agent.statusType">{{
                      agent.status
                    }}</MpBadge>
                  </MpTableCell>
                  <MpTableCell as="td">
                    <MpText>{{ agent.usage }}</MpText>
                  </MpTableCell>
                  <MpTableCell as="td">
                    <MpText>{{ agent.lastUpdated }}</MpText>
                  </MpTableCell>
                  <MpTableCell as="td">
                    <MpButtonGroup is-split>
                      <MpButton variant="secondary" size="sm">Actions</MpButton>
                      <MpButton
                        aria-label="More actions"
                        right-icon="chevrons-down"
                        variant="secondary"
                        size="sm"
                      />
                    </MpButtonGroup>
                  </MpTableCell>
                </MpTableRow>
              </MpTableBody>
            </MpTable>
          </MpTableContainer>

          <!-- Pagination -->
          <MpFlex
            alignItems="center"
            :class="css({ flexShrink: '0', width: 'full', paddingY: '2' })"
          >
            <MpFlex alignItems="center" gap="2">
              <MpText size="label-small" color="text.secondary"
                >Rows per page</MpText
              >
              <MpSelect
                id="rows-per-page"
                v-model="rowsPerPage"
                size="sm"
                :class="css({ width: '80px' })"
              >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </MpSelect>
            </MpFlex>

            <MpText
              :class="css({ flex: '1 0 0', textAlign: 'center' })"
              size="label-small"
              color="text.secondary"
            >
              Showing 1-{{ filteredAgents.length }} of
              {{ filteredAgents.length }}
            </MpText>

            <MpFlex alignItems="center" gap="2">
              <MpSelect
                id="page-select"
                v-model="currentPage"
                size="sm"
                :class="css({ width: '64px' })"
              >
                <option value="1">1</option>
              </MpSelect>
              <MpText size="label-small" color="text.secondary"
                >of 1 page</MpText
              >
              <MpButton
                aria-label="Previous page"
                left-icon="chevrons-left"
                variant="ghost"
                size="sm"
              />
              <MpButton
                aria-label="Next page"
                left-icon="chevrons-right"
                variant="ghost"
                size="sm"
              />
            </MpFlex>
          </MpFlex>
        </MpFlex>
      </MpFlex>
    </MpFlex>
  </MpFlex>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import {
  css,
  MpFlex,
  MpText,
  MpButton,
  MpButtonGroup,
  MpBadge,
  MpIcon,
  MpAvatar,
  MpSelect,
  MpInput,
  MpInputGroup,
  MpInputLeftAddon,
  MpTable,
  MpTableHead,
  MpTableBody,
  MpTableRow,
  MpTableCell,
  MpTableContainer
} from "@mekari/pixel3";

const searchQuery = ref("");
const statusFilter = ref("");
const rowsPerPage = ref("10");
const currentPage = ref("1");

type AccuracyBadgeType = "warning" | "completed";
type StatusBadgeType =
  | "completed"
  | "warning"
  | "critical"
  | "announcement"
  | "information";

interface Agent {
  id: number;
  name: string;
  accuracy: number;
  accuracyLabel: string;
  accuracyBadgeType: AccuracyBadgeType;
  status: string;
  statusType: StatusBadgeType;
  usage: string;
  lastUpdated: string;
}

const agents = ref<Agent[]>([
  {
    id: 1,
    name: "Customer support",
    accuracy: 30,
    accuracyLabel: "Need review",
    accuracyBadgeType: "warning",
    status: "Active",
    statusType: "completed",
    usage: "1",
    lastUpdated: "15 Mar 2024 at 16:00"
  },
  {
    id: 2,
    name: "Sales agent",
    accuracy: 80,
    accuracyLabel: "Passed",
    accuracyBadgeType: "completed",
    status: "Active",
    statusType: "completed",
    usage: "2",
    lastUpdated: "14 Mar 2024 at 17:00"
  },
  {
    id: 3,
    name: "Lead generation",
    accuracy: 50,
    accuracyLabel: "Need review",
    accuracyBadgeType: "warning",
    status: "Active",
    statusType: "completed",
    usage: "-",
    lastUpdated: "14 Mar 2024 at 17:00"
  }
]);

const filteredAgents = computed(() =>
  agents.value.filter((agent) => {
    const matchesStatus =
      !statusFilter.value ||
      agent.status.toLowerCase() === statusFilter.value.toLowerCase();
    const matchesSearch =
      !searchQuery.value ||
      agent.name.toLowerCase().includes(searchQuery.value.toLowerCase());
    return matchesStatus && matchesSearch;
  })
);
</script>
