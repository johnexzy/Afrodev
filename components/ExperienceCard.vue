<template>
  <article class="experience-row">
    <time>{{ experience.period }}</time>
    <div>
      <h3>{{ experience.title }}</h3>
      <p class="experience-row__place">{{ experience.company }} · {{ experience.department }}</p>
      <p class="experience-row__description">{{ experience.description }}</p>
      <ul>
        <li v-for="achievement in experience.achievements" :key="achievement">{{ achievement }}</li>
      </ul>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { Experience } from "~/data/projects";

defineProps<{ experience: Experience }>();
</script>

<style scoped>
.experience-row {
  display: grid;
  grid-template-columns: 8rem minmax(0, 1fr);
  gap: 1rem;
  padding: 1.4rem 0;
  border-bottom: 1px solid var(--border-subtle);
}

.experience-row time {
  padding-top: 0.15rem;
  color: var(--faint);
  font-family: 'DM Mono', ui-monospace, monospace;
  font-size: 0.66rem;
  line-height: 1.5;
}

.experience-row h3 {
  margin: 0;
  font-size: 0.92rem;
  font-weight: 500;
  letter-spacing: -0.02em;
}

.experience-row__place {
  margin: 0.3rem 0 0;
  color: var(--faint);
  font-size: 0.72rem;
}

.experience-row__description {
  margin: 0.8rem 0 0;
  color: var(--muted);
  font-size: 0.8rem;
  line-height: 1.65;
}

.experience-row ul {
  margin: 0.8rem 0 0;
  padding-left: 1rem;
  color: var(--faint);
  font-size: 0.73rem;
  line-height: 1.6;
}

@media (max-width: 560px) {
  .experience-row {
    grid-template-columns: 1fr;
    gap: 0.6rem;
  }
}
</style>
