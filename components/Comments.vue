<template>
  <div class="discussion">
    <p v-if="failed" role="status">The discussion couldn’t load here.</p>
    <div ref="container" />
    <a
      class="text-link"
      href="https://github.com/johnexzy/utterances-afrodev/issues"
      target="_blank"
      rel="noopener noreferrer"
      >Open discussions on GitHub ↗</a
    >
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{ isDark?: boolean }>();
const container = ref<HTMLElement>();
const failed = ref(false);
onMounted(() => {
  const script = document.createElement("script");
  script.src = "https://utteranc.es/client.js";
  script.setAttribute("repo", "johnexzy/utterances-afrodev");
  script.setAttribute("issue-term", "title");
  script.setAttribute("label", "Comment");
  script.setAttribute("theme", props.isDark ? "github-dark" : "github-light");
  script.crossOrigin = "anonymous";
  script.async = true;
  script.onerror = () => {
    failed.value = true;
  };
  container.value?.append(script);
});
</script>
<style scoped>
.discussion > p {
  font-size: 14px;
  color: var(--muted);
  margin-bottom: 15px;
}
.discussion > a {
  display: inline-block;
  margin-top: 20px;
}
.discussion :deep(.utterances) {
  width: 100%;
  max-width: 100%;
  margin: 0;
}
</style>
