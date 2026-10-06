<template>
  <figure class="voice-chart" aria-labelledby="voice-progression-title">
    <figcaption class="chart-heading">
      <span class="chart-kicker">Playable waveform comparison</span>
      <strong id="voice-progression-title">John 3:16 across four XTTS stages</strong>
      <span id="voice-progression-help">Play the same sentence at each stage. Tap or click a waveform to seek, or use the arrow keys when focused.</span>
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
            <a :href="track.src" download :aria-label="`Download ${track.title} WAV file`">WAV ↓</a>
          </div>
        </header>

        <div class="track-player">
          <button
            class="play-button"
            type="button"
            :disabled="track.loading || track.error"
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

          <div class="track-timeline">
            <div
              class="waveform"
              role="slider"
              :tabindex="track.loading || track.error ? -1 : 0"
              :aria-label="`Seek within ${track.title}`"
              aria-describedby="voice-progression-help"
              :aria-disabled="track.loading || track.error"
              :aria-busy="track.loading"
              aria-valuemin="0"
              :aria-valuemax="track.duration"
              :aria-valuenow="trackCurrentTime(index)"
              :aria-valuetext="`${formatTime(trackCurrentTime(index))} of ${formatTime(track.duration)}`"
              @pointerdown="beginSeek(index, $event)"
              @pointermove="movePointer(index, $event)"
              @pointerup="finishSeek(index, $event)"
              @pointercancel="leaveWaveform"
              @pointerleave="leaveWaveform"
              @keydown.left.prevent="nudge(index, -1)"
              @keydown.right.prevent="nudge(index, 1)"
              @keydown.down.prevent="nudge(index, -1)"
              @keydown.up.prevent="nudge(index, 1)"
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
                <path class="waveform-shape waveform-shape--rest" :d="track.path" />
                <path
                  class="waveform-shape waveform-shape--played"
                  :d="track.path"
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
                v-if="hoverIndex === index && !track.loading && !track.error"
                class="hover-time"
                :style="{ left: `${hoverLeft}%` }"
              >
                {{ formatTime(track.duration * hoverRatio) }}
              </span>
            </div>
            <div class="timeline-meta" aria-hidden="true">
              <span>
                {{ track.loading ? 'Loading sample…' : track.error ? 'Preview unavailable' : `${formatTime(trackCurrentTime(index))} / ${formatTime(track.duration)}` }}
              </span>
            </div>
          </div>
        </div>

        <audio
          :ref="element => setAudioRef(element, index)"
          :src="track.src"
          preload="metadata"
          @ended="handleEnded(index)"
          @pause="handlePause(index)"
          @error="handlePlaybackError(index)"
        />

        <p v-if="track.error || track.playbackError" class="track-error" role="status">
          <span class="sr-only">{{ track.title }}. </span>
          {{ track.error ? 'Audio preview unavailable.' : 'Playback could not start. Try again or' }}
          <a :href="track.src">{{ track.error ? 'Open the WAV file directly.' : 'open the WAV file.' }}</a>
        </p>
      </article>
    </div>

    <div class="chart-note">
      <span aria-hidden="true">↳</span>
      <span class="chart-note-copy">Each waveform has its own time scale, from 0:00 to the sample’s duration. Audio is trimmed at 40 dB below peak and amplitude is normalized per track. Use listening to judge quality.</span>
    </div>

    <p class="sr-only" role="status" aria-atomic="true">{{ playbackAnnouncement }}</p>
  </figure>
</template>

<script setup lang="ts">
type Peak = { min: number; max: number };
type VoiceTrack = {
  id: string;
  title: string;
  description: string;
  src: string;
  path: string;
  duration: number;
  trimStart: number;
  trimEnd: number;
  loading: boolean;
  error: boolean;
  playbackError: boolean;
};

const tracks = reactive<VoiceTrack[]>([
  {
    id: 'base',
    title: 'Base XTTS model',
    description: 'Supplied 324-clip baseline',
    src: '/audio/voice-model-process/untrained-john-3-16.wav',
    path: 'M 0 36 L 600 36', duration: 0, trimStart: 0, trimEnd: 0, loading: true, error: false, playbackError: false,
  },
  {
    id: 'early',
    title: 'Earlier XTTS fine-tune',
    description: 'Intermediate model before selection',
    src: '/audio/voice-model-process/earlier-finetune-john-3-16.wav',
    path: 'M 0 36 L 600 36', duration: 0, trimStart: 0, trimEnd: 0, loading: true, error: false, playbackError: false,
  },
  {
    id: 'selected',
    title: 'Selected Gospels model',
    description: 'Validation-best · step 10,725',
    src: '/audio/voice-model-process/gospels-best-john-3-16.wav',
    path: 'M 0 36 L 600 36', duration: 0, trimStart: 0, trimEnd: 0, loading: true, error: false, playbackError: false,
  },
  {
    id: 'later',
    title: 'Checkpoint 34,000',
    description: 'Later model after validation loss increased',
    src: '/audio/voice-model-process/checkpoint-34000-john-3-16.wav',
    path: 'M 0 36 L 600 36', duration: 0, trimStart: 0, trimEnd: 0, loading: true, error: false, playbackError: false,
  },
]);

const audioElements: HTMLAudioElement[] = [];
const activeIndex = ref(-1);
const currentTime = ref(0);
const isPlaying = ref(false);
const hoverIndex = ref(-1);
const hoverRatio = ref(0);
let animationFrame: number | undefined;
let pointerStart: { id: number; index: number; x: number; y: number; moved: boolean } | undefined;

const hoverLeft = computed(() => Math.min(92, Math.max(8, hoverRatio.value * 100)));
const playbackAnnouncement = computed(() => {
  if (activeIndex.value < 0) return 'No audio sample is playing.';
  const track = tracks[activeIndex.value];
  return `${track.title} is ${isPlaying.value ? 'playing' : 'paused'}.`;
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
      track.path = buildWaveformPath(peaks);
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

function buildWaveformPath(peaks: Peak[]) {
  const lastIndex = peaks.length - 1;
  const upper = peaks.map((peak, index) => {
    const x = (index / lastIndex) * 600;
    return `${index === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${(36 - peak.max * 30).toFixed(2)}`;
  });
  const lower = [...peaks].reverse().map((peak, reverseIndex) => {
    const index = lastIndex - reverseIndex;
    const x = (index / lastIndex) * 600;
    return `L ${x.toFixed(2)} ${(36 - peak.min * 30).toFixed(2)}`;
  });
  return `${upper.join(' ')} ${lower.join(' ')} Z`;
}

async function togglePlayback(index: number) {
  const audio = audioElements[index];
  const track = tracks[index];
  if (!audio || track.loading || track.error) return;

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
  isPlaying.value = false;
  track.playbackError = false;

  try {
    await audio.play();
    if (activeIndex.value !== index) return;
    isPlaying.value = !audio.paused;
    if (isPlaying.value) startProgressLoop();
  } catch (error) {
    if (activeIndex.value !== index || (error instanceof DOMException && error.name === 'AbortError')) return;
    handlePlaybackError(index);
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
  currentTime.value = audioElements[index].currentTime;
  isPlaying.value = false;
  if (animationFrame) cancelAnimationFrame(animationFrame);
}

function handleEnded(index: number) {
  if (activeIndex.value !== index) return;
  const track = tracks[index];
  audioElements[index].currentTime = track.trimStart;
  currentTime.value = track.trimStart;
  isPlaying.value = false;
}

function handlePlaybackError(index: number) {
  tracks[index].playbackError = true;
  if (activeIndex.value !== index) return;
  audioElements[index]?.pause();
  isPlaying.value = false;
  if (animationFrame) cancelAnimationFrame(animationFrame);
}

function showHoverTime(index: number, event: PointerEvent) {
  const bounds = (event.currentTarget as HTMLElement).getBoundingClientRect();
  hoverIndex.value = index;
  hoverRatio.value = Math.min(1, Math.max(0, (event.clientX - bounds.left) / bounds.width));
}

function beginSeek(index: number, event: PointerEvent) {
  if (!event.isPrimary || event.button !== 0 || tracks[index].loading || tracks[index].error) return;
  pointerStart = { id: event.pointerId, index, x: event.clientX, y: event.clientY, moved: false };
}

function movePointer(index: number, event: PointerEvent) {
  if (pointerStart?.id === event.pointerId && Math.hypot(event.clientX - pointerStart.x, event.clientY - pointerStart.y) > 8) {
    pointerStart.moved = true;
  }
  if (event.pointerType !== 'touch' && !tracks[index].loading && !tracks[index].error) showHoverTime(index, event);
}

function finishSeek(index: number, event: PointerEvent) {
  const start = pointerStart;
  pointerStart = undefined;
  if (!start || start.id !== event.pointerId || start.index !== index || start.moved) return;
  if (Math.hypot(event.clientX - start.x, event.clientY - start.y) > 8) return;
  const bounds = (event.currentTarget as HTMLElement).getBoundingClientRect();
  seekToRatio(index, (event.clientX - bounds.left) / bounds.width);
}

function leaveWaveform() {
  pointerStart = undefined;
  hoverIndex.value = -1;
}

function seekToRatio(index: number, ratio: number) {
  const audio = audioElements[index];
  const track = tracks[index];
  if (!audio || track.loading || track.error) return;

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
  const current = trackCurrentTime(index);
  seekToRatio(index, (current + seconds) / Math.max(track.duration, 1));
}

function playbackRatio(index: number) {
  const track = tracks[index];
  if (!track.duration) return 0;
  return trackCurrentTime(index) / track.duration;
}

function trackCurrentTime(index: number) {
  const track = tracks[index];
  const time = activeIndex.value === index ? currentTime.value : (audioElements[index]?.currentTime ?? track.trimStart);
  return Math.min(track.duration, Math.max(0, time - track.trimStart));
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
.chart-note { color: var(--faint); font-size: 0.75rem; line-height: 1.55; }
.chart-kicker { color: var(--faint); font-family: 'DM Mono', ui-monospace, monospace; font-size: 0.75rem; letter-spacing: 0.045em; text-transform: uppercase; }

.track-list { display: grid; gap: 0.65rem; }

.voice-track {
  --track-color: #667085;
  display: grid;
  gap: 0.7rem;
  padding: 1.1rem;
  border: 1px solid var(--border-subtle);
  border-radius: 0.45rem;
  background: var(--surface);
  transition: border-color 150ms ease, background-color 150ms ease;
}

.voice-track--early { --track-color: #b85c00; }
.voice-track--selected { --track-color: #1769d2; }
.voice-track--later { --track-color: #7651c9; }
.voice-track.is-active { border-color: color-mix(in srgb, var(--track-color) 55%, var(--border)); background: color-mix(in srgb, var(--track-color) 4%, var(--surface)); }

.track-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 0.75rem; }
.track-header > div:first-child { display: grid; gap: 0.14rem; min-width: 0; }
.track-header strong { color: var(--foreground); font-size: 0.875rem; font-weight: 500; letter-spacing: -0.015em; }
.track-header span,
.track-meta a { color: var(--faint); font-family: 'DM Mono', ui-monospace, monospace; font-size: 0.75rem; line-height: 1.5; }
.track-meta { display: flex; flex: 0 0 auto; align-items: center; gap: 0.65rem; }
.track-meta a { display: inline-flex; min-width: 2.75rem; min-height: 2.75rem; align-items: center; justify-content: center; text-decoration: none; }
.track-meta a:hover { color: var(--foreground); }
.track-meta a:focus-visible { outline: 2px solid var(--track-color); outline-offset: 2px; border-radius: 0.25rem; }

.track-player { display: grid; grid-template-columns: 2.75rem minmax(0, 1fr); align-items: start; gap: 0.75rem; }
.track-timeline { display: grid; min-width: 0; gap: 0.25rem; }
.timeline-meta { display: flex; min-height: 1.125rem; justify-content: flex-end; color: var(--faint); font-family: 'DM Mono', ui-monospace, monospace; font-size: 0.75rem; line-height: 1.5; font-variant-numeric: tabular-nums; }

.play-button {
  display: grid;
  width: 2.75rem;
  height: 2.75rem;
  margin-top: 0.625rem;
  padding: 0;
  place-items: center;
  border: 1px solid color-mix(in srgb, var(--track-color) 48%, var(--border));
  border-radius: 50%;
  color: var(--track-color);
  background: var(--background);
  transition: transform 150ms var(--ease-out), background-color 150ms ease;
}

.play-button svg { width: 1rem; height: 1rem; fill: currentColor; }
.play-button:disabled { cursor: default; opacity: 0.45; }
.play-button:focus-visible { outline: 2px solid var(--track-color); outline-offset: 3px; }
.play-button:not(:disabled):active { transform: scale(0.94); }

.waveform {
  position: relative;
  min-width: 0;
  height: 4rem;
  overflow: visible;
  border-radius: 0.28rem;
  cursor: crosshair;
  touch-action: pan-y pinch-zoom;
}

.waveform[aria-disabled="true"] { cursor: default; }
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
  font-size: 0.75rem;
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
.track-error { margin: 0; color: var(--faint); font-size: 0.75rem; line-height: 1.55; }
.track-error a { color: var(--foreground); }

.chart-note { display: flex; gap: 0.55rem; padding-top: 0.8rem; border-top: 1px solid var(--border-subtle); }
.chart-note > span:first-child { color: var(--accent); font-family: 'DM Mono', ui-monospace, monospace; }

@media (hover: hover) and (pointer: fine) {
  .play-button:not(:disabled):hover { background: color-mix(in srgb, var(--track-color) 8%, var(--background)); }
}

@media (max-width: 560px) {
  .voice-chart { padding: 0.9rem; }
  .voice-track { padding: 0.9rem; }
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
