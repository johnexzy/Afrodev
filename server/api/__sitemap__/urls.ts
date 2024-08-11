// server/api/__sitemap__/urls.ts
export default defineEventHandler(() => {
    return [
      {
        loc: "/building-real-time-collaborative-systems",
        // will end up in the pages sitemap
        _sitemap: "pages",
      },
      {
        loc: "/my-first-experience-in-hiring",
        // will end up in the pages sitemap
        _sitemap: "pages",
      },
      {
        loc: "/adding-external-script-to-nuxt",
        // will end up in the pages sitemap
        _sitemap: "pages",
      },
      {
        loc: "/meta-transactions-and-atomic-interactions",
        _sitemap: "pages",
      },
      {
        loc: "/startuplist-africa-4yrs-anniversary",
        _sitemap: "pages",
      },
      {
        loc: "/sending-data-to-google-sheets",
        _sitemap: "pages",
      },
      {
          loc: "/practical-guide-to-gasless-token-transfer-1",
        _sitemap: "pages",
        
      }
    ];
  });
  