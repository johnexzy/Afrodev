<template>
  <section
    class="playground"
    :aria-label="
      project === 'pixelator'
        ? 'Pixel size demonstration'
        : project === 'now'
          ? 'Clipboard selection demonstration'
          : 'Playback synchronization demonstration'
    "
  >
    <div class="playground-heading">
      <span class="eyebrow">Try it out</span>
      <span class="playground-badge">Interactive preview</span>
    </div>

    <div class="playground-inner">
      <template v-if="project === 'pixelator'">
        <div class="pixel-demo">
          <svg
            viewBox="0 0 200 150"
            role="img"
            :aria-label="'Flower with ' + cell + ' pixel-wide cells'"
          >
            <rect
              v-for="(pixel, i) in flowerPixels"
              :key="i"
              :x="pixel.x"
              :y="pixel.y"
              :width="cell"
              :height="cell"
              :fill="pixel.color"
            />
          </svg>
        </div>
        <label class="range-label" for="pixel-size">
          <span>Cell size</span>
          <output>{{ cell }} px</output>
        </label>
        <input
          id="pixel-size"
          v-model.number="cell"
          type="range"
          min="3"
          max="20"
          step="1"
        />
      </template>

      <template v-else-if="project === 'now'">
        <div class="sample-clips" role="group" aria-label="Sample clips">
          <button
            v-for="(clip, index) in clips"
            :key="clip"
            type="button"
            :aria-pressed="selected === index"
            @click="selected = index"
            @keydown.right.prevent="moveClip(index + 1, $event)"
            @keydown.left.prevent="moveClip(index - 1, $event)"
          >
            <span>{{ index + 1 }}</span>
            <span>{{ clip }}</span>
          </button>
        </div>
        <p class="demo-feedback" role="status">
          Selected: <strong>{{ clips[selected] }}</strong>
          <span>Just a preview. Nothing is copied to your clipboard.</span>
        </p>
      </template>

      <template v-else>
        <div class="playback-demo">
          <div v-for="person in ['You', 'Friend']" :key="person">
            <div class="playback-demo__head">
              <span>{{ person }}</span>
              <output>
                {{ Math.floor((position * 2.58) / 60) }}:{{
                  String(Math.floor((position * 2.58) % 60)).padStart(2, "0")
                }}
              </output>
            </div>
            <div class="playback-track">
              <i :style="{ width: position + '%' }" />
            </div>
          </div>
        </div>
        <label class="range-label" for="playback-position">
          <span>Playback position</span>
          <output>{{ position }}%</output>
        </label>
        <input
          id="playback-position"
          v-model.number="position"
          type="range"
          min="0"
          max="100"
        />
        <p class="demo-footnote">
          Drag the slider to scrub both players together. In the real app, seek
          events sync over WebSockets.
        </p>
      </template>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{ project: string }>();
const cell = ref(8);
const selected = ref(1);
const position = ref(33);
const clips = [
  "API key",
  "GitHub URL",
  "Screenshot",
  "invoice.pdf",
  "#ff4d00",
  "SQL query",
  "Draft text",
];

function moveClip(index: number, event: KeyboardEvent) {
  selected.value = (index + clips.length) % clips.length;
  const parent = (event.currentTarget as HTMLElement).parentElement;
  (
    parent?.querySelectorAll("button")[selected.value] as HTMLButtonElement
  )?.focus();
}

const flowerPixels = computed(() => {
  const result: { x: number; y: number; color: string }[] = [];
  for (let y = 0; y < 150; y += cell.value)
    for (let x = 0; x < 200; x += cell.value) {
      const dx = x + cell.value / 2 - 100,
        dy = y + cell.value / 2 - 75,
        r = Math.hypot(dx, dy),
        a = Math.atan2(dy, dx);
      if (r < 48 + 13 * Math.sin(a * 5))
        result.push({
          x,
          y,
          color: r < 16 ? "#ff4d00" : r < 35 ? "#18181b" : "#71717a",
        });
    }
  return result;
});
</script>

<style scoped>
.playground {
  margin: 36px 0;
  padding: 10px;
  border-radius: var(--radius-card);
  border: 1px solid var(--border-subtle);
  background: var(--surface);
}

.playground-heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 8px 12px 12px;
}

.playground-badge {
  padding: 4px 10px;
  border-radius: var(--radius-pill);
  background: var(--card);
  border: 1px solid var(--border-subtle);
  font: 500 10.5px/1.2 var(--mono);
  color: var(--muted);
}

.playground-inner {
  padding: 22px;
  border-radius: var(--radius-inner);
  background: var(--card);
  border: 1px solid var(--border-subtle);
}

.pixel-demo {
  height: 185px;
  display: grid;
  place-items: center;
}

.pixel-demo svg {
  height: 175px;
  width: 235px;
}

.range-label {
  display: flex;
  justify-content: space-between;
  font: 500 12px var(--mono);
  color: var(--muted);
  margin: 8px 0 10px;
}

input[type="range"] {
  width: 100%;
  accent-color: var(--accent);
  height: 24px;
  cursor: ew-resize;
}

.sample-clips {
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: 7px;
}

.sample-clips button {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: left;
  border: 1px solid var(--border-subtle);
  border-radius: 14px;
  padding: 10px 8px;
  height: 82px;
  background: var(--surface);
  font-size: 11px;
  font-weight: 500;
  color: var(--foreground);
  transition:
    transform 180ms var(--ease-out),
    border-color 150ms ease,
    background-color 150ms ease;
}

.sample-clips button > span:first-child {
  font: 500 10px var(--mono);
  color: var(--faint);
}

.sample-clips [aria-pressed="true"] {
  border-color: var(--accent);
  background: var(--accent-soft);
  color: var(--accent);
  transform: translateY(-2px);
}

.demo-feedback {
  font-size: 13px;
  margin-top: 16px;
  line-height: 1.6;
}

.demo-feedback > span {
  display: block;
  font-size: 12px;
  color: var(--muted);
  margin-top: 3px;
}

.playback-demo {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
  margin-bottom: 22px;
}

.playback-demo > div {
  padding: 14px;
  border-radius: 14px;
  background: var(--surface);
  border: 1px solid var(--border-subtle);
  font: 500 12px var(--mono);
}

.playback-demo__head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.playback-demo__head output {
  color: var(--muted);
}

.playback-track {
  height: 6px;
  border-radius: 99px;
  background: var(--border);
  overflow: hidden;
}

.playback-track i {
  display: block;
  height: 100%;
  border-radius: 99px;
  background: var(--accent);
}

.demo-footnote {
  font-size: 12.5px;
  color: var(--muted);
  line-height: 1.65;
  margin-top: 10px;
}

@media (max-width: 600px) {
  .playground-inner {
    padding: 16px;
  }
  .sample-clips {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
  .playback-demo {
    grid-template-columns: 1fr;
  }
}
</style>
