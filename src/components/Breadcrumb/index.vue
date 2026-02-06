<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <span v-if="item.redirect === 'noRedirect' || index == levelList.length - 1" class="no-redirect">
          {{ item.meta?.title }}
        </span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta?.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { ref, watch, onBeforeMount } from 'vue'
import { useRoute, useRouter, type RouteLocationMatched } from 'vue-router'

/**
 * 面包屑导航组件
 * @description 自动根据当前路由生成层级导航
 */

const route = useRoute()
const router = useRouter()
const levelList = ref<RouteLocationMatched[]>([])

/**
 * 获取面包屑列表
 */
const getBreadcrumb = () => {
  // 只显示有 meta.title 的路由
  let matched = route.matched.filter(item => item.meta && item.meta.title)
  
  // 如果第一个不是控制台，可以在最前面添加一个首页/控制台（可选）
  const first = matched[0]
  if (first && first.path !== '/dashboard') {
    // matched = [{ path: '/dashboard', meta: { title: '控制台' } } as any].concat(matched)
  }

  levelList.value = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
}

/**
 * 处理跳转
 */
const handleLink = (item: RouteLocationMatched) => {
  const { redirect, path } = item
  if (redirect) {
    router.push(redirect as string)
    return
  }
  router.push(path)
}

watch(() => route.path, () => {
  getBreadcrumb()
})

onBeforeMount(() => {
  getBreadcrumb()
})
</script>

<style scoped lang="scss">
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 13px;
  line-height: 24px;
  margin-left: 0;

  :deep(.el-breadcrumb__inner) {
    color: #909399;
    
    a {
      color: #606266;
      font-weight: normal;
      &:hover {
        color: var(--el-color-primary);
      }
    }
  }

  .no-redirect {
    color: #303133;
    cursor: text;
  }
}

/* breadcrumb transition */
.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all .5s;
}

.breadcrumb-enter-from,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(20px);
}

.breadcrumb-move {
  transition: all .5s;
}

.breadcrumb-leave-active {
  position: absolute;
}
</style>
