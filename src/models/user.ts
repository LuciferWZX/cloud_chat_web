import { Reducer } from 'react';
import { Effect } from 'dva';
import { history } from 'umi';
import {
  emailLogin,
  fetchUser,
  registerUserByEmail,
  sendVerifyToEmail,
} from '@/services/user';
import { ResponseDataType, StorageType, UserStateType } from '@/utils/constans';
import { message } from 'antd';
import { clearStorage, setStorage } from '@/utils/util';

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
  token: string;
}
export interface UserModelState {
  user: null | User;
  onlineState: UserStateType;
}
export interface UserModelType {
  namespace: 'user';
  state: UserModelState;
  effects: {
    fetchUserInfo: Effect;
    registerUserByEmail: Effect;
    sendVerifyToEmail: Effect;
    emailLogin: Effect;
  };
  reducers: {
    save: Reducer<UserModelState, any>;
  };
}
const UserModel: UserModelType = {
  namespace: 'user',
  state: {
    user: null,
    onlineState: 0,
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
        const user: User = result.data;
        //存储用户信息
        yield put({
          type: 'save',
          payload: {
            user: user,
          },
        });
        //跳转到主页
        //history.replace('/');
      }
      if (result.code === 100) {
        //清空用户信息
        yield put({
          type: 'save',
          payload: {
            user: null,
          },
        });
        //清空消息数据
        yield put({
          type: 'message/save',
          payload: {
            socket: null,
          },
        });
        //清除token
        clearStorage('Authorization');
        //跳转到登录页面
        history.replace('/userAction/login');
      }
      if (result.code == 303) {
        message.error(result.message);
        //清空用户信息
        yield put({
          type: 'save',
          payload: {
            user: null,
          },
        });
        //清除token
        clearStorage('Authorization');
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
    /**
     * 邮箱登录
     * @param payload
     * @param call
     */
    *emailLogin({ payload }, { call }) {
      const result: ResponseDataType = yield call(emailLogin, payload);
      if (result.code === 200) {
        message.success(result.message);
        const user: User = result.data;
        //存入storage里面
        setStorage(
          'Authorization',
          user.token,
          payload.autoLogin
            ? StorageType.localStorage
            : StorageType.sessionStorage,
        );
        //跳转主页
        history.replace('/');
      }
      if (result.code === 202) {
        message.error(result.message);
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
