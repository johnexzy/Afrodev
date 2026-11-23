<template>
  <main id="main-content" tabindex="-1">
    <header class="page-hero reveal">
      <div class="split-pill">
        <span>WRITING</span>
        <span class="split-pill__divider" aria-hidden="true" />
        <span class="split-pill__accent">{{ data.length }} POSTS · {{ years }}</span>
      </div>
      <h1>Writing &amp; build logs<span>.</span></h1>
      <p>
        Stories from projects I’ve shipped, technical deep dives, and stuff I
        figured out along the way.
      </p>

      <div class="blog-controls">
        <div class="search-box">
          <label for="writing-search" class="sr-only">Search posts</label>
          <span class="search-icon" aria-hidden="true">⌕</span>
          <input
            id="writing-search"
            v-model="search"
            type="search"
            placeholder="Search posts by title or topic…"
            autocomplete="off"
          />
          <button
            v-if="search"
            type="button"
            class="search-clear"
            aria-label="Clear search"
            @click="search = ''"
          >
            ×
          </button>
        </div>

        <div class="blog-filters-row">
          <nav aria-label="Filter writing by type" class="reading-pills">
            <NuxtLink
              v-for="filter in readingFilters"
              :key="filter.value"
              :to="readingLink(filter.value)"
              :aria-current="reading === filter.value ? 'page' : undefined"
              :class="['reading-pill', { 'is-active': reading === filter.value }]"
              >{{ filter.label }}</NuxtLink
            >
          </nav>

          <div class="topic-select-wrap">
            <label for="writing-topic" class="sr-only">Filter by topic</label>
            <select id="writing-topic" :value="topic" @change="changeTopic">
              <option value="">All topics</option>
              <option v-for="item in topics" :key="item" :value="item">
                {{ tagLabel(item) }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </header>

    <p v-if="search || reading || topic" class="search-count" role="status">
      {{ filtered.length }} {{ filtered.length === 1 ? "post" : "posts" }}
    </p>

    <div class="archive-wrap">
      <ListArticles v-if="filtered.length" :data="filtered" />
      <div v-else class="empty-search">
        <h2>Nothing matched.</h2>
        <p>Try another keyword or clear your filters to see everything.</p>
        <button type="button" class="btn-primary" @click="clearFilters">
          Show all posts ↗
        </button>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { articleTime, yearOf } from "~/utils/articles";
import { isReadingTag, tagLabel, tagLabels } from "~/utils/articleTags";

const route = useRoute();
const data = (
  await queryContent("/")
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
    .find()
).sort((a, b) => articleTime(b.date) - articleTime(a.date));

const search = computed({
  get: () => (typeof route.query.q === "string" ? route.query.q : ""),
  set: (value: string) => {
    navigateTo(
      { path: route.path, query: { ...route.query, q: value || undefined } },
      { replace: true },
    );
  },
});

const readingFilters = [
  { value: "", label: "All" },
  { value: "technical", label: "Technical" },
  { value: "less-technical", label: "Less technical" },
];

const topics = [...new Set(data.flatMap((article) => article.tags || []))]
  .filter((tag) => !isReadingTag(tag))
  .sort((a, b) => tagLabel(a).localeCompare(tagLabel(b)));

const reading = computed(() =>
  typeof route.query.reading === "string" &&
  readingFilters.some((filter) => filter.value === route.query.reading)
    ? route.query.reading
    : "",
);

const topic = computed(() =>
  typeof route.query.topic === "string" && topics.includes(route.query.topic)
    ? route.query.topic
    : "",
);

const readingLink = (value: string) => ({
  path: route.path,
  query: {
    ...(value ? { reading: value } : {}),
    ...(topic.value ? { topic: topic.value } : {}),
    ...(search.value ? { q: search.value } : {}),
  },
});

function changeTopic(event: Event) {
  const value = (event.target as HTMLSelectElement).value;
  navigateTo({
    path: route.path,
    query: {
      ...(reading.value ? { reading: reading.value } : {}),
      ...(value ? { topic: value } : {}),
      ...(search.value ? { q: search.value } : {}),
    },
  });
}

function clearFilters() {
  navigateTo({ path: route.path });
}

const filtered = computed(() =>
  data.filter((article) => {
    if (reading.value && !article.tags?.includes(reading.value)) return false;
    if (topic.value && !article.tags?.includes(topic.value)) return false;
    return [
      article.title,
      article.description,
      article.category,
      article._path?.replace(/[-/]/g, " "),
      ...(article.tags || []).map((tag) => tagLabels[tag] || tag),
    ]
      .join(" ")
      .toLowerCase()
      .includes(search.value.trim().toLowerCase());
  }),
);

const years = data.length
  ? yearOf(data[data.length - 1].date) + "–" + yearOf(data[0].date)
  : "";

useSeoMeta({
  title: "Writing — John Oba",
  description:
    "Technical deep dives, project stories, and engineering lessons by John Oba (Afrodev).",
});
</script>

<style scoped>
.blog-controls {
  margin-top: 28px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.search-box {
  display: flex;
  align-items: center;
  gap: 10px;
  max-width: 560px;
  min-height: 48px;
  padding: 0 12px 0 16px;
  border-radius: 16px;
  background: var(--card);
  border: 1px solid var(--border);
  box-shadow: var(--pill-shadow);
}

.search-icon {
  font-size: 20px;
  color: var(--faint);
}

.search-box input {
  width: 100%;
  min-width: 0;
  border: 0;
  background: transparent;
  color: var(--foreground);
  font-size: 14.5px;
  outline: none;
}

.search-box input::placeholder {
  color: var(--faint);
}

.search-clear {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 0;
  background: var(--surface);
  color: var(--muted);
  font-size: 18px;
  flex-shrink: 0;
}

.blog-filters-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}

.reading-pills {
  display: inline-flex;
  gap: 4px;
  padding: 4px;
  border-radius: 14px;
  background: var(--card);
  border: 1px solid var(--border-subtle);
}

.reading-pill {
  display: inline-flex;
  align-items: center;
  min-height: 34px;
  padding: 0 13px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 500;
  color: var(--muted);
  transition:
    background-color 150ms ease,
    color 150ms ease;
}

.reading-pill:hover {
  color: var(--foreground);
}

.reading-pill.is-active {
  background: var(--foreground);
  color: var(--background);
  font-weight: 600;
}

.topic-select-wrap {
  position: relative;
  display: inline-flex;
  align-items: center;
}

.topic-select-wrap::after {
  content: "";
  position: absolute;
  right: 14px;
  top: 50%;
  width: 7px;
  height: 7px;
  border-right: 1.6px solid var(--muted);
  border-bottom: 1.6px solid var(--muted);
  transform: translateY(-65%) rotate(45deg);
  pointer-events: none;
}

.topic-select-wrap select {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  height: 44px;
  padding: 10px 36px 10px 14px;
  border-radius: 14px;
  background-color: var(--card);
  background-image: none;
  border: 1px solid var(--border-subtle);
  color: var(--foreground);
  font-size: 13px;
  font-weight: 500;
  line-height: 22px;
  cursor: pointer;
}

.search-count {
  margin-top: 22px;
  font: 500 12px var(--mono);
  color: var(--muted);
}

.archive-wrap {
  margin-top: 24px;
}

.empty-search {
  padding: 56px 24px;
  text-align: center;
  border-radius: var(--radius-card);
  background: var(--surface);
  border: 1px solid var(--border-subtle);
}

.empty-search h2 {
  font: 700 28px/1.2 var(--display);
  letter-spacing: -0.03em;
}

.empty-search p {
  margin: 10px 0 22px;
  color: var(--muted);
  font-size: 15px;
}
</style>
