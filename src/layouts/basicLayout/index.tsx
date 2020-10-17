import React, { FC } from 'react';
import { notification } from 'antd';
import { CloseCircleFilled } from '@ant-design/icons';
import { BasicLayoutBox, ChildrenBox } from '@/layouts/basicLayout/style';
import SiderBar from '@/layouts/basicLayout/SiderBar';
import { GlobalStyle } from '@/layouts/globalStyle';
import { useMount } from 'ahooks';
import { useDispatch, useSelector } from '@@/plugin-dva/exports';
import { ConnectState } from '@/models/connect';
import io from 'socket.io-client';
import {
  SOCKET_ADDRESS,
  SocketActionType,
  SocketResponseType,
} from '@/utils/constans';
import { User } from '@/models/user';

notification.config({
  closeIcon: <CloseCircleFilled style={{ fontSize: 16 }} />,
});
const BasicLayout: FC = ({ children }) => {
  const currentUser = useSelector((state: ConnectState) => state.user.user);
  const onlineState = useSelector(
    (state: ConnectState) => state.user.onlineState,
  );
  console.log({ onlineState });
  const dispatch = useDispatch();
  //刚进入主页面
  useMount(() => {
    if (currentUser) {
      initSocket(currentUser);
    }
  });

  //初始化socket
  const initSocket = (user: User) => {
    const socketConfig = {
      reconnectionAttempts: 10,
      transports: ['websocket', 'polling'],
      query: {
        uid: user.id,
      },
    };
    const socket = io(SOCKET_ADDRESS, socketConfig);
    socket.on('connect', function() {
      console.log('已连接:', socket.id);
    });
    socket.on('disconnect', function() {
      console.log('已断开:', socket.id);
    });
    socket.on(user.id, function(response: string) {
      const data: SocketResponseType = JSON.parse(response);
      console.log('该用户收到消息:', data);
      if (data.response.code === 200) {
        switch (data.actionType) {
          //被系统通知更新状态操作
          case SocketActionType.UpdateUserOnlineStatus: {
            dispatch({
              type: 'user/save',
              payload: {
                onlineState: data.response.data.status,
              },
            });
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
  return (
    <BasicLayoutBox>
      <SiderBar />
      <ChildrenBox>{children}</ChildrenBox>
      <GlobalStyle />
    </BasicLayoutBox>
  );
};
export default BasicLayout;
