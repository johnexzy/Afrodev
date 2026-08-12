<template>
  <main class="writing-page reading-column">
    <header class="writing-header reveal">
      <p class="eyebrow">Writing / {{ data.length }} notes</p>
      <h1>Writing.</h1>
      <p>
        Notes on product engineering, AI, distributed systems, and things I’ve
        learned while building.
      </p>
    </header>

    <ListArticles :data="data" hide-images />
  </main>
</template>

<script setup lang="ts">
const data = (
  await queryContent("/")
    .where({ draft: false })
    .only(["title", "description", "date", "read_time", "_path", "category"])
    .find()
).reverse();

useServerSeoMeta({
  title: "Writing — John Oba",
  ogTitle: "Writing — John Oba",
  description: "Notes on product engineering, AI, and real-time systems.",
  ogDescription: "Notes on product engineering, AI, and real-time systems.",
  ogImage: "https://res.cloudinary.com/dpq6dieap/image/upload/v1678755812/meta_en37in.png",
  twitterCard: "summary_large_image",
});
</script>

<style scoped>
.writing-page {
  padding: 2rem 0 3rem;
}

.writing-header {
  margin-bottom: 4.5rem;
}

.writing-header h1 {
  margin: 1.15rem 0 0;
  font-size: clamp(2.25rem, 6vw, 3.75rem);
  font-weight: 500;
  letter-spacing: -0.055em;
}

.writing-header > p:last-child {
  max-width: 42rem;
  margin: 1.25rem 0 0;
  color: var(--muted);
  font-size: 0.9rem;
  line-height: 1.75;
}

@media (max-width: 560px) {
  .writing-page {
    padding-top: 0;
  }

  .writing-header {
    margin-bottom: 3rem;
  }
}
</style>
