<template>
  <footer class="site-footer">
    <span>© {{ currentYear }} John Oba</span>
    <span class="site-footer__note">Lagos, Nigeria</span>
    <div class="site-footer__links">
      <a href="https://github.com/johnexzy" target="_blank" rel="noreferrer">GitHub</a>
      <a href="https://linkedin.com/in/johnoba" target="_blank" rel="noreferrer">LinkedIn</a>
      <a href="https://twitter.com/_afrodev" target="_blank" rel="noreferrer">X</a>
    </div>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>

<style scoped>
.site-footer {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  width: min(65ch, calc(100% - 2rem));
  gap: 1rem;
  margin: 6rem auto 0;
  padding: 1.5rem 0 2rem;
  border-top: 1px solid var(--border-subtle);
  color: var(--faint);
  font-size: 0.72rem;
}

.site-footer__links {
  display: flex;
  justify-content: flex-end;
  gap: 0.9rem;
}

.site-footer a {
  color: inherit;
  transition: color 160ms ease;
}

@media (hover: hover) and (pointer: fine) {
  .site-footer a:hover {
    color: var(--foreground);
  }
}

@media (max-width: 640px) {
  .site-footer {
    grid-template-columns: 1fr auto;
  }

  .site-footer__note {
    display: none;
  }
}
</style>
