// https://nuxt.com/docs/api/configuration/nuxt-config
import { projects } from "./data/work";
import { blogOrigin, mainOrigin } from "./utils/site";

const blogSite = process.env.BLOG_SITE === "true";

export default defineNuxtConfig({
  devtools: {
    enabled: false,
  },

  site: {
    url: blogSite ? blogOrigin : mainOrigin,
  },

  runtimeConfig: {
    public: { blogSite },
  },

  hooks: {
    "pages:extend"(pages) {
      if (!blogSite) return;
      const index = pages.find((page) => page.path === "/")!;
      const archive = pages.find((page) => page.path === "/blog")!;
      index.file = archive.file;
      for (let i = pages.length - 1; i >= 0; i--) {
        if (pages[i] !== index && !pages[i].file?.endsWith("/[...slug].vue"))
          pages.splice(i, 1);
      }
    },
  },

  content: {
    highlight: {
      theme: {
        default: "github-light",
        dark: "github-dark",
      },
    },
    markdown: {
      mdc: true,
    },
  },

  colorMode: {
    preference: "system",
    fallback: "light",
    classSuffix: "",
  },

  modules: [
    "nuxt-icon",
    "@nuxtjs/tailwindcss",
    "@nuxt/content",
    "@nuxtjs/color-mode",
    "@nuxt/image",
    "@nuxtjs/sitemap",
  ],

  tailwindcss: {
    cssPath: "~/css/style.scss",
    configPath: "tailwind.config",
  },

  // Static Site Generation Configuration
  nitro: {
    prerender: {
      routes: blogSite
        ? ["/"]
        : [
            "/",
            "/portfolio",
            "/blog",
            "/about",
            ...projects.map((project) => `/work/${project.slug}`),
          ],
    },
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
        })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=')`,
        } as any,
      ],
    },
    baseURL: "/",
  },

  sitemap: {
    sources: ["/api/__sitemap__/urls"],
    exclude: blogSite ? [] : ["/blog"],
  },

  compatibilityDate: "2024-08-25",
} as any);
