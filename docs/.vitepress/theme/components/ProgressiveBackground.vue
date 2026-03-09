<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Props {
  thumbSrc: string
  fullSrc: string
  alt?: string
}

const props = withDefaults(defineProps<Props>(), {
  alt: 'Background'
})

const isFullLoaded = ref(false)
const isThumbLoaded = ref(false)
let fullImage: HTMLImageElement | null = null

onMounted(() => {
  // 预加载高清图
  fullImage = new Image()
  fullImage.src = props.fullSrc
  fullImage.onload = () => {
    isFullLoaded.value = true
  }
})

onUnmounted(() => {
  fullImage = null
})

const onThumbLoad = () => {
  isThumbLoaded.value = true
}
</script>

<template>
  <div class="progressive-background">
    <!-- 低分辨率缩略图（模糊显示） -->
    <img
      :src="thumbSrc"
      :alt="alt"
      class="thumb-image"
      :class="{ 'thumb-loaded': isThumbLoaded, 'thumb-hidden': isFullLoaded }"
      @load="onThumbLoad"
    />
    
    <!-- 高分辨率原图 -->
    <img
      :src="fullSrc"
      :alt="alt"
      class="full-image"
      :class="{ 'full-loaded': isFullLoaded }"
    />
  </div>
</template>

<style scoped>
.progressive-background {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.progressive-background img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 缩略图样式 - 初始模糊 */
.thumb-image {
  opacity: 0;
  filter: blur(20px);
  transform: scale(1.1);
  transition: opacity 0.3s ease, filter 0.5s ease;
}

.thumb-image.thumb-loaded {
  opacity: 1;
}

.thumb-image.thumb-hidden {
  opacity: 0;
  transition: opacity 0.8s ease;
}

/* 高清图样式 - 初始隐藏 */
.full-image {
  opacity: 0;
  transition: opacity 0.8s ease-in-out;
}

.full-image.full-loaded {
  opacity: 1;
}
</style>
