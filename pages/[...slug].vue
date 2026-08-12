<template>
  <main v-if="data" class="article-page reading-column">
    <NuxtLink to="/blog" class="article-back">
      <Icon name="ph:arrow-left" />
      Writing
    </NuxtLink>

    <header class="article-header reveal">
      <div class="article-header__meta">
        <time>{{ data.date }}</time>
        <span>{{ data.read_time }} read</span>
      </div>
      <h1>{{ data.title }}</h1>
      <p>{{ data.description }}</p>
      <div v-if="categories.length" class="article-header__categories">
        <span v-for="category in categories" :key="category">{{ category }}</span>
      </div>
    </header>

    <figure v-if="data.featured_image" class="article-cover">
      <NuxtImg :src="data.featured_image" :alt="data.title" format="webp" />
    </figure>

    <article class="article-content">
      <ContentDoc class="prose" />
    </article>

    <div class="article-reaction">
      <div
        data-lyket-type="clap"
        :data-lyket-id="path.replace('/', '')"
        data-lyket-namespace="blog"
        data-lyket-template="medium"
      />
    </div>

    <section id="commentSection" class="article-comments">
      <h2>Notes & responses</h2>
      <Comments is-dark class="hidden dark:block" />
      <Comments class="dark:hidden" />
    </section>

    <section v-if="moreArticles?.length" class="more-stories">
      <div class="more-stories__heading">
        <h2>Continue reading</h2>
        <NuxtLink to="/blog">Full archive</NuxtLink>
      </div>
      <ListArticles :data="moreArticles" hide-images />
    </section>
  </main>
</template>

<script setup lang="ts">
import { withBase } from "ufo";

const { path } = useRoute();
const { baseURL } = useRuntimeConfig();

const { data } = await useAsyncData(`content-${path}`, () =>
  queryContent()
    .where({ _path: path })
    .only([
      "title",
      "featured_image",
      "date",
      "og_image",
      "read_time",
      "description",
      "author",
      "category",
    ])
    .findOne(),
);

const { data: moreArticles } = await useAsyncData(`more-${path}`, async () =>
  (
    await queryContent("/")
      .where({ draft: false })
      .only(["title", "description", "date", "read_time", "_path", "category"])
      .limit(4)
      .findSurround(path, { before: 2, after: 2 })
  ).filter((article) => article !== null),
);

const categories = computed(() => data.value?.category?.split(", ").filter(Boolean) || []);

useHead({
  script: [
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js",
      async: true,
    },
    {
      src: "https://unpkg.com/@lyket/widget@latest/dist/lyket.js?apiKey=pt_b0d91ee87b0df642d88c0b6ada49b8",
      async: true,
    },
  ],
});

const ogImage = computed(() => {
  if (data.value?.og_image?.startsWith("/") && !data.value.og_image.startsWith("//")) {
    return withBase(data.value.og_image, baseURL);
  }
  return data.value?.og_image;
});

useServerSeoMeta({
  title: data.value?.title,
  ogTitle: data.value?.title,
  description: data.value?.description,
  ogDescription: data.value?.description,
  ogImage,
  author: data.value?.author,
  ogType: "article",
  twitterCard: "summary_large_image",
} as any);
</script>

<style scoped>
.article-page {
  padding: 0 0 3rem;
}

.article-back {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  margin-bottom: 3rem;
  color: var(--faint);
  font-size: 0.76rem;
  transition: color 160ms ease, transform 140ms var(--ease-out);
}

.article-header__meta {
  display: flex;
  gap: 0.65rem;
  color: var(--faint);
  font-family: 'DM Mono', ui-monospace, monospace;
  font-size: 0.68rem;
}

.article-header__meta span::before {
  margin-right: 0.65rem;
  content: '·';
}

.article-header h1 {
  margin: 1.25rem 0 0;
  font-size: clamp(2.2rem, 6vw, 4.25rem);
  font-weight: 500;
  letter-spacing: -0.06em;
  line-height: 1.08;
}

.article-header > p {
  margin: 1.35rem 0 0;
  color: var(--muted);
  font-family: Georgia, 'Times New Roman', serif;
  font-size: clamp(1.05rem, 2.2vw, 1.25rem);
  line-height: 1.65;
}

.article-header__categories {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.35rem;
  color: var(--faint);
  font-family: 'DM Mono', ui-monospace, monospace;
  font-size: 0.66rem;
}

.article-header__categories span + span::before {
  margin-right: 0.75rem;
  content: '·';
}

.article-cover {
  width: min(54rem, calc(100vw - 2rem));
  margin: 3.5rem 0 3.5rem 50%;
  transform: translateX(-50%);
}

.article-cover img {
  display: block;
  width: 100%;
  max-height: 34rem;
  border-radius: 0.45rem;
  object-fit: cover;
  filter: saturate(0.82);
}

.article-content :deep(.prose) {
  width: 100%;
  margin-inline: auto;
}

.article-reaction {
  display: flex;
  justify-content: center;
  margin-top: 3rem;
}

.article-comments,
.more-stories {
  margin-top: 5rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border-subtle);
}

.article-comments > h2,
.more-stories h2 {
  margin: 0 0 2rem;
  font-size: 0.9rem;
  font-weight: 500;
}

.more-stories__heading {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
}

.more-stories__heading a {
  color: var(--faint);
  font-size: 0.72rem;
}

@media (hover: hover) and (pointer: fine) {
  .article-back:hover,
  .more-stories__heading a:hover {
    color: var(--foreground);
  }
}

@media (max-width: 560px) {
  .article-back {
    margin-bottom: 2rem;
  }

  .article-cover {
    margin-block: 2.5rem;
  }
}
</style>
