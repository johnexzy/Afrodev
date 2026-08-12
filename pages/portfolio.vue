<template>
  <main class="portfolio-page">
    <header class="portfolio-intro reading-column reveal">
      <p class="eyebrow">Projects / 2019—now</p>
      <h1>Selected work.</h1>
      <p>
        Products I’ve worked on across AI, fintech, government, and independent projects.
      </p>
      <div class="portfolio-intro__links">
        <a
          href="https://docs.google.com/document/d/1nhlf5X-M4HKSYbJ-e0UEuBLLmFAcIyYSc5T9wdHnazg/edit?usp=sharing"
          target="_blank"
          rel="noreferrer"
        >Résumé <Icon name="ph:arrow-up-right" /></a>
        <a href="mailto:obajohn75@gmail.com">Email me <Icon name="ph:paper-plane-tilt" /></a>
      </div>
    </header>

    <section class="portfolio-section portfolio-section--reading">
      <div class="portfolio-section__title">
        <span>Experience</span>
        <p>Recent roles and responsibilities.</p>
      </div>
      <div class="experience-list">
        <ExperienceCard
          v-for="experience in experiences"
          :key="`${experience.title}-${experience.company}`"
          :experience="experience"
        />
      </div>
    </section>

    <section class="portfolio-section portfolio-section--wide">
      <div class="portfolio-section__title portfolio-section__title--wide">
        <span>Selected work</span>
        <p>Client work, team projects, and products I helped build.</p>
      </div>
      <div class="project-grid">
        <ProjectCard
          v-for="project in featuredProjects"
          :key="project.title"
          :project="project"
        />
      </div>
    </section>

    <section class="portfolio-section portfolio-section--wide">
      <div class="portfolio-section__title portfolio-section__title--wide">
        <span>Experiments</span>
        <p>Smaller projects and technical experiments.</p>
      </div>
      <div class="indie-grid">
        <IndieProjectCard
          v-for="project in indieProjects"
          :key="project.title"
          :project="project"
        />
      </div>
    </section>

    <section class="portfolio-section portfolio-section--reading">
      <div class="portfolio-section__title">
        <span>Toolbox</span>
        <p>Languages, frameworks, and systems I use regularly.</p>
      </div>
      <div class="expertise-grid">
        <ExpertiseCard
          v-for="(expertise, index) in expertiseAreas"
          :key="expertise.title"
          :expertise="expertise"
          :index="index"
        />
      </div>
    </section>

    <section class="portfolio-contact reading-column">
      <p>Want to work together?</p>
      <a href="mailto:obajohn75@gmail.com">Email me <Icon name="ph:arrow-up-right" /></a>
    </section>
  </main>
</template>

<script setup lang="ts">
import { experiences, expertiseAreas, featuredProjects, indieProjects } from "~/data/projects";

useServerSeoMeta({
  title: "Projects — John Oba",
  ogTitle: "Projects — John Oba",
  description: "Selected product engineering work across AI, real-time systems, and scalable platforms.",
  ogDescription: "Selected product engineering work across AI, real-time systems, and scalable platforms.",
  ogImage: "https://res.cloudinary.com/dpq6dieap/image/upload/v1678755812/meta_en37in.png",
  twitterCard: "summary_large_image",
});
</script>

<style scoped>
.portfolio-page {
  padding: 2rem 0 3rem;
}

.portfolio-intro h1 {
  max-width: 16ch;
  margin: 1.15rem 0 0;
  font-size: clamp(2.25rem, 6vw, 4rem);
  font-weight: 500;
  letter-spacing: -0.06em;
  line-height: 1.08;
}

.portfolio-intro > p:nth-of-type(2) {
  max-width: 42rem;
  margin: 1.35rem 0 0;
  color: var(--muted);
  font-size: 0.9rem;
  line-height: 1.75;
}

.portfolio-intro__links {
  display: flex;
  gap: 1.25rem;
  margin-top: 1.5rem;
}

.portfolio-intro__links a,
.portfolio-contact a {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  color: var(--foreground);
  border-bottom: 1px solid var(--border);
  font-size: 0.8rem;
  opacity: 0.78;
  transition: color 160ms ease, opacity 160ms ease, border-color 160ms ease;
}

.portfolio-section {
  margin-top: 7rem;
}

.portfolio-section--reading {
  width: min(65ch, 100%);
  margin-inline: auto;
}

.portfolio-section--wide {
  width: min(67rem, 100%);
  margin-inline: auto;
}

.portfolio-section__title {
  display: grid;
  grid-template-columns: 8rem minmax(0, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
  color: var(--faint);
  font-size: 0.76rem;
}

.portfolio-section__title span {
  color: var(--foreground);
  font-weight: 500;
}

.portfolio-section__title p {
  margin: 0;
}

.portfolio-section__title--wide {
  width: min(65ch, 100%);
  margin-right: auto;
  margin-left: auto;
}

.experience-list {
  border-top: 1px solid var(--border-subtle);
}

.project-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.45rem;
}

.indie-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.45rem;
}

.expertise-grid {
  border-top: 1px solid var(--border-subtle);
}

.portfolio-contact {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 2rem;
  margin-top: 7rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border-subtle);
}

.portfolio-contact p {
  margin: 0;
  color: var(--muted);
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 1.25rem;
}

@media (hover: hover) and (pointer: fine) {
  .portfolio-intro__links a:hover,
  .portfolio-contact a:hover {
    color: var(--accent);
    border-color: var(--accent);
    opacity: 1;
  }
}

@media (max-width: 760px) {
  .portfolio-page {
    padding-top: 0;
  }

  .portfolio-section {
    margin-top: 5rem;
  }

  .project-grid,
  .indie-grid {
    grid-template-columns: 1fr;
  }

  .portfolio-contact {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
