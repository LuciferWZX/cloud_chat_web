import { Reducer } from 'react';
import { Effect } from 'dva';
import { history } from 'umi';
import {
  fetchUser,
  registerUserByEmail,
  sendVerifyToEmail,
} from '@/services/user';
import { ResponseDataType } from '@/utils/constans';
import { message } from 'antd';
export interface User {
  auth: number;
  avatar: null | string;
  createTime: string;
  email: string;
  id: string;
  lastLoginTime: string | null;
  nickname: string | null;
  phone: string | null;
  sex: number;
  updateTime: string;
  username: string;
}
export interface UserModelState {
  user: null | User;
}
export interface UserModelType {
  namespace: 'user';
  state: UserModelState;
  effects: {
    fetchUserInfo: Effect;
    registerUserByEmail: Effect;
    sendVerifyToEmail: Effect;
  };
  reducers: {
    save: Reducer<UserModelState, any>;
  };
}
const UserModel: UserModelType = {
  namespace: 'user',
  state: {
    user: null,
  },
  effects: {
    /**
     * 查询用户的信息
     * @param _
     * @param call
     * @param put
     */
    *fetchUserInfo(_, { call, put }) {
      const result: ResponseDataType = yield call(fetchUser);
      if (result.code === 200) {
        yield put({
          type: 'save',
          payload: {
            user: result.data,
          },
        });
      } else {
        //跳转到登录页面
        history.replace('/userAction/login');
      }
    },
    /**
     * 使用邮箱注册用户
     * @param payload
     * @param call
     * @param put
     */
    *registerUserByEmail({ payload }, { call, put }) {
      const result: ResponseDataType = yield call(registerUserByEmail, payload);
      if (result.code === 200) {
        message.success(result.message);
        history.replace('/userAction/login');
      } else {
        message.error(result.message);
      }
    },
    /**
     * 发送验证码到邮箱
     * @param payload
     * @param call
     */
    *sendVerifyToEmail({ payload }, { call }) {
      const result: ResponseDataType = yield call(sendVerifyToEmail, payload);
      if (result.code === 200) {
        message.success(result.message);
        return 'success';
      } else {
        message.error(result.message);
        return 'failed';
      }
    },
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
export default UserModel;
