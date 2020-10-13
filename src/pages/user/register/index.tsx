import React, { FC } from 'react';
//import { useSelector } from '@@/plugin-dva/exports';
//import { ConnectState } from '@/models/connect';
import { RegisterBox } from '@/pages/user/register/style';
import { Tabs } from 'antd';
import { MailOutlined, PhoneOutlined } from '@ant-design/icons';
import EmailRegister from '@/pages/user/register/EmailRegister';

const { TabPane } = Tabs;
const Register: FC = () => {
  // const user = useSelector((state:ConnectState)=>state.user.user);
  // console.log(user);
  console.log(112);
  return (
    <RegisterBox>
      <Tabs defaultActiveKey="email">
        <TabPane
          tab={
            <span>
              <MailOutlined />
              邮箱注册
            </span>
          }
          key="email"
        >
          <EmailRegister />
        </TabPane>
        <TabPane
          tab={
            <span>
              <PhoneOutlined />
              手机注册
            </span>
          }
          key="phone"
        >
          www
        </TabPane>
      </Tabs>
    </RegisterBox>
  );
};
export default Register;
