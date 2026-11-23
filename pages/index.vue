<template>
  <main id="main-content" tabindex="-1">
    <div class="page-mast">
      <span>Afrodev</span><span>Software &amp; side projects</span>
    </div>
    <section class="home-intro reveal">
      <div class="home-intro__copy">
        <p class="eyebrow">Software engineer · Lagos, Nigeria</p>
        <h1>John Oba<span>.</span></h1>
        <p class="home-statement">
          I build web products<br /><em>and tools I actually use.</em>
        </p>
        <p class="home-summary">
          Co-founder at StartupList Africa and senior engineer at Alveum. Most
          of my time goes into web apps, backend systems, AI features, and the
          occasional Mac app.
        </p>
        <div class="home-actions">
          <a class="text-link" href="#selected-work"
            >See my work <span aria-hidden="true">↓</span></a
          >
          <a class="text-link" href="mailto:obajohn75@gmail.com"
            >Say hi <span aria-hidden="true">↗</span></a
          >
        </div>
      </div>
      <ThreadStudy />
    </section>

    <section id="selected-work" class="editorial-section home-work">
      <div class="section-label">
        <h2><span>01</span>Selected projects</h2>
        <NuxtLink to="/portfolio">All projects ↗</NuxtLink>
      </div>
      <div class="work-grid">
        <NuxtLink
          v-for="project in selectedWork"
          :key="project.slug"
          :to="'/work/' + project.slug"
          class="work-card"
        >
          <WorkExhibit :variant="project.visual" class="work-card__visual" />
          <div class="work-card__meta">
            <span>{{ project.category }}</span
            ><span>{{ project.period }}</span>
          </div>
          <h3>{{ project.title }}<span aria-hidden="true">↗</span></h3>
          <p>{{ project.summary }}</p>
        </NuxtLink>
      </div>
    </section>

    <section class="editorial-section">
      <div class="section-label">
        <h2><span>02</span>Smaller tools &amp; experiments</h2>
        <a
          href="https://github.com/johnexzy"
          target="_blank"
          rel="noopener noreferrer"
          >More on GitHub ↗</a
        >
      </div>
      <NuxtLink
        v-for="project in workbench"
        :key="project.slug"
        :to="'/work/' + project.slug"
        class="project-line"
      >
        <div>
          <h3>{{ project.title }}</h3>
          <p>{{ project.summary }}</p>
        </div>
        <span class="mono">{{ project.category }}</span
        ><span class="line-arrow" aria-hidden="true">↗</span>
      </NuxtLink>
    </section>

    <section class="editorial-section">
      <div class="section-label">
        <h2><span>03</span>Recent writing</h2>
        <NuxtLink :to="blogOrigin">All posts ↗</NuxtLink>
      </div>
      <NuxtLink
        v-for="article in selectedArticles"
        :key="article._path"
        :to="blogOrigin + article._path"
        class="home-note"
      >
        <time :datetime="isoDate(article.date)">{{
          yearOf(article.date)
        }}</time>
        <div>
          <h3>{{ article.title }}</h3>
          <span>{{ article.read_time }} read</span>
        </div>
        <span class="line-arrow" aria-hidden="true">↗</span>
      </NuxtLink>
    </section>
    <div class="home-colophon">
      <span class="colophon-star" aria-hidden="true">✳</span>
      <p>
        Most of my code is up on GitHub.<br />This site is just where I keep the
        projects and write-ups in one place.
      </p>
    </div>
  </main>
</template>
<script setup lang="ts">
import { blogOrigin } from "~/utils/site";
import { projects } from "~/data/work";
import { isoDate, yearOf } from "~/utils/articles";
const selectedWork = projects.filter((p) =>
  ["startuplist-africa", "now", "oystack", "peerplay"].includes(p.slug),
);
const workbench = ["macos-computer-use", "pixelator", "xtts"].map((slug) =>
  projects.find((p) => p.slug === slug)!,
);
const articles = await queryContent("/")
  .where({ draft: false })
  .only(["title", "date", "read_time", "_path"])
  .find();
const selectedArticles = [
  "/fine-tuning-xtts-v2-for-more-natural-bible-narration",
  "/from-zero-knowledge-to-kp-astro",
  "/building-smart-recommendation-system-with-embeddings",
]
  .map((path) => articles.find((a) => a._path === path))
  .filter(Boolean);
useSeoMeta({
  title: "John Oba (Afrodev) — Software Engineer",
  description:
    "Software engineer in Lagos and co-founder of StartupList Africa. Building web products, backend systems, AI tools, and Mac apps.",
  ogTitle: "John Oba (Afrodev) — Software Engineer",
  ogDescription:
    "Projects, open-source tools, and writing by John Oba (Afrodev).",
  twitterCard: "summary",
});
</script>
<style scoped>
.home-intro {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 248px;
  gap: 32px;
  align-items: center;
  margin-top: 49px;
}
.home-intro h1 {
  font: 400 clamp(76px, 8.5vw, 112px)/1.04 var(--serif);
  letter-spacing: -0.055em;
  margin: 16px 0 20px;
}
.home-intro h1 span {
  color: var(--accent);
}
.home-statement {
  font-size: 21px;
  line-height: 1.5;
  letter-spacing: -0.025em;
}
.home-statement em {
  font-family: var(--serif);
  font-size: 29px;
  font-weight: 400;
  color: var(--accent);
}
.home-summary {
  color: var(--muted);
  font-size: 14px;
  line-height: 1.85;
  max-width: 44ch;
  margin: 19px 0 17px;
}
.home-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 26px;
}
.home-actions .text-link {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  min-height: 44px;
}
.home-intro :deep(.thread-study) {
  align-self: center;
  transform: translateY(-12px);
}
.home-work {
  margin-top: 57px;
}
.home-note {
  display: grid;
  grid-template-columns: 46px 1fr 20px;
  gap: 17px;
  padding: 21px 0;
  border-bottom: 1px solid var(--border-subtle);
}
.home-note time {
  font: 11px var(--mono);
  color: var(--muted);
  padding-top: 4px;
}
.home-note h3 {
  font-size: 16px;
  font-weight: 500;
  line-height: 1.45;
  letter-spacing: -0.015em;
}
.home-note div > span {
  display: block;
  font: 10px var(--mono);
  color: var(--faint);
  margin-top: 9px;
}
.home-colophon {
  display: flex;
  align-items: center;
  gap: 21px;
  margin-top: 66px;
  font-size: 13px;
  line-height: 1.8;
  color: var(--muted);
}
.colophon-star {
  font-size: 43px;
  color: var(--accent);
}
@media (hover: hover) {
  .home-note:hover h3 {
    color: var(--accent);
  }
}
@media (max-width: 1050px) and (min-width: 761px) {
  .home-intro {
    grid-template-columns: 1fr 180px;
    gap: 10px;
  }
  .home-intro h1 {
    font-size: 84px;
  }
}
@media (max-width: 760px) {
  .home-intro {
    margin-top: 35px;
    grid-template-columns: 1fr 180px;
    gap: 18px;
  }
  .home-intro h1 {
    font-size: 90px;
  }
  .home-summary {
    font-size: 14px;
  }
}
@media (max-width: 520px) {
  .home-intro {
    grid-template-columns: 1fr;
    gap: 22px;
    position: relative;
  }
  .home-intro h1 {
    font-size: 91px;
  }
  .home-intro :deep(.thread-study) {
    width: clamp(92px, 34.6vw, 135px);
    position: absolute;
    z-index: 2;
    pointer-events: none;
    top: 39px;
    right: -7px;
    opacity: 0.65;
    transform: none;
  }
  .home-intro :deep(.thread-study figcaption) {
    font-size: 0;
    justify-content: flex-end;
  }
  .home-intro :deep(.thread-study button) {
    pointer-events: auto;
    width: 36px;
    height: 36px;
    font-size: 18px;
  }
  .home-intro h1 {
    font-size: clamp(64px, 20.5vw, 80px);
  }
  .home-intro__copy {
    z-index: 1;
  }
  .home-statement {
    font-size: 20px;
  }
  .home-summary {
    max-width: 36ch;
    margin-top: 20px;
  }
  .home-note {
    grid-template-columns: 32px 1fr 15px;
    gap: 10px;
  }
  .home-work {
    margin-top: 42px;
  }
  .home-colophon {
    font-size: 12px;
    align-items: flex-start;
  }
}
</style>
