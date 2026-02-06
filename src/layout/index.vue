<template>
  <el-container class="app-container">
    <!-- 侧边栏 -->
    <el-aside :width="appStore.isCollapse ? '64px' : '220px'">
      <Aside />
    </el-aside>
    
    <el-container class="right-container">
      <!-- 头部 -->
      <el-header height="60px">
        <Header />
      </el-header>
      
      <!-- 主内容区 -->
      <el-main>
        <div class="breadcrumb-container">
          <Breadcrumb />
        </div>
        <Main class="app-main-content" />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore } from '@/store/app'
import Breadcrumb from '@/components/Breadcrumb/index.vue'
import Aside from './Aside.vue'
import Header from './Header.vue'
import Main from './Main.vue'

/**
 * 布局入口组件
 * @description 组合侧边栏、头部和主内容区
 */
const route = useRoute()
const appStore = useAppStore()

/**
 * 根据当前路由同步一级菜单状态
 */
const syncActiveMenu = () => {
  const matched = route.matched
  if (matched && matched.length > 0) {
    // 找到当前路由所属的一级根路径
    const rootPath = matched[0]?.path || '/'
    appStore.setActiveHeaderPath(rootPath)
  }
}

// 监听路由变化，确保刷新或跳转时状态同步
watch(() => route.path, () => {
  syncActiveMenu()
}, { immediate: true })

onMounted(() => {
  // 初始化主题色
  appStore.setThemeColor(appStore.themeColor)
})
</script>

<style scoped lang="scss">
.app-container {
  height: 100vh;
}

.breadcrumb-container {
  margin-bottom: 4px;
  padding: 0 5px;
  flex-shrink: 0;
}

.app-main-content {
  flex: 1;
  overflow: hidden;
}
</style>
