// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    baseURL:
      process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://afrodev.space",
  },

  content: {
    highlight: {
      theme: "github-dark",
    },
    markdown: {
      mdc: true,
    },
  },

  colorMode: {
    preference: 'dark',
    fallback: 'dark',
    classSuffix: '',
  },

  modules: [
    "nuxt-icon",
    "@nuxtjs/tailwindcss",
    "@nuxt/content",
    "@nuxtjs/color-mode",
    "@nuxt/image",
    "@nuxtjs/sitemap"
  ],

  tailwindcss: {
    cssPath: "~/css/style.scss",
    configPath: "tailwind.config",
  },

  // Vite configuration for client-side libraries
  vite: {
    optimizeDeps: {
      include: ['html2pdf.js']
    },
    ssr: {
      noExternal: []
    }
  },



  // Static Site Generation Configuration
  nitro: {
    prerender: {
      routes: ['/portfolio', '/blog']
    }
  },

  app: {
    head: {
      htmlAttrs: {
        lang: "en",
      },
      script: [
        {
          children: `(function(h,o,t,j,a,r){
            h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
            h._hjSettings={hjid:3424334,hjsv:6};
            a=o.getElementsByTagName('head')[0];
            r=o.createElement('script');r.async=1;
            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
            a.appendChild(r);
        })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=')`
        } as any
      ]
    },
    baseURL: process.env.NODE_ENV === 'production' ? '/' : '/'
  },

  sitemap: {
    sources: [
      '/api/__sitemap__/urls',
    ]
  },

  compatibilityDate: "2024-08-25"
} as any);