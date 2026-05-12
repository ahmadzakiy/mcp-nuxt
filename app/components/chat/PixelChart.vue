<template>
  <MpFlex direction="column" gap="2" class="chat-pixel-chart">
    <MpFlex v-if="isLoading" direction="column" gap="2">
      <MpSkeleton width="40%" height="16px" rounded="md" />
      <MpSkeleton width="100%" height="220px" rounded="md" />
      <MpFlex gap="3" justifyContent="center">
        <MpSkeleton
          v-for="n in 3"
          :key="n"
          width="64px"
          height="12px"
          rounded="md"
        />
      </MpFlex>
    </MpFlex>
    <MpText v-else-if="validationError" size="body-small" color="text.danger">
      {{ validationError }}
    </MpText>
    <MpChart
      v-else
      :id="chartId"
      :title="safeTitle"
      :type="safeType"
      :data="chartData"
      :options="chartOptions"
      width-container="100%"
      width-chart="100%"
      height-chart="260px"
      legend-position="bottom"
      legend-direction="center"
      :is-show-legend="safeShowLegend"
      :is-horizontal="safeHorizontal"
      :is-stacked="safeStacked"
      :is-area="safeArea"
    />
  </MpFlex>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { MpChart, MpFlex, MpSkeleton, MpText } from "@mekari/pixel3";

type ChartType = "bar" | "line" | "pie" | "doughnut" | "radar";

type ChartDataset = {
  label: string;
  data: number[];
};

const props = withDefaults(
  defineProps<{
    title?: string;
    type?: string;
    labels?: unknown;
    datasets?: unknown;
    horizontal?: boolean | string;
    stacked?: boolean | string;
    area?: boolean | string;
    showLegend?: boolean | string;
  }>(),
  {
    title: "",
    type: "bar",
    horizontal: false,
    stacked: false,
    area: false,
    showLegend: true
  }
);

const allowedTypes = new Set<ChartType>([
  "bar",
  "line",
  "pie",
  "doughnut",
  "radar"
]);

const safeTitle = computed(() => props.title.trim());

const safeType = computed<ChartType>(() => {
  return allowedTypes.has(props.type as ChartType)
    ? (props.type as ChartType)
    : "bar";
});

const safeHorizontal = computed(() => toBoolean(props.horizontal, false));
const safeStacked = computed(() => toBoolean(props.stacked, false));
const safeArea = computed(() => toBoolean(props.area, false));
const safeShowLegend = computed(() => toBoolean(props.showLegend, true));

function tryParseArray(value: unknown): unknown[] {
  if (Array.isArray(value)) return value;
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) return parsed;
    } catch {
      // not valid JSON
    }
  }
  return [];
}

const labels = computed<string[]>(() => {
  const raw = tryParseArray(props.labels);
  if (raw.length === 0) return [];
  return raw.filter(
    (label): label is string => typeof label === "string" && label.length > 0
  );
});

const datasets = computed<ChartDataset[]>(() => {
  const raw = tryParseArray(props.datasets);
  if (raw.length === 0) return [];

  return raw
    .map((dataset) => {
      if (!isRecord(dataset)) return null;

      const label =
        typeof dataset.label === "string" && dataset.label.length > 0
          ? dataset.label
          : "";
      const data = Array.isArray(dataset.data)
        ? dataset.data.filter((value): value is number => isFiniteNumber(value))
        : [];

      if (!label || data.length === 0) return null;
      return { label, data };
    })
    .filter((dataset): dataset is ChartDataset => dataset !== null);
});

const isLoading = computed(
  () => labels.value.length === 0 || datasets.value.length === 0
);

const validationError = computed(() => {
  if (isLoading.value) return "";

  if (!allowedTypes.has(props.type as ChartType)) {
    return `Unsupported chart type: ${props.type || "empty"}.`;
  }

  const mismatchedDataset = datasets.value.find(
    (dataset) => dataset.data.length !== labels.value.length
  );
  if (mismatchedDataset) {
    return `Chart dataset "${mismatchedDataset.label}" does not match label count.`;
  }

  return "";
});

const chartId = computed(() => {
  const key = `${safeTitle.value}-${safeType.value}-${labels.value.join("-")}`;
  return `chat-chart-${hashString(key)}`;
});

const chartData = computed(() => ({
  labels: labels.value,
  datasets: datasets.value
}));

const chartOptions = computed(() => ({
  maintainAspectRatio: false,
  responsive: true
}));

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

function toBoolean(value: boolean | string | undefined, fallback: boolean) {
  if (typeof value === "boolean") return value;
  if (value === "true") return true;
  if (value === "false") return false;
  return fallback;
}

function hashString(value: string) {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }
  return hash.toString(36);
}
</script>

<style scoped>
.chat-pixel-chart {
  margin: 0.75rem 0;
  min-width: 280px;
  width: 100%;
}
</style>
