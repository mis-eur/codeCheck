<template>
  <div class="aside-container">
    <div class="logo-section" v-show="!appStore.isCollapse">
      管理系统
    </div>
    
    <el-menu
      :default-active="activeMenu"
      class="side-menu"
      :collapse="appStore.isCollapse"
      background-color="#001529"
      text-color="#fff"
      active-text-color="var(--el-color-primary)"
      router
    >
      <template v-for="item in subMenus" :key="item.path">
        <el-menu-item 
          :index="getFullPath(item.path)"
          :disabled="!!item.meta?.disabled"
        >
          <el-icon v-if="item.meta?.icon"><component :is="item.meta.icon" /></el-icon>
          <template #title>{{ item.meta?.title }}</template>
        </el-menu-item>
      </template>
    </el-menu>

    <div class="collapse-btn" @click="appStore.toggleCollapse">
      <el-icon>
        <component :is="appStore.isCollapse ? 'Expand' : 'Fold'" />
      </el-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAppStore } from '@/store/app'

/**
 * 侧边栏菜单组件
 * @description 根据顶部选中的一级菜单动态渲染二级菜单
 */
const route = useRoute()
const router = useRouter()
const appStore = useAppStore()

// 当前激活的二级菜单项
const activeMenu = computed(() => route.path)

// 获取当前一级菜单下的子菜单
const subMenus = computed(() => {
  const currentRoot = router.options.routes.find(
    r => r.path === appStore.activeHeaderPath
  )
  return currentRoot?.children || []
})

/**
 * 拼接完整路径
 * @param childPath 子路径
 */
const getFullPath = (childPath: string) => {
  const root = appStore.activeHeaderPath
  if (root === '/') return `/${childPath}`
  return `${root}/${childPath}`
}
</script>

<style scoped lang="scss">
.aside-container {
  height: 100%;
  display: flex;
  flex-direction: column;

  .logo-section {
    height: 60px;
    display: flex;
    align-items: center;
    padding-left: 20px;
    color: #fff;
    font-size: 18px;
    font-weight: bold;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    white-space: nowrap;
    overflow: hidden;
  }

  .collapse-btn {
    height: 48px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 20px;
    color: #fff;
    cursor: pointer;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    
    &:hover {
      background-color: rgba(255, 255, 255, 0.05);
    }

    .el-icon {
      font-size: 18px;
    }
  }

  .side-menu {
    border-right: none;
    flex: 1;
  }
}
</style>
