import type { Theme } from 'vitepress'
import Theme from 'vitepress-theme-teek'
import 'vitepress-theme-teek/index.css'
import './custom.css'
import { h } from 'vue'
import ProgressiveBanner from './components/ProgressiveBanner.vue'
import { useData } from 'vitepress'

export default {
  extends: Theme,
  Layout: () => {
    const { frontmatter } = useData()
    const isHome = frontmatter.value.layout === 'home' || !frontmatter.value.layout
    
    return h(Theme.Layout, null, {
      // 使用 teek-home-banner-before 插槽
      'teek-home-banner-before': () => isHome ? h(ProgressiveBanner, {
        thumbSrc: '/images/hero-thumb.jpg',
        fullSrc: '/images/hero.jpg'
      }) : null
    })
  }
} satisfies Theme
