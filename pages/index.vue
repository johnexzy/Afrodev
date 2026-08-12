<template>
  <main class="home-page reading-column">
    <section class="home-intro reveal">
      <p class="home-intro__hello">Hey! I’m John Oba.</p>
      <h1>
        I build software for the web, with a focus on
        <em>AI and real-time systems.</em>
      </h1>

      <div class="home-intro__prose">
        <p>
          I work across frontend, backend, and infrastructure. I like small teams,
          clear interfaces, and systems that are easy to understand.
        </p>
        <p>
          I co-founded
          <a href="https://startuplist.africa" target="_blank" rel="noreferrer">Startuplist Africa</a>,
          a database of African startups and funding rounds used by more than 300,000
          people. Lately, I’ve been working on AI products and distributed systems.
        </p>
      </div>

      <div class="home-intro__now">
        <span>Currently</span>
        <p>Working on AI products · learning more about distributed systems · writing occasionally</p>
      </div>

      <div class="home-intro__links">
        <NuxtLink to="/portfolio">Projects <Icon name="ph:arrow-up-right" /></NuxtLink>
        <NuxtLink to="/blog">Writing <Icon name="ph:arrow-right" /></NuxtLink>
        <a href="mailto:obajohn75@gmail.com">Email <Icon name="ph:paper-plane-tilt" /></a>
      </div>
    </section>

    <section class="home-notes">
      <div class="home-section-title">
        <h2>Selected writing</h2>
        <NuxtLink to="/blog">All posts</NuxtLink>
      </div>

      <div class="home-note-list">
        <NuxtLink
          v-for="item in data"
          :key="item._path"
          :to="item._path"
          class="home-note"
        >
          <span>{{ item.title }}</span>
          <time>{{ formatDate(item.date) }}</time>
        </NuxtLink>
      </div>
    </section>

    <section class="home-find">
      <p>Find me on</p>
      <div>
        <a href="https://github.com/johnexzy" target="_blank" rel="noreferrer"><Icon name="ph:github-logo" /> GitHub</a>
        <a href="https://linkedin.com/in/johnoba" target="_blank" rel="noreferrer"><Icon name="ph:linkedin-logo" /> LinkedIn</a>
        <a href="https://twitter.com/_afrodev" target="_blank" rel="noreferrer"><Icon name="ph:x-logo" /> Twitter</a>
      </div>
      <p class="home-find__mail">Or mail me at <a href="mailto:obajohn75@gmail.com">obajohn75<span aria-hidden="true">[at]</span>gmail.com</a></p>
    </section>
  </main>
</template>

<script setup lang="ts">
const featuredPaths = [
  "/building-smart-recommendation-system-with-embeddings",
  "/rediscovering-ai-assisted-coding",
  "/building-real-time-collaborative-systems",
  "/evolving-engineering-everything-hard-is-now-easy",
];

const allArticles = await queryContent("/")
  .where({ draft: false })
  .only(["title", "date", "_path"])
  .find();

const data = featuredPaths
  .map((path) => allArticles.find((article) => article._path === path))
  .filter((article): article is NonNullable<typeof article> => article !== undefined);

const formatDate = (date?: string) => {
  const parsed = date ? new Date(date) : new Date();
  if (Number.isNaN(parsed.getTime())) return date || "";
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(parsed);
};

useServerSeoMeta({
  title: "John Oba — Product Engineer",
  ogTitle: "John Oba — Product Engineer",
  description: "Product engineer building AI, real-time systems, and useful web products.",
  ogDescription: "Product engineer building AI, real-time systems, and useful web products.",
  ogImage: "https://res.cloudinary.com/dpq6dieap/image/upload/v1678755812/meta_en37in.png",
  twitterCard: "summary_large_image",
});
</script>

<style scoped>
.home-page {
  padding: 2rem 0 3rem;
}

.home-intro__hello {
  margin: 0 0 1.3rem;
  color: var(--muted);
  font-size: 0.95rem;
}

.home-intro h1 {
  max-width: 19ch;
  margin: 0;
  font-size: clamp(2rem, 5vw, 3.25rem);
  font-weight: 500;
  letter-spacing: -0.052em;
  line-height: 1.12;
}

.home-intro h1 em {
  color: var(--muted);
  font-family: Georgia, 'Times New Roman', serif;
  font-weight: 400;
}

.home-intro__prose {
  margin-top: 2.25rem;
  color: var(--muted);
  font-size: 0.95rem;
  line-height: 1.8;
}

.home-intro__prose p {
  margin: 1.1rem 0;
}

.home-intro__prose a,
.home-find a {
  color: var(--foreground);
  border-bottom: 1px solid var(--border);
}

.home-intro__now {
  display: grid;
  grid-template-columns: 5.5rem 1fr;
  gap: 1rem;
  margin-top: 2rem;
  padding: 1rem 0;
  border-top: 1px solid var(--border-subtle);
  border-bottom: 1px solid var(--border-subtle);
  font-size: 0.75rem;
  line-height: 1.6;
}

.home-intro__now span {
  color: var(--faint);
  font-family: 'DM Mono', ui-monospace, monospace;
}

.home-intro__now p {
  margin: 0;
  color: var(--muted);
}

.home-intro__links {
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
  margin-top: 1.5rem;
}

.home-intro__links a,
.home-section-title a {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  color: var(--foreground);
  font-size: 0.8rem;
  opacity: 0.78;
  transition: opacity 160ms ease, transform 140ms var(--ease-out);
}

.home-notes,
.home-find {
  margin-top: 6rem;
}

.home-section-title {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.4rem;
}

.home-section-title h2 {
  margin: 0;
  font-size: 0.9rem;
  font-weight: 500;
}

.home-section-title a {
  color: var(--faint);
  font-size: 0.72rem;
  opacity: 1;
}

.home-note-list {
  border-top: 1px solid var(--border-subtle);
}

.home-note {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 1rem;
  padding: 0.9rem 0.2rem;
  border-bottom: 1px solid var(--border-subtle);
  color: var(--muted);
  font-size: 0.82rem;
  transition: opacity 160ms ease, padding 180ms var(--ease-out);
}

.home-note time {
  color: var(--faint);
  font-family: 'DM Mono', ui-monospace, monospace;
  font-size: 0.66rem;
}

.home-find > p:first-child {
  color: var(--muted);
  font-size: 0.84rem;
}

.home-find > div {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.home-find > div a {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.78rem;
}

.home-find__mail {
  margin-top: 1.5rem;
  color: var(--muted);
  font-size: 0.78rem;
}

.home-find__mail a {
  font-family: 'DM Mono', ui-monospace, monospace;
}

.home-find__mail span {
  padding-inline: 0.2em;
  color: var(--faint);
  font-family: inherit;
  font-size: 0.9em;
}

@media (hover: hover) and (pointer: fine) {
  .home-intro__links a:hover,
  .home-section-title a:hover,
  .home-note:hover {
    opacity: 1;
  }

  .home-note:hover {
    padding-inline: 0.5rem;
    color: var(--foreground);
  }

  .home-intro__prose a:hover,
  .home-find a:hover {
    color: var(--accent);
    border-color: var(--accent);
  }
}

@media (max-width: 560px) {
  .home-page {
    padding-top: 0;
  }

  .home-note {
    grid-template-columns: 1fr;
    gap: 0.35rem;
  }
}
</style>
