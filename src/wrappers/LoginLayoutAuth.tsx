import React, { FC, Fragment } from 'react';
import { getStorage } from '@/utils/util';
import { Redirect } from 'umi';
import { useMount } from 'ahooks';
import { useDispatch } from '@@/plugin-dva/exports';
const LoginLayoutAuth: FC = ({ children }) => {
  const token = getStorage('Authorization');
  const dispatch = useDispatch();
  useMount(() => {
    if (token === null) {
      dispatch({
        type: 'user/save',
        payload: {
          user: null,
        },
      });
    }
  });
  if (token !== null) {
    return <Redirect to="/" />;
  }
  console.log('当前token', token);
  return <Fragment>{children}</Fragment>;
};
export default LoginLayoutAuth;
