<template>
  <div
    class="mt-6 grid grid-cols-1 gap-y-10 gap-x-6  items-baseline"
  >
    <a
      class="group relative"
      v-for="(d, i) in data"
      :key="i"
      :href="configureUrl(d._path)"
    >
      <div
        class="justify-center flex group-hover:opacity-75 mb-4"
        v-if="!hideImages"
      >
        <nuxt-img
          class=" rounded-md shadow-lg"
          sizes="sm:100vw"
          :src="d.featured_image"
          :alt="d.title"
          format="webp"
        />
      </div>
      <div class="flex justify-left">
        <div class="font-inter">
          <h3 class="text-md dark:text-gray-300 font-semibold">
            <span aria-hidden="true" class="absolute inset-0"></span>
            {{ d.title }}
          </h3>
       
        </div>
      </div>
      <div class="font-inter mb-4">
        <p
          class="w-full whitespace-nowrap overflow-hidden mt-3 text-sm font-semi-bold text-ellipsis dark:text-gray-300"
        >
          {{ d.description }}
        </p>
        <p class="mt-1 text-xs font-semibold font text-gray-500 dark:text-gray-400">
            {{ d.date }} • {{ d.read_time }} read
          </p>
      </div>
      <div class="flex flex-wrap gap-2 mt-3">
        <span 
          v-for="category in d.category?.split(', ')" 
          :key="category"
          class="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full 
          bg-gradient-to-r from-red-50 to-red-200 text-red 
          dark:from-red-300/20 dark:to-red-500/20 dark:text-red-400
          border border-red-200 dark:border-red-800/30
          shadow-sm transition-all duration-200
          hover:shadow-md hover:scale-105 hover:from-red-100 hover:to-red-200
          dark:hover:from-red-900/30 dark:hover:to-red-800/30"
        >
          {{ category }}
        </span>
      </div>
    </a>
  </div>
</template>
<script setup lang="ts">
import { withBase } from "ufo";
import type { ParsedContent } from "@nuxt/content/dist/runtime/types";
interface Props {
  data?: Pick<ParsedContent, string>[] | null;
  hideImages?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  data: () => [],
  hideImages: false,
});

const configureUrl = (path: string) => withBase(path, useRuntimeConfig().app.baseURL);
</script>
