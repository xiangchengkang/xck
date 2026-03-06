import { defineConfig } from 'vitepress'
import { defineTeekConfig } from 'vitepress-theme-teek/config'

const teek = defineTeekConfig({
  teekHome: false,
  vpHome: true,
  pageStyle: 'segment',
  nav: [
    { text: '下载', link: '/download/' },
    { text: '指南', link: '/guide/start' },
    { text: '关于', link: '/about' }
  ]
} as any)

export default defineConfig({
  lang: 'zh-CN',
  title: '项成康下载站',
  description: '自研软件与开源软件下载中心',
  appearance: false,
  ...teek,
  themeConfig: {
    ...(teek.themeConfig as any),
    logo: '/images/hero.jpg',
    siteTitle: '项成康',
    nav: [
      { text: '下载', link: '/download/' },
      { text: '指南', link: '/guide/start' },
      { text: '关于', link: '/about' }
    ]
  }
})
