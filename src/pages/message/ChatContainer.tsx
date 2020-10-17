import React, { FC } from 'react';
import '@chatui/core/es/styles/index.less';
import Chat, { Bubble, useMessages } from '@chatui/core';
import '@chatui/core/dist/index.css';
import { ChatNavBar } from '@/components';
import { Input } from 'antd';
import { useDispatch, useSelector } from '@@/plugin-dva/exports';
import { ConnectState } from '@/models/connect';
import { useRequest, useUpdateEffect } from 'ahooks';
const ChatContainer: FC = () => {
  //获取好友的信息及聊天记录
  const friendChatDataRequest = useRequest(fetchFriendChatData, {
    manual: true,
  });
  const dispatch = useDispatch();
  //当前选中的好友的id
  const currentFriendId = useSelector(
    (state: ConnectState) => state.message.currentFriendId,
  );
  //当前的聊天记录的map
  const chatListMap = useSelector(
    (state: ConnectState) => state.message.chatListMap,
  );

  console.log({ chatListMap });
  useUpdateEffect(() => {
    if (currentFriendId !== '') {
      //获取所有聊天记录的大map
      const friendChatInfo = chatListMap.get(currentFriendId);
      //如果该用户在聊天记录的map里不存在就调取接口，获取记录及好友信息并存储到map
      if (!friendChatInfo) {
        (async function() {
          await friendChatDataRequest.run(currentFriendId);
        })();
      }
    }
  }, [currentFriendId]);

  async function fetchFriendChatData(id: string) {
    return dispatch({
      type: 'message/fetchFriendChatData',
      payload: {
        friendId: id,
      },
    });
  }

  const initialMessages = [
    {
      type: 'text',
      content: { text: '主人好，我是智能助理，你的贴心小助手~' },
      user: {
        avatar: '//gw.alicdn.com/tfs/TB1DYHLwMHqK1RjSZFEXXcGMXXa-56-62.svg',
      },
    },
    {
      type: 'image',
      content: {
        picUrl:
          'https://gw.alicdn.com/tfs/TB1HURhcBCw3KVjSZR0XXbcUpXa-750-364.png',
      },
    },
  ];
  // 默认快捷短语，可选
  const defaultQuickReplies = [
    {
      icon: 'message',
      name: '联系人工服务',
      isNew: true,
      isHighlight: true,
    },
    {
      name: '短语1',
      isNew: true,
    },
    {
      name: '短语2',
      isHighlight: true,
    },
    {
      name: '短语3',
    },
  ];
  // 消息列表
  const { messages, appendMsg, setTyping } = useMessages(initialMessages);
  // 快捷短语回调，可根据 item 数据做出不同的操作，这里以发送文本消息为例
  function handleQuickReplyClick(item: any) {
    handleSend('text', item.name);
  }
  // 发送回调
  function handleSend(type: string, val: any) {
    if (type === 'text' && val.trim()) {
      // TODO: 发送请求
      appendMsg({
        type: 'text',
        content: { text: val },
        position: 'right',
      });

      setTyping(true);

      // 模拟回复消息
      setTimeout(() => {
        appendMsg({
          type: 'text',
          content: { text: '亲，您遇到什么问题啦？请简要描述您的问题~' },
        });
      }, 1000);
    }
  }
  function renderMessageContent(msg: any) {
    const { type, content } = msg;

    // 根据消息类型来渲染
    switch (type) {
      case 'text':
        return <Bubble content={content.text} />;
      case 'image':
        return (
          <Bubble type="image">
            <img src={content.picUrl} alt="" />
          </Bubble>
        );
      default:
        return null;
    }
  }

  //导航栏渲染函数，会覆盖 navbar
  const renderNavbar = () => {
    const friendInfo = chatListMap.get(currentFriendId);
    console.log({ friendInfo });
    if (friendInfo) {
      return (
        <ChatNavBar
          avatar={friendInfo.avatar}
          nickname={friendInfo.nickname}
          status={friendInfo.onlineStatus}
        />
      );
    }
    return null;
  };
  //上方点击加载更多
  const loadMoreMsg = () => {
    console.log('触发onRefresh');
  };
  return (
    <div style={{ flex: 1 }}>
      <Chat
        //onRefresh={loadMoreMsg}
        messages={messages}
        renderNavbar={renderNavbar}
        inputType={'text'}
        //renderAccessory={<div>wwww</div>}
        renderMessageContent={renderMessageContent}
        quickReplies={defaultQuickReplies}
        onQuickReplyClick={handleQuickReplyClick}
        onSend={handleSend}
        //Composer={"<input/>"}
      />
    </div>
  );
};
export default ChatContainer;
