<template>
  <div class="site-shell">
    <CobwebBackground />
    <div class="site-frame">
      <the-header />
      <slot />
    </div>
    <the-footer />
  </div>
</template>
<script setup lang="ts"></script>
