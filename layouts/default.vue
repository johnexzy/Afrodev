<template>
  <div id="top" class="site-shell">
    <a href="#main-content" class="skip-link">Skip to content</a>
    <TheHeader />
    <div class="site-main">
      <div><slot /></div>
      <TheFooter />
    </div>
  </div>
</template>
