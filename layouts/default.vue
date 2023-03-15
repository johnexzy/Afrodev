<template>
    <div class="container py-5 sm:py-6 px-3 mx-auto max-w-5xl">
        <header class="flex justify-between items-center mb-16 sm:mb-15">
            <div>
                <img width="100" height="100" src="../assets/img/logo.svg" alt="logo" />
            </div>
            <div class="sm:flex hidden items-center border-red border rounded-xl px-2 h-9">
                <Icon name="material-symbols:search" class="text-gray-700 mr-7" />
                <input type="text" placeholder="Search for articles"
                    class="w-72 focus:outline-none h-8 m-auto text-gray-500 placeholder-gray-700 text-sm" />
            </div>
            <div class="px-2 h-9 items-center flex gap-5">
                <div class="sm:hidden">
                    <Icon name="material-symbols:search" class="text-gray-700 cursor-pointer text-2xl" />
                </div>
                <Icon name="material-symbols:dark-mode" class="text-gray-700 cursor-pointer text-2xl" />
                <Icon name="mdi:link-variant" class="text-gray-700 cursor-pointer text-2xl" />
            </div>
        </header>
        <slot />
    </div>
</template>
<script setup lang="ts"></script>
