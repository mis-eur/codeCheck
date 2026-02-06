<template>
  <div class="header-content">
    <div class="left-section">
      <div class="logo">Admin Pro</div>
      <!-- 一级菜单 -->
      <el-menu
        mode="horizontal"
        :default-active="appStore.activeHeaderPath"
        class="top-menu"
        @select="handleHeaderSelect"
      >
        <el-menu-item 
          v-for="route in mainRoutes" 
          :key="route.path" 
          :index="route.path"
        >
          <el-icon v-if="route.meta?.icon"><component :is="route.meta.icon" /></el-icon>
          <span>{{ route.meta?.title || '未命名' }}</span>
        </el-menu-item>
      </el-menu>
    </div>

    <div class="right-section">
      <!-- 主题色选择器 -->
      <div class="theme-picker">
        <el-color-picker 
          v-model="appStore.themeColor" 
          size="small"
          @change="appStore.setThemeColor"
        />
      </div>
      
      <!-- 用户信息 -->
      <el-dropdown>
        <span class="user-info">
          Admin <el-icon><ArrowDown /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item divided>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/store/app'

/**
 * 顶部导航组件
 * @description 展示一级菜单与系统设置
 */
const router = useRouter()
const appStore = useAppStore()

// 获取所有一级路由（即 Layout 下的顶级路由）
const mainRoutes = computed(() => {
  return router.options.routes.filter(item => !item.meta?.hidden)
})

/**
 * 处理一级菜单点击
 * @param path 选中的路径
 */
const handleHeaderSelect = (path: string) => {
  appStore.setActiveHeaderPath(path)
  // 默认跳转到该模块下的第一个子路由
  const targetRoute = router.options.routes.find(r => r.path === path)
  if (targetRoute && targetRoute.redirect) {
    router.push(targetRoute.redirect as string)
  } else {
    router.push(path)
  }
}
</script>

<style scoped lang="scss">
.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 100%;

  .left-section {
    display: flex;
    align-items: center;
    flex: 1;

    .logo {
      font-size: 20px;
      font-weight: bold;
      margin-right: 40px;
      color: var(--el-color-primary);
    }

    .top-menu {
      border-bottom: none;
      height: 60px;
      flex: 1;
    }
  }

  .right-section {
    display: flex;
    align-items: center;
    gap: 20px;

    .user-info {
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 4px;
    }
  }
}
</style>
