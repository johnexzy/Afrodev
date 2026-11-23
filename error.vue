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
            error.statusCode === 404 ? "Page not found." : "Something broke."
          }}
        </h1>
        <p>
          {{
            error.statusCode === 404
              ? "That link doesn’t point to anything. You can head back home or check the projects and blog."
              : "Couldn’t load this page. Try heading back home."
          }}
        </p>
      </header>
      <button
        type="button"
        class="text-link"
        @click="clearError({ redirect: '/' })"
      >
        Back home ↗
      </button>
    </main>
  </NuxtLayout>
</template>
<script setup lang="ts">
import type { NuxtError } from "#app";
defineProps<{ error: NuxtError }>();
useSeoMeta({ title: "Page unavailable — John Oba", robots: "noindex" });
</script>
