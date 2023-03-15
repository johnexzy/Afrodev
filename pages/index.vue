<template>
  <main class="mx-auto">
    <div class="text-center my-10">
      <h1 class="text-header font-semibold">
        <span class="text-red"> The Code Chronicles: </span> Tales from a Software Developer
      </h1>
    </div>
    <div class="my-10 justify-center flex">
      <nuxt-img class="max-h-72 rounded-md" sizes="sm:100vw" src="/banner1.png" alt="Image Banner" format="webp" />
    </div>

    <div class="my-10">
      <div class="flex justify-between">
       <div>
        <h2 class="font-bold text-3xl">Tales & Stories</h2>
      </div>
      <div class="mt-2">
       <label class="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" v-model="hideImages" class="sr-only peer" checked>
        <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Toggle Images</span>
      </label>
    </div>
  </div>

  <div class="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2">
    <NuxtLink :to="d._path" class="group relative" v-for="(d, i) in data" :key="i">
      <div class="mb-4 flex justify-left">
        <div class="font-inter">
          <h3 class="text-md font-semibold">
            <a>
              <span aria-hidden="true" class="absolute inset-0"></span>
              {{ d.title }}
            </a>
          </h3>
          <p class="mt-1 text-xs font-semibold font text-gray-500">
            {{ d.date }} • {{ d.read_time }} read
          </p>
          <p class="mt-3 text-sm font-semi-bold text-ellipsis">
            {{ d.excerpt }}
          </p>
        </div>
      </div>
      <div
      v-if="!hideImages"
      class="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-red group-hover:opacity-75 lg:aspect-none">
      <nuxt-img format="webp" :src="d.featured_image" :alt="title"
      sizes="sm:100vw md:50vw lg:400px"
      class="cursor-pointer h-full w-full object-cover object-center lg:h-full lg:w-full" />
    </div>
  </NuxtLink>
</div>
</div>
<div class="my-10 h- flex items-center justify-center">
  <div>
    <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
      <a href="#"
      class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
      <span class="sr-only">Previous</span>
      <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fill-rule="evenodd"
        d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
        clip-rule="evenodd" />
      </svg>
    </a>
    <!-- Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" -->
    <a href="#" aria-current="page"
    class="relative z-10 inline-flex items-center bg-red px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">1</a>
    <a href="#"
    class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">2</a>
    <a href="#"
    class="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex">3</a>
    <span
    class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">...</span>
    <a href="#"
    class="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex">8</a>
    <a href="#"
    class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">9</a>
    <a href="#"
    class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">10</a>
    <a href="#"
    class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
    <span class="sr-only">Next</span>
    <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fill-rule="evenodd"
      d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
      clip-rule="evenodd" />
    </svg>
  </a>
</nav>
</div>
</div>
</main>
</template>
<script setup lang="ts">

const hideImages = ref(true)


const data = await queryContent('/')
.limit(6)
.only(['title', 'featured_image', 'excerpt', 'date', 'read_time', 'author', '_path'])
.find()


useServerSeoMeta({
  title: "Afrodev",
  ogTitle: "Afrodev - Blog",
  description: "Coding Chronicles: Explore Practical Software Development Stories",
  ogDescription: "Coding Chronicles: Explore Practical Software Development Stories",
  ogImage: "https://res.cloudinary.com/dpq6dieap/image/upload/v1678755812/meta_en37in.png",
  twitterCard: "summary_large_image",
});
</script>
