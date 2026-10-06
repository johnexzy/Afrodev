<template>
  <figure class="comparison-chart" aria-labelledby="checkpoint-comparison-title">
    <figcaption class="chart-heading">
      <span class="chart-kicker">Checkpoint comparison · Genesis 1:1</span>
      <strong id="checkpoint-comparison-title">Selected model versus checkpoint 34,000</strong>
      <span>Compare duration, spectral similarity, and pitch for the same sentence.</span>
    </figcaption>

    <div class="metric-controls" role="group" aria-label="Comparison metric">
      <button
        v-for="metric in metrics"
        :key="metric.key"
        type="button"
        :aria-label="metric.key === 'f0' ? 'Pitch (F0 deviation)' : undefined"
        :aria-pressed="selectedMetricKey === metric.key"
        :class="{ 'is-active': selectedMetricKey === metric.key }"
        @click="selectedMetricKey = metric.key"
      >
        {{ metric.shortLabel }}
      </button>
    </div>

    <div class="metric-readout" aria-live="polite" aria-atomic="true">
      <div class="metric-readout__heading">
        <span>{{ selectedMetric.label }}</span>
        <span class="metric-direction">Lower is better</span>
      </div>
      <strong>{{ metricSummary }}</strong>
      <span class="metric-baseline">{{ metricBaseline }}</span>
    </div>

    <div class="bar-chart">
      <div
        v-for="(candidate, index) in candidates"
        :key="candidate.id"
        class="candidate-row"
        :class="`candidate-row--${candidate.id}`"
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
          <span v-if="index === bestCandidateIndex">lower</span>
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
              <th scope="col">Candidate</th>
              <th scope="col">Absolute duration error</th>
              <th scope="col">Approx. MCD</th>
              <th scope="col">F0 deviation</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="candidate in candidates" :key="`source-${candidate.id}`">
              <th scope="row">{{ candidate.title }}</th>
              <td>{{ candidate.duration.toFixed(3) }} s</td>
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
    summaryLabel: 'duration error',
    explanation: 'A closer duration match does not establish spectral or pitch similarity.',
  },
  {
    key: 'mcd' as const,
    label: 'Approximate Mel Cepstral Distortion',
    shortLabel: 'MCD',
    summaryLabel: 'approximate MCD',
    explanation: 'MCD compares spectral envelopes. These approximate values are meaningful only within this local evaluation pipeline.',
  },
  {
    key: 'f0' as const,
    label: 'Mean absolute F0 deviation',
    shortLabel: 'Pitch',
    summaryLabel: 'F0 deviation',
    explanation: 'F0 deviation measures the pitch difference from the reference. 100 cents equals one semitone.',
  },
];

const selectedMetricKey = ref<MetricKey>('mcd');
const selectedMetric = computed(() => metrics.find(metric => metric.key === selectedMetricKey.value) ?? metrics[1]);
const values = computed(() => candidates.map(candidate => candidate[selectedMetricKey.value]));
const bestCandidateIndex = computed(() => values.value[0] <= values.value[1] ? 0 : 1);
const worstCandidateIndex = computed(() => bestCandidateIndex.value === 0 ? 1 : 0);
const metricSummary = computed(() => {
  const improvement = (1 - values.value[bestCandidateIndex.value] / values.value[worstCandidateIndex.value]) * 100;
  return `${improvement.toFixed(1)}% lower ${selectedMetric.value.summaryLabel}`;
});
const metricBaseline = computed(() => `${candidates[bestCandidateIndex.value].title} compared with ${candidates[worstCandidateIndex.value].title.toLowerCase()}`);

function metricValue(candidateIndex: number) {
  return values.value[candidateIndex];
}

function barRatio(candidateIndex: number) {
  return metricValue(candidateIndex) / Math.max(...values.value);
}

function formatMetricValue(value: number) {
  if (selectedMetricKey.value === 'duration') return `${value.toFixed(3)} s`;
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
.chart-note { color: var(--faint); font-size: 0.75rem; line-height: 1.55; }
.chart-kicker { color: var(--faint); font-family: 'DM Mono', ui-monospace, monospace; font-size: 0.63rem; letter-spacing: 0.045em; text-transform: uppercase; }

.metric-controls {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.5rem;
  padding: 0.2rem;
  border: 1px solid var(--border-subtle);
  border-radius: 0.42rem;
  background: var(--surface);
}

.metric-controls button {
  min-width: 44px;
  min-height: 44px;
  padding: 0.35rem 0.5rem;
  border: 0;
  border-radius: 0.28rem;
  color: var(--faint);
  background: transparent;
  font-family: 'DM Mono', ui-monospace, monospace;
  font-size: 0.75rem;
  transition: color 150ms ease, background-color 150ms ease, transform 150ms var(--ease-out);
}

.metric-controls button.is-active { color: var(--foreground); background: var(--background); box-shadow: 0 1px 3px rgba(0, 0, 0, 0.07); }
.metric-controls button:focus-visible { outline: 2px solid var(--accent); outline-offset: -2px; }
.metric-controls button:active { transform: scale(0.98); }

.metric-readout {
  display: grid;
  gap: 0.35rem;
  padding: 0.85rem 0.9rem;
  border-left: 2px solid var(--accent);
  background: var(--surface);
}

.metric-readout__heading { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 0.35rem 1rem; }
.metric-readout span { color: var(--faint); font-size: 0.75rem; line-height: 1.5; }
.metric-direction { flex: 0 0 auto; }
.metric-readout strong { color: var(--foreground); font-size: 1.1rem; font-weight: 500; letter-spacing: -0.025em; line-height: 1.35; }
.metric-baseline { display: block; }

.bar-chart { display: grid; gap: 1rem; padding-block: 0.35rem; }
.candidate-row { --candidate-color: #1769d2; display: grid; grid-template-columns: minmax(9rem, 1.1fr) minmax(4rem, 2fr) max-content; align-items: center; gap: 0.8rem; }
.candidate-row--later { --candidate-color: #7651c9; }
.candidate-label { display: grid; gap: 0.18rem; min-width: 0; }
.candidate-label span { color: var(--foreground); font-size: 0.82rem; font-weight: 500; line-height: 1.4; }
.candidate-label small { color: var(--faint); font-size: 0.75rem; line-height: 1.4; }

.bar-track { height: 0.56rem; overflow: hidden; border-radius: 999px; background: var(--surface-hover); }
.bar-fill { display: block; width: 100%; height: 100%; border-radius: inherit; background: var(--candidate-color); transform-origin: left center; transition: transform 220ms var(--ease-out); }

.candidate-value { display: grid; justify-items: end; gap: 0.2rem; }
.candidate-value strong { color: var(--foreground); font-family: 'DM Mono', ui-monospace, monospace; font-size: 0.8rem; font-weight: 500; line-height: 1.4; white-space: nowrap; }
.candidate-value span { color: var(--candidate-color); font-size: 0.75rem; line-height: 1.4; }

.chart-note { display: flex; gap: 0.55rem; padding-top: 0.8rem; border-top: 1px solid var(--border-subtle); }
.chart-note span { color: var(--accent); font-family: 'DM Mono', ui-monospace, monospace; }

.source-data { color: var(--faint); font-size: 0.75rem; }
.source-data summary { width: fit-content; min-height: 44px; padding-block: 0.7rem; cursor: pointer; font-family: 'DM Mono', ui-monospace, monospace; }
.source-data summary:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; border-radius: 0.2rem; }
.source-data__scroll { margin-top: 0.8rem; overflow-x: auto; }
.source-data table { width: 100%; margin: 0; border-collapse: collapse; font-size: 0.75rem; }
.source-data th,
.source-data td { padding: 0.35rem; border-bottom: 1px solid var(--border-subtle); text-align: right; white-space: nowrap; }
.source-data th:first-child,
.source-data td:first-child { text-align: left; }
.source-data th[scope="row"] { font-weight: 400; }

@media (hover: hover) and (pointer: fine) {
  .metric-controls button:not(.is-active):hover { color: var(--foreground); background: var(--surface-hover); }
}

@media (max-width: 560px) {
  .comparison-chart { padding: 0.9rem; }
  .metric-controls button { padding-inline: 0.25rem; }
  .metric-readout__heading { display: grid; gap: 0.2rem; }
  .candidate-row { grid-template-columns: minmax(0, 1fr) auto; gap: 0.65rem 0.7rem; }
  .bar-track { grid-column: 1 / -1; grid-row: 2; }
  .candidate-value { grid-column: 2; grid-row: 1; }
}

:global(.dark) .candidate-row--selected { --candidate-color: #68a7ff; }
:global(.dark) .candidate-row--later { --candidate-color: #b39bff; }

@media (prefers-reduced-motion: reduce) {
  .metric-controls button,
  .bar-fill { transition-duration: 0ms; }
  .metric-controls button:active { transform: none; }
}
</style>
