// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  content: {
    highlight: {
      theme: 'github-dark'
    },
    
  },
  modules: ['nuxt-icon', '@nuxtjs/tailwindcss', '@nuxt/content', '@nuxt/image-edge', '@nuxtjs/color-mode'],
  tailwindcss: {
    cssPath: '~/css/style.scss',
    configPath: 'tailwind.config',

  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      }
    }
  }
})
