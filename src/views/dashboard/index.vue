<template>
  <div class="dashboard">
    <el-row :gutter="20">
      <el-col :span="6" v-for="i in 4" :key="i">
        <el-card shadow="hover">
          <template #header>数据指标 {{ i }}</template>
          <div style="font-size: 24px; font-weight: bold;">{{ Math.floor(Math.random() * 10000) }}</div>
        </el-card>
      </el-col>
    </el-row>
    
    <el-card class="mt-20">
      <template #header>
        <div class="flex-between">
          <span>最近活动</span>
          <el-button type="primary" size="small" @click="handleTestApi">测试 Axios 接口</el-button>
        </div>
      </template>
      <el-table :data="tableData">
        <el-table-column prop="date" label="日期" />
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="status" label="状态" />
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { login } from '../../api/user';
import { ElMessage } from 'element-plus';

/**
 * 控制台主页
 */
const tableData = [
  { date: '2026-02-06', name: '系统启动', status: '成功' },
  { date: '2026-02-06', name: '用户登录', status: '成功' },
  { date: '2026-02-05', name: '权限更新', status: '成功' },
]

/**
 * 测试 API 调用
 */
const handleTestApi = async () => {
  try {
    // 这里仅作为演示，实际会请求到后端
    const res = await login({
      username: 'admin',
      password: 'password123'
    });
    console.log('API 返回结果:', res);
    ElMessage.success('接口调用成功（详见控制台）');
  } catch (error) {
    console.error('接口调用失败:', error);
  }
}
</script>

<style scoped>
.dashboard {
  height: 100%;
  overflow-y: auto;
  padding: 5px;
}
.mt-20 { margin-top: 20px; }
.flex-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
