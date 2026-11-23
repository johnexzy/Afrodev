<template>
  <NuxtLayout>
    <main id="main-content" tabindex="-1">
      <section class="page-hero error-stage">
        <div class="split-pill">
          <span>ERROR {{ error.statusCode }}</span>
          <span class="split-pill__divider" aria-hidden="true" />
          <span class="split-pill__accent">AFRODEV</span>
        </div>
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
        <div class="error-actions">
          <button
            type="button"
            class="btn-primary"
            @click="clearError({ redirect: '/' })"
          >
            Back home ↗
          </button>
        </div>
      </section>
    </main>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { NuxtError } from "#app";
defineProps<{ error: NuxtError }>();
useSeoMeta({ title: "Page unavailable — John Oba", robots: "noindex" });
</script>

<style scoped>
.error-stage {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-block: clamp(64px, 10vw, 110px);
}

.error-actions {
  margin-top: 28px;
}
</style>
