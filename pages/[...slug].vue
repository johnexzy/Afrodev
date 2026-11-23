<template>
  <main
    v-if="data"
    id="main-content"
    class="article-page reading-column"
    tabindex="-1"
  >
    <div class="article-topbar">
      <NuxtLink :to="writingHome" class="back-pill">← Writing</NuxtLink>
      <span class="article-read-pill">{{ data.read_time }} read</span>
    </div>

    <header class="article-header reveal">
      <div class="article-meta">
        <time :datetime="isoDate(data.date)">{{ data.date }}</time>
        <span v-if="categories.length" aria-hidden="true">·</span>
        <span v-if="categories.length">{{ categories.join(" / ") }}</span>
      </div>
      <h1>{{ data.title }}</h1>
      <p v-if="data.description">{{ data.description }}</p>
      <nav
        v-if="data.tags?.length"
        class="article-tags"
        aria-label="Article tags"
      >
        <NuxtLink v-for="tag in data.tags" :key="tag" :to="tagLink(tag)">
          {{ tagLabel(tag) }}
        </NuxtLink>
      </nav>
    </header>

    <figure v-if="data.featured_image" class="article-cover">
      <img :src="data.featured_image" :alt="data.title" decoding="async" />
    </figure>

    <details v-if="outline.length" class="article-outline">
      <summary>
        <span>In this article</span>
        <span class="outline-plus" aria-hidden="true">+</span>
      </summary>
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
      <div class="article-comments__head">
        <h2 id="responses-heading">Comments</h2>
        <span class="mono">Via GitHub</span>
      </div>
      <template v-if="!commentsOpen">
        <p>Got a question, correction, or thought to add?</p>
        <button type="button" class="btn-primary" @click="commentsOpen = true">
          Load comments <span aria-hidden="true">↗</span>
        </button>
        <small
          >Powered by utteranc.es. You’ll need a GitHub account to
          comment.</small
        >
      </template>
      <ClientOnly v-else>
        <Comments :key="colorMode.value" :is-dark="colorMode.value === 'dark'" />
      </ClientOnly>
    </section>

    <section v-if="moreArticles.length" class="more-stories">
      <div class="section-header">
        <div>
          <h2>More posts</h2>
        </div>
        <NuxtLink :to="writingHome" class="btn-pill">All posts ↗</NuxtLink>
      </div>
      <ListArticles :data="moreArticles" />
    </section>
  </main>
</template>

<script setup lang="ts">
import { blogOrigin, mainOrigin } from "~/utils/site";
import { withBase } from "ufo";
import { articleTime, isoDate } from "~/utils/articles";
import { isReadingTag, tagLabel } from "~/utils/articleTags";

const { path } = useRoute();
const writingHome = useRuntimeConfig().public.blogSite ? "/" : blogOrigin;
const tagLink = (tag: string) =>
  `${writingHome}?${isReadingTag(tag) ? "reading" : "topic"}=${encodeURIComponent(tag)}`;

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
    .only([
      "title",
      "description",
      "date",
      "read_time",
      "_path",
      "category",
      "tags",
    ])
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
.article-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 28px;
}

.article-read-pill {
  padding: 7px 12px;
  border-radius: var(--radius-pill);
  background: var(--surface);
  border: 1px solid var(--border-subtle);
  font: 500 11px/1.2 var(--mono);
  color: var(--muted);
}

.article-header {
  margin: 28px 0 32px;
}

.article-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  font: 500 12px/1.5 var(--mono);
  color: var(--muted);
}

.article-header h1 {
  font: 800 clamp(32px, 4.6vw, 52px)/1.08 var(--display);
  letter-spacing: -0.04em;
  margin: 16px 0 18px;
  color: var(--foreground);
  text-wrap: balance;
}

.article-header > p {
  color: var(--muted);
  font-size: 17.5px;
  line-height: 1.68;
}

.article-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 22px;
}

.article-tags a {
  padding: 6px 12px;
  border-radius: var(--radius-pill);
  background: var(--surface);
  border: 1px solid var(--border-subtle);
  color: var(--muted);
  font: 500 11.5px/1.2 var(--mono);
  transition:
    color 150ms ease,
    border-color 150ms ease;
}

.article-tags a:hover {
  color: var(--foreground);
  border-color: var(--border);
}

.article-cover {
  margin: 30px 0;
  padding: 8px;
  border-radius: 26px;
  background: var(--surface);
  border: 1px solid var(--border-subtle);
}

.article-cover img {
  display: block;
  max-height: 440px;
  width: 100%;
  object-fit: cover;
  border-radius: 18px;
}

.article-outline {
  margin: 28px 0 38px;
  padding: 16px 20px;
  border-radius: 20px;
  background: var(--surface);
  border: 1px solid var(--border-subtle);
  font-size: 14px;
}

.article-outline summary {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  list-style: none;
  font-weight: 600;
  color: var(--foreground);
}

.article-outline summary::-webkit-details-marker {
  display: none;
}

.outline-plus {
  font-size: 20px;
  line-height: 1;
  color: var(--accent);
  transition: transform 180ms var(--ease-out);
}

.article-outline[open] .outline-plus {
  transform: rotate(45deg);
}

.article-outline nav {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 16px;
  margin-top: 14px;
  border-top: 1px solid var(--border-subtle);
}

.article-outline nav a {
  color: var(--muted);
  line-height: 1.45;
  transition: color 150ms ease;
}

.article-outline nav a:hover {
  color: var(--accent);
}

.article-comments {
  margin-top: 64px;
  padding: 28px;
  border-radius: var(--radius-card);
  background: var(--surface);
  border: 1px solid var(--border-subtle);
}

.article-comments__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
}

.article-comments__head h2 {
  font: 700 22px/1.2 var(--display);
  letter-spacing: -0.03em;
}

.article-comments__head span {
  font-size: 11px;
  color: var(--muted);
}

.article-comments > p {
  font-size: 15px;
  color: var(--muted);
  line-height: 1.65;
  margin-bottom: 18px;
}

.article-comments > small {
  display: block;
  font-size: 12px;
  color: var(--faint);
  line-height: 1.6;
  margin-top: 14px;
}

.more-stories {
  margin-top: 64px;
}
</style>
