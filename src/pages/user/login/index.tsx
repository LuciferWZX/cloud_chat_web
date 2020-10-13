import React, { FC } from 'react';
import { useSelector } from '@@/plugin-dva/exports';
import { ConnectState } from '@/models/connect';
import { useWhyDidYouUpdate } from 'ahooks';
import { Tabs } from 'antd';
import { LoginBox } from '@/pages/user/login/style';
import { MailOutlined, PhoneOutlined } from '@ant-design/icons';
import EmailForm from '@/pages/user/login/EmailForm';
import PhoneForm from '@/pages/user/login/PhoneForm';

const { TabPane } = Tabs;
interface IProps {}
const Login: FC<IProps> = props => {
  const user = useSelector((state: ConnectState) => state.user.user);
  console.log(22, user);
  useWhyDidYouUpdate('为什么更新Login页面', { user, ...props });
  return (
    <LoginBox>
      <Tabs defaultActiveKey="email">
        <TabPane
          tab={
            <span>
              <MailOutlined />
              邮箱登录
            </span>
          }
          key="email"
        >
          <EmailForm />
        </TabPane>
        <TabPane
          tab={
            <span>
              <PhoneOutlined />
              手机登录
            </span>
          }
          key="phone"
        >
          <PhoneForm />
        </TabPane>
      </Tabs>
    </LoginBox>
  );
};
export default Login;
