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
      <span class="eyebrow">Try the idea</span
      ><span>A small browser demonstration</span>
    </div>
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
      <label class="range-label" for="pixel-size"
        ><span>Cell size</span><output>{{ cell }} px</output></label
      >
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
          <span>{{ index + 1 }}</span
          ><span>{{ clip }}</span>
        </button>
      </div>
      <p class="demo-feedback" role="status">
        Selected: <strong>{{ clips[selected] }}</strong
        ><span>Nothing is copied to your clipboard.</span>
      </p>
    </template>
    <template v-else>
      <div class="playback-demo">
        <div v-for="person in ['You', 'A friend']" :key="person">
          <span>{{ person }}</span>
          <div class="playback-track">
            <i :style="{ width: position + '%' }" />
          </div>
          <output
            >{{ Math.floor((position * 2.58) / 60) }}:{{
              String(Math.floor((position * 2.58) % 60)).padStart(2, "0")
            }}</output
          >
        </div>
      </div>
      <label class="range-label" for="playback-position"
        ><span>Playback position</span><output>{{ position }}%</output></label
      ><input
        id="playback-position"
        v-model.number="position"
        type="range"
        min="0"
        max="100"
      />
      <p class="demo-footnote">
        One playback position, reflected in both rooms. The live project sends
        these changes over WebSockets.
      </p>
    </template>
  </section>
</template>
<script setup lang="ts">
defineProps<{ project: string }>();
const cell = ref(8);
const selected = ref(1);
const position = ref(33);
const clips = [
  "A note",
  "A link",
  "An image",
  "A file",
  "A colour",
  "A quote",
  "An idea",
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
          color: r < 16 ? "#c3a66b" : r < 35 ? "#344ab2" : "#8894cc",
        });
    }
  return result;
});
</script>
<style scoped>
.playground {
  margin: 40px 0;
  padding: 23px;
  border: 1px solid var(--border);
  background: var(--surface);
}
.playground-heading {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: center;
}
.playground-heading > span:last-child {
  font: 9px/1.5 var(--mono);
  color: var(--muted);
  text-align: right;
}
.pixel-demo {
  height: 190px;
  display: grid;
  place-items: center;
}
.pixel-demo svg {
  height: 180px;
  width: 240px;
}
.range-label {
  display: flex;
  justify-content: space-between;
  font: 11px var(--mono);
  color: var(--muted);
  margin-bottom: 10px;
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
  gap: 5px;
  margin-top: 25px;
}
.sample-clips button {
  display: flex;
  flex-direction: column;
  gap: 18px;
  text-align: left;
  border: 1px solid var(--border);
  padding: 8px 6px;
  height: 84px;
  background: var(--background);
  font-size: 10px;
}
.sample-clips button > span:first-child {
  font: 9px var(--mono);
  color: var(--faint);
}
.sample-clips [aria-pressed="true"] {
  border-color: var(--accent);
  background: var(--accent-soft);
  color: var(--accent);
  outline: 1px solid var(--accent);
}
.demo-feedback {
  font-size: 12px;
  margin-top: 18px;
  line-height: 1.6;
}
.demo-feedback > span {
  display: block;
  font-size: 11px;
  color: var(--muted);
  margin-top: 5px;
}
.playback-demo {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 26px;
  margin: 32px 0;
}
.playback-demo > div {
  font: 11px var(--mono);
}
.playback-track {
  height: 6px;
  background: var(--border);
  margin: 14px 0;
}
.playback-track i {
  display: block;
  height: 100%;
  background: var(--accent);
}
.demo-footnote {
  font-size: 12px;
  color: var(--muted);
  line-height: 1.7;
  margin-top: 12px;
}
@media (max-width: 520px) {
  .playground {
    padding: 18px;
  }
  .sample-clips {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 7px;
  }
}
</style>
