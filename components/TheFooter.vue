<template>
  <footer class="site-footer">
    <div class="footer-glow" aria-hidden="true" />
    <div class="footer-top">
      <div class="footer-brand">
        <div class="footer-brand__row">
          <svg
            class="footer-emblem"
            viewBox="0 0 28 28"
            fill="none"
            aria-hidden="true"
          >
            <g fill="currentColor">
              <rect x="11.2" y="2.2" width="5.6" height="10.2" rx="2.8" />
              <rect
                x="11.2"
                y="2.2"
                width="5.6"
                height="10.2"
                rx="2.8"
                transform="rotate(60 14 14)"
              />
              <rect
                x="11.2"
                y="2.2"
                width="5.6"
                height="10.2"
                rx="2.8"
                transform="rotate(120 14 14)"
              />
              <rect
                x="11.2"
                y="2.2"
                width="5.6"
                height="10.2"
                rx="2.8"
                transform="rotate(180 14 14)"
              />
              <rect
                x="11.2"
                y="2.2"
                width="5.6"
                height="10.2"
                rx="2.8"
                transform="rotate(240 14 14)"
              />
              <rect
                x="11.2"
                y="2.2"
                width="5.6"
                height="10.2"
                rx="2.8"
                transform="rotate(300 14 14)"
              />
            </g>
            <circle cx="14" cy="14" r="2.7" class="footer-emblem__core" />
          </svg>
          <span>John Oba</span>
        </div>
        <p>
          Software engineer in Lagos building web products, AI tools, and Mac
          apps. Thanks for stopping by.
        </p>
      </div>

      <div class="footer-columns">
        <div>
          <span class="footer-col-label">Site</span>
          <NuxtLink :to="blogSite ? mainOrigin : '/'" :external="blogSite"
            >Home</NuxtLink
          >
          <NuxtLink
            :to="blogSite ? mainOrigin + '/portfolio' : '/portfolio'"
            :external="blogSite"
            >Projects</NuxtLink
          >
          <NuxtLink :to="blogSite ? '/' : blogOrigin" :external="!blogSite"
            >Writing</NuxtLink
          >
          <NuxtLink
            :to="blogSite ? mainOrigin + '/about' : '/about'"
            :external="blogSite"
            >About</NuxtLink
          >
        </div>

        <div>
          <span class="footer-col-label">Elsewhere</span>
          <a href="mailto:obajohn75@gmail.com">Email ↗</a>
          <a
            href="https://github.com/johnexzy"
            target="_blank"
            rel="noopener noreferrer"
            >GitHub ↗</a
          >
          <a
            href="https://linkedin.com/in/johnoba"
            target="_blank"
            rel="noopener noreferrer"
            >LinkedIn ↗</a
          >
          <a href="#top" class="footer-top-link">Back to top ↑</a>
        </div>
      </div>
    </div>

    <div class="footer-wordmark" aria-hidden="true">
      Afrodev<span>.</span>
    </div>

    <div class="footer-bottom">
      <span>© {{ new Date().getFullYear() }} John Oba</span>
      <span>Lagos, Nigeria</span>
      <span>Built with Nuxt</span>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { blogOrigin, mainOrigin } from "~/utils/site";
const blogSite = useRuntimeConfig().public.blogSite;
</script>

<style scoped>
.site-footer {
  position: relative;
  margin-top: 96px;
  padding: clamp(36px, 5vw, 56px) clamp(24px, 4.5vw, 52px) 28px;
  border-radius: var(--radius-stage);
  background: var(--canvas);
  border: 1px solid var(--border-subtle);
  overflow: hidden;
  isolation: isolate;
}

.footer-glow {
  position: absolute;
  inset: auto -10% -42% -10%;
  height: 75%;
  background: var(--footer-glow);
  pointer-events: none;
  z-index: -1;
}

.footer-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 40px;
}

.footer-brand {
  max-width: 320px;
}

.footer-brand__row {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  font: 700 16px/1 var(--display);
  letter-spacing: -0.025em;
  color: var(--foreground);
}

.footer-emblem {
  width: 22px;
  height: 22px;
  color: var(--accent);
}

.footer-emblem__core {
  fill: var(--canvas);
}

.footer-brand p {
  margin-top: 14px;
  font-size: 14px;
  line-height: 1.65;
  color: var(--muted);
}

.footer-columns {
  display: flex;
  gap: 56px;
}

.footer-columns > div {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.footer-col-label {
  font: 500 11px/1.2 var(--mono);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--faint);
  margin-bottom: 4px;
}

.footer-columns a {
  font-size: 14px;
  font-weight: 500;
  color: var(--muted);
  transition: color 150ms ease;
}

.footer-columns a:hover {
  color: var(--foreground);
}

.footer-top-link {
  color: var(--accent) !important;
}

.footer-wordmark {
  margin: clamp(32px, 5vw, 56px) 0 18px;
  font: 800 clamp(60px, 14.2vw, 176px)/0.88 var(--display);
  letter-spacing: -0.055em;
  color: var(--foreground);
  text-align: center;
  user-select: none;
  opacity: 0.92;
}

.footer-wordmark span {
  color: var(--accent);
}

.footer-bottom {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px 24px;
  padding-top: 20px;
  border-top: 1px solid var(--border-subtle);
  font: 12px/1.5 var(--mono);
  color: var(--muted);
}

@media (max-width: 720px) {
  .site-footer {
    margin-top: 64px;
    border-radius: 24px;
  }
  .footer-top {
    flex-direction: column;
    gap: 32px;
  }
  .footer-columns {
    width: 100%;
    gap: 40px;
  }
}
</style>
