import request from '@/utils/request';
import qs from 'querystring';
/**
 * 获取用户信息
 */
export async function fetchUser() {
  return await request('/user/fetchCurrent', {
    method: 'GET',
  });
}

/**
 * 使用邮箱注册用户
 * @param params
 */
export async function registerUserByEmail(params: any) {
  return await request('/user/registerByEmail', {
    method: 'POST',
    data: params,
  });
}

/**
 * 发送邮箱验证码
 * @param param
 */
export async function sendVerifyToEmail(param: { email: string }) {
  return request(`/user/sendVerifyToEmail?${qs.stringify(param)}`, {
    method: 'GET',
  });
}

/**
 * 邮箱登录
 * @param params
 */
export async function emailLogin(params: { email: string; password: string }) {
  return request('/user/emailLogin', {
    method: 'POST',
    data: params,
  });
}
