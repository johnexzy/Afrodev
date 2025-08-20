<template>
  <header class="flex justify-between items-center mb-16 sm:mb-15">
    <NuxtLink to="/" class="cursor-pointer">
      <img
        class="hidden dark:block"
        width="100"
        height="100"
        src="../assets/img/logo-dark.svg"
        alt="logo"
      />
      <img
        class="dark:hidden"
        width="100"
        height="100"
        src="../assets/img/logo.svg"
        alt="logo"
      />
    </NuxtLink>

    <div class="px-2 h-9 items-center flex gap-5">
      <div>
        <a
          href="/portfolio"
          class="text-sm font-medium text-gray-900 dark:text-gray-300 group-hover:text-red-500 cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
        >
          Portfolio
        </a>
      </div>
      
      <div>
        <a
          href="/blog"
          class="text-sm font-medium text-gray-900 dark:text-gray-300 group-hover:text-red-500 cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
        >
          Blog
        </a>
      </div>

      <div class="dark:hidden">
        <Icon
          name="material-symbols:dark-mode"
          @click="toggleDark()"
          class="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 ... text-gray-500 dark:text-gray-300 cursor-pointer text-2xl hover:dark:text-gray-50 hover:text-gray-900"
        />
      </div>
      <div class="hidden dark:block">
        <Icon
          name="material-symbols:light-mode"
          @click="toggleDark()"
          class="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 ... text-gray-500 dark:text-gray-300 cursor-pointer text-2xl hover:dark:text-gray-50 hover:text-gray-900"
        />
      </div>

      <span class="copied-text text-gray-400 text-sm" v-if="copied"
        >Copied!</span
      >
      <Icon
        name="mdi:link-variant"
        @click="copy(`${location.href}`)"
        class="text-gray-500 dark:text-gray-300 cursor-pointer text-2xl hover:dark:text-gray-50 hover:text-gray-900"
      />
    </div>
  </header>
</template>
<script setup lang="ts">
import { useDark, useClipboard, useBrowserLocation } from "@vueuse/core";
const { copy, copied, text } = useClipboard();

const isDark = useDark();
function toggleDark() {
  isDark.value = !isDark.value;
}

const location = useBrowserLocation();
</script>
