import { defineConfig } from 'vitepress'
import { navConst, sidebarConst } from '../const/config'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Front-End interviews",
  description: "fe interview",
  // outDir: "../public",
  base: "/fe-interview/",
  head: [
    // ['link', {rel: 'shortcut icon', href: '/fe-interview/favicon.ico'}]
    ['link', {rel: 'icon', type: 'image/png', sizes: '32x32', href: '/fe-interview/favicon.png'}]
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
