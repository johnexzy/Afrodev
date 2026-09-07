<template>
  <figure class="thread-study">
    <svg viewBox="0 0 280 280" fill="none" aria-hidden="true">
      <path
        v-for="(path, index) in paths"
        :key="index"
        :d="path"
        stroke="currentColor"
        stroke-width=".6"
      />
    </svg>
    <figcaption>
      <span>Connection study / {{ String(seed).padStart(3, "0") }}</span
      ><button
        type="button"
        @click="seed++"
        aria-label="Redraw connection study"
        title="Redraw"
      >
        <span aria-hidden="true">↻</span>
      </button>
    </figcaption>
  </figure>
</template>
<script setup lang="ts">
const seed = ref(1);
const paths = computed(() =>
  Array.from({ length: 48 }, (_, line) => {
    const phase = (line / 48) * Math.PI * 2;
    const offset = seed.value * 0.41;
    return (
      Array.from({ length: 121 }, (_, step) => {
        const t = (step / 120) * Math.PI * 2;
        const r = 72 + 25 * Math.sin(t * 3 + phase + offset);
        const x = 140 + r * Math.cos(t) + 19 * Math.cos(phase + t * 2);
        const y = 138 + r * Math.sin(t) + 26 * Math.sin(phase + offset + t);
        return `${step === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`;
      }).join(" ") + "Z"
    );
  }),
);
</script>
<style scoped>
.thread-study {
  margin: 0;
  color: var(--accent);
}
svg {
  display: block;
  width: 100%;
  opacity: 0.72;
}
figcaption {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  font: 0.64rem var(--mono);
  color: var(--muted);
}
button {
  width: 32px;
  height: 32px;
  font-size: 1.25rem;
  color: var(--accent);
  border: 1px solid var(--border);
  border-radius: 50%;
}
@media (hover: hover) {
  button:hover {
    background: var(--accent-soft);
  }
}
</style>
