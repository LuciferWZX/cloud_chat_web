import React, { FC } from 'react';
import { EmailLoginBox } from '@/pages/user/login/style';
import { Avatar, Button, Checkbox, Form, Input } from 'antd';
import { history } from 'umi';

interface EmailFormProps {
  email: string;
  password: string;
  autoLogin: boolean;
}
const EmailForm: FC = () => {
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
  //邮箱登录
  const emailLogin = (values: EmailFormProps) => {
    console.log({ values });
  };
  //去注册
  const goRegister = () => {
    history.push('/userAction/register');
  };
  return (
    <EmailLoginBox>
      <Avatar
        size={110}
        src={
          'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1602599049552&di=c148c0d368328aa790125021364f75ae&imgtype=0&src=http%3A%2F%2Fpics5.baidu.com%2Ffeed%2Ffcfaaf51f3deb48ff88ff41cc3a3b12c2ff5784b.jpeg%3Ftoken%3D82fb75ecc02f293f8ac3191967fe89e9%26s%3D38209F1D144376ED860594E00300E021'
        }
        shape={'square'}
        className={'avatar-place'}
      />
      <Form
        {...layout}
        hideRequiredMark={true}
        onFinish={emailLogin}
        initialValues={{
          email: '',
          password: '',
          autoLogin: false,
        }}
      >
        <Form.Item
          name={'email'}
          rules={[
            { required: true, message: '请输入邮箱!' },
            { type: 'email', message: '请输入正确的邮箱!' },
            { validateTrigger: 'onBlur' },
          ]}
          label={'邮箱'}
        >
          <Input placeholder={'请输入邮箱'} allowClear={true} />
        </Form.Item>
        <Form.Item name={'password'} label={'密码'}>
          <Input.Password autoComplete={'true'} placeholder={'请输入密码'} />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Form.Item noStyle name="autoLogin" valuePropName="checked">
            <Checkbox>自动登录</Checkbox>
          </Form.Item>
          <Button type={'link'} style={{ marginLeft: 150 }}>
            忘记密码
          </Button>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button htmlType={'submit'} block={true} type={'primary'}>
            登录
          </Button>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <div style={{ textAlign: 'center' }}>
            还没有账号？
            <Button type={'link'} onClick={() => goRegister()}>
              去注册
            </Button>
          </div>
        </Form.Item>
      </Form>
    </EmailLoginBox>
  );
};
export default EmailForm;
