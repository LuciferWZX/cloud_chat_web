import React, { FC } from 'react';
import { message, notification } from 'antd';
import { CloseCircleFilled } from '@ant-design/icons';
import { BasicLayoutBox, ChildrenBox } from '@/layouts/basicLayout/style';
import SiderBar from '@/layouts/basicLayout/SiderBar';
import { GlobalStyle } from '@/layouts/globalStyle';
import { useMount, useUnmount } from 'ahooks';
import { useDispatch, useSelector } from '@@/plugin-dva/exports';
import { ConnectState } from '@/models/connect';
import io from 'socket.io-client';
import {
  SOCKET_ADDRESS,
  SocketActionType,
  SocketChannelType,
  SocketResponseType,
} from '@/utils/constans';
import {
  ChatItem,
  MessageModelState,
  MessageModelType,
} from '@/models/message';

notification.config({
  closeIcon: <CloseCircleFilled style={{ fontSize: 16 }} />,
});
const BasicLayout: FC = ({ children }) => {
  //当前用户信息
  const currentUser = useSelector((state: ConnectState) => state.user.user);
  //当前的socket
  const cSocket = useSelector((state: ConnectState) => state.message.socket);
  //该用户的交流列表的好友信息及聊天列表
  const chatListMap = useSelector(
    (state: ConnectState) => state.message.chatListMap,
  );

  const dispatch = useDispatch();
  //刚进入主页面
  useMount(() => {
    if (currentUser && !cSocket) {
      initSocket(currentUser.id);
    }
  });
  //初始化socket
  const initSocket = (userId: string) => {
    const socketConfig = {
      reconnectionAttempts: 10,
      transports: ['websocket', 'polling'],
      query: {
        uid: userId,
      },
    };
    const socket = io(SOCKET_ADDRESS, socketConfig);

    socket.on('connect', function() {
      console.log('已连接:', socket.id);
      //通知已经登录的下线
      // socket.emit("force-logout",JSON.stringify({
      //   actionType:SocketActionType.ForceUserLoginOut,
      //   response:{
      //     code:200,
      //     data:{
      //       id:user.id,
      //     },
      //     message:'该用户正在其他地方登录'
      //   }
      // }))
    });
    socket.on('disconnect', function() {
      console.log('已断开:', socket);
    });
    socket.on(SocketActionType.ReceiveNewMessage, async (data: string) => {
      const newMessage: ChatItem = JSON.parse(data);
      console.log('新消息已收到', newMessage);
      if (userId === newMessage.receive_id) {
        console.log('该用户接收到新消息', newMessage);
        const messageState: MessageModelState = (await dispatch({
          type: 'message/insideSocket',
        })) as any;
        const { currentFriendId } = messageState;
        console.log({ currentFriendId, id2: newMessage.creator_id });
        //和该聊天好友在同一个页面
        if (currentFriendId === newMessage.creator_id) {
          //更新要发送的信息
          dispatch({
            type: 'message/save',
            payload: {
              newMessage,
            },
          });
        }
        // else{
        //   const friendInfo = chatListMap.get(newMessage.creator_id);
        //   if(friendInfo){
        //     chatListMap.set(newMessage.creator_id,{
        //       ...friendInfo,
        //       chatList:friendInfo.chatList.concat(newMessage)
        //     })
        //     dispatch({
        //       type:'message/save',
        //       payload:{
        //         chatListMap
        //       }
        //     })
        //   }
        // }
      }
    });
    socket.on(SocketChannelType.UserActionChannel, (response: string) => {
      const data: SocketResponseType = JSON.parse(response);
      console.log('该用户收到消息:', data);
      if (data.response.code === 200) {
        switch (data.actionType) {
          //用户连接socket成功的时候改变状态，或者断开的时候
          case SocketActionType.UpdateUserOnlineStatus: {
            //当当前用户id和提示更新的id相同的时候，更新自己
            if (userId === data.response.data.id) {
              dispatch({
                type: 'user/save',
                payload: {
                  onlineState: data.response.data.status,
                },
              });
            } else {
              //其他的说明是在好友位，如果在好友位就更新，不变就不操作
              const friendInfo = chatListMap.get(data.response.data.id);
              if (friendInfo) {
                const newChatList = new Map([...chatListMap]);
                newChatList.set(data.response.data.id, {
                  ...friendInfo,
                  onlineStatus: data.response.data.status,
                });
                dispatch({
                  type: 'message/save',
                  payload: {
                    chatListMap: newChatList,
                  },
                });
              }
            }
            break;
          }
          case SocketActionType.ForceUserLoginOut: {
            const user = currentUser;
            //console.log('当前的用户信息', user);
            //console.log('最新的用户信息', data.response.data);
            //当最新登录的token不一致的时候
            if (
              user?.token !== data.response.data.token &&
              user?.id === data.response.data.id
            ) {
              message.error(data.response.message);
              forceLogoutCurrent(socket);
            }

            break;
          }
          default: {
            break;
          }
        }
      }
    });

    dispatch({
      type: 'message/save',
      payload: {
        socket: socket,
      },
    });
  };

  function forceLogoutCurrent(socket: any) {
    socket.close();
    //获取目前在线的用户信息不是当前用户就登出
    dispatch({
      type: 'user/fetchUserInfo',
    });
  }
  useUnmount(() => {
    if (cSocket) {
      //关闭socket
      cSocket.close();
      dispatch({
        type: 'save/message',
        payload: {
          socket: null,
        },
      });
    }
  });
  return (
    <BasicLayoutBox>
      <SiderBar />
      <ChildrenBox>{children}</ChildrenBox>
      <GlobalStyle />
    </BasicLayoutBox>
  );
};
export default BasicLayout;
