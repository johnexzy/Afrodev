<template>
  <component
    :is="project.link ? 'a' : 'article'"
    class="indie-item"
    :href="project.link"
    :target="project.link ? '_blank' : undefined"
    :rel="project.link ? 'noreferrer' : undefined"
  >
    <div>
      <h3>{{ project.title }}</h3>
      <Icon v-if="project.link" name="ph:arrow-up-right" />
    </div>
    <p>{{ project.description }}</p>
    <span>{{ project.technologies.slice(0, 3).join(' · ') }}</span>
  </component>
</template>

<script setup lang="ts">
import type { IndieProject } from "~/data/projects";

defineProps<{ project: IndieProject }>();
</script>

<style scoped>
.indie-item {
  min-height: 9rem;
  padding: 0.9rem 1rem;
  border-radius: 0.45rem;
  color: var(--foreground);
  transition: opacity 160ms ease, background-color 160ms ease, transform 140ms var(--ease-out);
}

.indie-item > div {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.indie-item h3 {
  margin: 0;
  font-size: 0.86rem;
  font-weight: 500;
}

.indie-item p {
  margin: 0.65rem 0 1rem;
  color: var(--muted);
  font-size: 0.75rem;
  line-height: 1.55;
}

.indie-item > span {
  color: var(--faint);
  font-family: 'DM Mono', ui-monospace, monospace;
  font-size: 0.66rem;
}

.indie-item:active {
  transform: scale(0.98);
}

@media (hover: hover) and (pointer: fine) {
  .indie-item:hover {
    opacity: 1;
    background: var(--surface-hover);
  }
}
</style>
