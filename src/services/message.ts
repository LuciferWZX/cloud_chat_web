import request from '@/utils/request';
import qs from 'querystring';

/**
 * 通过id查询redis里面的交流列表
 */
export async function fetchConversations() {
  return await request('/message/fetchConversations', {
    method: 'GET',
  });
}
