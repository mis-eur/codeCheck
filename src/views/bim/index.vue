<template>
  <div class="bim-check">
    <h2>{{ title }}</h2>
    <el-empty description="该功能正在开发中..." />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

/**
 * BIM 检查占位页面
 * @description 展示当前子菜单名称
 */
const route = useRoute()
const title = computed(() => route.meta?.title || 'BIM 检查')
</script>

<style scoped>
.bim-check {
  padding: 20px;
  background-color: #fff;
  border-radius: 4px;
  height: 100%;
  overflow-y: auto;
}
</style>
