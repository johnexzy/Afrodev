<template>
  <div class="pb-8 border-b border-gray-200 dark:border-gray-700">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">
        {{ project.title }}
      </h3>
      <div class="flex items-center gap-3">
        <div 
          :class="{
            'w-2 h-2 rounded-full': true,
            'bg-green-500': project.status === 'Production',
            'bg-yellow-500': project.status === 'In Development',
            'bg-blue-500': project.status === 'Beta'
          }"
        ></div>
        <a 
          v-if="project.link"
          :href="project.link"
          target="_blank"
          class="text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
        >
          ↗
        </a>
      </div>
    </div>
    
    <p class="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
      {{ project.description }}
    </p>

    <!-- Technologies -->
    <div class="text-sm text-gray-500 dark:text-gray-500">
      {{ project.technologies.join(' • ') }}
    </div>
  </div>
</template>

<script setup lang="ts">
interface IndieProject {
  title: string;
  description: string;
  technologies: string[];
  status: 'Production' | 'In Development' | 'Beta';
  link?: string;
}

defineProps<{
  project: IndieProject;
}>();
</script>
