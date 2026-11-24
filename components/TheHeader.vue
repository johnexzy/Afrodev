<template>
  <header class="floating-header">
    <div class="floating-header__inner">
      <NuxtLink
        :to="blogSite ? mainOrigin : '/'"
        :external="blogSite"
        class="nav-pill nav-pill--brand"
        aria-label="John Oba — home"
      >
        <svg
          class="brand-emblem"
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
          <circle cx="14" cy="14" r="2.7" class="brand-emblem__core" />
        </svg>
        <span class="brand-title">John Oba</span>
      </NuxtLink>

      <nav class="nav-pill nav-pill--links" aria-label="Primary navigation">
        <template v-for="(item, index) in navigation" :key="item.to">
          <span
            v-if="index > 0"
            class="nav-sep"
            aria-hidden="true"
          />
          <NuxtLink
            :to="item.to"
            :external="item.to.startsWith('https://')"
            :aria-current="isActive(item.label) ? 'page' : undefined"
            :class="['nav-item', { 'is-active': isActive(item.label) }]"
          >
            {{ item.label }}
          </NuxtLink>
        </template>
      </nav>

      <div class="nav-actions">
        <a
          href="https://github.com/johnexzy"
          target="_blank"
          rel="noopener noreferrer"
          class="nav-pill nav-pill--github"
          aria-label="John Oba on GitHub"
        >
          <svg
            class="github-icon"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z"
            />
          </svg>
          <span>GitHub</span>
        </a>

        <ClientOnly>
          <button
            class="nav-circle theme-btn"
            type="button"
            :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
            :title="isDark ? 'Light mode' : 'Dark mode'"
            @click="toggleTheme"
          >
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <circle
                cx="10"
                cy="10"
                r="7.2"
                stroke="currentColor"
                stroke-width="1.6"
              />
              <path
                d="M10 2.8A7.2 7.2 0 0 1 10 17.2Z"
                fill="currentColor"
              />
            </svg>
          </button>
          <template #fallback>
            <span class="nav-circle theme-btn" aria-hidden="true">
              <svg viewBox="0 0 20 20" fill="none">
                <circle
                  cx="10"
                  cy="10"
                  r="7.2"
                  stroke="currentColor"
                  stroke-width="1.6"
                />
                <path
                  d="M10 2.8A7.2 7.2 0 0 1 10 17.2Z"
                  fill="currentColor"
                />
              </svg>
            </span>
          </template>
        </ClientOnly>

        <button
          class="nav-circle mobile-menu-btn"
          type="button"
          :aria-expanded="menuOpen"
          aria-controls="mobile-nav-drawer"
          aria-label="Toggle navigation menu"
          @click="menuOpen = !menuOpen"
        >
          <svg
            v-if="!menuOpen"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M4 6.5h12M4 10h12M4 13.5h12"
              stroke="currentColor"
              stroke-width="1.7"
              stroke-linecap="round"
            />
          </svg>
          <svg v-else viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path
              d="M5.5 5.5l9 9M14.5 5.5l-9 9"
              stroke="currentColor"
              stroke-width="1.7"
              stroke-linecap="round"
            />
          </svg>
        </button>
      </div>
    </div>

    <div
      v-if="menuOpen"
      id="mobile-nav-drawer"
      class="mobile-drawer"
      role="dialog"
      aria-label="Site navigation"
    >
      <nav aria-label="Mobile navigation">
        <NuxtLink
          v-for="item in navigation"
          :key="item.to"
          :to="item.to"
          :external="item.to.startsWith('https://')"
          :aria-current="isActive(item.label) ? 'page' : undefined"
          :class="['mobile-drawer__link', { 'is-active': isActive(item.label) }]"
          @click="menuOpen = false"
        >
          <span>{{ item.label }}</span>
          <span aria-hidden="true">{{
            item.to.startsWith("https://") ? "↗" : "→"
          }}</span>
        </NuxtLink>
      </nav>
      <div class="mobile-drawer__footer">
        <a
          href="https://github.com/johnexzy"
          target="_blank"
          rel="noopener noreferrer"
          >GitHub ↗</a
        >
        <a href="mailto:obajohn75@gmail.com">obajohn75@gmail.com ↗</a>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { blogOrigin, mainOrigin } from "~/utils/site";

const route = useRoute();
const error = useError();
const colorMode = useColorMode();
const blogSite = useRuntimeConfig().public.blogSite;
const menuOpen = ref(false);

watch(
  () => route.fullPath,
  () => {
    menuOpen.value = false;
  },
);

const isDark = computed(() => colorMode.value === "dark");

const navigation = [
  { label: "Home", to: blogSite ? mainOrigin : "/" },
  { label: "Projects", to: blogSite ? mainOrigin + "/portfolio" : "/portfolio" },
  { label: "Writing", to: blogSite ? "/" : blogOrigin },
  { label: "About", to: blogSite ? mainOrigin + "/about" : "/about" },
];

const isActive = (label: string) => {
  if (error.value) return false;
  if (label === "Writing")
    return (
      blogSite ||
      route.path === "/blog" ||
      (!["/", "/about", "/portfolio"].includes(route.path) &&
        !route.path.startsWith("/work/"))
    );
  if (blogSite) return false;
  if (label === "Home") return route.path === "/";
  if (label === "Projects")
    return route.path === "/portfolio" || route.path.startsWith("/work/");
  if (label === "About") return route.path === "/about";
  return false;
};

const toggleTheme = () => {
  colorMode.preference = isDark.value ? "light" : "dark";
};
</script>

<style scoped>
.floating-header {
  position: fixed;
  top: 16px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 60;
  width: min(1200px, calc(100% - 32px));
  pointer-events: none;
}

.floating-header__inner {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 12px;
}

.nav-pill,
.nav-circle {
  pointer-events: auto;
  background: var(--pill-bg);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--border-subtle);
  box-shadow: var(--pill-shadow);
  border-radius: var(--radius-pill);
  transition:
    background-color 180ms ease,
    border-color 180ms ease,
    transform 180ms var(--ease-out),
    color 180ms ease;
}

.nav-pill--brand {
  justify-self: start;
  display: inline-flex;
  align-items: center;
  gap: 9px;
  height: 44px;
  padding: 0 16px 0 12px;
}

.brand-emblem {
  width: 22px;
  height: 22px;
  color: var(--accent);
  flex-shrink: 0;
  transition: transform 320ms var(--ease-spring);
}

.brand-emblem__core {
  fill: var(--pill-bg);
}

.nav-pill--brand:hover .brand-emblem {
  transform: rotate(30deg) scale(1.06);
}

.brand-title {
  font: 700 14px/1 var(--display);
  letter-spacing: -0.025em;
  color: var(--foreground);
  white-space: nowrap;
}

.nav-pill--links {
  justify-self: center;
  display: inline-flex;
  align-items: center;
  height: 44px;
  padding: 4px 6px;
}

.nav-item {
  display: inline-flex;
  align-items: center;
  height: 34px;
  padding: 0 14px;
  border-radius: var(--radius-pill);
  font-size: 13.5px;
  font-weight: 500;
  color: var(--muted);
  transition:
    color 150ms ease,
    background-color 150ms ease;
}

.nav-item:hover {
  color: var(--foreground);
}

.nav-item.is-active {
  color: var(--foreground);
  font-weight: 600;
  background: var(--surface);
}

.nav-sep {
  width: 1px;
  height: 14px;
  background: var(--border-subtle);
  flex-shrink: 0;
}

.nav-actions {
  justify-self: end;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.nav-pill--github {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 44px;
  padding: 0 16px 0 13px;
  font-size: 13.5px;
  font-weight: 600;
  color: var(--foreground);
}

.github-icon {
  width: 17px;
  height: 17px;
  color: var(--muted);
  transition: color 180ms ease;
}

.nav-pill--github:hover {
  border-color: var(--border);
  transform: translateY(-1px);
}

.nav-pill--github:hover .github-icon {
  color: var(--accent);
}

.nav-circle {
  width: 44px;
  height: 44px;
  display: grid;
  place-items: center;
  color: var(--foreground);
}

.nav-circle svg {
  width: 18px;
  height: 18px;
}

.nav-circle:hover {
  border-color: var(--border);
  transform: translateY(-1px);
}

.theme-btn:hover svg {
  transform: rotate(180deg);
  transition: transform 320ms var(--ease-out);
}

.mobile-menu-btn {
  display: none;
}

.mobile-drawer {
  pointer-events: auto;
  margin-top: 10px;
  padding: 12px;
  border-radius: 24px;
  background: var(--pill-bg);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--border);
  box-shadow: var(--pill-shadow);
  animation: arrive 220ms var(--ease-out) both;
}

.mobile-drawer nav {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.mobile-drawer__link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 14px;
  border-radius: 14px;
  font: 600 15px/1.2 var(--display);
  color: var(--muted);
}

.mobile-drawer__link.is-active {
  background: var(--surface);
  color: var(--foreground);
}

.mobile-drawer__link span:last-child {
  color: var(--accent);
  font-size: 14px;
}

.mobile-drawer__footer {
  display: flex;
  flex-wrap: wrap;
  gap: 4px 12px;
  margin-top: 10px;
  padding: 4px 8px 0;
  border-top: 1px solid var(--border-subtle);
  font: 12px var(--mono);
  color: var(--muted);
}

.mobile-drawer__footer a {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  padding: 0 6px;
}

@media (max-width: 820px) {
  .floating-header {
    top: 12px;
    width: calc(100% - 24px);
  }
  .floating-header__inner {
    grid-template-columns: auto 1fr;
  }
  .nav-pill--links,
  .nav-pill--github {
    display: none;
  }
  .mobile-menu-btn {
    display: grid;
  }
}
</style>
