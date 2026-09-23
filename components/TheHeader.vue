<template>
  <header class="site-header">
    <NuxtLink
      :to="blogSite ? mainOrigin : '/'"
      :external="blogSite"
      class="brand-link"
      aria-label="John Oba — home"
    >
      <img
        class="brand-image"
        src="/afrodev-signature.svg"
        width="104"
        height="42"
        alt="afrodev"
      />
      <span class="brand-name">John Oba</span>
    </NuxtLink>
    <nav class="site-nav" aria-label="Primary navigation">
      <NuxtLink
        v-for="(item, index) in navigation"
        :key="item.to"
        :to="item.to"
        :external="item.to.startsWith('https://')"
        :aria-current="isActive(item.label) ? 'page' : undefined"
        :class="{ active: isActive(item.label) }"
      >
        <span class="nav-number" aria-hidden="true">0{{ index + 1 }}</span
        >{{ item.label }}<span class="nav-indicator" aria-hidden="true">↗</span>
      </NuxtLink>
    </nav>
    <div class="header-aside">
      <p class="mono">Elsewhere</p>
      <a
        href="https://github.com/johnexzy"
        target="_blank"
        rel="noopener noreferrer"
        >GitHub <span aria-hidden="true">↗</span></a
      >
      <a href="mailto:obajohn75@gmail.com"
        >Say hello <span aria-hidden="true">↗</span></a
      >
      <div class="header-location">
        <span class="location-dot" aria-hidden="true" /> Lagos, Nigeria
      </div>
    </div>
    <ClientOnly>
      <button
        class="theme-toggle"
        type="button"
        :aria-label="isDark ? 'Use light theme' : 'Use dark theme'"
        @click="toggleTheme"
      >
        <span aria-hidden="true">{{ isDark ? "◐" : "◑" }}</span
        ><span class="theme-label">{{ isDark ? "Light" : "Dark" }}</span>
      </button>
      <template #fallback
        ><span class="theme-toggle" aria-hidden="true"
          >◑ <span class="theme-label">Theme</span></span
        ></template
      >
    </ClientOnly>
  </header>
</template>
<script setup lang="ts">
import { blogOrigin, mainOrigin } from "~/utils/site";
const route = useRoute();
const error = useError();
const colorMode = useColorMode();
const blogSite = useRuntimeConfig().public.blogSite;
const isDark = computed(() => colorMode.value === "dark");
const navigation = [
  { label: "Index", to: blogSite ? mainOrigin : "/" },
  { label: "Work", to: blogSite ? mainOrigin + "/portfolio" : "/portfolio" },
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
  if (label === "Index") return route.path === "/";
  if (label === "Work")
    return route.path === "/portfolio" || route.path.startsWith("/work/");
  if (label === "About") return route.path === "/about";
  return false;
};
const toggleTheme = () => {
  colorMode.preference = isDark.value ? "light" : "dark";
};
</script>
