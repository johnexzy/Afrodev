<template>
  <div class="container py-5 sm:py-6 px-3 mx-auto max-w-5xl">
    <header class="flex justify-between items-center mb-16 sm:mb-15">
      <div>
        <img width="100" height="100" src="../assets/img/logo.svg" alt="logo" />
      </div>
      <div class="sm:flex  hidden  items-center border-red border rounded-xl px-2 h-9">
        <Icon name="material-symbols:search" class="text-gray-700 mr-7" />
        <input type="text" placeholder="Search for articles"
          class="w-72 focus:outline-none h-8 m-auto text-gray-500 placeholder-gray-700 text-sm" />
      </div>
      <div class="px-2 h-9 items-center flex gap-5">
        <div class="sm:hidden">
          <Icon name="material-symbols:search" class="text-gray-700  cursor-pointer text-2xl " />
        </div>
        <Icon name="material-symbols:dark-mode" class="text-gray-700 cursor-pointer text-2xl" />
        <Icon name="mdi:link-variant" class="text-gray-700 cursor-pointer text-2xl" />
      </div>
    </header>
    <slot />
    <div>
      <h2 class="font-semibold">More Articles</h2>
      <div class="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2">
        <div class="group relative" v-for="(d, i) in data" :key="i">
          <div class="mb-4 flex justify-left">
            <div class="font-inter">
              <h3 class="text-sm font-bold">
                <a href="#">
                  <span aria-hidden="true" class="absolute inset-0"></span>
                  {{ d.title }}
                </a>
              </h3>
              <p class="mt-1 text-xs font-semibold font text-gray-500">
                {{ d.modified }} {{ d.read_time }}
              </p>
              <p class="mt-3 text-sm font-semi-bold text-ellipsis">
                {{ d.excerpt }}
              </p>
            </div>
          </div>
          <div
            class="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-red group-hover:opacity-75 lg:aspect-none">
            <nuxt-img format="webp" src="/article-image.png" alt="Front of men&#039;s Basic Tee in black."
              sizes="sm:100vw md:50vw lg:400px"
              class="cursor-pointer h-full w-full object-cover object-center lg:h-full lg:w-full" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const data = reactive([
  {
    title: "A Practical Guide To SEO In Nuxt 3",
    modified: "March 4, 2023 •",
    read_time: "6 min",
    excerpt: "How to properly handle SEO in your Nuxt application",
  },
  {
    title: "A Practical Guide To SEO In Nuxt 3",
    modified: "March 4, 2023 •",
    read_time: "6 min",
    excerpt: "How to properly handle SEO in your Nuxt application",
  },
  {
    title: "A Practical Guide To SEO In Nuxt 3",
    modified: "March 4, 2023 •",
    read_time: "6 min",
    excerpt: "How to properly handle SEO in your Nuxt application",
  },
  {
    title: "A Practical Guide To SEO In Nuxt 3",
    modified: "March 4, 2023 •",
    read_time: "6 min",
    excerpt: "How to properly handle SEO in your Nuxt application",
  },
  {
    title: "A Practical Guide To SEO In Nuxt 3",
    modified: "March 4, 2023 •",
    read_time: "6 min",
    excerpt: "How to properly handle SEO in your Nuxt application",
  },
  {
    title: "A Practical Guide To SEO In Nuxt 3",
    modified: "March 4, 2023 •",
    read_time: "6 min",
    excerpt: "How to properly handle SEO in your Nuxt application",
  },
]);

</script>