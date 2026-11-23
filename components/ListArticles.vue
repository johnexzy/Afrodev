<template>
  <div class="article-list">
    <section
      v-for="group in groupedArticles"
      :key="group.year"
      class="article-year"
    >
      <div class="article-year__header">
        <h2>{{ group.year }}</h2>
        <span>{{ group.articles.length }} {{ group.articles.length === 1 ? "post" : "posts" }}</span>
      </div>
      <div class="surface-list">
        <NuxtLink
          v-for="article in group.articles"
          :key="article._path"
          :to="blogSite ? article._path : blogOrigin + article._path"
          class="surface-row article-row"
        >
          <div>
            <h3>{{ article.title }}</h3>
            <p v-if="showDescriptions">{{ article.description }}</p>
            <div class="article-tags-inline">
              <span>{{
                article.tags?.map(tagLabel).join(" · ") ||
                article.category?.split(",")[0]
              }}</span>
            </div>
          </div>
          <div class="article-row__meta">
            <time :datetime="isoDate(article.date)">{{
              shortDate(article.date)
            }}</time>
            <span v-if="article.read_time">{{ article.read_time }}</span>
          </div>
          <span class="surface-row__arrow" aria-hidden="true">↗</span>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { blogOrigin } from "~/utils/site";
import { articleTime, yearOf, shortDate, isoDate } from "~/utils/articles";
import { tagLabel } from "~/utils/articleTags";

const blogSite = useRuntimeConfig().public.blogSite;

interface Article {
  title?: string;
  description?: string;
  date?: string;
  read_time?: string;
  _path?: string;
  category?: string;
  tags?: string[];
}

const props = withDefaults(
  defineProps<{
    data?: Article[] | null;
    hideImages?: boolean;
    showDescriptions?: boolean;
  }>(),
  { data: () => [], showDescriptions: false },
);

const groupedArticles = computed(() => {
  const groups = new Map<string, Article[]>();
  for (const article of [...(props.data || [])].sort(
    (a, b) => articleTime(b.date) - articleTime(a.date),
  )) {
    const year = yearOf(article.date) || "Undated";
    if (!groups.has(year)) groups.set(year, []);
    groups.get(year)!.push(article);
  }
  return Array.from(groups, ([year, articles]) => ({ year, articles }));
});
</script>

<style scoped>
.article-list {
  display: grid;
  gap: 32px;
}

.article-year__header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding: 0 8px 12px;
}

.article-year__header h2 {
  font: 700 22px/1 var(--display);
  letter-spacing: -0.03em;
  color: var(--foreground);
}

.article-year__header span {
  font: 500 11.5px var(--mono);
  color: var(--faint);
}

.article-tags-inline {
  margin-top: 6px;
  font: 500 11.5px/1.4 var(--mono);
  color: var(--faint);
}

.article-row__meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 3px;
  font: 500 11.5px/1.4 var(--mono);
  color: var(--muted);
  white-space: nowrap;
}

.article-row__meta span {
  color: var(--faint);
  font-size: 11px;
}

@media (max-width: 640px) {
  .article-row {
    grid-template-columns: minmax(0, 1fr) 28px;
  }
  .article-row__meta {
    display: none;
  }
}
</style>
