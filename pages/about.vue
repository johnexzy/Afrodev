<template>
  <main id="main-content" tabindex="-1">
    <header class="page-hero reveal">
      <div class="split-pill">
        <span>ABOUT</span>
        <span class="split-pill__divider" aria-hidden="true" />
        <span class="split-pill__accent">JOHN OBA / AFRODEV</span>
      </div>
      <h1>Hey, I’m John Oba<span>.</span></h1>
      <p>
        I’m a software engineer based in Lagos. Most people online know me as
        Afrodev.
      </p>
    </header>

    <section class="about-grid">
      <div class="about-story">
        <p>
          Back in 2020 I co-founded StartupList Africa, and since then I’ve
          worked across fintech, edtech, real-time apps, AI tools, and native
          macOS software.
        </p>
        <p>
          I don’t really stick to one side of the stack. I’m just as happy
          designing a database schema or debugging a background job as I am
          tweaking a UI interaction until it stops annoying me.
        </p>
      </div>

      <aside class="about-accent-card">
        <span class="about-accent-card__label">Usually</span>
        <p>Building the tool I couldn’t find online.</p>
        <div class="about-accent-card__meta">
          <span>Lagos, Nigeria</span>
          <span>Full-stack · AI · macOS</span>
        </div>
      </aside>
    </section>

    <section class="section-block">
      <div class="section-header">
        <div>
          <h2>Where I’ve worked</h2>
          <p>Companies and teams I’ve built with over the years.</p>
        </div>
        <a
          class="btn-pill"
          href="https://docs.google.com/document/d/1nhlf5X-M4HKSYbJ-e0UEuBLLmFAcIyYSc5T9wdHnazg/edit?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          >Resume ↗</a
        >
      </div>

      <div class="career-list">
        <article v-for="role in roles" :key="role.company" class="career-card">
          <div class="career-card__head">
            <div>
              <h3>{{ role.company }}</h3>
              <span class="career-card__title">{{ role.title }}</span>
            </div>
            <time class="career-card__period">{{ role.period }}</time>
          </div>
          <p>{{ role.description }}</p>
        </article>
      </div>
    </section>

    <section class="section-block">
      <div class="section-header">
        <div>
          <h2>Stuff I enjoy working on</h2>
          <p>The kinds of problems that keep pulling me in.</p>
        </div>
      </div>

      <div class="practice-grid">
        <div class="practice-card">
          <span class="practice-card__num">01</span>
          <h3>Frontend &amp; Mac apps</h3>
          <p>
            Web apps, Figma plugins, and native macOS tools. I like making
            everyday software fast and straightforward to use.
          </p>
          <NuxtLink to="/work/now" class="text-link">See Now ↗</NuxtLink>
        </div>

        <div class="practice-card">
          <span class="practice-card__num">02</span>
          <h3>Backend &amp; real-time</h3>
          <p>
            WebSockets, payment flows, data pipelines, and keeping state in sync
            when multiple people or processes are involved.
          </p>
          <NuxtLink to="/work/peerplay" class="text-link"
            >See PeerPlay ↗</NuxtLink
          >
        </div>

        <div class="practice-card">
          <span class="practice-card__num">03</span>
          <h3>AI &amp; search</h3>
          <p>
            Embeddings, retrieval, citations you can actually check, and testing
            model output against real tasks instead of guessing.
          </p>
          <NuxtLink to="/work/oystack" class="text-link"
            >See Oystack ↗</NuxtLink
          >
        </div>
      </div>
    </section>

    <section class="section-block about-contact">
      <span class="eyebrow">Say hi</span>
      <h2>Want to talk<span>?</span></h2>
      <p>
        Whether it’s a project, a technical question, or just feedback on
        something I built or wrote, my inbox is open.
      </p>
      <div class="about-contact__actions">
        <a href="mailto:obajohn75@gmail.com" class="btn-primary">
          <span>obajohn75@gmail.com</span>
          <span aria-hidden="true">↗</span>
        </a>
        <a
          href="https://github.com/johnexzy"
          target="_blank"
          rel="noopener noreferrer"
          class="btn-pill"
          >GitHub ↗</a
        >
        <a
          href="https://linkedin.com/in/johnoba"
          target="_blank"
          rel="noopener noreferrer"
          class="btn-pill"
          >LinkedIn ↗</a
        >
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
const roles = [
  {
    period: "2024 — present",
    company: "Alveum",
    title: "Senior Software Engineer",
    description:
      "Building backend systems and AI products, including domain-specific astrology calculations for KP Astro and fine-tuning speech models for narration.",
  },
  {
    period: "2023 — 2024",
    company: "Niyo Group",
    title: "Senior Software Engineer & Technical Lead",
    description:
      "Led engineering on real-time learning features, HLS video streaming, and automated transcription with Whisper.",
  },
  {
    period: "2023",
    company: "Nomba",
    title: "Senior Frontend Developer",
    description:
      "Rebuilt the marketing site and POS terminal checkout flow right after the Kudi-to-Nomba rebrand.",
  },
  {
    period: "2020 — present",
    company: "StartupList Africa",
    title: "Co-founder & CTO",
    description:
      "Co-founded the startup and funding database. I handle pretty much the whole technical side: public site, backend, data pipelines, internal review tools, and cloud infra.",
  },
];

useSeoMeta({
  title: "About — John Oba",
  description:
    "About John Oba (Afrodev), a software engineer in Lagos and co-founder of StartupList Africa building web products, AI tools, and Mac apps.",
});
</script>

<style scoped>
.about-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.45fr) minmax(0, 1fr);
  gap: 16px;
  margin-top: 16px;
}

.about-story {
  padding: 30px;
  border-radius: var(--radius-card);
  background: var(--surface);
  border: 1px solid var(--border-subtle);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 18px;
}

.about-story p {
  font-size: 16.5px;
  line-height: 1.75;
  color: var(--fg);
}

.about-accent-card {
  padding: 28px;
  border-radius: var(--radius-card);
  background: var(--accent);
  color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 24px;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.28),
    0 16px 36px -14px rgba(255, 77, 0, 0.45);
}

.about-accent-card__label {
  align-self: flex-start;
  padding: 5px 11px;
  border-radius: var(--radius-pill);
  background: rgba(255, 255, 255, 0.18);
  font: 500 11px/1 var(--mono);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.about-accent-card p {
  font: 700 clamp(24px, 2.8vw, 32px)/1.12 var(--display);
  letter-spacing: -0.038em;
}

.about-accent-card__meta {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  padding-top: 14px;
  border-top: 1px solid rgba(255, 255, 255, 0.22);
  font: 500 11.5px var(--mono);
  color: rgba(255, 255, 255, 0.85);
}

.career-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.career-card {
  padding: 24px;
  border-radius: 24px;
  background: var(--surface);
  border: 1px solid var(--border-subtle);
}

.career-card__head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
}

.career-card h3 {
  font: 700 19px/1.2 var(--display);
  letter-spacing: -0.025em;
  color: var(--foreground);
}

.career-card__title {
  display: block;
  margin-top: 5px;
  font-size: 13px;
  font-weight: 600;
  color: var(--accent);
}

.career-card__period {
  padding: 5px 10px;
  border-radius: var(--radius-pill);
  background: var(--card);
  border: 1px solid var(--border-subtle);
  font: 500 11px/1.1 var(--mono);
  color: var(--muted);
  white-space: nowrap;
}

.career-card p {
  margin-top: 14px;
  font-size: 14px;
  line-height: 1.68;
  color: var(--muted);
}

.practice-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.practice-card {
  padding: 24px;
  border-radius: 24px;
  background: var(--surface);
  border: 1px solid var(--border-subtle);
  display: flex;
  flex-direction: column;
}

.practice-card__num {
  font: 600 11.5px var(--mono);
  color: var(--accent);
}

.practice-card h3 {
  margin-top: 14px;
  font: 700 19px/1.25 var(--display);
  letter-spacing: -0.025em;
  color: var(--foreground);
}

.practice-card p {
  margin: 10px 0 20px;
  font-size: 14px;
  line-height: 1.68;
  color: var(--muted);
  flex: 1;
}

.about-contact {
  padding: clamp(32px, 5vw, 48px);
  border-radius: var(--radius-stage);
  background: var(--canvas);
  border: 1px solid var(--border-subtle);
}

.about-contact h2 {
  margin-top: 12px;
  font: 800 clamp(32px, 4.5vw, 48px)/1.05 var(--display);
  letter-spacing: -0.04em;
}

.about-contact h2 span {
  color: var(--accent);
}

.about-contact > p {
  margin-top: 14px;
  max-width: 500px;
  font-size: 16px;
  line-height: 1.65;
  color: var(--muted);
}

.about-contact__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 26px;
}

@media (max-width: 860px) {
  .about-grid,
  .career-list,
  .practice-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 520px) {
  .career-card__head {
    flex-direction: column;
  }
}
</style>
