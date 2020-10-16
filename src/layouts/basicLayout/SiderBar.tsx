import React, { FC, useState } from 'react';
import { SiderBarBox, SiderMenuBox } from '@/layouts/basicLayout/style';
import { Avatar, Badge, Divider, Dropdown, Menu } from 'antd';
import { useSelector } from '@@/plugin-dva/exports';
import { ConnectState } from '@/models/connect';
import { useWhyDidYouUpdate } from 'ahooks';
import { history, useLocation, matchPath } from 'umi';
import classnames from 'classnames';
import { LogoutOutlined, SettingFilled } from '@ant-design/icons';
const { SubMenu } = Menu;
const SiderBar: FC = () => {
  const [activeKey, setActiveKey] = useState('/message');
  const nickname = useSelector(
    (state: ConnectState) => state.user.user?.nickname,
  );
  const username = useSelector(
    (state: ConnectState) => state.user.user?.username,
  );
  const avatar = useSelector((state: ConnectState) => state.user.user?.avatar);
  useWhyDidYouUpdate('左侧用户头像组件', { username, nickname, avatar });
  const renderFirstChart = () => {
    return nickname != null ? nickname[0] : '';
  };
  const changeMenu = (path: string) => {
    setActiveKey(path);
    history.push(path);
  };

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
        <Badge key={item.path} count={item.badge} offset={[0, 20]}>
          <a
            onClick={() => changeMenu(item.path)}
            className={classnames({
              active: active,
            })}
          >
            <div className="layer">
              <span />
              <span />
              <span />
              <span />

              <Icon className={'fab'} />
            </div>
            <span className="text">{item.name}</span>
          </a>
        </Badge>
      );
    });
  };
  const menu = (
    <Menu>
      <SubMenu
        title={
          <Badge
            color={'green'}
            status="processing"
            text={<span style={{ color: 'green' }}>在线</span>}
          />
        }
      >
        <Menu.Item style={{ width: 100 }}>隐身</Menu.Item>
        <Menu.Item style={{ width: 100 }}>离线</Menu.Item>
      </SubMenu>
      <Menu.Item></Menu.Item>
      <Menu.Item icon={<SettingFilled />}>用户设置</Menu.Item>
      <Menu.Divider />
      <Menu.Item icon={<LogoutOutlined />} danger>
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
          <Badge color={'green'} offset={[0, 0]} dot={true}>
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
