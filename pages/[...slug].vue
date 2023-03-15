<template>
    <main>
        <div class="mb-10 text-header text-center font-inter font-bold">
            {{ title }}
        </div>
        <div class="max-w-72 justify-center flex">
               <i>by</i> <span class="ml-2 font-semibold"> {{ author }} </span><span class="mt-1 ml-3 text-xs font-semibold font text-gray-500">
                {{ data!.date }} • {{ data!.read_time }} read
            </span>
        </div>
        <div class="my-10 justify-center flex">
            <nuxt-img class="max-w-72 max-h-80 rounded-md shadow-md" sizes="sm:100vw" :src="featured_image" alt="Image Banner"
                format="webp" />
        </div>
        <article class="mb-6 flex justify-center">
            <ContentDoc  class="prose lg:prose-lg text-justify justify-center font-inter"  />
        </article>
        
    </main>
</template>
<script setup lang="ts">
const { path } = useRoute()

const { data } = await useAsyncData(`content-${path}`, () => {
    return queryContent().where({ _path: path }).only(['title', 'featured_image', 'date', 'read_time', 'author']).findOne()
})
const {title, featured_image, author} = data.value!

const ogImage = process.env.NODE_ENV == 'development' ? `http://localhost:3000${featured_image}` : `https://afrodev.space${featured_image}`
useServerSeoMeta({
  title: title,
  ogTitle: title,
  description: title,
  ogDescription: title,
  ogImage: ogImage,
  author: author,
  twitterCard: "summary_large_image"
});
console.log(process.env.NODE_ENV, process.env.PORT)
definePageMeta({
    layout: "details",
});
</script>
<style>
a {
    text-decoration: none !important
}
</style>