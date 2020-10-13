import request from '@/utils/request';

/**
 * 获取用户信息
 */
export default async function fetchUser(){
  return await request('/user/fetchCurrent',{
    method:'GET'
  })
}
