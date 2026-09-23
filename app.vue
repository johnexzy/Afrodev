<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
import { blogOrigin, mainOrigin } from "~/utils/site";
const route = useRoute();
const blogSite = useRuntimeConfig().public.blogSite;
const canonical = computed(() => {
  const writing =
    blogSite ||
    route.path === "/blog" ||
    (!["/", "/portfolio", "/about"].includes(route.path) &&
      !route.path.startsWith("/work/"));
  return writing
    ? blogOrigin + (route.path === "/blog" ? "/" : route.path)
    : mainOrigin + route.path;
});
useHead({ link: [{ rel: "canonical", href: canonical }] });
useSeoMeta({
  ogSiteName: "John Oba / Afrodev",
  ogUrl: canonical,
  ogImage: mainOrigin + "/meta.png",
  twitterCard: "summary_large_image",
});
</script>
