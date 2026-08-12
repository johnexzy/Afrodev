<template>
  <article class="expertise-row">
    <span>{{ String(index + 1).padStart(2, "0") }}</span>
    <h3>{{ expertise.title }}</h3>
    <p>{{ expertise.skills.join(' · ') }}</p>
  </article>
</template>

<script setup lang="ts">
import type { ExpertiseArea } from "~/data/projects";

withDefaults(defineProps<{ expertise: ExpertiseArea; index?: number }>(), {
  index: 0,
});
</script>

<style scoped>
.expertise-row {
  display: grid;
  grid-template-columns: 2rem 10rem minmax(0, 1fr);
  gap: 0.75rem;
  padding: 1rem 0;
  border-bottom: 1px solid var(--border-subtle);
}

.expertise-row > span {
  color: var(--faint);
  font-family: 'DM Mono', ui-monospace, monospace;
  font-size: 0.66rem;
}

.expertise-row h3,
.expertise-row p {
  margin: 0;
  font-size: 0.76rem;
  line-height: 1.55;
}

.expertise-row h3 {
  font-weight: 500;
}

.expertise-row p {
  color: var(--faint);
}

@media (max-width: 560px) {
  .expertise-row {
    grid-template-columns: 1.5rem 1fr;
  }

  .expertise-row p {
    grid-column: 2;
  }
}
</style>
