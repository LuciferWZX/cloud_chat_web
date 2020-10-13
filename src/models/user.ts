import { Reducer } from 'react';
import { Effect } from 'dva';

import fetchUser from '@/services/user';
import { ResponseDataType } from '@/utils/constans';
import { message } from 'antd';

export interface User {
  auth:number,
  avatar:null|string,
  createTime:string,
  email:string,
  id:string,
  lastLoginTime:string|null,
  nickname:string|null,
  phone:string|null,
  sex:number,
  updateTime:string,
  username:string
}
export interface UserModelState{
  user:null|User
}
export interface UserModelType{
  namespace:"user",
  state:UserModelState,
  effects:{
    fetchUserInfo:Effect
  },
  reducers:{
    save: Reducer<UserModelState, any>;
  }
}
const UserModel:UserModelType={
  namespace: 'user',
  state: {
    user:null
  },
  effects: {
    *fetchUserInfo(_,{call,put}){
      const result:ResponseDataType = yield call(fetchUser);
      if(result.code === 200){
        yield put({
          type:'save',
          payload:{
            user:result.data
          }
        })
      }else{
        message.error(result.message);

      }
    }
  },
  reducers: {
    save(state,{payload}){
      return {...state,...payload}
    }
  },
}
export default UserModel;
