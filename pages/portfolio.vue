<template>
  <main id="main-content" tabindex="-1">
    <header class="page-hero reveal">
      <div class="split-pill">
        <span>PROJECTS</span>
        <span class="split-pill__divider" aria-hidden="true" />
        <span class="split-pill__accent">{{ projects.length }} FEATURED</span>
      </div>
      <h1>Things I’ve built<span>.</span></h1>
      <p>
        Products I’ve been running for years, open-source utilities, and weekend
        experiments.
      </p>

      <div class="filter-bar" role="group" aria-label="Filter projects">
        <button
          v-for="filter in filters"
          :key="filter"
          type="button"
          :class="['filter-pill', { 'is-active': activeFilter === filter }]"
          :aria-pressed="activeFilter === filter"
          @click="activeFilter = filter"
        >
          <span>{{ filter }}</span>
          <span class="filter-pill__count">{{ countFor(filter) }}</span>
        </button>
      </div>
    </header>

    <p class="sr-only" role="status">
      {{ visibleProjects.length }}
      {{ visibleProjects.length === 1 ? "project" : "projects" }} shown
    </p>

    <section class="portfolio-grid-wrap">
      <div class="portfolio-grid">
        <NuxtLink
          v-for="project in visibleProjects"
          :key="project.slug"
          :to="'/work/' + project.slug"
          class="bento-card"
        >
          <WorkExhibit :variant="project.visual" class="bento-card__visual" />
          <div class="bento-card__body">
            <div>
              <div class="bento-card__meta">
                <span>{{ project.category }}</span>
                <span aria-hidden="true">·</span>
                <span>{{ project.period }}</span>
              </div>
              <h2 class="bento-card__title">{{ project.title }}</h2>
              <p class="bento-card__summary">{{ project.summary }}</p>
            </div>
            <span class="bento-card__arrow" aria-hidden="true">↗</span>
          </div>
        </NuxtLink>
      </div>
    </section>

    <section class="section-block">
      <div class="section-header">
        <div>
          <h2>Smaller repos &amp; older experiments</h2>
          <p>Side projects and prototypes up on GitHub.</p>
        </div>
        <a
          href="https://github.com/johnexzy"
          target="_blank"
          rel="noopener noreferrer"
          class="btn-pill"
          >GitHub ↗</a
        >
      </div>
      <div class="surface-list">
        <a
          v-for="work in smallWorks"
          :key="work.title"
          :href="work.href"
          class="surface-row"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div>
            <h3>{{ work.title }}</h3>
            <p>{{ work.description }}</p>
          </div>
          <span class="surface-row__tag">{{ work.category }}</span>
          <span class="surface-row__arrow" aria-hidden="true">↗</span>
        </a>
      </div>
    </section>

    <section class="section-block">
      <div class="section-header">
        <div>
          <h2>Client &amp; team work</h2>
          <p>Products and websites built with teams and founders.</p>
        </div>
        <NuxtLink to="/about" class="btn-pill">Work history ↗</NuxtLink>
      </div>
      <div class="surface-list">
        <component
          :is="work.href ? 'a' : 'div'"
          v-for="work in collaborations"
          :key="work.title"
          :href="work.href || undefined"
          :target="work.href ? '_blank' : undefined"
          :rel="work.href ? 'noopener noreferrer' : undefined"
          :class="['surface-row', { 'surface-row--static': !work.href }]"
        >
          <div>
            <div class="surface-row__title-row">
              <h3>{{ work.title }}</h3>
              <span v-if="work.status" class="surface-row__status">{{
                work.status
              }}</span>
            </div>
            <p>{{ work.description }}</p>
          </div>
          <span class="surface-row__tag">{{ work.discipline }}</span>
          <span v-if="work.href" class="surface-row__arrow" aria-hidden="true"
            >↗</span
          >
        </component>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { projects, smallWorks, collaborations } from "~/data/work";

const filters = ["All", "Products", "Open source", "Experiments"];
const activeFilter = ref("All");
const kinds: Record<string, string> = {
  Products: "Product",
  "Open source": "Open source",
  Experiments: "Experiment",
};

const countFor = (filter: string) =>
  filter === "All"
    ? projects.length
    : projects.filter((p) => p.kind === kinds[filter]).length;

const visibleProjects = computed(() =>
  activeFilter.value === "All"
    ? projects
    : projects.filter((p) => p.kind === kinds[activeFilter.value]),
);

useSeoMeta({
  title: "Projects — John Oba",
  description:
    "Products, Mac apps, open-source tools, and experiments built by John Oba (Afrodev).",
  ogTitle: "Projects — John Oba",
});
</script>

<style scoped>
.filter-bar {
  display: inline-flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 28px;
  padding: 5px;
  border-radius: 16px;
  background: var(--card);
  border: 1px solid var(--border-subtle);
  box-shadow: var(--pill-shadow);
}

.filter-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 36px;
  padding: 0 14px;
  border-radius: 11px;
  border: 0;
  background: transparent;
  font-size: 13.5px;
  font-weight: 500;
  color: var(--muted);
  transition:
    background-color 150ms ease,
    color 150ms ease;
}

.filter-pill:hover {
  color: var(--foreground);
}

.filter-pill.is-active {
  background: var(--foreground);
  color: var(--background);
  font-weight: 600;
}

.filter-pill__count {
  font: 500 11px/1 var(--mono);
  opacity: 0.7;
}

.portfolio-grid-wrap {
  margin-top: 24px;
}

.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

@media (max-width: 720px) {
  .portfolio-grid {
    grid-template-columns: 1fr;
  }
}
</style>
