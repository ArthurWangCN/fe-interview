import { defineConfig } from 'vitepress'
import { navConst, sidebarConst } from '../const/config'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Front-End interviews",
  description: "fe interview",
  base: "/fe-interview/",
  head: [
    ['link', {rel: 'shortcut icon', href: '/fe-interview/favicon.ico?v=1.1'}]
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: navConst,

    sidebar: sidebarConst,

    socialLinks: [
      { icon: 'github', link: 'https://github.com/arthurwangcn' }
    ]
  }
})
