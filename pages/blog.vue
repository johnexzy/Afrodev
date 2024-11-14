<template>
    <main class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      <div class="text-center my-16">
        <h1 class="text-4xl md:text-5xl font-bold text-gradient">
          <span class="">Articles by John Oba</span>
        </h1>
      </div>
      <!-- <div class="my-12 relative">
        <nuxt-img class="w-full h-64 object-cover rounded-lg shadow-lg" sizes="sm:100vw" src="/banner1.png" alt="Image Banner"
          format="webp" />
        <div class="absolute inset-0 bg-gradient-to-r from-red/50 to-blue-500/50 rounded-lg mix-blend-overlay"></div>
      </div> -->
  
      <div class="my-16 slide-enter-content">
        <div class="flex justify-between items-center mb-8">
          <h2 class="font-bold text-3xl md:text-4xl text-gray-900 dark:text-gray-300">Posts</h2>
          <label class="relative inline-flex items-center cursor-pointer group">
            <input type="checkbox" v-model="hideImages" class="sr-only peer" checked>
            <div class="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-red-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-red-500"></div>
            <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300 group-hover:text-red-500 transition-colors">Show Images</span>
          </label>
        </div>
  
        <ListArticles :data="data" :hide-images="!hideImages" />
      </div>
  
    </main>
  </template>
  
  <script setup lang="ts">
  import { withBase } from 'ufo'
  const hideImages = ref(false)
  
  
  const data = (await queryContent('/')
    .where({ draft: false})
    .only(['title', 'featured_image', 'description', 'og_image', 'date', 'read_time', 'author', '_path', 'category'])
    .find()).reverse()
  
  
  useServerSeoMeta({
    title: "Afrodev",
    ogTitle: "Afrodev - Blog",
    description: "Coding Chronicles: Practical Software Development Stories",
    ogDescription: "Coding Chronicles: Practical Software Development Stories",
    ogImage: "https://res.cloudinary.com/dpq6dieap/image/upload/v1678755812/meta_en37in.png",
    twitterCard: "summary_large_image",
  });
  
  const configureUrl = (path: string) => withBase(path, useRuntimeConfig().app.baseURL)
  </script>
  
  <style>
  .text-gradient {
    @apply bg-clip-text text-transparent bg-gradient-to-r from-red/50 to-blue-500;
  }
  </style>
  