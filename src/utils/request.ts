import axios from 'axios';
import type { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { ElMessage } from 'element-plus';

/**
 * 定义接口返回的通用数据结构
 */
export interface Result<T = any> {
  code: number;
  message: string;
  data: T;
}

/**
 * 创建 axios 实例
 */
const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API || '/api', // 基础路径，可以从环境变量中获取
  timeout: 5000, // 超时时间
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
});

/**
 * 请求拦截器
 */
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 在这里可以添加 token 等请求头
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * 响应拦截器
 */
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const { code, message, data } = response.data;
    
    // 根据业务代码判断请求是否成功
    if (code === 200 || code === 0) {
      return response.data;
    } else {
      // 业务错误处理
      ElMessage.error(message || '系统出错');
      return Promise.reject(new Error(message || 'Error'));
    }
  },
  (error) => {
    // 网络错误或 HTTP 状态码非 2xx 处理
    let message = '';
    if (error.response) {
      switch (error.response.status) {
        case 401:
          message = '未授权，请重新登录';
          break;
        case 403:
          message = '拒绝访问';
          break;
        case 404:
          message = '请求地址出错';
          break;
        case 500:
          message = '服务器内部错误';
          break;
        default:
          message = '网络连接异常';
      }
    } else {
      message = '连接服务器失败';
    }
    ElMessage.error(message);
    return Promise.reject(error);
  }
);

export default service;
