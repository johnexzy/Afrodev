<template>
  <Mermaid v-if="props.language === 'mermaid'" :code="props.code" />
  <div v-else class="container">
    <slot />
    <div class="bottom-container">
      <div class="copy-container pr-1 pb-1">
        <span class="copied-text text-gray-400 text-sm" v-if="copied">Copied!</span>
        <button @click="copy(code)" v-else class="rounded border-gray-400 text-gray-400 text-sm">Copy</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useClipboard } from "@vueuse/core";
import Mermaid from "~/components/Mermaid.client.vue";

const { copy, copied, text } = useClipboard();

const props = withDefaults(
  defineProps<{
    code?: string;
    language?: string | null;
    filename?: string | null;
    highlights?: Array<number>;
  }>(),
  { code: "", language: null, filename: null, highlights: () => [] }
);

</script>

<style scoped>

.bottom-container {
  display: flex;
  margin-top: -20px;
  justify-content: flex-end;
}

.copy-container {
  display: flex;
}


</style>
