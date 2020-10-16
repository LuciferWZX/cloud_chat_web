import React, { FC } from 'react';
import { MessagePageBox } from '@/pages/message/style';
import ContactContainer from '@/pages/message/ContactContainer';
import { useDispatch } from '@@/plugin-dva/exports';
import { useMount, useRequest } from 'ahooks';

const Message: FC = () => {
  const dispatch = useDispatch();
  useMount(async () => {
    await conversationRequest.run();
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
      <div>dddddd</div>
    </MessagePageBox>
  );
};
export default Message;
