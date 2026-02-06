import { defineStore } from 'pinia'
import { ref } from 'vue'

/**
 * 应用级状态管理
 * @description 管理菜单折叠、当前激活的主菜单、主题色等
 */
export const useAppStore = defineStore('app', () => {
  // 菜单是否折叠
  const isCollapse = ref(false)
  
  // 当前选中的一级菜单路径
  const activeHeaderPath = ref('/')
  
  // 主题色
  const themeColor = ref('#409eff')

  /**
   * 切换菜单折叠状态
   */
  const toggleCollapse = () => {
    isCollapse.value = !isCollapse.value
  }

  /**
   * 设置当前选中的一级菜单
   * @param path 路径
   */
  const setActiveHeaderPath = (path: string) => {
    activeHeaderPath.value = path
  }

  /**
   * 更新主题色
   * @param color 颜色值
   */
  const setThemeColor = (color: string) => {
    if (!color) return
    themeColor.value = color
    const el = document.documentElement
    
    // 设置主色
    el.style.setProperty('--el-color-primary', color)
    
    // 生成并设置辅助色阶 (light-3, light-5, light-7, light-8, light-9, dark-2)
    // 这里使用简单的 hex 混合逻辑
    for (let i = 1; i <= 9; i++) {
      el.style.setProperty(`--el-color-primary-light-${i}`, mixColor(color, '#ffffff', i * 0.1))
    }
    el.style.setProperty('--el-color-primary-dark-2', mixColor(color, '#000000', 0.2))
  }

  /**
   * 颜色混合函数
   * @param color1 主色
   * @param color2 混合色 (黑/白)
   * @param weight 权重
   */
  const mixColor = (color1: string, color2: string, weight: number) => {
    let r1 = parseInt(color1.substring(1, 3), 16)
    let g1 = parseInt(color1.substring(3, 5), 16)
    let b1 = parseInt(color1.substring(5, 7), 16)

    let r2 = parseInt(color2.substring(1, 3), 16)
    let g2 = parseInt(color2.substring(3, 5), 16)
    let b2 = parseInt(color2.substring(5, 7), 16)

    let r = Math.round(r1 * (1 - weight) + r2 * weight)
    let g = Math.round(g1 * (1 - weight) + g2 * weight)
    let b = Math.round(b1 * (1 - weight) + b2 * weight)

    const _r = r.toString(16).padStart(2, '0')
    const _g = g.toString(16).padStart(2, '0')
    const _b = b.toString(16).padStart(2, '0')

    return `#${_r}${_g}${_b}`
  }

  return {
    isCollapse,
    activeHeaderPath,
    themeColor,
    toggleCollapse,
    setActiveHeaderPath,
    setThemeColor
  }
})
