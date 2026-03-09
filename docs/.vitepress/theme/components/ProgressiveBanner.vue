<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useData, withBase } from 'vitepress'

interface Props {
  thumbSrc: string
  fullSrc: string
}

const props = defineProps<Props>()

const isFullLoaded = ref(false)
const isThumbLoaded = ref(false)
let fullImage: HTMLImageElement | null = null

const thumbUrl = computed(() => withBase(props.thumbSrc))
const fullUrl = computed(() => withBase(props.fullSrc))

onMounted(() => {
  // 先加载缩略图
  const thumbImg = new Image()
  thumbImg.src = thumbUrl.value
  thumbImg.onload = () => {
    isThumbLoaded.value = true
  }

  // 预加载高清图
  fullImage = new Image()
  fullImage.src = fullUrl.value
  fullImage.onload = () => {
    isFullLoaded.value = true
  }
})

onUnmounted(() => {
  fullImage = null
})
</script>

<template>
  <div class="progressive-banner">
    <!-- 低分辨率缩略图（模糊显示） -->
    <div 
      class="banner-layer thumb-layer"
      :class="{ 'is-loaded': isThumbLoaded, 'is-hidden': isFullLoaded }"
      :style="{ backgroundImage: `url(${thumbUrl})` }"
    />
    
    <!-- 高分辨率原图 -->
    <div 
      class="banner-layer full-layer"
      :class="{ 'is-loaded': isFullLoaded }"
      :style="{ backgroundImage: `url(${fullUrl})` }"
    />
  </div>
</template>

<style scoped>
.progressive-banner {
  position: absolute;
  inset: 0;
  overflow: hidden;
  z-index: 0;
}

.banner-layer {
  position: absolute;
  inset: 0;
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  transition: opacity 0.8s ease-in-out;
}

/* 缩略图层 - 初始隐藏，加载后显示模糊效果 */
.thumb-layer {
  opacity: 0;
  filter: blur(10px);
  transform: scale(1.05);
  z-index: 1;
}

.thumb-layer.is-loaded {
  opacity: 1;
}

.thumb-layer.is-hidden {
  opacity: 0;
}

/* 高清图层 - 初始隐藏，加载后显示 */
.full-layer {
  opacity: 0;
  z-index: 2;
}

.full-layer.is-loaded {
  opacity: 1;
}
</style>
