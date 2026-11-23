<template>
  <main id="main-content" tabindex="-1">
    <div class="page-mast">
      <span>About</span><span>John Oba / Afrodev</span>
    </div>
    <header class="page-heading reveal">
      <h1>Hey, I’m<br /><em>John Oba.</em></h1>
    </header>
    <div class="about-intro">
      <div>
        <p>
          I’m a software engineer based in Lagos. Most people online know me as
          Afrodev.
        </p>
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
      <div class="about-note">
        <span class="eyebrow">Usually</span>
        <p>Building the<br />tool I couldn’t<br /><em>find online.</em></p>
        <span aria-hidden="true">↙</span>
      </div>
    </div>
    <section class="editorial-section">
      <div class="section-label">
        <h2><span>01</span>Where I’ve worked</h2>
        <a
          class="text-link"
          href="https://docs.google.com/document/d/1nhlf5X-M4HKSYbJ-e0UEuBLLmFAcIyYSc5T9wdHnazg/edit?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          >Resume ↗</a
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
        <h2><span>02</span>Stuff I enjoy working on</h2>
      </div>
      <div class="practice-grid">
        <div>
          <h3>Frontend &amp; Mac apps</h3>
          <p>
            Web apps, Figma plugins, and native macOS tools. I like making
            everyday software fast and straightforward to use.
          </p>
          <NuxtLink to="/work/now" class="text-link">Now ↗</NuxtLink>
        </div>
        <div>
          <h3>Backend &amp; real-time</h3>
          <p>
            WebSockets, payment flows, data pipelines, and keeping state in sync
            when multiple people or processes are involved.
          </p>
          <NuxtLink to="/work/peerplay" class="text-link">PeerPlay ↗</NuxtLink>
        </div>
        <div>
          <h3>AI &amp; search</h3>
          <p>
            Embeddings, retrieval, citations you can actually check, and testing
            model output against real tasks instead of guessing.
          </p>
          <NuxtLink to="/work/oystack" class="text-link">Oystack ↗</NuxtLink>
        </div>
      </div>
    </section>
    <section class="about-contact editorial-section">
      <p class="eyebrow">Say hi</p>
      <h2>Want to talk?</h2>
      <a href="mailto:obajohn75@gmail.com" class="text-link"
        >obajohn75@gmail.com ↗</a
      >
      <p>
        Whether it’s a project, a technical question, or just feedback on
        something I built or wrote, my inbox is open.
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
