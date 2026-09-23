<template>
  <main
    v-if="data"
    id="main-content"
    class="article-page reading-column"
    tabindex="-1"
  >
    <div class="page-mast">
      <NuxtLink :to="writingHome">← Writing</NuxtLink>
      <span>{{ data.read_time }} read</span>
    </div>
    <header class="article-header reveal">
      <div class="article-meta">
        <time :datetime="isoDate(data.date)">{{ data.date }}</time
        ><span>{{ categories.join(" / ") }}</span>
      </div>
      <h1>{{ data.title }}</h1>
      <p v-if="data.description">{{ data.description }}</p>
    </header>
    <figure v-if="data.featured_image" class="article-cover">
      <img :src="data.featured_image" :alt="data.title" decoding="async" />
    </figure>
    <details v-if="outline.length" class="article-outline">
      <summary>In this article <span aria-hidden="true">+</span></summary>
      <nav aria-label="Table of contents">
        <a
          v-for="heading in outline"
          :key="heading.id"
          :href="'#' + heading.id"
          >{{ heading.text }}</a
        >
      </nav>
    </details>
    <article class="article-content">
      <ContentRenderer :value="data" class="prose" />
    </article>
    <section
      id="commentSection"
      class="article-comments"
      aria-labelledby="responses-heading"
    >
      <div class="section-label">
        <h2 id="responses-heading">Notes & responses</h2>
        <span class="mono">Via GitHub</span>
      </div>
      <template v-if="!commentsOpen">
        <p>Have a question, a correction, or something to add?</p>
        <button type="button" class="text-link" @click="commentsOpen = true">
          Load the discussion <span aria-hidden="true">↗</span>
        </button>
        <small
          >Loads comments from utteranc.es. A GitHub account is needed to
          reply.</small
        >
      </template>
      <ClientOnly v-else
        ><Comments :key="colorMode.value" :is-dark="colorMode.value === 'dark'"
      /></ClientOnly>
    </section>
    <section v-if="moreArticles.length" class="more-stories">
      <div class="section-label">
        <h2>Continue reading</h2>
        <NuxtLink :to="writingHome">Full archive ↗</NuxtLink>
      </div>
      <ListArticles :data="moreArticles" />
    </section>
  </main>
</template>

<script setup lang="ts">
import { blogOrigin, mainOrigin } from "~/utils/site";
import { withBase } from "ufo";
import { articleTime, isoDate } from "~/utils/articles";

const { path } = useRoute();
const writingHome = useRuntimeConfig().public.blogSite ? "/" : blogOrigin;
const colorMode = useColorMode();
const commentsOpen = ref(false);
const { data } = await useAsyncData(`content-${path}`, () =>
  queryContent().where({ _path: path, draft: false }).findOne(),
);
if (!data.value)
  throw createError({
    statusCode: 404,
    statusMessage: "Writing not found",
    fatal: true,
  });
const { data: articles } = await useAsyncData("reading-index", () =>
  queryContent("/")
    .where({ draft: false })
    .only(["title", "description", "date", "read_time", "_path", "category"])
    .find(),
);
const moreArticles = computed(() =>
  (articles.value || [])
    .filter((article) => article._path !== path)
    .sort((a, b) => articleTime(b.date) - articleTime(a.date))
    .slice(0, 3),
);
const categories = computed(
  () =>
    data.value?.category
      ?.split(",")
      .map((category: string) => category.trim())
      .filter(Boolean) || [],
);
const outline = computed(() => data.value?.body?.toc?.links || []);
const ogImage = computed(() =>
  data.value?.og_image ? withBase(data.value.og_image, mainOrigin) : undefined,
);
useSeoMeta({
  title: () => data.value?.title,
  ogTitle: () => data.value?.title,
  description: () => data.value?.description,
  ogDescription: () => data.value?.description,
  ogImage,
  author: () => data.value?.author,
  ogType: "article",
  twitterCard: "summary_large_image",
});
</script>

<style scoped>
.article-header {
  margin: 34px 0 36px;
}
.article-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 12px 20px;
  justify-content: space-between;
  font: 10px/1.8 var(--mono);
  color: var(--muted);
}
.article-meta > span {
  max-width: 60%;
  text-align: right;
}
.article-header h1 {
  font: 400 clamp(42px, 4.8vw, 64px)/1.06 var(--serif);
  letter-spacing: -0.025em;
  margin: 25px 0 22px;
  text-wrap: balance;
}
.article-header > p {
  color: var(--muted);
  font-size: 17px;
  line-height: 1.75;
}
.article-cover {
  margin: 36px 0;
}
.article-cover img {
  display: block;
  max-height: 440px;
  width: 100%;
  object-fit: cover;
  border: 1px solid var(--border-subtle);
  border-radius: 3px;
}
.article-outline {
  margin: 32px 0 40px;
  padding: 15px 0;
  border-block: 1px solid var(--border);
  font-size: 13px;
}
.article-outline summary {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  list-style: none;
  color: var(--accent);
}
.article-outline summary::-webkit-details-marker {
  display: none;
}
.article-outline summary > span {
  font-size: 20px;
  line-height: 1;
}
.article-outline[open] summary > span {
  transform: rotate(45deg);
}
.article-outline nav {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 21px 0 5px;
}
.article-outline nav a {
  color: var(--muted);
  line-height: 1.5;
}
.article-outline nav a:hover {
  color: var(--accent);
}
.article-comments,
.more-stories {
  margin-top: 64px;
}
.article-comments .section-label > span {
  font-size: 10px;
  color: var(--muted);
}
.article-comments > p {
  font-size: 14px;
  color: var(--muted);
  line-height: 1.7;
}
.article-comments > button {
  margin-top: 15px;
}
.article-comments > small {
  display: block;
  font-size: 11px;
  color: var(--muted);
  line-height: 1.7;
  margin-top: 10px;
}
@media (max-width: 520px) {
  .article-header h1 {
    font-size: 43px;
  }
  .article-header > p {
    font-size: 16px;
  }
  .article-meta > span {
    max-width: 100%;
    text-align: left;
  }
  .article-header {
    margin-top: 25px;
  }
}
</style>
