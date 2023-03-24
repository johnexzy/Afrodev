<template>
  <div
    class="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 items-baseline"
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
          class="max-w-72 max-h-80 rounded-md shadow-lg"
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
