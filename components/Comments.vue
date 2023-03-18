<template>
    <div>
      <hr />
    </div>
  </template>
  <script>
  export default {
    props: {
        isDark : {
            type: Boolean,
            default: false
        }
    },
    mounted() {
      const scriptTag = document.createElement('SCRIPT')
      scriptTag.setAttribute('src', 'https://utteranc.es/client.js')
      scriptTag.setAttribute('repo', 'johnexzy/utterances-afrodev')
      scriptTag.setAttribute('issue-term', 'title')
      scriptTag.setAttribute('label', 'Comment')
      this.isDark ? scriptTag.setAttribute('theme', 'github-dark') : scriptTag.setAttribute('theme', 'github-light')
      
      scriptTag.setAttribute('crossorigin', 'anonymous')
      scriptTag.setAttribute('async', 'async')
      this.$el.append(scriptTag)
    },
  }
  </script>
  
  <style>
  .utterances {
    width: 100%;
    margin: 0 !important;
    max-width: 100%;
  }
  </style>