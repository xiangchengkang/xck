import type { Theme } from 'vitepress'
import Theme from 'vitepress-theme-teek'
import 'vitepress-theme-teek/index.css'
import './custom.css'
import { h } from 'vue'
import ProgressiveBanner from './components/ProgressiveBanner.vue'
import HomeFeatures from './components/HomeFeatures.vue'
import { useData } from 'vitepress'

export default {
  extends: Theme,
  Layout: () => {
    const { frontmatter } = useData()
    const isHome = frontmatter.value.layout === 'home' || !frontmatter.value.layout
    
    return h(Theme.Layout, null, {
      // 渐进式背景 Banner
      'teek-home-banner-before': () => isHome ? h(ProgressiveBanner, {
        thumbSrc: '/images/hero-thumb.jpg',
        fullSrc: '/images/hero.jpg'
      }) : null,
      // 在文章列表之前添加 Features 区域
      'teek-home-post-before': () => isHome ? h(HomeFeatures) : null
    })
  }
} satisfies Theme
