import { defineConfig } from 'vitepress'
import { defineTeekConfig } from 'vitepress-theme-teek/config'

const teek = defineTeekConfig({
  // 启用 Teek 首页
  teekHome: true,
  vpHome: false,
  pageStyle: 'segment',

  // 文章列表配置 - 使用卡片风格
  post: {
    postStyle: 'card',
    showMore: true,
    moreLabel: '阅读全文 →',
    transition: true,
    coverImgMode: 'default'
  },

  // 分页配置
  page: {
    pageSize: 6
  },

  // 首页卡片列表位置 - center 表示居中，不显示侧边栏
  homeCardListPosition: 'center',

  banner: {
    bgStyle: 'fullImg',
    // 高清原图路径
    imgSrc: '/images/hero.jpg',
    mask: false,
    maskBg: 'rgba(0,0,0,0.35)',
    name: 'xiangchengkang',
    pureBgColor: '#f8fafc',
    descStyle: 'switch',
    description: [
      '轻量、简洁高效、灵活配置',
      '文档、博客、知识库都适合',
      '开箱即用，专注内容创作'
    ],
    features: [
      { title: '结构化内容', details: '自动生成目录、索引与归档，快速搭建体系化文档。' },
      { title: '碎片化展示', details: '卡片化信息布局，阅读和浏览体验更舒服。' },
      { title: '高颜值首页', details: 'Banner + Feature 区块，一上来就不再"简陋"。' }
    ]
  },

  nav: [
    { text: '首页', link: '/' },
    { text: '指南', link: '/guide/start' },
    { text: '关于', link: '/about' }
  ]
} as any)

export default defineConfig({
  lang: 'zh-CN',
  title: '首页',
  description: '一个简洁高效的 VitePress 站点',
  appearance: false,

  ...teek,
  themeConfig: {
    ...(teek.themeConfig as any),
    // logo: '/images/hero.jpg',
    siteTitle: '项成康',
    nav: [
      { text: '下载', link: '/download/' },
      { text: '指南', link: '/guide/start' },
      { text: '关于', link: '/about' }
    ],
    sidebar: {
      '/download/': [
        {
          text: '下载中心',
          items: [
            { text: 'EQMS-BI', link: '/download/eqms-bi/' },
            { text: '发布助手', link: '/download/release-helper/' },
            { text: 'Git', link: '/download/git/' },
            { text: 'Visual Studio Code', link: '/download/vscode/' },
            { text: 'Node.js', link: '/download/nodejs/' }
          ]
        }
      ]
    }
  }
})
