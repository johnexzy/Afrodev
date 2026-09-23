<template>
  <main id="main-content" tabindex="-1">
    <div class="page-mast">
      <span>Notes from the work</span
      ><span>{{ data.length }} entries / {{ years }}</span>
    </div>
    <header class="page-heading reveal">
      <h1>Notes from<br /><em>the work.</em></h1>
      <p>
        Things I’ve learned by building them. Engineering notes, project
        stories, and the occasional change of mind.
      </p>
    </header>
    <div class="archive-filters">
      <nav aria-label="Filter writing by type" class="reading-filters">
        <span>Reading</span>
        <NuxtLink
          v-for="filter in readingFilters"
          :key="filter.value"
          :to="readingLink(filter.value)"
          :aria-current="reading === filter.value ? 'page' : undefined"
          >{{ filter.label }}</NuxtLink
        >
      </nav>
      <div class="topic-filter">
        <label for="writing-topic">Topic</label>
        <select id="writing-topic" :value="topic" @change="changeTopic">
          <option value="">All topics</option>
          <option v-for="item in topics" :key="item" :value="item">
            {{ tagLabel(item) }}
          </option>
        </select>
      </div>
    </div>
    <div class="archive-search">
      <label for="writing-search">Find a note</label>
      <div>
        <span aria-hidden="true">⌕</span
        ><input
          id="writing-search"
          v-model="search"
          type="search"
          placeholder="Search titles, topics, or ideas…"
          autocomplete="off"
        /><button
          v-if="search"
          type="button"
          @click="search = ''"
          aria-label="Clear search"
        >
          ×
        </button>
      </div>
    </div>
    <p v-if="search || reading || topic" class="search-count" role="status">
      {{ filtered.length }} matching
      {{ filtered.length === 1 ? "note" : "notes" }}
    </p>
    <ListArticles v-if="filtered.length" :data="filtered" />
    <div v-else class="empty-search">
      <h2>No notes found.</h2>
      <p>Try a different search or filter, or return to the full archive.</p>
      <button type="button" class="text-link" @click="clearFilters">
        Show all notes ↗
      </button>
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
const search = ref("");
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
  },
});
function changeTopic(event: Event) {
  const value = (event.target as HTMLSelectElement).value;
  navigateTo({
    path: route.path,
    query: {
      ...(reading.value ? { reading: reading.value } : {}),
      ...(value ? { topic: value } : {}),
    },
  });
}
function clearFilters() {
  search.value = "";
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
    "Engineering notes, project stories, and lessons from building software. By John Oba.",
});
</script>
<style scoped>
.archive-filters {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 18px 30px;
  margin-bottom: 26px;
}
.reading-filters,
.topic-filter {
  display: flex;
  align-items: center;
  gap: 16px;
}
.reading-filters > span,
.topic-filter label {
  font: 11px var(--mono);
  color: var(--muted);
}
.reading-filters a {
  padding: 7px 0;
  color: var(--muted);
  font-size: 13px;
  white-space: nowrap;
  border-bottom: 1px solid transparent;
}
.reading-filters a[aria-current="page"] {
  color: var(--foreground);
  border-color: var(--foreground);
}
.reading-filters a:hover {
  color: var(--foreground);
}
.topic-filter select {
  padding: 7px 24px 7px 0;
  background: transparent;
  color: var(--foreground);
  border: 0;
  border-bottom: 1px solid var(--border);
  font-size: 13px;
  cursor: pointer;
}
.archive-search {
  margin: 0 0 38px;
  padding: 17px 0;
  border-block: 1px solid var(--border);
  display: grid;
  grid-template-columns: 105px 1fr;
  align-items: center;
  gap: 15px;
}
.archive-search label {
  font: 10px var(--mono);
  color: var(--muted);
}
.archive-search > div {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
}
.archive-search span {
  font-size: 23px;
  color: var(--muted);
}
.archive-search input {
  width: 100%;
  padding: 8px 0;
  min-width: 0;
  background: transparent;
  outline-offset: 4px;
  font-size: 14px;
  border: 0;
  color: var(--foreground);
}
.archive-search input::placeholder {
  color: var(--faint);
}
.archive-search button {
  width: 32px;
  height: 32px;
  font-size: 22px;
}
.search-count {
  font: 11px var(--mono);
  color: var(--muted);
  margin-bottom: 25px;
}
.empty-search {
  padding: 50px 0;
}
.empty-search h2 {
  font: 36px var(--serif);
}
.empty-search p {
  margin: 15px 0;
  color: var(--muted);
  font-size: 14px;
}
@media (max-width: 520px) {
  .reading-filters {
    width: 100%;
    gap: 13px;
  }
  .reading-filters > span {
    display: none;
  }
  .reading-filters a,
  .topic-filter select {
    font-size: 14px;
  }
  .archive-search {
    grid-template-columns: 1fr;
    gap: 7px;
  }
  .archive-search input {
    font-size: 16px;
  }
}
</style>
