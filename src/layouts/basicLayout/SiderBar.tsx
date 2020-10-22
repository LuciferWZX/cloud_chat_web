import React, { FC, useState } from 'react';
import {
  SiderBarBox,
  SiderItem,
  SiderMenuBox,
} from '@/layouts/basicLayout/style';
import { Avatar, Badge, Divider, Dropdown, Menu } from 'antd';
import { useDispatch, useSelector } from '@@/plugin-dva/exports';
import { ConnectState } from '@/models/connect';
import { useRequest, useWhyDidYouUpdate } from 'ahooks';
import { history, useLocation, matchPath } from 'umi';
import classnames from 'classnames';
import { LogoutOutlined, SettingFilled } from '@ant-design/icons';
import { userStateColor, userStateText } from '@/utils/constans';
const { SubMenu } = Menu;
const SiderBar: FC = () => {
  const dispatch = useDispatch();
  //登出的请求
  const logoutRequest = useRequest(logout, {
    manual: true,
    loadingDelay: 1200,
  });
  const nickname = useSelector(
    (state: ConnectState) => state.user.user?.nickname,
  );
  const username = useSelector(
    (state: ConnectState) => state.user.user?.username,
  );
  const avatar = useSelector((state: ConnectState) => state.user.user?.avatar);
  //用户在线状态
  const onlineState = useSelector(
    (state: ConnectState) => state.user.onlineState,
  );
  const renderFirstChart = () => {
    return nickname != null ? nickname[0] : '';
  };
  const changeMenu = (path: string) => {
    history.push(path);
  };
  function logout() {
    return dispatch({
      type: 'user/logout',
    });
  }
  const renderMenu = () => {
    const location = useLocation();

    const MENU = [
      { path: '/message', name: '消息', icon: 'MessageOutlined', badge: 10 },
      { path: '/file', name: '文件', icon: 'FolderOutlined', badge: 0 },
    ];
    return MENU.map(item => {
      const active = !!matchPath(location.pathname, {
        path: item.path,
        exact: item.path === '/',
      });
      const Icon = require('@ant-design/icons')[item.icon];
      return (
        <Badge key={item.path} count={item.badge}>
          <SiderItem
            onClick={() => changeMenu(item.path)}
            className={classnames({
              'sider-item': true,
              active: active,
            })}
          >
            <Icon className={'menu-icon'} />
            <span className="text">{item.name}</span>
          </SiderItem>
        </Badge>
      );
    });
  };
  const clickAvatarMenu = (e: any) => {
    switch (e.key) {
      case 'logout': {
        setTimeout(() => {
          logoutRequest.run();
        }, 300);
        break;
      }
    }
  };
  const menu = (
    <Menu onClick={clickAvatarMenu}>
      <SubMenu
        title={
          <Badge
            color={userStateColor[onlineState]}
            status="processing"
            text={
              <span style={{ color: userStateColor[onlineState] }}>
                {userStateText[onlineState]}
              </span>
            }
          />
        }
      >
        <Menu.Item key={'hide'} style={{ width: 100 }}>
          隐身
        </Menu.Item>
        <Menu.Item key={'offline'} style={{ width: 100 }}>
          离线
        </Menu.Item>
      </SubMenu>

      <Menu.Item key={'setting'} icon={<SettingFilled />}>
        用户设置
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item
        key={'logout'}
        onClick={() => logoutRequest.run}
        disabled={logoutRequest.loading}
        icon={<LogoutOutlined />}
        danger
      >
        退出登录
      </Menu.Item>
    </Menu>
  );

  return (
    <SiderBarBox>
      <div className={'left-top-avatar'} id={'avatar-area'}>
        <Dropdown
          getPopupContainer={() =>
            document.getElementById('avatar-area') as any
          }
          placement="bottomLeft"
          //trigger={['click']}
          overlay={menu}
        >
          <Badge color={userStateColor[onlineState]} offset={[0, 0]} dot={true}>
            <Avatar
              className={'avatar-box'}
              src={avatar === null ? undefined : avatar}
              style={{ backgroundColor: '#f56a00' }}
              size={50}
              shape={'square'}
            >
              <span className={'first-char'}>{renderFirstChart()}</span>
            </Avatar>
          </Badge>
        </Dropdown>
      </div>
      <Divider className={'divider'} type={'horizontal'} />
      <SiderMenuBox>{renderMenu()}</SiderMenuBox>
    </SiderBarBox>
  );
};
export default SiderBar;
