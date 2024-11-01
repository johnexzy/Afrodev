<template>
  <div>
    <CobwebBackground />
    <div class="container py-5 sm:py-6 px-3 mx-auto max-w-5xl">
      <the-header />
      <slot />
    </div>
    <the-footer />
  </div>
</template>
<script setup lang="ts"></script>
