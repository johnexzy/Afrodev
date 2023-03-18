<template>
    <header class="flex justify-between items-center mb-16 sm:mb-15">
        <NuxtLink to="/" class="cursor-pointer">
            <img class="hidden dark:block" width="100" height="100" src="../assets/img/logo-dark.svg" alt="logo" />
            <img class="dark:hidden" width="100" height="100" src="../assets/img/logo.svg" alt="logo" />
        </NuxtLink>
        <div class="sm:flex hidden items-center dark:bg-white border-red border rounded-xl px-2 h-9">
            <Icon name="material-symbols:search" class="text-gray-700 dark:text-gray-900  mr-7" />
            <input type="text" placeholder="Search for articles"
            class="w-72 focus:outline-none h-8 m-auto text-gray-500  placeholder-gray-700 text-sm" />
        </div>
        <div class="px-2 h-9 items-center flex gap-5">
            <div class="sm:hidden">
                <Icon name="material-symbols:search" class="text-gray-700 dark:text-gray-300 cursor-pointer text-2xl" />
            </div>
            <div class="dark:hidden">
                <Icon name="material-symbols:dark-mode" @click="toggleDark()" class=" transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110  duration-300 ... text-gray-500 dark:text-gray-300 cursor-pointer text-2xl hover:dark:text-gray-50 hover:text-gray-900" />
            </div>
            <div class="hidden dark:block">
                <Icon  name="material-symbols:light-mode" @click="toggleDark()" class=" transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110  duration-300 ... text-gray-500 dark:text-gray-300 cursor-pointer text-2xl hover:dark:text-gray-50 hover:text-gray-900" />
            </div>
            
            
            <Icon name="mdi:link-variant" class="text-gray-500 dark:text-gray-300 cursor-pointer text-2xl hover:dark:text-gray-50 hover:text-gray-900" />
        </div>
    </header>
</template>
<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
function toggleDark() {
  isDark.value = !isDark.value
}
</script>