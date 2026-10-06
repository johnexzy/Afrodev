<template>
  <figure class="loss-chart" aria-labelledby="xtts-loss-title">
    <figcaption class="chart-heading">
      <span class="chart-kicker">Training evidence</span>
      <strong id="xtts-loss-title">Evaluation loss by global step</strong>
      <span>Choose a run to inspect its checkpoints. Each point is one held-out evaluation pass.</span>
    </figcaption>

    <div class="chart-toolbar" role="group" aria-label="Training run to inspect">
      <button
        v-for="run in runs"
        :key="run.id"
        class="series-toggle"
        :class="[`series-toggle--${run.id}`, { 'is-active': activeRun.id === run.id }]"
        type="button"
        :aria-label="run.label"
        :aria-pressed="activeRun.id === run.id"
        @click="setActivePoint(run.id, run.bestIndex)"
      >
        <span class="series-toggle__line" aria-hidden="true" />
        {{ run.shortLabel }}
      </button>
      <span class="chart-toolbar__hint">Lower is better</span>
    </div>

    <div class="chart-readout" :class="`chart-readout--${activeRun.id}`">
      <div class="chart-readout__value">
        <span class="chart-readout__eyebrow">{{ activeRun.label }}</span>
        <strong>Step {{ formatStep(activePoint.step) }} · Loss {{ activePoint.loss.toFixed(4) }}</strong>
      </div>
      <div class="checkpoint-controls" role="group" aria-label="Inspect checkpoints">
        <button type="button" aria-label="Previous checkpoint" :disabled="activeSelection.pointIndex === 0" @click="moveCheckpoint(-1)">
          <svg viewBox="0 0 20 20" aria-hidden="true"><path d="m12 5-5 5 5 5" /></svg>
        </button>
        <span>Checkpoint {{ activeSelection.pointIndex + 1 }} / {{ activeRun.points.length }}</span>
        <button type="button" aria-label="Next checkpoint" :disabled="activeSelection.pointIndex === activeRun.points.length - 1" @click="moveCheckpoint(1)">
          <svg viewBox="0 0 20 20" aria-hidden="true"><path d="m8 5 5 5-5 5" /></svg>
        </button>
      </div>
      <span class="chart-readout__summary">{{ activePointSummary }}</span>
    </div>
    <p class="sr-only" aria-live="polite">{{ checkpointAnnouncement }}</p>

    <div ref="chartContainer" class="chart-canvas">
      <svg
        :viewBox="`0 0 ${chartWidth} ${chartHeight}`"
        role="img"
        aria-labelledby="xtts-loss-title xtts-loss-description"
        @pointermove="inspectPoint($event, true)"
        @click="inspectPoint($event)"
      >
        <desc id="xtts-loss-description">
          The Genesis and Gospels runs both reached their minimum evaluation loss before their final epoch.
          Use the training run buttons and previous or next checkpoint controls to inspect every value.
        </desc>

        <g class="chart-grid" aria-hidden="true">
          <template v-for="tick in yTicks" :key="`y-${tick}`">
            <line
              :x1="margins.left"
              :x2="chartWidth - margins.right"
              :y1="yScale(tick)"
              :y2="yScale(tick)"
            />
            <text :x="margins.left - 10" :y="yScale(tick) + 4" text-anchor="end">
              {{ tick.toFixed(1) }}
            </text>
          </template>

          <template v-for="tick in xTicks" :key="`x-${tick}`">
            <line
              :x1="xScale(tick)"
              :x2="xScale(tick)"
              :y1="margins.top"
              :y2="chartHeight - margins.bottom"
            />
            <text
              :x="xScale(tick)"
              :y="chartHeight - margins.bottom + 24"
              text-anchor="middle"
            >
              {{ formatAxisStep(tick) }}
            </text>
          </template>
        </g>

        <text
          class="axis-label"
          :x="margins.left + plotWidth / 2"
          :y="chartHeight - 7"
          text-anchor="middle"
        >
          Global training step
        </text>

        <g
          v-for="run in runs"
          :key="run.id"
          class="chart-series"
          :class="`chart-series--${run.id}`"
          aria-hidden="true"
        >
          <path class="series-line" :d="linePath(run.points)" />

          <g
            v-for="(point, pointIndex) in run.points"
            :key="`${run.id}-${point.step}`"
          >
            <circle
              v-if="pointIndex === run.bestIndex"
              class="best-ring"
              :cx="xScale(point.step)"
              :cy="yScale(point.loss)"
              r="8"
              aria-hidden="true"
            />
            <circle
              class="series-point"
              :class="{ 'is-active': activeRun.id === run.id && activePoint.step === point.step }"
              :cx="xScale(point.step)"
              :cy="yScale(point.loss)"
              r="4.5"
            />
          </g>
        </g>

        <g class="active-guide" aria-hidden="true">
          <line
            :x1="xScale(activePoint.step)"
            :x2="xScale(activePoint.step)"
            :y1="margins.top"
            :y2="chartHeight - margins.bottom"
          />
        </g>
      </svg>
    </div>

    <div class="chart-note">
      <span class="chart-note__mark" aria-hidden="true">↳</span>
      Both runs selected an earlier checkpoint. Compare progress within each run; the datasets differ.
    </div>

    <details class="source-data">
      <summary>View the source data</summary>
      <div class="source-data__tables">
        <table v-for="run in runs" :key="`table-${run.id}`">
          <caption>{{ run.label }}</caption>
          <thead>
            <tr><th scope="col">Step</th><th scope="col">Loss</th></tr>
          </thead>
          <tbody>
            <tr v-for="(point, pointIndex) in run.points" :key="`row-${run.id}-${point.step}`">
              <td>{{ formatStep(point.step) }}<span v-if="pointIndex === run.bestIndex"> · selected</span></td>
              <td>{{ point.loss.toFixed(4) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </details>
  </figure>
</template>

<script setup lang="ts">
type LossPoint = { step: number; loss: number };
type RunId = 'genesis' | 'gospels';
type TrainingRun = {
  id: RunId;
  label: string;
  shortLabel: string;
  bestIndex: number;
  points: LossPoint[];
};

const runs: TrainingRun[] = [
  {
    id: 'genesis',
    label: '324-clip Genesis run',
    shortLabel: 'Genesis · 324',
    bestIndex: 2,
    points: [
      { step: 1884, loss: 3.1101099253 },
      { step: 3768, loss: 3.05509607 },
      { step: 5652, loss: 3.0367200573 },
      { step: 7536, loss: 3.0746080677 },
      { step: 9420, loss: 3.1275383234 },
      { step: 11304, loss: 3.1283467412 },
      { step: 13188, loss: 3.2042888999 },
      { step: 15072, loss: 3.256249547 },
      { step: 16956, loss: 3.3400648634 },
      { step: 18840, loss: 3.4393151999 },
      { step: 20724, loss: 3.4656036297 },
      { step: 22608, loss: 3.5642474492 },
      { step: 24492, loss: 3.5975157221 },
      { step: 26376, loss: 3.781538705 },
      { step: 28260, loss: 3.773742497 },
    ],
  },
  {
    id: 'gospels',
    label: '3,611-clip Gospels run',
    shortLabel: 'Gospels · 3,611',
    bestIndex: 2,
    points: [
      { step: 3575, loss: 2.8874030731 },
      { step: 7150, loss: 2.8227101962 },
      { step: 10725, loss: 2.8184737188 },
      { step: 14300, loss: 2.8321126214 },
      { step: 17875, loss: 2.8420247149 },
      { step: 21450, loss: 2.8668076992 },
      { step: 25025, loss: 2.9122191623 },
      { step: 28600, loss: 2.9699098446 },
      { step: 32175, loss: 2.9970024957 },
      { step: 35750, loss: 3.092538136 },
    ],
  },
];

const chartContainer = ref<HTMLElement | null>(null);
const chartWidth = ref(720);
const activeSelection = ref<{ runId: RunId; pointIndex: number }>({
  runId: 'gospels',
  pointIndex: 2,
});
const checkpointAnnouncement = ref('');
let resizeObserver: ResizeObserver | undefined;

const chartHeight = computed(() => chartWidth.value < 520 ? 330 : 360);
const margins = computed(() => ({
  top: 20,
  right: chartWidth.value < 520 ? 14 : 20,
  bottom: 46,
  left: chartWidth.value < 520 ? 43 : 50,
}));
const plotWidth = computed(() => chartWidth.value - margins.value.left - margins.value.right);
const plotHeight = computed(() => chartHeight.value - margins.value.top - margins.value.bottom);
const xTicks = computed(() => chartWidth.value < 520
  ? [0, 12000, 24000, 36000]
  : [0, 6000, 12000, 18000, 24000, 30000, 36000]);
const yTicks = [2.8, 3.0, 3.2, 3.4, 3.6, 3.8];

const activeRun = computed(() => runs.find(run => run.id === activeSelection.value.runId) ?? runs[1]);
const activePoint = computed(() => activeRun.value.points[activeSelection.value.pointIndex]);
const activePointSummary = computed(() => {
  const bestPoint = activeRun.value.points[activeRun.value.bestIndex];
  if (activePoint.value.step === bestPoint.step) return 'Selected checkpoint · minimum evaluation loss';
  const increase = ((activePoint.value.loss / bestPoint.loss) - 1) * 100;
  return `${increase.toFixed(1)}% above this run’s minimum`;
});

function xScale(step: number) {
  return margins.value.left + (step / 36000) * plotWidth.value;
}

function yScale(loss: number) {
  return margins.value.top + ((3.82 - loss) / (3.82 - 2.78)) * plotHeight.value;
}

function linePath(points: LossPoint[]) {
  return points.map((point, index) =>
    `${index === 0 ? 'M' : 'L'} ${xScale(point.step).toFixed(2)} ${yScale(point.loss).toFixed(2)}`,
  ).join(' ');
}

function setActivePoint(runId: RunId, pointIndex: number, announce = true) {
  activeSelection.value = { runId, pointIndex };
  if (announce) {
    checkpointAnnouncement.value = `${activeRun.value.label}, checkpoint ${pointIndex + 1} of ${activeRun.value.points.length}, step ${formatStep(activePoint.value.step)}, loss ${activePoint.value.loss.toFixed(4)}. ${activePointSummary.value}.`;
  }
}

function moveCheckpoint(direction: number) {
  setActivePoint(activeRun.value.id, activeSelection.value.pointIndex + direction);
}

function inspectPoint(event: MouseEvent | PointerEvent, hover = false) {
  if (hover && (event as PointerEvent).pointerType !== 'mouse') return;
  const bounds = (event.currentTarget as SVGSVGElement).getBoundingClientRect();
  const x = (event.clientX - bounds.left) / bounds.width * chartWidth.value;
  const y = (event.clientY - bounds.top) / bounds.height * chartHeight.value;
  let nearest: { runId: RunId; pointIndex: number } | undefined;
  let distance = 32;
  for (const run of hover ? [activeRun.value] : runs) {
    for (let pointIndex = 0; pointIndex < run.points.length; pointIndex += 1) {
      const point = run.points[pointIndex];
      const pointDistance = Math.hypot(x - xScale(point.step), y - yScale(point.loss));
      if (pointDistance < distance) {
        distance = pointDistance;
        nearest = { runId: run.id, pointIndex };
      }
    }
  }
  if (nearest) {
    setActivePoint(nearest.runId, nearest.pointIndex, !hover);
  }
}

function formatStep(step: number) {
  return step.toLocaleString('en-US');
}

function formatAxisStep(step: number) {
  return step === 0 ? '0' : `${step / 1000}k`;
}

onMounted(() => {
  if (!chartContainer.value) return;
  resizeObserver = new ResizeObserver(([entry]) => {
    chartWidth.value = Math.round(entry.contentRect.width);
  });
  resizeObserver.observe(chartContainer.value);
});

onBeforeUnmount(() => resizeObserver?.disconnect());
</script>

<style scoped>
.loss-chart {
  --genesis: #b85c00;
  --gospels: #1769d2;
  display: grid;
  gap: 1rem;
  margin: 1.5rem 0;
  padding: 1.1rem;
  border: 1px solid var(--border-subtle);
  border-radius: 0.55rem;
  background: color-mix(in srgb, var(--background) 88%, var(--surface));
}

.chart-heading {
  display: grid;
  gap: 0.28rem;
}

.chart-heading strong {
  color: var(--foreground);
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: -0.025em;
}

.chart-heading > span:last-child,
.chart-readout span,
.chart-note,
.chart-toolbar__hint {
  color: var(--faint);
  font-size: 0.75rem;
  line-height: 1.55;
}

.chart-kicker,
.chart-readout__eyebrow {
  color: var(--faint);
  font-family: 'DM Mono', ui-monospace, monospace;
  font-size: 0.6875rem !important;
  letter-spacing: 0.045em;
  text-transform: uppercase;
}

.chart-toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
}

.series-toggle {
  --run-color: var(--gospels);
  display: inline-flex;
  align-items: center;
  gap: 0.42rem;
  min-height: 2.75rem;
  padding: 0.5rem 0.65rem;
  border: 1px solid var(--border-subtle);
  border-radius: 0.35rem;
  color: var(--foreground);
  background: transparent;
  font-family: 'DM Mono', ui-monospace, monospace;
  font-size: 0.6875rem;
  transition: color 150ms ease, background-color 150ms ease, transform 150ms var(--ease-out);
}

.series-toggle--genesis { --run-color: var(--genesis); }
.series-toggle.is-active { border-color: color-mix(in srgb, var(--run-color) 45%, var(--border-subtle)); background: var(--surface); }
.series-toggle:focus-visible,
.checkpoint-controls button:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }
.series-toggle:active { transform: scale(0.97); }

.series-toggle__line {
  width: 1rem;
  height: 2px;
  border-radius: 999px;
  background: var(--run-color);
}

.chart-toolbar__hint { margin-left: auto; }

.chart-readout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 0.4rem 1rem;
  padding: 0.8rem;
  border-left: 2px solid var(--gospels);
  border-radius: 0 0.35rem 0.35rem 0;
  background: var(--surface);
}

.chart-readout--genesis { border-left-color: var(--genesis); }

.chart-readout__value { display: grid; gap: 0.3rem; min-width: 0; }

.chart-readout strong {
  color: var(--foreground);
  font-size: 0.875rem;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
}

.chart-readout__summary { grid-column: 1 / -1; }

.checkpoint-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.checkpoint-controls span { font-family: 'DM Mono', ui-monospace, monospace; font-size: 0.6875rem; white-space: nowrap; font-variant-numeric: tabular-nums; }
.checkpoint-controls button { display: grid; place-items: center; width: 2.75rem; height: 2.75rem; border: 1px solid var(--border-subtle); border-radius: 0.35rem; background: var(--background); color: var(--foreground); transition: background-color 150ms ease, transform 150ms var(--ease-out); }
.checkpoint-controls button:active:not(:disabled) { transform: scale(0.95); }
.checkpoint-controls button:disabled { color: var(--faint); opacity: 0.4; cursor: default; }
.checkpoint-controls svg { width: 1rem; height: 1rem; fill: none; stroke: currentColor; stroke-width: 1.6; stroke-linecap: round; stroke-linejoin: round; }

.chart-canvas {
  width: 100%;
  min-width: 0;
}

.chart-canvas svg {
  display: block;
  width: 100%;
  height: auto;
  overflow: visible;
  touch-action: pan-y pinch-zoom;
  cursor: crosshair;
}

.chart-grid line {
  stroke: var(--border-subtle);
  stroke-width: 1;
}

.chart-grid text,
.axis-label {
  fill: var(--faint);
  font-family: 'DM Mono', ui-monospace, monospace;
  font-size: 11px;
}

.chart-series { --run-color: var(--gospels); color: var(--run-color); }
.chart-series--genesis { --run-color: var(--genesis); }
.series-line { fill: none; stroke: var(--run-color); stroke-width: 2.25; stroke-linecap: round; stroke-linejoin: round; }
.series-point { fill: var(--background); stroke: var(--run-color); stroke-width: 2.5; transition: fill 150ms ease; }
.series-point.is-active { r: 6px; fill: var(--run-color); }
.best-ring { fill: none; stroke: var(--run-color); stroke-width: 1.5; opacity: 0.42; }

.active-guide line {
  stroke: var(--faint);
  stroke-width: 1;
  stroke-dasharray: 3 4;
  opacity: 0.42;
}

.active-guide { pointer-events: none; }

.chart-note {
  display: flex;
  gap: 0.55rem;
  padding-top: 0.8rem;
  border-top: 1px solid var(--border-subtle);
}

.chart-note__mark { color: var(--accent); font-family: 'DM Mono', ui-monospace, monospace; }

.source-data {
  color: var(--faint);
  font-size: 0.75rem;
}

.source-data summary {
  width: fit-content;
  cursor: pointer;
  font-family: 'DM Mono', ui-monospace, monospace;
  min-height: 2.75rem;
  align-content: center;
}

.source-data__tables {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
  margin-top: 0.8rem;
  overflow-x: auto;
}

.source-data table { width: 100%; margin: 0; border-collapse: collapse; font-size: 0.75rem; }
.source-data caption { padding-bottom: 0.4rem; color: var(--foreground); font-weight: 500; text-align: left; }
.source-data th,
.source-data td { padding: 0.28rem 0.35rem; border-bottom: 1px solid var(--border-subtle); text-align: right; white-space: nowrap; }
.source-data th:first-child,
.source-data td:first-child { text-align: left; }

@media (hover: hover) and (pointer: fine) {
  .series-toggle:hover { background: var(--surface-hover); }
  .checkpoint-controls button:not(:disabled):hover { background: var(--surface-hover); }
}

@media (max-width: 560px) {
  .loss-chart { margin-inline: 0; padding: 0.9rem; }
  .chart-toolbar { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .series-toggle { justify-content: center; padding-inline: 0.125rem; gap: 0.25rem; }
  .series-toggle__line { width: 0.375rem; flex: 0 0 auto; }
  .chart-toolbar__hint { grid-column: 1 / -1; width: 100%; margin-left: 0; }
  .chart-readout { grid-template-columns: 1fr; }
  .checkpoint-controls { justify-content: space-between; }
  .source-data__tables { grid-template-columns: 1fr; }
}

:global(.dark) .loss-chart {
  --genesis: #f0a34a;
  --gospels: #68a7ff;
}

@media (prefers-reduced-motion: reduce) {
  .series-toggle,
  .checkpoint-controls button,
  .series-point { transition-duration: 0ms; }
  .series-toggle:active,
  .checkpoint-controls button:active:not(:disabled) { transform: none; }
}
</style>
