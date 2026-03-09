<script setup lang="ts">
import { useData } from 'vitepress'

const { theme } = useData()

// Features 数据
const features = [
  {
    icon: '📚',
    title: '结构化 && 体系化',
    description: '自动生成侧边栏、目录页、索引页，轻松构建一个结构化知识库。支持文档分类、标签管理，让知识体系井井有条。'
  },
  {
    icon: '🎨',
    title: '碎片化 && 个性化',
    description: '提供快速构建知识的碎片化形态，并提供大量个性化的主题配置。支持自定义样式、布局，打造专属知识空间。'
  },
  {
    icon: '🚀',
    title: '文档风 && 博客风',
    description: '支持通过配置搭配出各种风格，支持个人博客、文档站、知识库等场景。一键切换，满足不同需求。'
  },
  {
    icon: '✨',
    title: '专注内容',
    description: '只需 Markdown 即可轻松创建美观的文档站点，配合多维索引快速定位每个知识点。让创作回归内容本身。'
  }
]
</script>

<template>
  <section class="home-features">
    <div class="features-container">
      <!-- 标题区域 -->
      <div class="features-header">
        <h2 class="features-title">
          <span class="title-highlight">核心特性</span>
        </h2>
        <p class="features-subtitle">强大而灵活的功能，助你轻松构建知识库</p>
      </div>

      <!-- Features 网格 -->
      <div class="features-grid">
        <div 
          v-for="(feature, index) in features" 
          :key="index"
          class="feature-card"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <div class="feature-icon-wrapper">
            <span class="feature-icon">{{ feature.icon }}</span>
          </div>
          <h3 class="feature-title">{{ feature.title }}</h3>
          <p class="feature-description">{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.home-features {
  padding: 3rem 1.5rem 2rem;
  background: transparent;
  position: relative;
}

.features-container {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

/* 标题区域 */
.features-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.features-title {
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.75rem;
}

.title-highlight {
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
}

.title-highlight::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  border-radius: 2px;
  opacity: 0.3;
}

.features-subtitle {
  font-size: 1rem;
  color: #64748b;
  max-width: 500px;
  margin: 0 auto;
  line-height: 1.6;
}

/* Features 网格 */
.features-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;
  margin-bottom: 1rem;
}

/* 单个卡片 */
.feature-card {
  background: linear-gradient(145deg, #ffffff, #f8fafc);
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.04);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  text-align: center;
  position: relative;
  overflow: hidden;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.6s ease forwards;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #3b82f6, #8b5cf6);
  transform: scaleX(0);
  transition: transform 0.4s ease;
}

.feature-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
}

.feature-card:hover::before {
  transform: scaleX(1);
}

/* 图标 */
.feature-icon-wrapper {
  width: 56px;
  height: 56px;
  margin: 0 auto 1rem;
  background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.4s ease;
  position: relative;
}

.feature-icon-wrapper::before {
  content: '';
  position: absolute;
  inset: -2px;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  border-radius: 18px;
  z-index: -1;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.feature-card:hover .feature-icon-wrapper {
  transform: scale(1.1);
  background: white;
}

.feature-card:hover .feature-icon-wrapper::before {
  opacity: 0.15;
}

.feature-icon {
  font-size: 1.75rem;
  line-height: 1;
}

/* 标题 */
.feature-title {
  font-size: 1rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.5rem;
  transition: color 0.3s ease;
}

.feature-card:hover .feature-title {
  color: #3b82f6;
}

/* 描述 */
.feature-description {
  font-size: 0.85rem;
  color: #64748b;
  line-height: 1.6;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 响应式 */
@media (max-width: 1024px) {
  .features-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .home-features {
    padding: 2rem 1rem 1rem;
  }

  .features-title {
    font-size: 1.75rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .feature-card {
    padding: 1.25rem;
  }
}

/* 深色模式 */
.dark .features-title {
  color: #f1f5f9;
}

.dark .features-subtitle {
  color: #94a3b8;
}

.dark .feature-card {
  background: linear-gradient(145deg, #1e293b, #0f172a);
  border-color: rgba(255, 255, 255, 0.06);
}

.dark .feature-title {
  color: #f1f5f9;
}

.dark .feature-description {
  color: #94a3b8;
}

.dark .feature-icon-wrapper {
  background: linear-gradient(135deg, #1e293b, #334155);
}
</style>
