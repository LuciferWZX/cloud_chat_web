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

/**
 * 更具好友id查询好友聊天记录和好友信息
 * @param params
 */
export async function fetchFriendChatData(params: { friendId: string }) {
  return await request(`/message/friendChatData?${qs.stringify(params)}`, {
    method: 'GET',
  });
}
