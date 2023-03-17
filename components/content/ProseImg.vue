<template>
  
  <img
    class="lazyload shadow-md rounded-md"
    :data-src="refinedSrc"
    :alt="alt"
    :width="width"
    :height="height"
  />
</template>

<script setup lang="ts">
import { withBase } from "ufo";
const props = defineProps({
  src: {
    type: String,
    default: "",
  },
  alt: {
    type: String,
    default: "",
  },
  width: {
    type: [String, Number],
    default: undefined,
  },
  height: {
    type: [String, Number],
    default: undefined,
  },
});

useHead({
  script: [
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js",
      type: "text/javascript",
      async: true,
    },
  ],
});
const refinedSrc = computed(() => {
  if (props.src?.startsWith("/") && !props.src.startsWith("//")) {
    return withBase(props.src, useRuntimeConfig().app.baseURL);
  }
  return props.src;
});
</script>
