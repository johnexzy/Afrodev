<template>
  <figure class="audio-sample">
    <figcaption class="audio-sample__caption">
      <strong>{{ title }}</strong>
      <span>{{ description }}</span>
    </figcaption>

    <audio
      class="audio-sample__player"
      controls
      preload="metadata"
      :aria-label="`${title} audio sample`"
    >
      <source :src="src" type="audio/wav" />
      Your browser cannot play this audio file.
      <a :href="src">Download the WAV sample.</a>
    </audio>
  </figure>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  description: string;
  src: string;
}>();
</script>

<style scoped>
.audio-sample {
  display: grid;
  gap: 0.8rem;
  margin: 1rem 0;
  padding: 1rem;
  border: 1px solid var(--border-subtle);
  border-radius: 0.45rem;
  background: var(--surface);
}

.audio-sample__caption {
  display: grid;
  gap: 0.2rem;
}

.audio-sample__caption strong {
  color: var(--foreground);
  font-size: 0.86rem;
  font-weight: 500;
  letter-spacing: -0.015em;
}

.audio-sample__caption span {
  color: var(--faint);
  font-family: 'DM Mono', ui-monospace, monospace;
  font-size: 0.66rem;
  line-height: 1.55;
}

.audio-sample__player {
  display: block;
  width: 100%;
  height: 2.5rem;
  color-scheme: light dark;
}
</style>
