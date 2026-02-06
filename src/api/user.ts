import request from '../utils/request';
import type { Result } from '../utils/request';

/**
 * 登录请求参数接口
 */
export interface LoginParams {
  username: string;
  password: string;
}

/**
 * 登录响应数据接口
 */
export interface LoginResult {
  token: string;
  username: string;
}

/**
 * 用户登录
 * @param data 登录参数
 * @returns 登录结果
 */
export function login(data: LoginParams): Promise<Result<LoginResult>> {
  return request({
    url: '/user/login',
    method: 'post',
    data
  });
}

/**
 * 获取用户信息
 * @returns 用户详情
 */
export function getUserInfo(): Promise<Result<any>> {
  return request({
    url: '/user/info',
    method: 'get'
  });
}
