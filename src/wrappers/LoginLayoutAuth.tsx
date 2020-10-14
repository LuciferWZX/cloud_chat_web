import React, { FC, Fragment } from 'react';
import { getStorage } from '@/utils/util';
import { Redirect } from 'umi';
const LoginLayoutAuth: FC = ({ children }) => {
  const token = getStorage('Authorization');
  if (token !== null) {
    return <Redirect to="/" />;
  }
  console.log('当前token', token);
  return <Fragment>{children}</Fragment>;
};
export default LoginLayoutAuth;
