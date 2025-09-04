<template>
  <div class="space-y-6">
    <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">
      {{ expertise.title }}
    </h3>
    <div class="space-y-2 text-gray-600 dark:text-gray-400">
      <div 
        v-for="skill in expertise.skills"
        :key="skill"
      >
        {{ skill }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ExpertiseArea } from '~/data/projects';

defineProps<{
  expertise: ExpertiseArea;
}>();
</script>
