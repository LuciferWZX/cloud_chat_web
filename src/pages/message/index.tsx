import React, { FC } from 'react';
import { MessagePageBox } from '@/pages/message/style';
import ContactContainer from '@/pages/message/ContactContainer';
import { useDispatch } from '@@/plugin-dva/exports';
import { useMount, useRequest, useUnmount } from 'ahooks';
import ChatContainer from '@/pages/message/ChatContainer';

const Message: FC = () => {
  const dispatch = useDispatch();
  //进入页面执行
  useMount(async () => {
    await conversationRequest.run();
  });
  useUnmount(() => {
    //重置message
    dispatch({
      type: 'message/save',
      payload: {
        conversations: [],
        //当前搜索想要和谁会话
        searchFriendsValue: '',
        //当前正在聊天的好友的id
        currentFriendId: '',
        //连接的socket
        socket: null,
        chatListMap: new Map(null),
      },
    });
  });
  const conversationRequest = useRequest(fetchConversations, {
    manual: true, //默认组件渲染的时候掉接口，无需在手动运行
  });
  //获取交流列表
  async function fetchConversations() {
    return dispatch({
      type: 'message/fetchConversations',
    });
  }
  return (
    <MessagePageBox>
      <ContactContainer />
      <ChatContainer />
    </MessagePageBox>
  );
};
export default Message;
