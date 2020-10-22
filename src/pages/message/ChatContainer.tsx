import React, { FC, useRef } from 'react';
import '@chatui/core/es/styles/index.less';
import Chat, { Bubble, useMessages } from '@chatui/core';
import '@chatui/core/dist/index.css';
import { ChatNavBar } from '@/components';
import { useDispatch, useSelector } from '@@/plugin-dva/exports';
import { ConnectState } from '@/models/connect';
import { useRequest, useUpdateEffect } from 'ahooks';
import { msgKey, splitStringToArray } from '@/utils/util';
import { ChatItem, FriendInfo } from '@/models/message';
import { MsgType } from '@/utils/constans';
import dayjs from 'dayjs';
import { message } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import { ContactContainerBox } from '@/pages/message/style';

const ChatContainer: FC = () => {
  const inputRef = useRef();
  //获取好友的信息及聊天记录
  const friendChatDataRequest = useRequest(fetchFriendChatData, {
    manual: true,
  });
  //发送文字信息
  const sendTextRequest = useRequest(sendTextMessage, {
    manual: true,
    fetchKey: (id: any) => id,
  });

  const {
    messages,
    appendMsg,
    setTyping,
    deleteMsg,
    prependMsgs,
  } = useMessages([]);

  const dispatch = useDispatch();
  //当前选中的好友的id
  const currentFriendId = useSelector(
    (state: ConnectState) => state.message.currentFriendId,
  );
  //当前登录用户的id
  const userId = useSelector((state: ConnectState) => state.user.user?.id);
  //当前登录的用户的头像
  const myAvatar = useSelector(
    (state: ConnectState) => state.user.user?.avatar,
  );
  //当前的聊天记录的map
  const friendInfo = useSelector(
    (state: ConnectState) => state.message.chatListMap,
  ).get(currentFriendId);
  //输入的inputMap
  const inputValueMap = useSelector(
    (state: ConnectState) => state.message.inputValueMap,
  );
  //用户接受到的新消息
  const newMessage = useSelector(
    (state: ConnectState) => state.message.newMessage,
  );

  const socket = useSelector((state: ConnectState) => state.message.socket);
  //初始化信息
  const renderInitMessage = (
    msgInfo: {
      currentFriendId: string;
      friendAvatar: string;
      myAvatar: string;
    },
    data: Array<ChatItem>,
  ) => {
    return data.map(item => {
      // content: "这是第二句"
      // content_type: 0
      // create_time: "2020-10-15T18:08:35.000Z"
      // creator_id: "6721356004241440768"
      // id: 4
      // is_deleted: 0
      // is_read: 0
      // receive_id: "6721851097633259520"
      // update_time: "2020-10-15T18:08:35.0
      return {
        type: item.content_type.toString(),
        _id: item.id,
        position:
          item.creator_id === msgInfo.currentFriendId ? 'left' : 'right',
        content: {
          //text: '主人好，我是智能助理，你的贴心小助手~',
          [msgKey(item.content_type)]: item.content,
        },
        createdAt: dayjs().valueOf(),
        hasTime: true,
        user: {
          avatar:
            item.creator_id === msgInfo.currentFriendId
              ? msgInfo.friendAvatar
              : msgInfo.myAvatar,
        },
      };
    });
  };

  //当依赖更新的时候触发
  useUpdateEffect(() => {
    if (currentFriendId !== '') {
      //切换好友，先清空好友聊天记录
      clearMessage();
      if (inputRef.current) {
        // @ts-ignore
        inputRef.current.setText(inputValueMap.get(currentFriendId) || '');
      }
      //获取好友信息
      (async function() {
        const data: FriendInfo = await friendChatDataRequest.run(
          currentFriendId,
          userId as string,
        );
        const msgList: any = renderInitMessage(
          {
            currentFriendId,
            friendAvatar: data.avatar,
            myAvatar: myAvatar || '',
          },
          data.chatList,
        );
        prependMsgs(msgList);
        // for (let i = 0; i < msgList.length; i++) {
        //   appendMsg(msgList[i]);
        // }
      })();
    }
  }, [currentFriendId]);
  useUpdateEffect(() => {
    if (newMessage) {
      console.log('该用户开始更新消息');
      appendMsg({
        type: newMessage.content_type.toString(),
        //_id:item.id,
        position: 'left',
        content: {
          //text: '主人好，我是智能助理，你的贴心小助手~',
          [msgKey(newMessage.content_type)]: newMessage.content,
        },
        createdAt: dayjs(newMessage.create_time).valueOf(),
        hasTime: true,
        user: {
          avatar: (friendInfo && friendInfo.avatar) || '',
        },
      });
    }
  }, [newMessage]);
  //获取好友的信息
  function fetchFriendChatData(friendId: string, userId: string) {
    return dispatch({
      type: 'message/fetchFriendChatData',
      payload: {
        friendId: friendId,
        id: userId,
      },
    });
  }
  //发送文字信息
  function sendTextMessage(
    type: number,
    message: string,
    creatorId: string,
    receiveId: string,
    index: number,
  ) {
    return dispatch({
      type: 'message/sendMessage',
      payload: {
        type,
        message,
        creatorId,
        receiveId,
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
    switch (parseInt(type)) {
      case MsgType.Message:
        return <Bubble content={content[msgKey(parseInt(type))]} />;
      case MsgType.Image:
        return (
          <Bubble type="image">
            <img src={content[msgKey(parseInt(type))]} alt="img" />
          </Bubble>
        );
      default:
        return null;
    }
  }

  //导航栏渲染函数，会覆盖 navbar
  const renderNavbar = () => {
    // const friendInfo = chatListMap.get(currentFriendId);
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
  const loadMoreMsg = async () => {
    if (friendInfo && friendInfo.hasMore) {
      return new Promise<any>((resolve, reject) => {
        console.log('触发onRefresh');
        resolve('sss');
      });
    }
    return undefined;
  };
  //清空当前聊天记录
  const clearMessage = () => {
    if (messages.length > 0) {
      for (let i = 0; i < messages.length; i++) {
        deleteMsg(messages[i]._id);
      }
    }
  };
  //输入框输入
  const changeInput = (text: string) => {
    let temp = new Map(inputValueMap);
    temp.set(currentFriendId, text);
    dispatch({
      type: 'message/save',
      payload: {
        inputValueMap: temp,
      },
    });
  };
  //发送消息
  const sendMsg = (type: string, val: any) => {
    console.log({ type, val });
    if (type === 'text' && val.trim()) {
      //状态显示正在发送
      setTyping(true);
      const msgArr = splitStringToArray(val, 255).map((msg, index) => {
        return {
          index: index,
          message: msg,
        };
      });
      for (let i = 0; i < msgArr.length; i++) {
        sendTextRequest
          .run(
            0,
            msgArr[i].message,
            userId || '',
            currentFriendId,
            msgArr[i].index,
          )
          .then((result: 'success' | 'failed') => {
            if (result === 'success') {
              // if(socket){
              //   socket.emit('')
              // }
              appendMsg({
                type: MsgType.Message.toString(),
                //_id:item.id,
                position: 'right',
                content: {
                  //text: '主人好，我是智能助理，你的贴心小助手~',
                  [msgKey(MsgType.Message)]: msgArr[i].message,
                },
                createdAt: dayjs().valueOf(),
                hasTime: true,
                user: {
                  avatar: myAvatar || '',
                },
              });
            } else {
              message.error('发送失败');
              setTyping(false);
            }
          });
      }
      // TODO: 发送请求
      // sendTextRequest.run(0, val, userId || "", currentFriendId).then ((result:"success"|"failed") =>{
      //   if (result === "success"){
      //     appendMsg({
      //       type: MsgType.Message.toString(),
      //       //_id:item.id,
      //       position:"right",
      //       content: {
      //         //text: '主人好，我是智能助理，你的贴心小助手~',
      //         [msgKey(MsgType.Message)]:val
      //       },
      //       createdAt:dayjs().valueOf(),
      //       hasTime:true,
      //       user: {
      //         avatar: myAvatar||"",
      //       },
      //     });
      //   }else{
      //     message.error("发送失败");
      //     setTyping(false);
      //   }
      // })

      // appendMsg({
      //   type: 'text',
      //   content: { text: val },
      //   position: 'right',
      // });

      // 模拟回复消息
      // setTimeout(() => {
      //   appendMsg({
      //     type: 'text',
      //     content: { text: '亲，您遇到什么问题啦？请简要描述您的问题~' },
      //   });
      // }, 1000);
    }
  };
  return (
    <ContactContainerBox>
      {friendInfo && (
        <Chat
          onRefresh={loadMoreMsg}
          loadMoreText={friendInfo && friendInfo.hasMore ? '点击加载' : ''}
          text={friendInfo && friendInfo.inputValue}
          onInputChange={changeInput as any}
          messages={messages}
          renderNavbar={renderNavbar}
          //inputType={'text'}
          composerRef={inputRef}
          toolbar={[
            {
              type: '1',
              icon: 'image',
              title: '图片',
              //icon?: string,
              //img?: string,
              //render:
            },
            {
              type: '2',
              icon: 'video',
              title: '视频',
              //icon?: string,
              //img?: string,
              //render:<div>+</div>
            },
            {
              type: '2',
              icon: 'file',
              title: '文件',
              //icon?: string,
              //img?: string,
              //render:<div>+</div>
            },
          ]}
          renderMessageContent={renderMessageContent}
          quickReplies={defaultQuickReplies}
          onQuickReplyClick={handleQuickReplyClick}
          onSend={sendMsg}
          //Composer={"<input/>"}
        />
      )}
    </ContactContainerBox>
  );
};
export default ChatContainer;
