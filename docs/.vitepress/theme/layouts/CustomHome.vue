<script setup lang="ts">
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import ProgressiveBackground from '../components/ProgressiveBackground.vue'

const { Layout } = DefaultTheme
const { frontmatter, site, theme } = useData()

// 获取配置
const bannerConfig = (theme.value as any)?.banner || {}
const heroImage = bannerConfig.imgSrc || '/images/hero.jpg'
// 缩略图路径 - 使用压缩后的版本
const thumbImage = bannerConfig.thumbSrc || '/images/hero-thumb.jpg'
</script>

<template>
  <Layout>
    <template #home-hero-before>
      <div class="custom-banner">
        <!-- 渐进式背景 -->
        <ProgressiveBackground
          :thumb-src="thumbImage"
          :full-src="heroImage"
          alt="Hero Background"
        />
        
        <!-- Banner 内容 -->
        <div class="banner-content">
          <h1 class="banner-name">{{ bannerConfig.name || site.title }}</h1>
          <p class="banner-desc">{{ bannerConfig.description?.[0] || site.description }}</p>
          
          <!-- Features -->
          <div v-if="bannerConfig.features" class="banner-features">
            <div
              v-for="(feature, index) in bannerConfig.features"
              :key="index"
              class="feature-item"
            >
              <h3>{{ feature.title }}</h3>
              <p>{{ feature.details }}</p>
            </div>
          </div>
        </div>
      </div>
    </template>
  </Layout>
</template>

<style scoped>
.custom-banner {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
}

.banner-content {
  position: relative;
  z-index: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.banner-name {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.banner-desc {
  font-size: 1.25rem;
  margin-bottom: 3rem;
  opacity: 0.9;
  text-shadow: 0 1px 5px rgba(0, 0, 0, 0.3);
}

.banner-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.feature-item {
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.feature-item h3 {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.feature-item p {
  font-size: 0.9rem;
  opacity: 0.85;
  line-height: 1.5;
}

@media (max-width: 768px) {
  .banner-name {
    font-size: 2rem;
  }
  
  .banner-desc {
    font-size: 1rem;
  }
  
  .banner-features {
    grid-template-columns: 1fr;
  }
}
</style>
