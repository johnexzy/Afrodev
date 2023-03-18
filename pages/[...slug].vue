<template>
    <main v-if="!!data">
        <div class="mb-10 text-header dark:text-gray-50 text-center font-inter font-bold">
            {{ data.title }}
        </div>
        <div class="justify-center flex dark:text-gray-200">
            <i>by</i> <span class="ml-2 font-semibold"> {{ data.author }} </span><span
                class="mt-1 ml-3 text-xs font-semibold font text-gray-500 dark:text-gray-400">
                {{ data.date }} • {{ data.read_time }} read
            </span>
        </div>
        <div class="my-10 justify-center flex">
            <nuxt-img class="max-w-72 max-h-80 rounded-md shadow-lg" sizes="sm:100vw" :src="ogImage" alt="Image Banner"
                format="webp" />
        </div>
        <article class="mb-6 sm:flex sm:justify-center">
            <ContentDoc class="prose justify-center font-inter dark:text-gray-100" />
        </article>
        <div class="comment-section" id="commentSection">
            <comments is-dark class="hidden dark:block"></comments>
            <comments class="dark:hidden"></comments>
        </div>
    </main>
</template>
<script setup lang="ts">
import { withBase } from 'ufo'
const { path } = useRoute();

const { data } = await useAsyncData(`content-${path}`, () => {
    return queryContent()
        .where({ _path: path })
        .only([
            "title",
            "featured_image",
            "date",
            "read_time",
            "excerpt",
            "author",
        ])
        .findOne();
});


const ogImage = computed(() => {

    if (data.value?.featured_image?.startsWith('/') && !data.value?.featured_image.startsWith('//')) {
        return withBase(data.value?.featured_image, useRuntimeConfig().app.baseURL)
    }
    return data.value?.featured_image
})

useServerSeoMeta({
    title: data.value?.title,
    ogTitle: data.value?.title,
    description: data.value?.excerpt,
    ogDescription: data.value?.excerpt,
    ogImage: ogImage,
    author: data.value?.author,
    twitterCard: "summary_large_image",
});
// useHead({
//     script: [
//         {
//             body: true,
            
//             src: 'https://utteranc.es/client.js',
//             crossorigin: 'anonymous',
//             async: true,

//             "issue-term": 'title',
//             repo: 'johnexzy/utterances-afrodev',
//             theme: 'github-dark',
//         }
//     ]
// })
definePageMeta({
    layout: "details",
});

// const script = document.createElement("script")
// script.src = "https://utteranc.es/client.js"
// script.setAttribute('theme', 'github-light')
// script.setAttribute('issue-term', 'title')
// script.setAttribute('repo', 'johnexzy/utterances-afrodev')

// script.crossOrigin = "anonymous"
// document.getElementById('commentSection')?.appendChild(script)
</script>
<style>
a {
    text-decoration: none !important;
}
</style>
