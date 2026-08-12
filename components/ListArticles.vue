<template>
  <div class="article-list">
    <section v-for="group in groupedArticles" :key="group.year" class="article-year">
      <div class="article-year__label" aria-hidden="true">{{ group.year }}</div>
      <div class="article-year__items">
        <NuxtLink
          v-for="article in group.articles"
          :key="article._path"
          :to="article._path"
          class="article-row"
        >
          <div class="article-row__title">
            <h2>{{ article.title }}</h2>
            <p>{{ article.description }}</p>
          </div>
          <div class="article-row__meta">
            <time>{{ formatDate(article.date) }}</time>
            <span v-if="article.read_time">{{ article.read_time }}</span>
          </div>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { ParsedContent } from "@nuxt/content/dist/runtime/types";

interface Props {
  data?: Pick<ParsedContent, string>[] | null;
  hideImages?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  data: () => [],
  hideImages: true,
});

const getYear = (date?: string) => {
  const parsed = date ? new Date(date) : new Date();
  return Number.isNaN(parsed.getTime()) ? "Notes" : String(parsed.getFullYear());
};

const formatDate = (date?: string) => {
  const parsed = date ? new Date(date) : new Date();
  if (Number.isNaN(parsed.getTime())) return date || "";
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric" }).format(parsed);
};

const groupedArticles = computed(() => {
  const groups = new Map<string, Pick<ParsedContent, string>[]>();
  for (const article of props.data || []) {
    const year = getYear(article.date as string | undefined);
    if (!groups.has(year)) groups.set(year, []);
    groups.get(year)?.push(article);
  }
  return Array.from(groups, ([year, articles]) => ({ year, articles }));
});
</script>

<style scoped>
.article-list {
  display: grid;
  gap: 3.5rem;
}

.article-year {
  position: relative;
  display: grid;
  grid-template-columns: 5rem minmax(0, 1fr);
  gap: 1.5rem;
}

.article-year__label {
  position: sticky;
  top: 2rem;
  align-self: start;
  color: transparent;
  font-size: 2.2rem;
  font-weight: 600;
  letter-spacing: -0.06em;
  line-height: 1;
  -webkit-text-stroke: 1px var(--border);
}

.article-year__items {
  border-top: 1px solid var(--border-subtle);
}

.article-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 1.5rem;
  padding: 1rem 0.2rem;
  border-bottom: 1px solid var(--border-subtle);
  color: var(--foreground);
  transition: opacity 160ms ease, padding 180ms var(--ease-out), background-color 160ms ease;
}

.article-row h2 {
  margin: 0;
  font-size: 0.92rem;
  font-weight: 500;
  letter-spacing: -0.02em;
  line-height: 1.45;
}

.article-row p {
  display: -webkit-box;
  margin: 0.38rem 0 0;
  overflow: hidden;
  color: var(--muted);
  font-size: 0.76rem;
  line-height: 1.5;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}

.article-row__meta {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  padding-top: 0.1rem;
  color: var(--faint);
  font-family: 'DM Mono', ui-monospace, monospace;
  font-size: 0.66rem;
  white-space: nowrap;
}

.article-row__meta span::before {
  margin-right: 0.5rem;
  content: '·';
}

@media (hover: hover) and (pointer: fine) {
  .article-row:hover {
    padding-inline: 0.55rem;
    opacity: 1;
    background: var(--surface);
  }
}

@media (max-width: 620px) {
  .article-year {
    grid-template-columns: 1fr;
    gap: 0.7rem;
  }

  .article-year__label {
    position: static;
    font-size: 1.65rem;
  }

  .article-row {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
}
</style>
