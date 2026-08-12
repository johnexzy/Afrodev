<template>
  <figure class="voice-chart" aria-labelledby="voice-progression-title">
    <figcaption class="chart-heading">
      <span class="chart-kicker">Playable waveform comparison</span>
      <strong id="voice-progression-title">John 3:16 across four XTTS stages</strong>
      <span>Play the same sentence at each stage, or select a position in any waveform to compare its timing.</span>
    </figcaption>

    <div class="track-list">
      <article
        v-for="(track, index) in tracks"
        :key="track.id"
        class="voice-track"
        :class="[`voice-track--${track.id}`, { 'is-active': activeIndex === index }]"
      >
        <header class="track-header">
          <div>
            <strong>{{ track.title }}</strong>
            <span>{{ track.description }}</span>
          </div>
          <div class="track-meta">
            <span>{{ track.loading ? 'Decoding…' : formatTime(track.duration) }}</span>
            <a :href="track.src" download :aria-label="`Download ${track.title} WAV file`">WAV ↓</a>
          </div>
        </header>

        <div class="track-player">
          <button
            class="play-button"
            type="button"
            :disabled="track.loading"
            :aria-label="activeIndex === index && isPlaying ? `Pause ${track.title}` : `Play ${track.title}`"
            @click="togglePlayback(index)"
          >
            <svg v-if="activeIndex === index && isPlaying" viewBox="0 0 16 16" aria-hidden="true">
              <rect x="3" y="2.5" width="3.5" height="11" rx="0.8" />
              <rect x="9.5" y="2.5" width="3.5" height="11" rx="0.8" />
            </svg>
            <svg v-else viewBox="0 0 16 16" aria-hidden="true">
              <path d="M4.2 2.8a1 1 0 0 1 1.5-.85l7.1 5.2a1 1 0 0 1 0 1.7l-7.1 5.2a1 1 0 0 1-1.5-.85V2.8Z" />
            </svg>
          </button>

          <div
            class="waveform"
            role="slider"
            tabindex="0"
            :aria-label="`Seek within ${track.title}`"
            aria-valuemin="0"
            :aria-valuemax="Math.round(track.duration)"
            :aria-valuenow="Math.round(trackCurrentTime(index))"
            :aria-valuetext="`${formatTime(trackCurrentTime(index))} of ${formatTime(track.duration)}`"
            @pointermove="showHoverTime(index, $event)"
            @pointerleave="hoverIndex = -1"
            @pointerdown="seekFromPointer(index, $event)"
            @keydown.left.prevent="nudge(index, -1)"
            @keydown.right.prevent="nudge(index, 1)"
            @keydown.home.prevent="seekToRatio(index, 0)"
            @keydown.end.prevent="seekToRatio(index, 1)"
          >
            <div v-if="track.loading" class="waveform-placeholder" aria-hidden="true">
              <span v-for="bar in 32" :key="bar" :style="{ height: `${placeholderHeight(bar, index)}%` }" />
            </div>

            <svg v-else viewBox="0 0 600 72" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <clipPath :id="`played-${track.id}`">
                  <rect x="0" y="0" :width="playbackRatio(index) * 600" height="72" />
                </clipPath>
              </defs>
              <line class="waveform-axis" x1="0" x2="600" y1="36" y2="36" />
              <path class="waveform-shape waveform-shape--rest" :d="waveformPath(track)" />
              <path
                class="waveform-shape waveform-shape--played"
                :d="waveformPath(track)"
                :clip-path="`url(#played-${track.id})`"
              />
              <line
                v-if="activeIndex === index"
                class="playhead"
                :x1="playbackRatio(index) * 600"
                :x2="playbackRatio(index) * 600"
                y1="5"
                y2="67"
              />
              <line
                v-if="hoverIndex === index"
                class="hover-guide"
                :x1="hoverRatio * 600"
                :x2="hoverRatio * 600"
                y1="7"
                y2="65"
              />
            </svg>

            <span
              v-if="hoverIndex === index && !track.loading"
              class="hover-time"
              :style="{ left: `${hoverLeft}%` }"
            >
              {{ formatTime(track.duration * hoverRatio) }}
            </span>
          </div>
        </div>

        <audio
          :ref="element => setAudioRef(element, index)"
          :src="track.src"
          preload="metadata"
          @ended="handleEnded(index)"
          @pause="handlePause(index)"
        />

        <p v-if="track.error" class="track-error">
          The waveform could not be decoded. <a :href="track.src">Open the WAV file directly.</a>
        </p>
      </article>
    </div>

    <div class="chart-note">
      <span aria-hidden="true">↳</span>
      Waveforms are decoded from the published WAV files, trimmed at 40 dB below peak, and normalized per track. Shape shows timing and energy—not perceived quality.
    </div>

    <p class="sr-only" aria-live="polite">{{ playbackAnnouncement }}</p>
  </figure>
</template>

<script setup lang="ts">
type Peak = { min: number; max: number };
type VoiceTrack = {
  id: string;
  title: string;
  description: string;
  src: string;
  peaks: Peak[];
  duration: number;
  trimStart: number;
  trimEnd: number;
  loading: boolean;
  error: boolean;
};

const tracks = reactive<VoiceTrack[]>([
  {
    id: 'base',
    title: 'Base XTTS model',
    description: 'Supplied 324-clip baseline',
    src: '/audio/voice-model-process/untrained-john-3-16.wav',
    peaks: [], duration: 0, trimStart: 0, trimEnd: 0, loading: true, error: false,
  },
  {
    id: 'early',
    title: 'Earlier XTTS fine-tune',
    description: 'Intermediate model before selection',
    src: '/audio/voice-model-process/earlier-finetune-john-3-16.wav',
    peaks: [], duration: 0, trimStart: 0, trimEnd: 0, loading: true, error: false,
  },
  {
    id: 'selected',
    title: 'Selected Gospels model',
    description: 'Validation-best · step 10,725',
    src: '/audio/voice-model-process/gospels-best-john-3-16.wav',
    peaks: [], duration: 0, trimStart: 0, trimEnd: 0, loading: true, error: false,
  },
  {
    id: 'later',
    title: 'Checkpoint 34,000',
    description: 'Later model after validation loss increased',
    src: '/audio/voice-model-process/checkpoint-34000-john-3-16.wav',
    peaks: [], duration: 0, trimStart: 0, trimEnd: 0, loading: true, error: false,
  },
]);

const audioElements: HTMLAudioElement[] = [];
const activeIndex = ref(-1);
const currentTime = ref(0);
const isPlaying = ref(false);
const hoverIndex = ref(-1);
const hoverRatio = ref(0);
let animationFrame: number | undefined;

const hoverLeft = computed(() => Math.min(92, Math.max(8, hoverRatio.value * 100)));
const playbackAnnouncement = computed(() => {
  if (activeIndex.value < 0) return 'No audio sample is playing.';
  const track = tracks[activeIndex.value];
  return `${track.title} is ${isPlaying.value ? 'playing' : 'paused'} at ${formatTime(trackCurrentTime(activeIndex.value))}.`;
});

function setAudioRef(element: unknown, index: number) {
  if (element instanceof HTMLAudioElement) audioElements[index] = element;
}

async function decodeTracks() {
  const AudioContextConstructor = window.AudioContext
    || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextConstructor) {
    tracks.forEach(track => { track.loading = false; track.error = true; });
    return;
  }

  const context = new AudioContextConstructor();
  await Promise.all(tracks.map(async (track) => {
    try {
      const response = await fetch(track.src);
      if (!response.ok) throw new Error(`Audio request failed with ${response.status}`);
      const buffer = await context.decodeAudioData(await response.arrayBuffer());
      const samples = buffer.getChannelData(0);
      const { peaks, startSample, endSample } = buildPeaks(samples, 360);
      track.peaks = peaks;
      track.trimStart = startSample / buffer.sampleRate;
      track.trimEnd = endSample / buffer.sampleRate;
      track.duration = track.trimEnd - track.trimStart;
    } catch {
      track.error = true;
    } finally {
      track.loading = false;
    }
  }));
  await context.close();
}

function buildPeaks(samples: Float32Array, bins: number) {
  let absolutePeak = 0;
  for (let index = 0; index < samples.length; index += 1) {
    absolutePeak = Math.max(absolutePeak, Math.abs(samples[index]));
  }

  const threshold = absolutePeak * 0.01;
  let startSample = 0;
  let endSample = samples.length;
  while (startSample < endSample && Math.abs(samples[startSample]) < threshold) startSample += 1;
  while (endSample > startSample && Math.abs(samples[endSample - 1]) < threshold) endSample -= 1;

  const usableLength = Math.max(1, endSample - startSample);
  const peaks: Peak[] = [];
  for (let bin = 0; bin < bins; bin += 1) {
    const from = startSample + Math.floor((bin / bins) * usableLength);
    const to = startSample + Math.max(Math.floor(((bin + 1) / bins) * usableLength), 1);
    let min = 0;
    let max = 0;
    for (let sampleIndex = from; sampleIndex < Math.min(to, endSample); sampleIndex += 1) {
      min = Math.min(min, samples[sampleIndex]);
      max = Math.max(max, samples[sampleIndex]);
    }
    peaks.push({
      min: absolutePeak ? min / absolutePeak : 0,
      max: absolutePeak ? max / absolutePeak : 0,
    });
  }

  return { peaks, startSample, endSample };
}

function waveformPath(track: VoiceTrack) {
  if (!track.peaks.length) return 'M 0 36 L 600 36';
  const lastIndex = track.peaks.length - 1;
  const upper = track.peaks.map((peak, index) => {
    const x = (index / lastIndex) * 600;
    return `${index === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${(36 - peak.max * 30).toFixed(2)}`;
  });
  const lower = [...track.peaks].reverse().map((peak, reverseIndex) => {
    const index = lastIndex - reverseIndex;
    const x = (index / lastIndex) * 600;
    return `L ${x.toFixed(2)} ${(36 - peak.min * 30).toFixed(2)}`;
  });
  return `${upper.join(' ')} ${lower.join(' ')} Z`;
}

async function togglePlayback(index: number) {
  const audio = audioElements[index];
  const track = tracks[index];
  if (!audio || track.loading) return;

  if (activeIndex.value === index && !audio.paused) {
    audio.pause();
    return;
  }

  audioElements.forEach((element, elementIndex) => {
    if (elementIndex !== index) element?.pause();
  });

  if (audio.currentTime < track.trimStart || audio.currentTime >= track.trimEnd) {
    audio.currentTime = track.trimStart;
  }
  activeIndex.value = index;
  currentTime.value = audio.currentTime;

  try {
    await audio.play();
    isPlaying.value = true;
    startProgressLoop();
  } catch {
    isPlaying.value = false;
  }
}

function startProgressLoop() {
  if (animationFrame) cancelAnimationFrame(animationFrame);
  const update = () => {
    const index = activeIndex.value;
    const audio = audioElements[index];
    const track = tracks[index];
    if (!audio || !track) return;
    currentTime.value = audio.currentTime;
    if (audio.currentTime >= track.trimEnd) {
      audio.pause();
      audio.currentTime = track.trimStart;
      currentTime.value = track.trimStart;
      isPlaying.value = false;
      return;
    }
    if (!audio.paused) animationFrame = requestAnimationFrame(update);
  };
  animationFrame = requestAnimationFrame(update);
}

function handlePause(index: number) {
  if (activeIndex.value !== index) return;
  isPlaying.value = false;
  if (animationFrame) cancelAnimationFrame(animationFrame);
}

function handleEnded(index: number) {
  const track = tracks[index];
  activeIndex.value = index;
  currentTime.value = track.trimStart;
  isPlaying.value = false;
}

function showHoverTime(index: number, event: PointerEvent) {
  const bounds = (event.currentTarget as HTMLElement).getBoundingClientRect();
  hoverIndex.value = index;
  hoverRatio.value = Math.min(1, Math.max(0, (event.clientX - bounds.left) / bounds.width));
}

function seekFromPointer(index: number, event: PointerEvent) {
  showHoverTime(index, event);
  seekToRatio(index, hoverRatio.value);
}

function seekToRatio(index: number, ratio: number) {
  const audio = audioElements[index];
  const track = tracks[index];
  if (!audio || track.loading) return;

  if (activeIndex.value !== index) {
    audioElements.forEach(element => element?.pause());
    activeIndex.value = index;
    isPlaying.value = false;
  }

  const boundedRatio = Math.min(1, Math.max(0, ratio));
  audio.currentTime = track.trimStart + boundedRatio * track.duration;
  currentTime.value = audio.currentTime;
}

function nudge(index: number, seconds: number) {
  const track = tracks[index];
  const current = activeIndex.value === index ? trackCurrentTime(index) : 0;
  seekToRatio(index, (current + seconds) / Math.max(track.duration, 1));
}

function playbackRatio(index: number) {
  if (activeIndex.value !== index) return 0;
  const track = tracks[index];
  if (!track.duration) return 0;
  return Math.min(1, Math.max(0, (currentTime.value - track.trimStart) / track.duration));
}

function trackCurrentTime(index: number) {
  if (activeIndex.value !== index) return 0;
  const track = tracks[index];
  return Math.min(track.duration, Math.max(0, currentTime.value - track.trimStart));
}

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds <= 0) return '0:00';
  const minutes = Math.floor(seconds / 60);
  const remainder = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${minutes}:${remainder}`;
}

function placeholderHeight(bar: number, trackIndex: number) {
  return 18 + ((bar * 17 + trackIndex * 11) % 64);
}

onMounted(decodeTracks);

onBeforeUnmount(() => {
  if (animationFrame) cancelAnimationFrame(animationFrame);
  audioElements.forEach(audio => audio?.pause());
});
</script>

<style scoped>
.voice-chart {
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

.track-list { display: grid; gap: 0.65rem; }

.voice-track {
  --track-color: #667085;
  display: grid;
  gap: 0.7rem;
  padding: 0.82rem;
  border: 1px solid var(--border-subtle);
  border-radius: 0.45rem;
  background: var(--surface);
  transition: border-color 150ms ease, background-color 150ms ease;
}

.voice-track--early { --track-color: #b85c00; }
.voice-track--selected { --track-color: #1769d2; }
.voice-track--later { --track-color: #7651c9; }
.voice-track.is-active { border-color: color-mix(in srgb, var(--track-color) 55%, var(--border)); background: color-mix(in srgb, var(--track-color) 4%, var(--surface)); }

.track-header { display: flex; justify-content: space-between; gap: 1rem; }
.track-header > div:first-child { display: grid; gap: 0.14rem; min-width: 0; }
.track-header strong { color: var(--foreground); font-size: 0.82rem; font-weight: 500; letter-spacing: -0.015em; }
.track-header span,
.track-meta a { color: var(--faint); font-family: 'DM Mono', ui-monospace, monospace; font-size: 0.61rem; line-height: 1.5; }
.track-meta { display: flex; flex: 0 0 auto; align-items: center; gap: 0.65rem; }
.track-meta a { text-decoration: none; }
.track-meta a:hover { color: var(--foreground); }

.track-player { display: grid; grid-template-columns: 2rem minmax(0, 1fr); align-items: center; gap: 0.7rem; }

.play-button {
  display: grid;
  width: 2rem;
  height: 2rem;
  padding: 0;
  place-items: center;
  border: 1px solid color-mix(in srgb, var(--track-color) 48%, var(--border));
  border-radius: 50%;
  color: var(--track-color);
  background: var(--background);
  transition: transform 150ms var(--ease-out), background-color 150ms ease;
}

.play-button svg { width: 0.85rem; height: 0.85rem; fill: currentColor; }
.play-button:disabled { cursor: wait; opacity: 0.45; }
.play-button:not(:disabled):active { transform: scale(0.94); }

.waveform {
  position: relative;
  min-width: 0;
  height: 4.5rem;
  overflow: visible;
  border-radius: 0.28rem;
  cursor: crosshair;
  touch-action: none;
}

.waveform:focus-visible { outline: 2px solid var(--track-color); outline-offset: 3px; }
.waveform svg { display: block; width: 100%; height: 100%; overflow: visible; }
.waveform-axis { stroke: var(--border-subtle); stroke-width: 1; }
.waveform-shape { stroke: none; }
.waveform-shape--rest { fill: color-mix(in srgb, var(--track-color) 26%, transparent); }
.waveform-shape--played { fill: var(--track-color); }
.playhead { stroke: var(--foreground); stroke-width: 1.5; }
.hover-guide { stroke: var(--track-color); stroke-width: 1; stroke-dasharray: 2 3; opacity: 0.72; }

.hover-time {
  position: absolute;
  top: -0.25rem;
  z-index: 2;
  padding: 0.15rem 0.3rem;
  border: 1px solid var(--border);
  border-radius: 0.25rem;
  color: var(--foreground);
  background: var(--background);
  font-family: 'DM Mono', ui-monospace, monospace;
  font-size: 0.58rem;
  line-height: 1;
  pointer-events: none;
  transform: translate(-50%, -100%);
}

.waveform-placeholder {
  display: flex;
  height: 100%;
  align-items: center;
  gap: 2px;
  opacity: 0.38;
}

.waveform-placeholder span { flex: 1; max-height: 80%; border-radius: 1px; background: var(--track-color); }
.voice-track audio { display: none; }
.track-error { margin: 0; color: var(--faint); font-size: 0.68rem; }
.track-error a { color: var(--foreground); }

.chart-note { display: flex; gap: 0.55rem; padding-top: 0.8rem; border-top: 1px solid var(--border-subtle); }
.chart-note span { color: var(--accent); font-family: 'DM Mono', ui-monospace, monospace; }

@media (hover: hover) and (pointer: fine) {
  .play-button:not(:disabled):hover { background: color-mix(in srgb, var(--track-color) 8%, var(--background)); }
}

@media (max-width: 560px) {
  .voice-chart { padding: 0.9rem; }
  .track-header { align-items: flex-start; }
  .track-meta { display: grid; justify-items: end; gap: 0.12rem; }
  .track-player { gap: 0.55rem; }
  .waveform { height: 4rem; }
}

:global(.dark) .voice-track--base { --track-color: #aab0ba; }
:global(.dark) .voice-track--early { --track-color: #f0a34a; }
:global(.dark) .voice-track--selected { --track-color: #68a7ff; }
:global(.dark) .voice-track--later { --track-color: #b39bff; }

@media (prefers-reduced-motion: reduce) {
  .voice-track,
  .play-button { transition-duration: 0ms; }
}
</style>
