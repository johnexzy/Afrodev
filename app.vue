<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
const route = useRoute();
const canonical = computed(() => "https://afrodev.space" + route.path);
useHead({ link: [{ rel: "canonical", href: canonical }] });
useSeoMeta({
  ogSiteName: "John Oba / Afrodev",
  ogUrl: canonical,
  ogImage: "https://afrodev.space/meta.png",
  twitterCard: "summary_large_image",
});
</script>
