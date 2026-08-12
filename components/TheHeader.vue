<template>
  <header class="site-header">
    <NuxtLink to="/" class="brand-link" aria-label="Afrodev home">
      <img
        class="brand-link__logo brand-link__logo--dark"
        width="96"
        height="38"
        src="../assets/img/logo-dark.svg"
        alt="Afrodev"
      />
      <img
        class="brand-link__logo brand-link__logo--light"
        width="96"
        height="38"
        src="../assets/img/logo.svg"
        alt="Afrodev"
      />
    </NuxtLink>

    <nav class="site-nav" aria-label="Primary navigation">
      <NuxtLink
        v-for="item in navigation"
        :key="item.to"
        :to="item.to"
        class="site-nav__link"
        :class="{ 'site-nav__link--active': isActive(item.to) }"
      >
        {{ item.label }}
      </NuxtLink>
      <a href="https://github.com/johnexzy" target="_blank" rel="noreferrer" title="GitHub" aria-label="GitHub">
        <Icon name="ph:github-logo" />
      </a>
      <ClientOnly>
        <button
          class="theme-toggle"
          type="button"
          :aria-label="isDark ? 'Use light theme' : 'Use dark theme'"
          :title="isDark ? 'Use light theme' : 'Use dark theme'"
          @click="toggleDark"
        >
          <Icon :name="isDark ? 'ph:sun' : 'ph:moon'" />
        </button>
        <template #fallback>
          <span class="theme-toggle" aria-hidden="true"><Icon name="ph:moon" /></span>
        </template>
      </ClientOnly>
    </nav>
  </header>
</template>

<script setup lang="ts">
const route = useRoute();
const colorMode = useColorMode();
const isDark = ref(colorMode.value === "dark");
let themeObserver: MutationObserver | undefined;

const navigation = [
  { label: "Writing", to: "/blog" },
  { label: "Projects", to: "/portfolio" },
];

const isActive = (path: string) => route.path.startsWith(path);
const toggleDark = () => {
  const nextIsDark = !document.documentElement.classList.contains("dark");
  colorMode.preference = nextIsDark ? "dark" : "light";
  document.documentElement.classList.toggle("dark", nextIsDark);
  isDark.value = nextIsDark;
};

onMounted(() => {
  const syncTheme = () => {
    isDark.value = document.documentElement.classList.contains("dark");
  };

  syncTheme();
  themeObserver = new MutationObserver(syncTheme);
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
});

onUnmounted(() => themeObserver?.disconnect());
</script>

<style scoped>
.site-header {
  position: relative;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 5.5rem;
  margin-bottom: 3.5rem;
}

.brand-link {
  display: inline-flex;
  padding: 0.3rem;
  opacity: 0.8;
  transition: opacity 160ms ease, transform 140ms var(--ease-out);
}

.brand-link__logo {
  width: 6rem;
  height: 2.4rem;
  object-fit: contain;
}

.brand-link__logo--dark {
  display: none;
}

.dark .brand-link__logo--dark {
  display: block;
}

.dark .brand-link__logo--light {
  display: none;
}

.site-nav {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.site-nav__link,
.site-nav a,
.theme-toggle {
  display: inline-flex;
  min-height: 2.75rem;
  align-items: center;
  justify-content: center;
  color: var(--foreground);
  font-size: 0.8rem;
  opacity: 0.74;
  transition: opacity 160ms ease, transform 140ms var(--ease-out);
}

.theme-toggle,
.site-nav > a {
  min-width: 2.75rem;
}

.site-nav__link--active {
  opacity: 1;
}

.theme-toggle {
  font-size: 1.05rem;
}

.brand-link:active,
.site-nav a:active,
.theme-toggle:active {
  transform: scale(0.96);
}

@media (hover: hover) and (pointer: fine) {
  .brand-link:hover,
  .site-nav a:hover,
  .theme-toggle:hover {
    opacity: 1;
  }
}

@media (max-width: 640px) {
  .site-header {
    min-height: 4.5rem;
    margin-bottom: 2.5rem;
  }

  .brand-link__logo {
    width: 5.2rem;
  }

  .site-nav {
    gap: 0.85rem;
  }

  .site-nav__link {
    font-size: 0.78rem;
  }
}
</style>
