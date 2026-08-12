<template>
  <component
    :is="project.link ? 'a' : 'article'"
    class="project-item"
    :href="project.link"
    :target="project.link ? '_blank' : undefined"
    :rel="project.link ? 'noreferrer' : undefined"
  >
    <div class="project-item__heading">
      <div>
        <h3>{{ project.title }}</h3>
        <span>{{ project.subtitle }}</span>
      </div>
      <Icon v-if="project.link" name="ph:arrow-up-right" />
    </div>
    <p>{{ project.description }}</p>
    <div class="project-item__meta">
      <span>{{ project.status }}</span>
      <span>{{ project.technologies.slice(0, 4).join(' · ') }}</span>
    </div>
  </component>
</template>

<script setup lang="ts">
import type { Project } from "~/data/projects";

defineProps<{ project: Project }>();
</script>

<style scoped>
.project-item {
  display: flex;
  min-height: 12.5rem;
  flex-direction: column;
  padding: 1rem 1.1rem;
  border-radius: 0.45rem;
  color: var(--foreground);
  transition: opacity 160ms ease, background-color 160ms ease, transform 140ms var(--ease-out);
}

.project-item__heading {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
}

.project-item h3 {
  margin: 0;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: -0.025em;
}

.project-item__heading span {
  display: block;
  margin-top: 0.25rem;
  color: var(--faint);
  font-size: 0.7rem;
}

.project-item > p {
  display: -webkit-box;
  margin: 1rem 0 1.5rem;
  overflow: hidden;
  color: var(--muted);
  font-size: 0.78rem;
  line-height: 1.65;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}

.project-item__meta {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: auto;
  color: var(--faint);
  font-family: 'DM Mono', ui-monospace, monospace;
  font-size: 0.66rem;
  line-height: 1.5;
}

.project-item__meta span:last-child {
  text-align: right;
}

.project-item:active {
  transform: scale(0.98);
}

@media (hover: hover) and (pointer: fine) {
  .project-item:hover {
    opacity: 1;
    background: var(--surface-hover);
  }
}
</style>
