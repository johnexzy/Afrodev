<template>
    <div class="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2">
        <a :href="configureUrl(d._path)" class="group relative" v-for="(d, i) in data" :key="i">
            <div class="flex justify-left">
                <div class="font-inter">
                    <h3 class="text-md dark:text-gray-300 font-semibold">

                        <span aria-hidden="true" class="absolute inset-0"></span>
                        {{ d.title }}

                    </h3>
                    <p class="mt-1 text-xs font-semibold font text-gray-500 ">
                        {{ d.date }} • {{ d.read_time }} read
                    </p>

                </div>
            </div>
            <div class="font-inter mb-4">
                <p
                    class="w-full whitespace-nowrap overflow-hidden mt-3 text-sm font-semi-bold text-ellipsis dark:text-gray-300">
                    {{ d.excerpt }}
                </p>
            </div>
            <div v-if="!hideImages"
                class="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-red group-hover:opacity-75 lg:aspect-none">
                <nuxt-img format="webp" :src="d.featured_image" :alt="d.title" sizes="sm:100vw md:50vw lg:400px"
                    class="cursor-pointer h-full w-full object-cover object-center lg:h-full lg:w-full" />
            </div>
        </a>
    </div>
</template>
<script setup lang="ts">
import { withBase } from 'ufo'
import type { ParsedContent } from '@nuxt/content/dist/runtime/types'
interface Props {
    data?: Pick<ParsedContent, string>[] | null
    hideImages?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    data: () => [],
    hideImages: false
})

const configureUrl = (path: string) => withBase(path, useRuntimeConfig().app.baseURL)
</script>