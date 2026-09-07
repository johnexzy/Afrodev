<template>
  <img
    :src="refinedSrc"
    loading="lazy"
    decoding="async"
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

const appBase = useRuntimeConfig().app.baseURL;
const refinedSrc = computed(() => {
  if (props.src?.startsWith("/") && !props.src.startsWith("//")) {
    return withBase(props.src, appBase);
  }
  return props.src;
});
</script>
