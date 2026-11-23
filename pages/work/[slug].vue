<template>
  <main id="main-content" tabindex="-1" class="work-detail">
    <div class="detail-topbar">
      <NuxtLink to="/portfolio" class="back-pill">← All projects</NuxtLink>
      <span class="detail-pill">{{ project.category }}</span>
    </div>

    <header class="page-hero reveal">
      <div class="split-pill">
        <span>{{ project.role.toUpperCase() }}</span>
        <span class="split-pill__divider" aria-hidden="true" />
        <span class="split-pill__accent">{{ project.period }}</span>
      </div>
      <h1>{{ project.title }}</h1>
      <p>{{ project.summary }}</p>

      <div class="detail-links">
        <NuxtLink
          v-for="(link, idx) in project.links"
          :key="link.href"
          :to="link.href"
          :external="!link.href.startsWith('/')"
          :target="link.href.startsWith('https://') ? '_blank' : undefined"
          rel="noopener noreferrer"
          :class="idx === 0 ? 'btn-primary' : 'btn-pill'"
        >
          <span>{{ link.label }}</span>
          <span aria-hidden="true">↗</span>
        </NuxtLink>
      </div>
    </header>

    <div class="detail-stage">
      <WorkExhibit :variant="project.visual" class="detail-exhibit" />
      <div class="detail-caption">
        <span>Preview / {{ project.title }}</span>
        <span>{{ project.kind }}</span>
      </div>
    </div>

    <div class="detail-body">
      <p class="detail-introduction">{{ project.description }}</p>

      <ProjectPlayground
        v-if="['now', 'pixelator', 'peerplay'].includes(project.slug)"
        :project="project.slug"
      />

      <div class="detail-cards">
        <section
          v-for="(section, index) in project.details"
          :key="section.title"
          class="detail-card"
        >
          <span class="detail-card__number">0{{ index + 1 }}</span>
          <div>
            <h2>{{ section.title }}</h2>
            <p>{{ section.text }}</p>
          </div>
        </section>
      </div>

      <div class="detail-stack">
        <span class="eyebrow">Built with</span>
        <div class="stack-pills">
          <span v-for="tech in project.stack" :key="tech" class="stack-pill">{{
            tech
          }}</span>
        </div>
      </div>
    </div>

    <NuxtLink :to="'/work/' + nextProject.slug" class="next-work">
      <div>
        <span class="eyebrow">Next project</span>
        <h2>{{ nextProject.title }}</h2>
        <p>{{ nextProject.summary }}</p>
      </div>
      <span class="next-work__arrow" aria-hidden="true">↗</span>
    </NuxtLink>
  </main>
</template>

<script setup lang="ts">
import { projects } from "~/data/work";

const route = useRoute();
const project = projects.find((p) => p.slug === route.params.slug);
if (!project)
  throw createError({ statusCode: 404, statusMessage: "Project not found" });

const nextProject = projects[(projects.indexOf(project) + 1) % projects.length];

useSeoMeta({
  title: project.title + " — John Oba",
  description: project.summary,
  ogTitle: project.title + " — John Oba",
  ogDescription: project.summary,
});
</script>

<style scoped>
.detail-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 24px;
}

.detail-pill {
  padding: 7px 13px;
  border-radius: var(--radius-pill);
  background: var(--surface);
  border: 1px solid var(--border-subtle);
  font: 500 11px/1.2 var(--mono);
  color: var(--muted);
}

.work-detail .page-hero {
  margin-top: 14px;
}

.detail-links {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 26px;
}

.detail-stage {
  margin-top: 16px;
  padding: 10px;
  border-radius: var(--radius-stage);
  background: var(--surface);
  border: 1px solid var(--border-subtle);
}

.detail-exhibit {
  height: clamp(320px, 44vw, 500px);
  border-radius: 22px;
}

.detail-caption {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  padding: 12px 14px 4px;
  font: 500 11px/1.5 var(--mono);
  color: var(--faint);
}

.detail-body {
  max-width: 740px;
  margin: 44px auto 0;
}

.detail-introduction {
  font-size: 20px;
  line-height: 1.65;
  letter-spacing: -0.018em;
  color: var(--foreground);
}

.detail-cards {
  display: grid;
  gap: 14px;
  margin-top: 32px;
}

.detail-card {
  display: grid;
  grid-template-columns: 38px minmax(0, 1fr);
  gap: 14px;
  padding: 24px;
  border-radius: 24px;
  background: var(--surface);
  border: 1px solid var(--border-subtle);
}

.detail-card__number {
  font: 600 12px/1.6 var(--mono);
  color: var(--accent);
  padding-top: 4px;
}

.detail-card h2 {
  font: 700 20px/1.25 var(--display);
  letter-spacing: -0.03em;
  color: var(--foreground);
}

.detail-card p {
  margin-top: 10px;
  font-size: 15px;
  line-height: 1.72;
  color: var(--muted);
}

.detail-stack {
  margin-top: 36px;
  padding: 22px 24px;
  border-radius: 24px;
  background: var(--surface);
  border: 1px solid var(--border-subtle);
}

.stack-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 14px;
}

.stack-pill {
  padding: 7px 13px;
  border-radius: var(--radius-pill);
  background: var(--card);
  border: 1px solid var(--border-subtle);
  font: 500 12.5px/1 var(--mono);
  color: var(--foreground);
}

.next-work {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin-top: 56px;
  padding: 28px 30px;
  border-radius: var(--radius-card);
  background: var(--surface);
  border: 1px solid var(--border-subtle);
  transition:
    transform 220ms var(--ease-out),
    border-color 180ms ease;
}

.next-work h2 {
  font: 700 clamp(24px, 3vw, 34px)/1.12 var(--display);
  letter-spacing: -0.035em;
  margin-top: 8px;
  color: var(--foreground);
}

.next-work p {
  margin-top: 6px;
  font-size: 14px;
  color: var(--muted);
}

.next-work__arrow {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  flex-shrink: 0;
  display: grid;
  place-items: center;
  background: var(--accent);
  color: #ffffff;
  font-size: 20px;
  transition: transform 220ms var(--ease-out);
}

@media (hover: hover) and (pointer: fine) {
  .next-work:hover {
    transform: translateY(-2px);
    border-color: var(--border);
  }
  .next-work:hover .next-work__arrow {
    transform: translate(3px, -3px);
  }
}

@media (max-width: 640px) {
  .detail-exhibit {
    height: 270px;
  }
  .detail-introduction {
    font-size: 17.5px;
  }
  .detail-card {
    grid-template-columns: 1fr;
    gap: 8px;
    padding: 20px;
  }
  .next-work {
    padding: 22px;
  }
}
</style>
