<template>
  <NuxtLayout>
    <main id="main-content" tabindex="-1">
      <div class="page-mast">
        <span>{{ error.statusCode }}</span
        ><span>John Oba / Afrodev</span>
      </div>
      <header class="page-heading">
        <h1>
          {{
            error.statusCode === 404 ? "Nothing here." : "Something went wrong."
          }}
        </h1>
        <p>
          {{
            error.statusCode === 404
              ? "This address doesn’t lead to a page. The work index and writing archive are still here."
              : "This page couldn’t load. You can try again from the index."
          }}
        </p>
      </header>
      <button
        type="button"
        class="text-link"
        @click="clearError({ redirect: '/' })"
      >
        Back to the index ↗
      </button>
    </main>
  </NuxtLayout>
</template>
<script setup lang="ts">
import type { NuxtError } from "#app";
defineProps<{ error: NuxtError }>();
useSeoMeta({ title: "Page unavailable — John Oba", robots: "noindex" });
</script>
