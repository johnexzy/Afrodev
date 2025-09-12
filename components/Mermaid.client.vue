<template>
  <div ref="el" class="mermaid-container" />
</template>

<script setup lang="ts">
import mermaid from 'mermaid'
import { onMounted, ref, watch, toRef, computed } from 'vue'
import { useDark } from "@vueuse/core";

const props = defineProps<{ code: string }>()
const code = toRef(props, 'code')
const el = ref<HTMLElement | null>(null)



const isDark = useDark();

// Determine Mermaid theme based on color mode
const mermaidTheme = computed(() => {
  return isDark.value ? 'dark' : 'default'
})

// Re-render when theme changes
watch(mermaidTheme, () => {
  render()
})

async function render() {
  if (!el.value) return
  const id = 'mmd-' + Math.random().toString(36).slice(2, 9)
  try {
    // initialize with theme
    mermaid.initialize({
      startOnLoad: false,
      securityLevel: 'strict',
      theme: mermaidTheme.value,
      themeVariables: {
        // Custom theme variables for better dark mode
        ...(mermaidTheme.value === 'dark' && {
          background: '#1f2937', // gray-800
          primaryColor: '#3b82f6', // blue-500
          primaryTextColor: '#f9fafb', // gray-50
          primaryBorderColor: '#60a5fa', // blue-400
          lineColor: '#9ca3af', // gray-400
          secondaryColor: '#374151', // gray-700
          tertiaryColor: '#1f2937', // gray-800
          textColor: '#f3f4f6', // gray-100
          mainBkg: '#111827', // gray-900
          secondBkg: '#1f2937', // gray-800
          border1: '#374151', // gray-700
          border2: '#4b5563', // gray-600
        })
      }
    })
    const out = await mermaid.render(id, code.value)
    el.value.innerHTML = out?.svg ?? out
  } catch (e) {
    el.value.innerHTML = `<pre>Mermaid error:\n${String((e as Error)?.message || e)}</pre>`
  }
}

onMounted(render)
watch(code, render)
</script>

<style scoped>
.mermaid-container {
  display: flex;
  justify-content: center;
  margin: 1.5rem 0;
}

.mermaid-container svg {
  max-width: 100%;
  height: auto;
  border-radius: 0.5rem;
  background: transparent;
}

/* Dark mode styles */
.dark .mermaid-container svg {
  background: rgb(17, 24, 39); /* gray-900 */
}

/* Smooth transitions */
.mermaid-container svg * {
  transition: all 0.2s ease;
}
</style>
