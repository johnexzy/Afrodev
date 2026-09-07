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
    <p v-if="search" class="search-count" role="status">
      {{ filtered.length }} {{ filtered.length === 1 ? "note" : "notes" }} found
    </p>
    <ListArticles v-if="filtered.length" :data="filtered" />
    <div v-else class="empty-search">
      <h2>No notes found.</h2>
      <p>Try a different word, or return to the full archive.</p>
      <button type="button" class="text-link" @click="search = ''">
        Show all notes ↗
      </button>
    </div>
  </main>
</template>
<script setup lang="ts">
import { articleTime, yearOf } from "~/utils/articles";
const data = (
  await queryContent("/")
    .where({ draft: false })
    .only(["title", "description", "date", "read_time", "_path", "category"])
    .find()
).sort((a, b) => articleTime(b.date) - articleTime(a.date));
const search = ref("");
const filtered = computed(() =>
  data.filter((a) =>
    [a.title, a.description, a.category, a._path?.replace(/[-/]/g, " ")]
      .join(" ")
      .toLowerCase()
      .includes(search.value.trim().toLowerCase()),
  ),
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
  .archive-search {
    grid-template-columns: 1fr;
    gap: 7px;
  }
  .archive-search input {
    font-size: 16px;
  }
}
</style>
