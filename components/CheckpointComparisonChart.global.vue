<template>
  <figure class="comparison-chart" aria-labelledby="checkpoint-comparison-title">
    <figcaption class="chart-heading">
      <span class="chart-kicker">Checkpoint comparison · Genesis 1:1</span>
      <strong id="checkpoint-comparison-title">Selected model versus checkpoint 34,000</strong>
      <span>Switch metrics to see why the later checkpoint was not a uniform improvement.</span>
    </figcaption>

    <div class="metric-tabs" role="tablist" aria-label="Comparison metric">
      <button
        v-for="metric in metrics"
        :key="metric.key"
        type="button"
        role="tab"
        :aria-selected="selectedMetricKey === metric.key"
        :class="{ 'is-active': selectedMetricKey === metric.key }"
        @click="selectedMetricKey = metric.key"
      >
        {{ metric.shortLabel }}
      </button>
    </div>

    <div class="metric-readout" aria-live="polite">
      <div>
        <span>{{ selectedMetric.label }}</span>
        <strong>{{ metricSummary }}</strong>
      </div>
      <span class="direction-badge">↓ Lower is better</span>
    </div>

    <div class="bar-chart" role="tabpanel">
      <div
        v-for="(candidate, index) in candidates"
        :key="candidate.id"
        class="candidate-row"
        :class="[`candidate-row--${candidate.id}`, { 'is-best': index === bestCandidateIndex }]"
      >
        <div class="candidate-label">
          <span>{{ candidate.title }}</span>
          <small>{{ candidate.description }}</small>
        </div>

        <div class="bar-track" aria-hidden="true">
          <span
            class="bar-fill"
            :style="{ transform: `scaleX(${barRatio(index)})` }"
          />
        </div>

        <div class="candidate-value">
          <strong>{{ formatMetricValue(metricValue(index)) }}</strong>
          <span v-if="index === bestCandidateIndex">best</span>
        </div>
      </div>
    </div>

    <div class="chart-note">
      <span aria-hidden="true">↳</span>
      {{ selectedMetric.explanation }}
    </div>

    <details class="source-data">
      <summary>View all measured values</summary>
      <div class="source-data__scroll">
        <table>
          <thead>
            <tr>
              <th>Candidate</th>
              <th>Duration error</th>
              <th>Approx. MCD</th>
              <th>F0 deviation</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="candidate in candidates" :key="`source-${candidate.id}`">
              <td>{{ candidate.title }}</td>
              <td>+{{ candidate.duration.toFixed(3) }} s</td>
              <td>{{ candidate.mcd.toFixed(2) }}</td>
              <td>{{ candidate.f0.toFixed(2) }} cents</td>
            </tr>
          </tbody>
        </table>
      </div>
    </details>
  </figure>
</template>

<script setup lang="ts">
type MetricKey = 'duration' | 'mcd' | 'f0';
type Candidate = {
  id: 'selected' | 'later';
  title: string;
  description: string;
  duration: number;
  mcd: number;
  f0: number;
};

const candidates: Candidate[] = [
  {
    id: 'selected',
    title: 'Validation-best model',
    description: 'Global step 10,725',
    duration: 0.906,
    mcd: 270.9554,
    f0: 399.6,
  },
  {
    id: 'later',
    title: 'Checkpoint 34,000',
    description: 'Later training checkpoint',
    duration: 0.464,
    mcd: 341.2788,
    f0: 429.65,
  },
];

const metrics = [
  {
    key: 'duration' as const,
    label: 'Absolute duration difference',
    shortLabel: 'Duration',
    unit: 'seconds',
    explanation: 'Checkpoint 34,000 matched the reference duration more closely, but duration alone does not measure spectral or pitch similarity.',
  },
  {
    key: 'mcd' as const,
    label: 'Approximate Mel Cepstral Distortion',
    shortLabel: 'MCD',
    unit: '',
    explanation: 'The validation-best model had 20.6% lower approximate MCD, indicating a closer spectral envelope within this local pipeline.',
  },
  {
    key: 'f0' as const,
    label: 'Mean absolute F0 deviation',
    shortLabel: 'F0 deviation',
    unit: 'cents',
    explanation: 'The validation-best model had 7.0% lower pitch deviation from the reference.',
  },
];

const selectedMetricKey = ref<MetricKey>('mcd');
const selectedMetric = computed(() => metrics.find(metric => metric.key === selectedMetricKey.value) ?? metrics[1]);
const values = computed(() => candidates.map(candidate => candidate[selectedMetricKey.value]));
const bestCandidateIndex = computed(() => values.value[0] <= values.value[1] ? 0 : 1);
const worstCandidateIndex = computed(() => bestCandidateIndex.value === 0 ? 1 : 0);
const metricSummary = computed(() => {
  const best = candidates[bestCandidateIndex.value];
  const improvement = (1 - values.value[bestCandidateIndex.value] / values.value[worstCandidateIndex.value]) * 100;
  return `${best.title} is ${improvement.toFixed(1)}% lower`;
});

function metricValue(candidateIndex: number) {
  return values.value[candidateIndex];
}

function barRatio(candidateIndex: number) {
  return metricValue(candidateIndex) / Math.max(...values.value);
}

function formatMetricValue(value: number) {
  if (selectedMetricKey.value === 'duration') return `+${value.toFixed(3)} s`;
  if (selectedMetricKey.value === 'f0') return `${value.toFixed(2)} cents`;
  return value.toFixed(2);
}
</script>

<style scoped>
.comparison-chart {
  display: grid;
  gap: 1rem;
  margin: 1.5rem 0;
  padding: 1.1rem;
  border: 1px solid var(--border-subtle);
  border-radius: 0.55rem;
  background: color-mix(in srgb, var(--background) 88%, var(--surface));
}

.chart-heading { display: grid; gap: 0.28rem; }
.chart-heading strong { color: var(--foreground); font-size: 1rem; font-weight: 600; letter-spacing: -0.025em; }
.chart-heading > span:last-child,
.chart-note { color: var(--faint); font-size: 0.74rem; line-height: 1.55; }
.chart-kicker { color: var(--faint); font-family: 'DM Mono', ui-monospace, monospace; font-size: 0.63rem; letter-spacing: 0.045em; text-transform: uppercase; }

.metric-tabs {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  padding: 0.2rem;
  border: 1px solid var(--border-subtle);
  border-radius: 0.42rem;
  background: var(--surface);
}

.metric-tabs button {
  min-height: 2rem;
  padding: 0.35rem 0.5rem;
  border: 0;
  border-radius: 0.28rem;
  color: var(--faint);
  background: transparent;
  font-family: 'DM Mono', ui-monospace, monospace;
  font-size: 0.63rem;
  transition: color 150ms ease, background-color 150ms ease, transform 150ms var(--ease-out);
}

.metric-tabs button.is-active { color: var(--foreground); background: var(--background); box-shadow: 0 1px 3px rgba(0, 0, 0, 0.07); }
.metric-tabs button:active { transform: scale(0.98); }

.metric-readout {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.7rem 0.8rem;
  border-left: 2px solid var(--accent);
  background: var(--surface);
}

.metric-readout > div { display: grid; gap: 0.15rem; }
.metric-readout span { color: var(--faint); font-family: 'DM Mono', ui-monospace, monospace; font-size: 0.61rem; }
.metric-readout strong { color: var(--foreground); font-size: 0.82rem; font-weight: 500; }
.direction-badge { flex: 0 0 auto; padding: 0.26rem 0.42rem; border: 1px solid var(--border-subtle); border-radius: 999px; }

.bar-chart { display: grid; gap: 1rem; padding-block: 0.35rem; }
.candidate-row { --candidate-color: #1769d2; display: grid; grid-template-columns: minmax(9.5rem, 1.1fr) minmax(8rem, 2fr) 5rem; align-items: center; gap: 0.8rem; }
.candidate-row--later { --candidate-color: #7651c9; }
.candidate-label { display: grid; gap: 0.12rem; }
.candidate-label span { color: var(--foreground); font-size: 0.76rem; font-weight: 500; }
.candidate-label small { color: var(--faint); font-family: 'DM Mono', ui-monospace, monospace; font-size: 0.58rem; }

.bar-track { height: 0.56rem; overflow: hidden; border-radius: 999px; background: var(--surface-hover); }
.bar-fill { display: block; width: 100%; height: 100%; border-radius: inherit; background: var(--candidate-color); transform-origin: left center; transition: transform 220ms var(--ease-out); }

.candidate-value { display: flex; align-items: center; justify-content: flex-end; gap: 0.35rem; }
.candidate-value strong { color: var(--foreground); font-family: 'DM Mono', ui-monospace, monospace; font-size: 0.69rem; font-weight: 500; }
.candidate-value span { padding: 0.12rem 0.28rem; border-radius: 999px; color: var(--candidate-color); background: color-mix(in srgb, var(--candidate-color) 10%, transparent); font-family: 'DM Mono', ui-monospace, monospace; font-size: 0.52rem; text-transform: uppercase; }

.chart-note { display: flex; gap: 0.55rem; padding-top: 0.8rem; border-top: 1px solid var(--border-subtle); }
.chart-note span { color: var(--accent); font-family: 'DM Mono', ui-monospace, monospace; }

.source-data { color: var(--faint); font-size: 0.7rem; }
.source-data summary { width: fit-content; cursor: pointer; font-family: 'DM Mono', ui-monospace, monospace; }
.source-data__scroll { margin-top: 0.8rem; overflow-x: auto; }
.source-data table { width: 100%; margin: 0; border-collapse: collapse; font-size: 0.66rem; }
.source-data th,
.source-data td { padding: 0.35rem; border-bottom: 1px solid var(--border-subtle); text-align: right; white-space: nowrap; }
.source-data th:first-child,
.source-data td:first-child { text-align: left; }

@media (hover: hover) and (pointer: fine) {
  .metric-tabs button:not(.is-active):hover { color: var(--foreground); background: var(--surface-hover); }
}

@media (max-width: 560px) {
  .comparison-chart { padding: 0.9rem; }
  .metric-tabs button { padding-inline: 0.25rem; font-size: 0.58rem; }
  .metric-readout { align-items: flex-start; }
  .candidate-row { grid-template-columns: 1fr auto; gap: 0.45rem 0.7rem; }
  .bar-track { grid-column: 1 / -1; grid-row: 2; }
  .candidate-value { grid-column: 2; grid-row: 1; }
}

:global(.dark) .candidate-row--selected { --candidate-color: #68a7ff; }
:global(.dark) .candidate-row--later { --candidate-color: #b39bff; }

@media (prefers-reduced-motion: reduce) {
  .metric-tabs button,
  .bar-fill { transition-duration: 0ms; }
}
</style>
