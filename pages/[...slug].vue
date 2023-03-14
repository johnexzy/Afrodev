<template>
    <main>
        <div class="mb-10 text-header text-center font-inter font-bold">
            {{ data!.title }}
        </div>
        <p>Written by John Oba (Afrodev) <span class="mt-1 text-xs font-semibold font text-gray-500">
                {{ data!.date }} • {{ data!.read_time }} read
            </span></p>
        <div class="my-10 justify-center flex">
            <nuxt-img class="w-full max-h-80 rounded-md" sizes="sm:100vw" :src="data!.featured_image" alt="Image Banner"
                format="webp" />
        </div>
        <article class="flex justify-center">
            <ContentDoc  class="prose lg:prose-xl text-justify justify-center font-inter"  />
        </article>
        
    </main>
</template>
<script setup lang="ts">
const { path } = useRoute()

const { data } = await useAsyncData(`content-${path}`, () => {
    return queryContent().where({ _path: path }).only(['title', 'featured_image', 'date', 'read_time']).findOne()
})
console.log(data.value)
definePageMeta({
    layout: "details",
});
</script>