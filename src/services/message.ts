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
export async function fetchFriendChatData(params: {
  friendId: string;
  id: string;
}) {
  return await request(`/message/friendChatData?${qs.stringify(params)}`, {
    method: 'GET',
  });
}

/**
 * 发送文字信息  0
 * @param params
 */
export async function sendMessage(params: {
  type: number;
  message: string;
  creatorId: string;
  receiveId: string;
}) {
  return await request(`/message/sendMsg`, {
    method: 'POSt',
    data: params,
  });
}

/**
 * 更新消息成已读或者未读
 * @param params
 */
export async function updateMessageReadStatus(params: {
  receiveId: number;
  dependFriendId: boolean; //是否更具好友id去更新
  ids: Array<number | string>;
}) {
  return await request(`/message/updateMessages`, {
    method: 'POSt',
    data: params,
  });
}
