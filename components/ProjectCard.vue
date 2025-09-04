<template>
  <div class="border-b border-gray-200 dark:border-gray-700 pb-16 mb-4">
    <div class="mb-8">
      <div class="flex items-center gap-4 mb-3">
        <h3 class="text-2xl font-light text-gray-900 dark:text-gray-100">
          {{ project.title }}
        </h3>
        <a 
          v-if="project.link"
          :href="project.link"
          target="_blank"
          class="text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
        >
          ↗
        </a>
      </div>
      
      <p class="text-gray-600 dark:text-gray-400 mb-2">
        {{ project.subtitle }}
      </p>
    </div>
    
    <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
      {{ project.description }}
    </p>

    <!-- Highlights -->
    <div class="mb-8">
      <ul class="space-y-2">
        <li 
          v-for="highlight in project.highlights" 
          :key="highlight"
          class="text-gray-600 dark:text-gray-400"
        >
          • {{ highlight }}
        </li>
      </ul>
    </div>

    <!-- Technologies -->
    <div class="mb-6">
      <div class="text-sm text-gray-500 dark:text-gray-500">
        {{ project.technologies.join(' • ') }}
      </div>
    </div>

    <!-- Status -->
    <div class="flex items-center gap-2">
      <div 
        :class="{
          'w-2 h-2 rounded-full': true,
          'bg-green-500': project.status === 'Production',
          'bg-yellow-500': project.status === 'In Development',
          'bg-blue-500': project.status === 'Beta'
        }"
      ></div>
      <span class="text-sm text-gray-500 dark:text-gray-400">
        {{ project.status }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Project } from '~/data/projects';

defineProps<{
  project: Project;
}>();
</script>
