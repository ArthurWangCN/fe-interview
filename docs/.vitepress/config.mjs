import { defineConfig } from 'vitepress'
import { navConst, sidebarConst } from '../const/config'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Front-End interviews",
  description: "fe interview",
  // outDir: "../public",
  base: "/fe-interview/",
  head: [
    ['link', {rel: 'icon', href: '/favicon.ico'}]
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
