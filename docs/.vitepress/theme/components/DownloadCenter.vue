<script setup lang="ts">
import { ref, computed } from 'vue'

interface Software {
  id: string
  name: string
  icon: string
  version?: string
  description: string
  platform?: string
  platformIcon?: string
  features?: string[]
  detailUrl: string
  downloadUrl?: string
  officialUrl?: string
  color: string
  sticky?: boolean | number
}

const props = defineProps<{
  selfDeveloped?: Software[]
  openSource?: Software[]
}>()

const defaultSelfDeveloped: Software[] = [
  {
    id: 'internal-inspector',
    name: '内网巡检助手',
    icon: '🔍',
    version: 'v1.2.0',
    description: '自动巡检主机状态、端口连通性与服务健康情况。',
    platform: 'Windows x64',
    platformIcon: '🪟',
    features: ['实时监控', '自动告警', '报告生成'],
    detailUrl: '/download/internal-inspector/',
    downloadUrl: '/download/internal-inspector/',
    color: 'blue'
  }
]

const defaultOpenSource: Software[] = [
  {
    id: 'git',
    name: 'Git',
    icon: '🌿',
    description: '分布式版本控制系统，用于敏捷高效地处理任何或小或大的项目。',
    officialUrl: 'https://git-scm.com/downloads',
    detailUrl: '/download/git/',
    color: 'orange'
  }
]

const getStickyValue = (item: Software): number => {
  if (item.sticky === true) return 1
  if (typeof item.sticky === 'number') return item.sticky
  return 0
}

const selfDevelopedSoftware = computed(() => {
  const list = props.selfDeveloped && props.selfDeveloped.length > 0 
    ? props.selfDeveloped 
    : defaultSelfDeveloped
  return [...list].sort((a, b) => getStickyValue(b) - getStickyValue(a))
})

const openSourceSoftware = computed(() => {
  const list = props.openSource && props.openSource.length > 0 
    ? props.openSource 
    : defaultOpenSource
  return [...list].sort((a, b) => getStickyValue(b) - getStickyValue(a))
})

const activeTab = ref('self')

const handleDownload = (software: Software) => {
  const link = document.createElement('a')
  link.href = software.downloadUrl || software.detailUrl
  link.download = software.name
  link.referrerPolicy = 'unsafe-url'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
</script>

<template>
  <div class="download-center">
    <!-- 头部区域 -->
    <section class="hero-section">
      <div class="hero-content">
        <div class="hero-icon">📦</div>
        <br>
        <div class="hero-features">
          <span class="feature-tag">✓ 多版本下载</span>
          <span class="feature-tag">✓ 安装教程</span>
          <span class="feature-tag">✓ 更新日志</span>
          <span class="feature-tag">✓ 常见问题</span>
        </div>
      </div>
    </section>

    <!-- 标签切换 -->
    <div class="tab-section">
      <div class="tab-container">
        <button 
          class="tab-btn" 
          :class="{ active: activeTab === 'self' }"
          @click="activeTab = 'self'"
        >
          <span class="tab-icon">🛠️</span>
          <span class="tab-text">自研软件</span>
          <span class="tab-badge">{{ selfDevelopedSoftware.length }}</span>
        </button>
        <button 
          class="tab-btn" 
          :class="{ active: activeTab === 'opensource' }"
          @click="activeTab = 'opensource'"
        >
          <span class="tab-icon">🌐</span>
          <span class="tab-text">开源软件</span>
          <span class="tab-badge">{{ openSourceSoftware.length }}</span>
        </button>
      </div>
    </div>

    <!-- 自研软件区域 -->
    <section v-show="activeTab === 'self'" class="software-section">
      <div class="section-header">
        <!-- <h2 class="section-title">
          <span class="section-icon">🛠️</span>
          自研软件
        </h2> -->
        <!-- <p class="section-desc">专为提升开发运维效率打造的工具</p> -->
      </div>
      
      <div class="software-grid">
        <div 
          v-for="software in selfDevelopedSoftware" 
          :key="software.id"
          class="software-card"
          :class="`card-${software.color}`"
        >
          <div class="card-header">
            <div class="card-icon">{{ software.icon }}</div>
            <div v-if="software.version" class="card-version">{{ software.version }}</div>
          </div>
          
          <h3 class="card-title">{{ software.name }}</h3>
          <p class="card-desc">{{ software.description }}</p>
          
          <div v-if="software.features" class="card-features">
            <span 
              v-for="feature in software.features" 
              :key="feature"
              class="feature-item"
            >
              {{ feature }}
            </span>
          </div>
          
          <div v-if="software.platform" class="card-platform">
            <span class="platform-icon">{{ software.platformIcon }}</span>
            <span class="platform-text">{{ software.platform }}</span>
          </div>
          
          <div class="card-actions">
            <button @click="handleDownload(software)" class="btn btn-primary">
              <span>📥</span>
              <span>立即下载</span>
            </button>
            <a :href="software.detailUrl" class="btn btn-secondary">
              <span>📖</span>
              <span>详情</span>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- 开源软件区域 -->
    <section v-show="activeTab === 'opensource'" class="software-section">
      <div class="section-header">
        <!-- <h2 class="section-title">
          <span class="section-icon">🌐</span>
          开源软件
        </h2>
        <p class="section-desc">常用开发工具官方下载入口</p> -->
      </div>
      
      <div class="opensource-grid">
        <div 
          v-for="software in openSourceSoftware" 
          :key="software.id"
          class="opensource-card"
          :class="`card-${software.color}`"
        >
          <div class="opensource-icon">{{ software.icon }}</div>
          <h3 class="opensource-title">{{ software.name }}</h3>
          <p class="opensource-desc">{{ software.description }}</p>
          <div class="opensource-actions">
            <a v-if="software.officialUrl" :href="software.officialUrl" target="_blank" class="btn btn-outline">
              <span>🔗</span>
              <span>官方下载</span>
            </a>
            <a v-if="software.detailUrl" :href="software.detailUrl" class="btn btn-text">
              <span>📄</span>
              <span>安装指南</span>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- 底部提示 -->
    <section class="tips-section">
      <div class="tips-card">
        <div class="tips-icon">💡</div>
        <div class="tips-content">
          <h4>使用提示</h4>
          <p>建议：后续每新增一个软件，都按"总览 + 独立详情页"结构维护，便于长期管理。</p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.download-center {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

/* 头部区域 */
.hero-section {
  text-align: center;
  padding: 3rem 2rem;
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #f0f9ff 100%);
  border-radius: 24px;
  margin-bottom: 2rem;
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.05) 0%, transparent 50%);
  animation: pulse 4s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

.hero-content {
  position: relative;
  z-index: 1;
}

.hero-icon {
  font-size: 4rem;
  margin-bottom: 0.5rem;
  animation: bounce 2s ease infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.hero-features {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.feature-tag {
  background: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  color: #3b82f6;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.15);
  font-weight: 500;
}

/* 标签切换 */
.tab-section {
  margin-bottom: 2rem;
}

.tab-container {
  display: flex;
  justify-content: center;
  gap: 1rem;
  background: #f8fafc;
  padding: 0.5rem;
  border-radius: 16px;
  max-width: 400px;
  margin: 0 auto;
}

.tab-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  border: none;
  background: transparent;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.95rem;
  color: #64748b;
}

.tab-btn:hover {
  background: rgba(255, 255, 255, 0.5);
}

.tab-btn.active {
  background: white;
  color: #3b82f6;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.tab-icon {
  font-size: 1.1rem;
}

.tab-badge {
  background: #e2e8f0;
  color: #64748b;
  padding: 0.15rem 0.5rem;
  border-radius: 10px;
  font-size: 0.75rem;
  font-weight: 600;
}

.tab-btn.active .tab-badge {
  background: #3b82f6;
  color: white;
}

/* 软件区域 */
.software-section {
  margin-bottom: 2rem;
}

.section-header {
  text-align: center;
  margin-bottom: 2rem;
}

.section-title {
  font-size: 1.75rem;
  font-weight: 600;
  color: #1e293b;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.section-icon {
  font-size: 1.5rem;
}

.section-desc {
  color: #64748b;
  font-size: 1rem;
}

/* 自研软件卡片网格 */
.software-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.5rem;
}

.software-card {
  background: white;
  border-radius: 20px;
  padding: 1.75rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.04);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.software-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  transform: scaleX(0);
  transition: transform 0.4s ease;
}

.software-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
}

.software-card:hover::before {
  transform: scaleX(1);
}

.card-blue::before { background: linear-gradient(90deg, #3b82f6, #60a5fa); }
.card-purple::before { background: linear-gradient(90deg, #8b5cf6, #a78bfa); }
.card-orange::before { background: linear-gradient(90deg, #f97316, #fb923c); }
.card-green::before { background: linear-gradient(90deg, #22c55e, #4ade80); }

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.card-icon {
  font-size: 2.5rem;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
  border-radius: 16px;
}

.card-version {
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  color: white;
  padding: 0.35rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}

.card-title {
  font-size: 1.35rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.75rem;
}

.card-desc {
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.card-features {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.feature-item {
  background: #f1f5f9;
  color: #475569;
  padding: 0.35rem 0.75rem;
  border-radius: 8px;
  font-size: 0.8rem;
}

.card-platform {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: #f8fafc;
  border-radius: 10px;
  margin-bottom: 1.25rem;
  font-size: 0.9rem;
  color: #64748b;
}

.platform-icon {
  font-size: 1.1rem;
}

.card-actions {
  display: flex;
  gap: 0.75rem;
}

/* 按钮样式 */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  border-radius: 12px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
}

.btn-primary {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: white;
  flex: 1;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
}

.btn-secondary {
  background: #f1f5f9;
  color: #64748b;
}

.btn-secondary:hover {
  background: #e2e8f0;
  color: #475569;
}

/* 开源软件卡片 */
.opensource-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.25rem;
}

.opensource-card {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.04);
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
}

.opensource-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  transform: scaleX(0);
  transition: transform 0.4s ease;
}

.opensource-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.1);
}

.opensource-card:hover::before {
  transform: scaleX(1);
}

.opensource-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.opensource-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.75rem;
}

.opensource-desc {
  color: #64748b;
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 1.25rem;
}

.opensource-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
}

.btn-outline {
  background: transparent;
  color: #3b82f6;
  border: 2px solid #3b82f6;
}

.btn-outline:hover {
  background: #3b82f6;
  color: white;
}

.btn-text {
  background: transparent;
  color: #64748b;
}

.btn-text:hover {
  color: #3b82f6;
}

/* 提示区域 */
.tips-section {
  margin-top: 2rem;
}

.tips-card {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  background: linear-gradient(135deg, #fefce8, #fef9c3);
  padding: 1.25rem 1.5rem;
  border-radius: 16px;
  border: 1px solid rgba(234, 179, 8, 0.2);
}

.tips-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.tips-content h4 {
  font-size: 1rem;
  font-weight: 600;
  color: #854d0e;
  margin-bottom: 0.25rem;
}

.tips-content p {
  color: #a16207;
  font-size: 0.9rem;
  margin: 0;
}

/* 响应式 */
@media (max-width: 768px) {
  .download-center {
    padding: 1rem;
  }

  .hero-section {
    padding: 2rem 1rem;
  }

  .hero-features {
    gap: 0.5rem;
  }

  .feature-tag {
    font-size: 0.8rem;
    padding: 0.4rem 0.75rem;
  }

  .tab-container {
    flex-direction: column;
  }

  .software-grid,
  .opensource-grid {
    grid-template-columns: 1fr;
  }

  .card-actions,
  .opensource-actions {
    flex-direction: column;
  }
}

/* 深色模式 */
.dark .hero-section {
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 50%, #1e293b 100%);
}

.dark .hero-desc,
.dark .section-desc {
  color: #94a3b8;
}

.dark .tab-container {
  background: #1e293b;
}

.dark .tab-btn.active {
  background: #334155;
  color: #60a5fa;
}

.dark .software-card,
.dark .opensource-card {
  background: linear-gradient(145deg, #1e293b, #0f172a);
  border-color: rgba(255, 255, 255, 0.06);
}

.dark .card-title,
.dark .section-title,
.dark .opensource-title {
  color: #f1f5f9;
}

.dark .card-desc,
.dark .card-platform,
.dark .opensource-desc {
  color: #94a3b8;
}

.dark .card-icon {
  background: linear-gradient(135deg, #1e293b, #334155);
}

.dark .feature-item {
  background: #334155;
  color: #cbd5e1;
}

.dark .card-platform {
  background: #0f172a;
}

.dark .btn-secondary {
  background: #334155;
  color: #94a3b8;
}

.dark .btn-secondary:hover {
  background: #475569;
  color: #f1f5f9;
}

.dark .tips-card {
  background: linear-gradient(135deg, #1e293b, #0f172a);
  border-color: rgba(234, 179, 8, 0.3);
}

.dark .tips-content h4 {
  color: #fbbf24;
}

.dark .tips-content p {
  color: #fcd34d;
}
</style>
