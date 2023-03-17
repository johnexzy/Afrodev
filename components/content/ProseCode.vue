<template>
  <div class="container">
    <div class="justify-between flex px-1">
      <span v-if="filename" class="text-gray-500">
        {{ filename }}
      </span>
      <span
        v-if="languageText"
        :style="{ background: languageBackground, color: languageColor }"
        class="text-left language-text p-1"
      >
        {{ languageText }}
      </span>
    </div>

    <slot />
    <div class="bottom-container">
      <div class="copy-container pr-1 pb-1">
        <span class="copied-text text-gray-400" v-if="copied">Copied!</span>
        <button @click="copy(code)" v-else class="rounded border-gray-400 text-gray-400 text-sm">Copy</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useClipboard } from "@vueuse/core";

const { copy, copied, text } = useClipboard();

const props = withDefaults(
  defineProps<{
    code?: string;
    language?: string | null;
    filename?: string | null;
    highlights?: Array<number>;
  }>(),
  { code: "", language: null, filename: null, highlights: [] }
);

const languageMap: Record<
  string,
  { text: string; color: string; background: string }
> = {
  vue: {
    text: "vue",
    background: "#42b883",
    color: "white",
  },
  js: {
    text: "js",
    background: "#f7df1e",
    color: "black",
  },
};

const languageText = computed(() =>
  props.language ? languageMap[props.language]?.text : null
);
const languageBackground = computed(() =>
  props.language ? languageMap[props.language]?.background : null
);
const languageColor = computed(() =>
  props.language ? languageMap[props.language]?.color : null
);
</script>

<style scoped>
.container {
  background: #1e1e1e;
  position: relative;
  overflow: hidden;
  border-radius: 0.3rem;
}

.bottom-container {
  display: flex;
  justify-content: flex-end;
}

.copy-container {
  display: flex;
}

.copied-text {
  margin-right: 1em;
}

</style>
