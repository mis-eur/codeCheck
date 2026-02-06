<template>
  <div class="main-content">
    <router-view v-slot="{ Component }">
      <transition name="fade-transform" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
/**
 * 主内容渲染区
 * @description 包含路由过渡动画
 */
</script>

<style scoped lang="scss">
.main-content {
  height: 100%;
  width: 100%;
  overflow: hidden; /* 防止切换时出现全局滚动条 */
  position: relative;
}

/* 过渡动画 */
.fade-transform-enter-active,
.fade-transform-leave-active {
  transition: all 0.3s cubic-bezier(0.55, 0, 0.1, 1);
}

.fade-transform-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>
