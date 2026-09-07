<template>
  <main id="main-content" tabindex="-1">
    <div class="page-mast">
      <span>The work index</span
      ><span>Independent projects & collaborations</span>
    </div>
    <header class="page-heading reveal">
      <h1>Products, tools,<br /><em>& experiments.</em></h1>
      <p>
        Long-running products, small tools, and experiments that took on a life
        of their own.
      </p>
    </header>
    <div class="work-filters" aria-label="Filter projects">
      <button
        v-for="filter in filters"
        :key="filter"
        type="button"
        :aria-pressed="activeFilter === filter"
        @click="activeFilter = filter"
      >
        {{ filter }}<span>{{ countFor(filter) }}</span>
      </button>
    </div>
    <p class="sr-only" role="status">
      {{ visibleProjects.length }} projects shown
    </p>
    <div class="work-grid">
      <NuxtLink
        v-for="project in visibleProjects"
        :key="project.slug"
        :to="'/work/' + project.slug"
        class="work-card"
      >
        <WorkExhibit :variant="project.visual" />
        <div class="work-card__meta">
          <span>{{ project.category }}</span
          ><span>{{ project.period }}</span>
        </div>
        <h2>{{ project.title }}<span aria-hidden="true">↗</span></h2>
        <p>{{ project.summary }}</p>
      </NuxtLink>
    </div>
    <section class="editorial-section">
      <div class="section-label">
        <h2><span>↳</span>Smaller, earlier, open-ended</h2>
        <span class="eyebrow">Code worth sharing</span>
      </div>
      <a
        v-for="work in smallWorks"
        :key="work.title"
        :href="work.href"
        class="project-line"
        target="_blank"
        rel="noopener noreferrer"
        ><div>
          <h3>{{ work.title }}</h3>
          <p>{{ work.description }}</p>
        </div>
        <span class="mono">{{ work.category }}</span
        ><span class="line-arrow" aria-hidden="true">↗</span></a
      >
    </section>
    <section class="editorial-section">
      <div class="section-label">
        <h2><span>↳</span>Built with others</h2>
        <NuxtLink to="/about">Experience ↗</NuxtLink>
      </div>
      <a
        v-for="work in collaborations"
        :key="work.title"
        :href="work.href"
        class="project-line"
        ><div>
          <h3>{{ work.title }}</h3>
          <p>{{ work.description }}</p>
        </div>
        <span class="mono">{{ work.discipline }}</span
        ><span class="line-arrow" aria-hidden="true">↗</span></a
      >
    </section>
  </main>
</template>
<script setup lang="ts">
import { projects, smallWorks, collaborations } from "~/data/work";
const filters = ["All work", "Products", "Open source", "Experiments"];
const activeFilter = ref("All work");
const kinds: Record<string, string> = {
  Products: "Product",
  "Open source": "Open source",
  Experiments: "Experiment",
};
const countFor = (filter: string) =>
  filter === "All work"
    ? projects.length
    : projects.filter((p) => p.kind === kinds[filter]).length;
const visibleProjects = computed(() =>
  activeFilter.value === "All work"
    ? projects
    : projects.filter((p) => p.kind === kinds[activeFilter.value]),
);
useSeoMeta({
  title: "Work — John Oba",
  description:
    "Products, native Mac apps, open-source tools, and experiments by John Oba.",
  ogTitle: "Work — John Oba",
});
</script>
<style scoped>
.page-heading h1 {
  font-size: clamp(54px, 5.9vw, 76px);
  line-height: 1.06;
}
.work-filters {
  display: flex;
  gap: 22px;
  flex-wrap: wrap;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  margin-bottom: 28px;
}
.work-filters button {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 12px;
  min-height: 46px;
  color: var(--muted);
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
}
.work-filters button[aria-pressed="true"] {
  color: var(--accent);
  border-bottom-color: var(--accent);
}
.work-filters span {
  font: 9px var(--mono);
}
@media (max-width: 520px) {
  .page-heading h1 {
    font-size: 55px;
  }
  .work-filters {
    gap: 16px;
  }
  .work-filters button {
    font-size: 11px;
  }
}
</style>
