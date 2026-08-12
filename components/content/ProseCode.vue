<template>
  <Mermaid v-if="props.language === 'mermaid'" :code="props.code" />
  <div v-else class="code-block">
    <slot />
    <button
      type="button"
      class="code-block__copy"
      :aria-label="copied ? 'Code copied' : 'Copy code'"
      @click="copy(code)"
    >
      {{ copied ? "Copied" : "Copy" }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { useClipboard } from "@vueuse/core";
import Mermaid from "~/components/Mermaid.client.vue";

const { copy, copied } = useClipboard();

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
.code-block {
  position: relative;
  margin: 1.5em 0;
}

.code-block :deep(pre) {
  margin: 0;
  padding-right: 5rem;
}

.code-block__copy {
  position: absolute;
  top: 0.65rem;
  right: 0.65rem;
  min-width: 3.4rem;
  min-height: 2rem;
  padding: 0.3rem 0.55rem;
  border: 1px solid var(--code-border);
  border-radius: 0.35rem;
  color: var(--muted);
  background: var(--code);
  font-family: 'DM Mono', ui-monospace, monospace;
  font-size: 0.72rem;
  line-height: 1;
  cursor: pointer;
  transition:
    color 150ms ease,
    border-color 150ms ease,
    background-color 150ms ease;
}

.code-block__copy:hover {
  border-color: var(--border);
  color: var(--foreground);
  background: var(--background);
}

.code-block__copy:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

@media (max-width: 640px) {
  .code-block :deep(pre) {
    padding-right: 4.5rem;
  }
}
</style>
