<template>
  <main v-if="!!data">
    <div
      class="mb-10 text-header dark:text-gray-50 text-center font-inter font-bold"
    >
      {{ data.title }}
    </div>
    <div class="justify-center flex dark:text-gray-200">
      <i>by</i> <span class="ml-2 font-semibold"> {{ data.author }} </span
      ><span
        class="mt-1 ml-3 text-xs font-semibold font text-gray-500 dark:text-gray-400"
      >
        {{ data.date }} • {{ data.read_time }} read
      </span>
    </div>
    <div class="my-10 justify-center flex">
      <nuxt-img
        class=" rounded-md shadow-lg"
        sizes="100vw"
        :src="ogImage"
        alt="Image Banner"
        format="webp"
      />
    </div>
    <article class="mb-6 sm:flex sm:justify-center">
      <ContentDoc class="prose justify-center font-inter dark:text-gray-100" />
    </article>
    <div class="mx-4 mb-2">
      <div
        data-lyket-type="clap"
        :data-lyket-id="path.replace('/', '')"
        data-lyket-namespace="blog"
        data-lyket-template="medium"
      />
    </div>
    <div class="comment-section" id="commentSection">
      <comments is-dark class="hidden dark:block"></comments>
      <comments class="dark:hidden"></comments>
    </div>
    <div>
      <div class="my-10">
        <div class="flex justify-between">
          <div>
            <h2 class="font-bold text-3xl dark:text-gray-300">
              More Stories from Afrodev
            </h2>
          </div>
        </div>
      </div>
      <ListArticles :data="moreArticles" />
    </div>
  </main>
</template>
<script setup lang="ts">
import { withBase } from "ufo";

const { path } = useRoute();

const { data } = await useAsyncData(`content-${path}`, () => {
  return queryContent()
    .where({ _path: path })
    .only([
      "title",
      "featured_image",
      "date",
      "og_image",
      "read_time",
      "description",

      "author",
    ])
    .findOne();
});

// console.log(data.value)

// fetch surrounding articles and remove null values
const { data: moreArticles } = await useAsyncData(
  `more-${path}-1`,
  async () => {
    return (
      await queryContent("/")
        .where({ draft: false })
        .only([
          "title",
          "featured_image",
          "og_image",
          "description",
          "date",
          "read_time",
          "author",
          "_path",
        ])
        .limit(4)
        .findSurround(path, { before: 2, after: 2 })
    ).filter((x) => x !== null);
  }
);

// load lazysizes
useHead({
  script: [
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js",
      type: "text/javascript",
      async: true,
    },
    {
      src: "https://unpkg.com/@lyket/widget@latest/dist/lyket.js?apiKey=pt_b0d91ee87b0df642d88c0b6ada49b8",
      type: "text/javascript",
      async: true,
    },
  ],
});
// add base_url to featured_image
const ogImage = computed(() => {
  if (
    data.value?.og_image?.startsWith("/") &&
    !data.value?.og_image.startsWith("//")
  ) {
    return withBase(data.value?.og_image, useRuntimeConfig().baseURL);
  }
  return data.value?.og_image;
});

useServerSeoMeta({
  title: data.value?.title,
  ogTitle: data.value?.title,
  description: data.value?.description,
  ogDescription: data.value?.description,
  ogImage: ogImage,
  image: ogImage,
  author: data.value?.author,
  ogType: "article",
  twitterCard: "summary_large_image",
} as any);
</script>
<style>
a {
  text-decoration: none !important;
}
</style>
