<template>
  <main id="main-content" tabindex="-1">
    <section class="hero-stage reveal">
      <svg
        class="hero-watermark"
        viewBox="0 0 320 320"
        fill="none"
        aria-hidden="true"
      >
        <g fill="currentColor">
          <rect x="128" y="20" width="64" height="118" rx="32" />
          <rect
            x="128"
            y="20"
            width="64"
            height="118"
            rx="32"
            transform="rotate(60 160 160)"
          />
          <rect
            x="128"
            y="20"
            width="64"
            height="118"
            rx="32"
            transform="rotate(120 160 160)"
          />
          <rect
            x="128"
            y="20"
            width="64"
            height="118"
            rx="32"
            transform="rotate(180 160 160)"
          />
          <rect
            x="128"
            y="20"
            width="64"
            height="118"
            rx="32"
            transform="rotate(240 160 160)"
          />
          <rect
            x="128"
            y="20"
            width="64"
            height="118"
            rx="32"
            transform="rotate(300 160 160)"
          />
        </g>
        <circle cx="160" cy="160" r="32" class="hero-watermark__core" />
      </svg>

      <div class="hero-content">
        <h1>
          I build web products,<br />
          and tools I actually use<span>.</span>
        </h1>

        <p class="hero-subtitle">
          Co-founder at
          <a
            href="https://www.startuplist.africa"
            target="_blank"
            rel="noopener noreferrer"
            >StartupList Africa</a
          >
          and senior engineer at Alveum. Mostly web apps, backend systems, AI
          features, and native Mac apps.
        </p>

        <div class="hero-actions">
          <div class="contact-pill">
            <span class="contact-pill__prefix">mailto</span>
            <a href="mailto:obajohn75@gmail.com" class="contact-pill__addr"
              >obajohn75@gmail.com</a
            >
            <button
              type="button"
              class="contact-pill__copy"
              :aria-label="copied ? 'Email copied' : 'Copy email address'"
              @click="copyEmail"
            >
              <svg
                v-if="!copied"
                viewBox="0 0 18 18"
                fill="none"
                aria-hidden="true"
              >
                <rect
                  x="6.25"
                  y="6.25"
                  width="8.5"
                  height="8.5"
                  rx="2"
                  stroke="currentColor"
                  stroke-width="1.5"
                />
                <path
                  d="M11.75 6.25V4.75a1.5 1.5 0 0 0-1.5-1.5h-5.5a1.5 1.5 0 0 0-1.5 1.5v5.5a1.5 1.5 0 0 0 1.5 1.5h1.5"
                  stroke="currentColor"
                  stroke-width="1.5"
                />
              </svg>
              <svg v-else viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path
                  d="M4 9.5l3.2 3.2L14 5.5"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <span class="sr-only" role="status">{{
                copied ? "Email copied to clipboard" : ""
              }}</span>
            </button>
          </div>

          <a class="btn-primary" href="#selected-work">
            <span>See my work</span>
            <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
    </section>

    <section id="selected-work" class="section-block">
      <div class="section-header">
        <div>
          <h2>Selected projects</h2>
          <p>Products, native Mac tools, and open-source builds.</p>
        </div>
        <NuxtLink to="/portfolio" class="btn-pill">All projects ↗</NuxtLink>
      </div>

      <div class="home-bento">
        <NuxtLink
          v-for="(project, index) in featuredBento"
          :key="project.slug"
          :to="'/work/' + project.slug"
          :class="['bento-card', { 'bento-card--wide': index === 0 }]"
        >
          <WorkExhibit
            :variant="project.visual"
            class="bento-card__visual bento-visual--card"
          />
          <div class="bento-card__body">
            <div>
              <div class="bento-card__meta">
                <span>{{ project.category }}</span>
                <span aria-hidden="true">·</span>
                <span>{{ project.period }}</span>
              </div>
              <h3 class="bento-card__title">{{ project.title }}</h3>
              <p class="bento-card__summary">{{ project.summary }}</p>
            </div>
            <span class="bento-card__arrow" aria-hidden="true">↗</span>
          </div>
        </NuxtLink>

        <NuxtLink to="/portfolio" class="bento-cta-tile">
          <svg
            class="bento-cta-tile__watermark"
            viewBox="0 0 240 240"
            fill="none"
            aria-hidden="true"
          >
            <g fill="currentColor">
              <rect x="96" y="14" width="48" height="88" rx="24" />
              <rect
                x="96"
                y="14"
                width="48"
                height="88"
                rx="24"
                transform="rotate(60 120 120)"
              />
              <rect
                x="96"
                y="14"
                width="48"
                height="88"
                rx="24"
                transform="rotate(120 120 120)"
              />
              <rect
                x="96"
                y="14"
                width="48"
                height="88"
                rx="24"
                transform="rotate(180 120 120)"
              />
              <rect
                x="96"
                y="14"
                width="48"
                height="88"
                rx="24"
                transform="rotate(240 120 120)"
              />
              <rect
                x="96"
                y="14"
                width="48"
                height="88"
                rx="24"
                transform="rotate(300 120 120)"
              />
            </g>
          </svg>
          <span class="bento-cta-tile__badge">{{ projects.length }} builds</span>
          <div class="bento-cta-tile__bottom">
            <h3>View all {{ projects.length }}<br />projects</h3>
            <span class="bento-cta-tile__arrow" aria-hidden="true">↗</span>
          </div>
        </NuxtLink>
      </div>
    </section>

    <section class="section-block">
      <div class="section-header">
        <div>
          <h2>Smaller tools &amp; experiments</h2>
          <p>Figma plugins, voice fine-tuning, and browser utilities.</p>
        </div>
        <a
          href="https://github.com/johnexzy"
          target="_blank"
          rel="noopener noreferrer"
          class="btn-pill"
          >More on GitHub ↗</a
        >
      </div>

      <div class="surface-list">
        <NuxtLink
          v-for="project in workbench"
          :key="project.slug"
          :to="'/work/' + project.slug"
          class="surface-row"
        >
          <div>
            <h3>{{ project.title }}</h3>
            <p>{{ project.summary }}</p>
          </div>
          <span class="surface-row__tag">{{ project.category }}</span>
          <span class="surface-row__arrow" aria-hidden="true">↗</span>
        </NuxtLink>
      </div>
    </section>

    <section class="section-block">
      <div class="section-header">
        <div>
          <h2>Recent writing</h2>
          <p>Build logs, technical deep dives, and project stories.</p>
        </div>
        <NuxtLink :to="blogOrigin" class="btn-pill">All posts ↗</NuxtLink>
      </div>

      <div class="surface-list">
        <NuxtLink
          v-for="article in selectedArticles"
          :key="article._path"
          :to="blogOrigin + article._path"
          class="surface-row writing-row"
        >
          <div>
            <h3>{{ article.title }}</h3>
            <p>{{ article.read_time }} read</p>
          </div>
          <time class="surface-row__tag" :datetime="isoDate(article.date)">{{
            yearOf(article.date)
          }}</time>
          <span class="surface-row__arrow" aria-hidden="true">↗</span>
        </NuxtLink>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { blogOrigin } from "~/utils/site";
import { projects } from "~/data/work";
import { isoDate, yearOf } from "~/utils/articles";

const copied = ref(false);
let copyTimer: ReturnType<typeof setTimeout> | undefined;

async function copyEmail() {
  try {
    await navigator.clipboard.writeText("obajohn75@gmail.com");
    copied.value = true;
    clearTimeout(copyTimer);
    copyTimer = setTimeout(() => {
      copied.value = false;
    }, 1800);
  } catch {
    window.location.href = "mailto:obajohn75@gmail.com";
  }
}

const featuredBento = [
  "startuplist-africa",
  "now",
  "oystack",
  "peerplay",
].map((slug) => projects.find((p) => p.slug === slug)!);

const workbench = ["macos-computer-use", "pixelator", "xtts", "box-tools"].map(
  (slug) => projects.find((p) => p.slug === slug)!,
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
.hero-stage {
  position: relative;
  margin-top: 20px;
  padding: clamp(72px, 11vw, 134px) clamp(20px, 4vw, 48px)
    clamp(64px, 9vw, 112px);
  border-radius: var(--radius-stage);
  background: var(--canvas);
  border: 1px solid var(--border-subtle);
  overflow: hidden;
  isolation: isolate;
  text-align: center;
}

.hero-watermark {
  position: absolute;
  top: 50%;
  left: 50%;
  width: min(640px, 92vw);
  height: auto;
  transform: translate(-50%, -44%);
  color: var(--foreground);
  opacity: var(--watermark-opacity);
  pointer-events: none;
  z-index: -1;
}

.hero-watermark__core {
  fill: var(--canvas);
}

.hero-content {
  position: relative;
  max-width: 780px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hero-stage h1 {
  font: 800 clamp(38px, 6.2vw, 72px)/1.03 var(--display);
  letter-spacing: -0.048em;
  color: var(--foreground);
  text-wrap: balance;
}

.hero-stage h1 span {
  color: var(--accent);
  margin-left: -0.02em;
}

.hero-subtitle {
  margin-top: 22px;
  max-width: 610px;
  font-size: clamp(15.5px, 1.8vw, 18px);
  line-height: 1.62;
  color: var(--muted);
  text-wrap: balance;
}

.hero-subtitle a {
  color: var(--foreground);
  font-weight: 600;
  border-bottom: 1.5px solid color-mix(in srgb, var(--accent) 45%, transparent);
  transition:
    color 160ms ease,
    border-color 160ms ease;
}

.hero-subtitle a:hover {
  color: var(--accent);
  border-bottom-color: var(--accent);
}

.hero-actions {
  margin-top: 34px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.contact-pill {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  min-height: 46px;
  padding: 5px 8px 5px 16px;
  border-radius: 14px;
  background: var(--card);
  border: 1px solid var(--border);
  box-shadow: var(--pill-shadow);
  font: 13px/1 var(--mono);
}

.contact-pill__prefix {
  color: var(--faint);
  user-select: none;
}

.contact-pill__addr {
  color: var(--foreground);
  font-weight: 500;
}

.contact-pill__copy {
  width: 34px;
  height: 34px;
  border-radius: 10px;
  display: grid;
  place-items: center;
  color: var(--muted);
  background: var(--surface);
  transition:
    color 160ms ease,
    background-color 160ms ease;
}

.contact-pill__copy:hover {
  color: var(--foreground);
  background: var(--surface-hover);
}

.contact-pill__copy svg {
  width: 16px;
  height: 16px;
}

/* Asymmetric Bento Grid */
.home-bento {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.bento-card--wide {
  grid-column: span 2;
}

.bento-visual--card {
  height: 270px;
  min-height: 270px;
}

/* Solid Orange Rare-UI CTA Tile */
.bento-cta-tile {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 300px;
  padding: 24px;
  border-radius: var(--radius-card);
  background: var(--accent);
  color: #ffffff;
  overflow: hidden;
  isolation: isolate;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.28),
    0 16px 36px -14px rgba(255, 77, 0, 0.45);
  transition:
    transform 240ms var(--ease-out),
    background-color 180ms ease;
}

.bento-cta-tile__watermark {
  position: absolute;
  right: -46px;
  top: -36px;
  width: 240px;
  height: 240px;
  color: #ffffff;
  opacity: 0.14;
  pointer-events: none;
  z-index: -1;
  transition: transform 380ms var(--ease-out);
}

.bento-cta-tile__badge {
  align-self: flex-start;
  padding: 6px 12px;
  border-radius: var(--radius-pill);
  background: rgba(255, 255, 255, 0.18);
  font: 500 11px/1 var(--mono);
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.bento-cta-tile__bottom {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 12px;
}

.bento-cta-tile h3 {
  font: 700 28px/1.08 var(--display);
  letter-spacing: -0.04em;
}

.bento-cta-tile__arrow {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  flex-shrink: 0;
  display: grid;
  place-items: center;
  background: rgba(255, 255, 255, 0.2);
  font-size: 20px;
  transition:
    transform 220ms var(--ease-out),
    background-color 180ms ease;
}

@media (hover: hover) and (pointer: fine) {
  .bento-cta-tile:hover {
    transform: translateY(-3px);
    background: var(--accent-hover);
  }
  .bento-cta-tile:hover .bento-cta-tile__watermark {
    transform: rotate(22deg) scale(1.06);
  }
  .bento-cta-tile:hover .bento-cta-tile__arrow {
    background: rgba(255, 255, 255, 0.3);
    transform: translate(3px, -3px);
  }
}

@media (max-width: 980px) {
  .home-bento {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .bento-card--wide {
    grid-column: span 2;
  }
}

@media (max-width: 640px) {
  .hero-stage {
    margin-top: 14px;
    border-radius: 24px;
    padding: 54px 18px 48px;
  }
  .contact-pill {
    width: 100%;
    justify-content: space-between;
  }
  .btn-primary {
    width: 100%;
  }
  .home-bento {
    grid-template-columns: 1fr;
  }
  .bento-card--wide {
    grid-column: span 1;
  }
  .bento-visual--card {
    height: 245px;
    min-height: 245px;
  }
  .bento-cta-tile {
    min-height: 200px;
  }
}
</style>
