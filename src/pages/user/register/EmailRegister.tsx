import React, { FC } from 'react';
import { RegisterBox } from '@/pages/user/register/style';
import { Button, Checkbox, Col, Form, Input, Row, Tooltip, Radio } from 'antd';
import {
  ManOutlined,
  QuestionCircleOutlined,
  WomanOutlined,
} from '@ant-design/icons';
import { history } from 'umi';
import { useInterval, useRequest, useSetState } from 'ahooks';
import { useDispatch } from '@@/plugin-dva/exports';
import { validateEmail } from '@/utils/util';
interface RegisterFormProps {
  email: string;
  password: string;
  confirm: string;
  nickname: string;
  verify: string;
  sex: number;
  agreement: boolean;
}
interface IState {
  count: number;
  interval: number | null;
}
const EmailRegister: FC = () => {
  const [emailForm] = Form.useForm();
  const dispatch = useDispatch();
  //发送验证码的请求
  const sendVerifyRequest = useRequest(sendVerifyToEmail, {
    manual: true,
  });
  //注册的请求
  const registerRequest = useRequest(register, {
    manual: true,
  });

  const [{ count, interval }, setState] = useSetState<IState>({
    count: 10,
    interval: null,
  });
  //定时器
  useInterval(
    () => {
      if (count === 0) {
        setState({
          interval: null,
          count: 10,
        });
      } else {
        setState({
          count: count - 1,
        });
      }
    },
    interval,
    {
      immediate: false,
    },
  );
  //注册按钮
  const onFinish = async (values: RegisterFormProps) => {
    await registerRequest.run(values);
  };
  async function sendVerifyToEmail(email: string) {
    return dispatch({
      type: 'user/sendVerifyToEmail',
      payload: {
        email,
      },
    });
  }
  async function register(params: RegisterFormProps) {
    return dispatch({
      type: 'user/registerUserByEmail',
      payload: {
        ...params,
      },
    });
  }
  //去登录
  const goLogin = () => {
    history.push('/userAction/login');
  };
  //发送验证码
  const sendVerify = async () => {
    const email = emailForm.getFieldValue('email');
    const result = (await sendVerifyRequest.run(email)) as any;
    if (result === 'success') {
      //成功才开始定时
      setState({
        interval: 1000,
      });
    }
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };
  return (
    <RegisterBox>
      <Form
        {...formItemLayout}
        form={emailForm}
        name="register"
        onFinish={onFinish}
        initialValues={{
          email: '',
          password: '',
          confirm: '',
          nickname: '',
          verify: '',
          sex: 1,
          agreement: false,
        }}
        hideRequiredMark={true}
        scrollToFirstError
      >
        <Form.Item
          name="email"
          label="邮箱"
          rules={[
            {
              type: 'email',
              message: '邮箱格式不正确!',
            },
            {
              required: true,
              message: '请输入邮箱!',
            },
          ]}
        >
          <Input placeholder={'请输入邮箱'} />
        </Form.Item>
        <Form.Item
          name="username"
          label="用户名"
          rules={[
            { whitespace: true, message: '请输入用户名' },
            {
              required: true,
              message: '请输入邮箱!',
            },
          ]}
        >
          <Input placeholder={'请输入用户名'} />
        </Form.Item>
        <Form.Item
          name="password"
          label="密码"
          rules={[
            {
              required: true,
              message: '请输入密码!',
            },
            {
              min: 6,
              message: '密码至少6位',
            },
          ]}
          hasFeedback
        >
          <Input.Password placeholder={'请输入密码'} />
        </Form.Item>
        <Form.Item
          name="confirm"
          label="确认密码"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: '请确认您的密码!',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('密码不一致!');
              },
            }),
          ]}
        >
          <Input.Password placeholder={'请确认密码'} />
        </Form.Item>

        <Form.Item
          name="nickname"
          label={
            <span>
              昵称&nbsp;
              <Tooltip title="您希望被其他人怎么称呼?">
                <QuestionCircleOutlined />
              </Tooltip>
            </span>
          }
          rules={[{ required: true, message: '请输入昵称!', whitespace: true }]}
        >
          <Input placeholder={'请输入昵称'} />
        </Form.Item>
        <Form.Item name="sex" label="性别">
          <Radio.Group>
            <Radio value={1}>
              <span style={{ color: '#1e90ff' }}>
                靓仔&nbsp;
                <WomanOutlined />
              </span>
            </Radio>
            <Radio value={0}>
              <span style={{ color: '#ff6b81' }}>
                靓妹&nbsp;
                <ManOutlined />
              </span>
            </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="验证码" extra="请从邮箱查收验证码">
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item
                name="verify"
                noStyle
                rules={[{ required: true, message: '请输入验证码!' }]}
              >
                <Input placeholder={'请输入验证码'} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                noStyle={true}
                shouldUpdate={(cur, pre) => cur.email !== pre.email}
              >
                {({ getFieldValue }) => {
                  const email = getFieldValue('email');
                  let disabled: boolean = true;
                  if (validateEmail(email)) {
                    disabled = false;
                  }
                  return (
                    <Button
                      loading={sendVerifyRequest.loading}
                      disabled={interval !== null || disabled}
                      onClick={sendVerify}
                    >
                      {interval === null ? '发送验证码' : `(${count})`}
                    </Button>
                  );
                }}
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value ? Promise.resolve() : Promise.reject('您还未接受协议'),
            },
          ]}
          {...tailFormItemLayout}
        >
          <Checkbox>
            我已经阅读了 <a href="">协议</a>
          </Checkbox>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button
            loading={registerRequest.loading}
            block={true}
            type="primary"
            htmlType="submit"
          >
            注册
          </Button>
          <div style={{ textAlign: 'center' }}>
            <Button type="link" onClick={goLogin} htmlType="submit">
              去登录
            </Button>
          </div>
        </Form.Item>
      </Form>
    </RegisterBox>
  );
};
export default EmailRegister;
