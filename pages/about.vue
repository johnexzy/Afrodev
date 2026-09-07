<template>
  <main id="main-content" tabindex="-1">
    <div class="page-mast">
      <span>A little background</span><span>John Oba / Afrodev</span>
    </div>
    <header class="page-heading reveal">
      <h1>Hello again.<br /><em>I’m John.</em></h1>
    </header>
    <div class="about-intro">
      <div>
        <p>I’m John, a product engineer in Lagos. Online, I go by Afrodev.</p>
        <p>
          I co-founded StartupList Africa in 2020. Since then, my work has taken
          me through fintech, online learning, real-time collaboration, research
          software, and native Mac apps.
        </p>
        <p>
          I tend to follow a problem across the stack. Sometimes that means a
          database model or a background job. Sometimes it means the few
          milliseconds between a keypress and something feeling right.
        </p>
      </div>
      <div class="about-note">
        <span class="eyebrow">A recurring interest</span>
        <p>How much can<br />a small, considered<br /><em>tool do?</em></p>
        <span aria-hidden="true">↙</span>
      </div>
    </div>
    <section class="editorial-section">
      <div class="section-label">
        <h2><span>01</span>Work, over time</h2>
        <a
          class="text-link"
          href="https://docs.google.com/document/d/1nhlf5X-M4HKSYbJ-e0UEuBLLmFAcIyYSc5T9wdHnazg/edit?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          >Résumé ↗</a
        >
      </div>
      <div v-for="role in roles" :key="role.company" class="career-row">
        <time>{{ role.period }}</time>
        <div>
          <h3>{{ role.company }}</h3>
          <span>{{ role.title }}</span>
          <p>{{ role.description }}</p>
        </div>
      </div>
    </section>
    <section class="editorial-section">
      <div class="section-label">
        <h2><span>02</span>The work I come back to</h2>
      </div>
      <div class="practice-grid">
        <div>
          <h3>Interfaces & interaction</h3>
          <p>
            Native Mac surfaces, the web, design tools, and the small decisions
            that make software easier to use.
          </p>
          <NuxtLink to="/work/now" class="text-link">Now ↗</NuxtLink>
        </div>
        <div>
          <h3>State & systems</h3>
          <p>
            Shared playback, payment flows, publishing pipelines, and what
            happens when work crosses a process boundary.
          </p>
          <NuxtLink to="/work/peerplay" class="text-link">PeerPlay ↗</NuxtLink>
        </div>
        <div>
          <h3>Information & evidence</h3>
          <p>
            Finding related information, making sources traceable, and
            evaluating model output against something concrete.
          </p>
          <NuxtLink to="/work/oystack" class="text-link">Oystack ↗</NuxtLink>
        </div>
      </div>
    </section>
    <section class="about-contact editorial-section">
      <p class="eyebrow">Have something in mind?</p>
      <h2>I’d like to hear about it.</h2>
      <a href="mailto:obajohn75@gmail.com" class="text-link"
        >obajohn75@gmail.com ↗</a
      >
      <p>
        For a project, a technical conversation, or a note about something you
        found here.
      </p>
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
      "Backend systems and AI-assisted products, including domain-specific calculations and work on speech generation.",
  },
  {
    period: "2023 — 2024",
    company: "Niyo Group",
    title: "Senior Software Engineer & Technical Lead",
    description:
      "Real-time learning experiences, video delivery, transcription, and technical leadership.",
  },
  {
    period: "2023",
    company: "Nomba",
    title: "Senior Frontend Developer",
    description:
      "The marketing frontend and terminal purchase experience following the Kudi rebrand.",
  },
  {
    period: "2020 — present",
    company: "StartupList Africa",
    title: "Co-founder & CTO",
    description:
      "The startup and funding data platform, from public interfaces to data collection, review, and infrastructure.",
  },
];
useSeoMeta({
  title: "About — John Oba",
  description:
    "John Oba, also known as Afrodev. Product engineer in Lagos, co-founder of StartupList Africa, and maker of tools for the web and Mac.",
});
</script>
<style scoped>
.about-intro {
  display: grid;
  grid-template-columns: 1fr 220px;
  gap: 45px;
  align-items: center;
}
.about-intro p {
  font-size: 16px;
  line-height: 1.85;
  margin-bottom: 18px;
  color: var(--muted);
}
.about-intro > div > p:first-child {
  color: var(--foreground);
  font-size: 19px;
}
.about-note {
  border: 1px solid var(--border);
  padding: 25px 22px;
  background: var(--surface);
  transform: rotate(3deg);
}
.about-note p {
  font: 30px/1.15 var(--serif);
  color: var(--foreground);
  margin-top: 18px;
}
.about-note em {
  color: var(--accent);
}
.about-note > span:last-child {
  font-size: 35px;
  color: var(--accent);
}
.career-row {
  display: grid;
  grid-template-columns: 130px 1fr;
  gap: 25px;
  padding: 26px 0;
  border-bottom: 1px solid var(--border-subtle);
}
.career-row time {
  font: 10px/1.8 var(--mono);
  color: var(--muted);
  padding-top: 4px;
}
.career-row h3 {
  font-size: 19px;
  font-weight: 500;
  letter-spacing: -0.02em;
}
.career-row div > span {
  display: block;
  margin-top: 6px;
  color: var(--accent);
  font-size: 12px;
}
.career-row p {
  font-size: 14px;
  color: var(--muted);
  line-height: 1.7;
  margin-top: 12px;
  max-width: 49ch;
}
.practice-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 26px;
}
.practice-grid h3 {
  font: 25px/1.2 var(--serif);
}
.practice-grid p {
  font-size: 13px;
  line-height: 1.8;
  margin: 16px 0;
  color: var(--muted);
}
.about-contact {
  padding: 30px;
  border: 1px solid var(--border);
}
.about-contact h2 {
  font: 42px var(--serif);
  margin: 16px 0;
}
.about-contact > p:last-child {
  font-size: 13px;
  line-height: 1.7;
  color: var(--muted);
  max-width: 43ch;
  margin-top: 18px;
}
@media (max-width: 1000px) {
  .about-intro {
    grid-template-columns: 1fr 180px;
    gap: 25px;
  }
  .about-note {
    padding: 20px 15px;
  }
  .about-note p {
    font-size: 26px;
  }
}
@media (max-width: 520px) {
  .about-intro {
    grid-template-columns: 1fr;
  }
  .about-note {
    width: 220px;
    margin: 4px auto 10px;
  }
  .career-row {
    grid-template-columns: 1fr;
    gap: 10px;
  }
  .practice-grid {
    grid-template-columns: 1fr;
    gap: 28px;
  }
  .about-contact {
    padding: 22px;
  }
  .about-contact h2 {
    font-size: 37px;
  }
}
</style>
