import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

/**
 * 路由配置管理
 * @description 包含一级菜单与二级菜单的映射关系
 */
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    meta: { title: '控制台', icon: 'Setting' },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: { title: '控制台', icon: 'Odometer', parentPath: '/' }
      }
    ]
  },
  // {
  //   path: '/system',
  //   component: Layout,
  //   redirect: '/system/user',
  //   meta: { title: '系统管理', icon: 'Setting' },
  //   children: [
  //     {
  //       path: 'user',
  //       name: 'User',
  //       component: () => import('@/views/system/user.vue'),
  //       meta: { title: '用户管理', icon: 'User', parentPath: '/system' }
  //     },
  //     {
  //       path: 'role',
  //       name: 'Role',
  //       component: () => import('@/views/system/role.vue'),
  //       meta: { title: '角色管理', icon: 'Lock', parentPath: '/system' }
  //     }
  //   ]
  // },
  {
    path: '/bim',
    component: Layout,
    redirect: '/bim/encoding',
    meta: { title: 'BIM服务', icon: 'Service' },
    children: [
      {
        path: 'naming',
        name: 'BimNaming',
        component: () => import('@/views/bim/index.vue'),
        meta: { title: '文件命名检查', icon: 'Document', parentPath: '/bim', disabled: true }
      },
      {
        path: 'integrity',
        name: 'BimIntegrity',
        component: () => import('@/views/bim/index.vue'),
        meta: { title: '完整性检查', icon: 'CircleCheck', parentPath: '/bim', disabled: true }
      },
      {
        path: 'identification',
        name: 'BimIdentification',
        component: () => import('@/views/bim/index.vue'),
        meta: { title: '标识检查', icon: 'PriceTag', parentPath: '/bim', disabled: true }
      },
      {
        path: 'property',
        name: 'BimProperty',
        component: () => import('@/views/bim/index.vue'),
        meta: { title: '属性检查', icon: 'Memo', parentPath: '/bim', disabled: true }
      },
      {
        path: 'encoding',
        name: 'BimEncoding',
        component: () => import('@/views/bim/encoding/index.vue'),
        meta: { title: '编码检查', icon: 'Cpu', parentPath: '/bim' }
      },
      {
        path: 'basepoint',
        name: 'BimBasePoint',
        component: () => import('@/views/bim/index.vue'),
        meta: { title: '基点检查', icon: 'Location', parentPath: '/bim', disabled: true }
      },
      {
        path: 'space',
        name: 'BimSpace',
        component: () => import('@/views/bim/index.vue'),
        meta: { title: '空间检查', icon: 'Box', parentPath: '/bim', disabled: true }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
