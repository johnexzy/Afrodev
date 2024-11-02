<template>
  <main class="max-w-4xl px-4 sm:px-6 lg:px-8">
    <div class="my-16">
      <h1
        class="text-4xl md:text-5xl font-bold dark:text-gray-200 text-gray-700"
      >
        <span class="">John Oba</span>
      </h1>

      <p class="mt-4 text-md leading-7 text-gray-600 dark:text-gray-300">
        I'm a software engineer and a tech leader driven by passion for building
        impactful products.
        <br />
        Currently at
        <a href="https://www.niyo.co" target="_blank" class="font-bold"
          >Niyo Group</a
        >, I focus on creating AI-powered platforms, intelligent recommendation
        systems, and seamless real-time experiences.
        <br />
        <br />
        I also co-founded
        <a href="https://startuplist.africa" target="_blank" class="font-bold"
          >Startuplist Africa</a
        >, a platform dedicated to empowering African startups by connecting
        data with innovation. I enjoy blending backend and frontend artistry,
        from robust data architectures to interactive UI design.
        <br />
        <br />
        Through my blog, Afrodev, I share insights on software development,
        developer experience, and tech trends to inspire and empower fellow
        developers. Outside of work, you’ll find me exploring new tech, playing
        football, or capturing moments through photography.
      </p>
      <div class="mt-6">
        <div class="socials">
          <a
            href="https://twitter.com/_afrodev"
            target="_blank"
            aria-label="twitter link"
          >
            <Icon
              name="carbon:logo-x"
              class="mx-2 cursor-pointer dark:text-white"
            />
          </a>
          <a
            href="https://linkedin.com/in/johnoba"
            target="_blank"
            aria-label="linkedin link"
          >
            <Icon
              name="carbon:logo-linkedin"
              class="mx-2 cursor-pointer dark:text-white"
            />
          </a>
          <a
            href="https://github.com/johnexzy"
            target="_blank"
            aria-label="github link"
          >
            <Icon
              name="carbon:logo-github"
              class="mx-2 cursor-pointer dark:text-white"
            />
          </a>
        </div>
      </div>
    </div>

    <section class="my-12">
      <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-200">
        Featured Articles
      </h2>
      <div
        v-if="!hideImages"
        class="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8"
      >
        <div
          v-for="item in data"
          :key="item._path"
          class="bg-white dark:bg-gray-900 shadow-lg rounded-lg overflow-hidden"
        >
          <img
            :src="configureUrl(item.featured_image)"
            alt="featured image"
            class="w-full h-48 object-cover"
          />
          <div class="p-6">
            <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">
              {{ item.title }}
            </h3>
            <p class="mt-2 text-sm text-gray-700 dark:text-gray-300">
              {{ item.description }}
            </p>
            <p class="mt-2 text-xs text-gray-600 dark:text-gray-400">
              {{ item.date }} • {{ item.read_time }} read
            </p>
            <a
              :href="item._path"
              class="mt-4 inline-block text-red hover:!underline"
              >Read more</a
            >
          </div>
        </div>
      </div>

      <div class="mx-auto text-center my-10">
        <a
          href="/blog"
          class="inline-flex items-center px-4 py-2 ml-4 font-semibold text-white bg-red rounded"
        >
          See all
        </a>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { withBase } from "ufo";
const hideImages = ref(false);

const data = (
  await queryContent("/")
    .where({ draft: false })
    .only([
      "title",
      "featured_image",
      "description",
      "og_image",
      "date",
      "read_time",
      "author",
      "_path",
    ])
    .sort({ date: -1 })
    .limit(4)
    .find()
).reverse();

useServerSeoMeta({
  title: "Afrodev",
  ogTitle: "Afrodev - Blog",
  description: "Coding Chronicles: Practical Software Development Stories",
  ogDescription: "Coding Chronicles: Practical Software Development Stories",
  ogImage:
    "https://res.cloudinary.com/dpq6dieap/image/upload/v1678755812/meta_en37in.png",
  twitterCard: "summary_large_image",
});

const configureUrl = (path: string) =>
  withBase(path, useRuntimeConfig().app.baseURL);
</script>

<style>
.text-gradient {
  @apply bg-clip-text text-transparent bg-gradient-to-r from-red/50 to-blue-500;
}
</style>
