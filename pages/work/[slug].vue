<template>
  <main id="main-content" tabindex="-1" class="work-detail">
    <div class="page-mast">
      <NuxtLink to="/portfolio">← The work index</NuxtLink
      ><span>{{ project.category }}</span>
    </div>
    <header class="page-heading reveal">
      <p class="eyebrow">{{ project.role }} / {{ project.period }}</p>
      <h1>{{ project.title }}</h1>
      <p>{{ project.summary }}</p>
    </header>
    <WorkExhibit :variant="project.visual" class="detail-exhibit" />
    <div class="detail-caption">
      <span>Illustrated study / {{ project.title }}</span
      ><span>{{ project.kind }}</span>
    </div>
    <div class="detail-body">
      <p class="detail-introduction">{{ project.description }}</p>
      <div class="detail-links">
        <NuxtLink
          v-for="link in project.links"
          :key="link.href"
          :to="link.href"
          :external="!link.href.startsWith('/')"
          :target="link.href.startsWith('https://') ? '_blank' : undefined"
          rel="noopener noreferrer"
          class="text-link"
          >{{ link.label }} ↗</NuxtLink
        >
      </div>
      <ProjectPlayground
        v-if="['now', 'pixelator', 'peerplay'].includes(project.slug)"
        :project="project.slug"
      />
      <section
        v-for="(section, index) in project.details"
        :key="section.title"
        class="detail-section"
      >
        <span class="detail-section__number">0{{ index + 1 }}</span>
        <div>
          <h2>{{ section.title }}</h2>
          <p>{{ section.text }}</p>
        </div>
      </section>
      <div class="detail-stack">
        <span class="eyebrow">Built with</span>
        <p>{{ project.stack.join(" / ") }}</p>
      </div>
    </div>
    <NuxtLink :to="'/work/' + nextProject.slug" class="next-work"
      ><div>
        <span class="eyebrow">Next in the index</span>
        <h2>{{ nextProject.title }}</h2>
        <p>{{ nextProject.category }}</p>
      </div>
      <span aria-hidden="true">↗</span></NuxtLink
    >
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
.page-heading .eyebrow {
  margin: 0 0 21px;
  font-size: 10px;
  font-family: var(--mono);
}
.page-heading h1 {
  font-size: clamp(58px, 6.5vw, 86px);
}
.detail-exhibit {
  height: 360px;
}
.detail-exhibit :deep(.now-exhibit-heading) {
  max-width: 390px;
  margin: 20px auto 0;
}
.detail-exhibit :deep(.clip-tray) {
  max-width: 450px;
  margin: 30px auto 0;
}
.detail-exhibit :deep(.clip-piece) {
  height: 172px;
  padding: 15px;
}
.detail-exhibit :deep(.clip-piece p) {
  font-size: 19px;
}
.detail-exhibit :deep(.research-paper) {
  transform: rotate(-7deg) translateX(-70px) scale(1.2);
}
.detail-exhibit :deep(.research-note) {
  right: calc(50% - 170px);
  bottom: 55px;
  transform: rotate(5deg) scale(1.2);
}
.detail-exhibit :deep(.sync-room) {
  max-width: 250px;
}
.detail-exhibit :deep(.sync-screen) {
  height: 155px;
}
.detail-caption {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  font: 9px/1.6 var(--mono);
  color: var(--faint);
  margin-top: 10px;
}
.detail-body {
  max-width: 650px;
  margin: 40px auto 0;
}
.detail-introduction {
  font-size: 19px;
  line-height: 1.75;
  letter-spacing: -0.015em;
}
.detail-links {
  display: flex;
  flex-wrap: wrap;
  gap: 12px 25px;
  margin: 24px 0 48px;
}
.detail-section {
  display: grid;
  grid-template-columns: 30px 1fr;
  gap: 18px;
  margin-top: 37px;
}
.detail-section__number {
  font: 10px var(--mono);
  color: var(--faint);
  padding-top: 9px;
}
.detail-section h2 {
  font: 30px/1.2 var(--serif);
  font-weight: 400;
}
.detail-section p {
  font-size: 15px;
  line-height: 1.8;
  margin-top: 15px;
  color: var(--muted);
}
.detail-stack {
  margin-top: 48px;
  padding: 22px 0;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}
.detail-stack p {
  font-size: 13px;
  line-height: 1.8;
  margin-top: 9px;
}
.next-work {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid var(--border);
  margin-top: 74px;
  padding-top: 26px;
}
.next-work h2 {
  font: 42px var(--serif);
  margin: 10px 0;
}
.next-work p {
  color: var(--muted);
  font-size: 12px;
}
.next-work > span {
  color: var(--accent);
  font-size: 35px;
}
@media (max-width: 520px) {
  .detail-exhibit {
    height: 270px;
  }
  .detail-exhibit :deep(.clip-piece) {
    height: 135px;
  }
  .detail-exhibit :deep(.clip-piece p) {
    font-size: 14px;
  }
  .detail-exhibit :deep(.now-exhibit-heading) {
    margin-top: 0;
  }
  .detail-exhibit :deep(.clip-tray) {
    margin-top: 23px;
  }
  .detail-exhibit :deep(.research-paper) {
    transform: rotate(-7deg) translateX(-30px);
  }
  .detail-exhibit :deep(.research-note) {
    right: 20px;
    transform: rotate(5deg);
  }
  .detail-caption {
    font-size: 8px;
  }
  .detail-introduction {
    font-size: 17px;
  }
  .detail-section {
    gap: 9px;
    grid-template-columns: 23px 1fr;
  }
  .detail-section h2 {
    font-size: 28px;
  }
}
</style>
