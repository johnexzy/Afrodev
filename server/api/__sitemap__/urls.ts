export default defineEventHandler(() => {
    return [
      {
        loc: '/about-us',
        // will end up in the pages sitemap
        _sitemap: 'pages',
      }
    ]
  })