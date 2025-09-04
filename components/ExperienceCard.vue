<template>
  <div class="border-l-2 border-gray-200 dark:border-gray-700 pl-8">
    <div class="mb-6">
      <div class="text-sm text-gray-500 dark:text-gray-400 mb-2">
        {{ experience.period }}
      </div>
      <h3 class="text-xl font-medium text-gray-900 dark:text-gray-100">
        {{ experience.title }}
      </h3>
      <div class="text-gray-600 dark:text-gray-400">
        {{ experience.company }} • {{ experience.department }}
      </div>
    </div>
    <p class="text-gray-600 dark:text-gray-400 mb-4">
      {{ experience.description }}
    </p>
    <ul class="space-y-1 text-gray-600 dark:text-gray-400">
      <li 
        v-for="achievement in experience.achievements"
        :key="achievement"
      >
        • {{ achievement }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { Experience } from '~/data/projects';

defineProps<{
  experience: Experience;
}>();
</script>
