import React, { FC } from 'react';
import { Button } from '@chatui/core';
import { history } from 'umi';
import { useSelector } from '@@/plugin-dva/exports';
import { ConnectState } from '@/models/connect';
const Login:FC=()=>{
  const user = useSelector((state:ConnectState)=>state.user.user);
  console.log(22,user);
  return(
    <div>
      <Button onClick={()=>{
        history.replace('/userAction/register');
      }} >go</Button>
      login
    </div>
  )
}
export default Login
