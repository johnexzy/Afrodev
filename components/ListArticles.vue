<template>
  <div class="article-list">
    <section
      v-for="group in groupedArticles"
      :key="group.year"
      class="article-year"
    >
      <h2 class="article-year__label">{{ group.year }}</h2>
      <div class="article-year__items">
        <NuxtLink
          v-for="article in group.articles"
          :key="article._path"
          :to="blogSite ? article._path : blogOrigin + article._path"
          class="article-row"
        >
          <div>
            <h3>{{ article.title }}</h3>
            <p v-if="showDescriptions">{{ article.description }}</p>
            <span class="article-category">{{
              article.tags?.map(tagLabel).join(" / ") ||
              article.category?.split(",")[0]
            }}</span>
          </div>
          <div class="article-row__meta">
            <time :datetime="isoDate(article.date)">{{
              shortDate(article.date)
            }}</time
            ><span v-if="article.read_time">{{ article.read_time }}</span>
          </div>
          <span class="line-arrow" aria-hidden="true">↗</span>
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
  gap: 37px;
}
.article-year {
  display: grid;
  grid-template-columns: 65px minmax(0, 1fr);
  gap: 25px;
}
.article-year__label {
  font: 30px var(--serif);
  font-weight: 400;
  color: var(--muted);
  padding-top: 13px;
}
.article-year__items {
  border-top: 1px solid var(--border);
}
.article-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 55px 15px;
  gap: 16px;
  padding: 22px 0;
  border-bottom: 1px solid var(--border-subtle);
}
.article-row h3 {
  font-size: 17px;
  line-height: 1.5;
  font-weight: 500;
  letter-spacing: -0.02em;
}
.article-row p {
  color: var(--muted);
  font-size: 13px;
  line-height: 1.7;
  margin: 10px 0;
}
.article-category {
  display: block;
  margin-top: 10px;
  color: var(--muted);
  font: 11px/1.5 var(--mono);
}
.article-row__meta {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 5px;
  font: 11px/1.5 var(--mono);
  color: var(--muted);
  text-align: right;
}
@media (hover: hover) {
  .article-row:hover h3 {
    color: var(--accent);
  }
}
@media (max-width: 520px) {
  .article-year {
    grid-template-columns: 1fr;
    gap: 14px;
  }
  .article-year__label {
    font-size: 28px;
  }
  .article-row {
    gap: 10px;
    grid-template-columns: minmax(0, 1fr) 44px 12px;
  }
  .article-row h3 {
    font-size: 16px;
  }
}
</style>
