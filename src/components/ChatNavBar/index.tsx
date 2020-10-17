import React, { FC } from 'react';
import { Avatar, Badge, Button, Dropdown, Menu } from 'antd';
import { ChatNavBarBox } from './style';
import { userStateColor, userStateText, UserStateType } from '@/utils/constans';
import {
  EllipsisOutlined,
  PhoneFilled,
  VideoCameraFilled,
} from '@ant-design/icons';
interface IProps {
  status: UserStateType;
  avatar?: string | null;
  nickname: string;
}
const ChatNavBar: FC<IProps> = ({ status, avatar, nickname }) => {
  const dropDownItems = (
    <Menu>
      <Menu.Item key="0">修改备注</Menu.Item>
      <Menu.Item key="1" disabled={true}>
        拉黑好友
      </Menu.Item>
      <Menu.Item key="1" disabled={true}>
        关闭免打扰/开启免打扰
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3" danger={true} disabled={true}>
        删除好友
      </Menu.Item>
    </Menu>
  );
  const renderFirstChart = () => {
    return nickname != null ? nickname[0] : '';
  };
  return (
    <ChatNavBarBox status={status}>
      <div className={'left-content'}>
        <div className={'left-avatar'}>
          <Avatar
            src={avatar === null ? undefined : avatar}
            size={48}
            shape={'square'}
          >
            {renderFirstChart()}
          </Avatar>
        </div>
        <div className={'left-detail'}>
          <div className={'nickname'}>{nickname}</div>
          <div className={'user-status'}>
            <Badge dot={true} color={userStateColor[status]} />
            <label>{userStateText[status]}</label>
          </div>
        </div>
      </div>
      <div className={'right-actions'}>
        <Button type={'link'} icon={<PhoneFilled />} />
        <Button type={'link'} icon={<VideoCameraFilled />} />
        <Dropdown overlay={dropDownItems} trigger={['click']}>
          <Button type={'link'} icon={<EllipsisOutlined rotate={90} />} />
        </Dropdown>
      </div>
    </ChatNavBarBox>
  );
};
export default ChatNavBar;
