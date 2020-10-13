import React, { FC } from 'react';
import { useSelector } from '@@/plugin-dva/exports';
import { ConnectState } from '@/models/connect';
const Register:FC=()=>{
  const user = useSelector((state:ConnectState)=>state.user.user);
  console.log(user);
  return(
    <div>
      Register
    </div>
  )
}
export default Register
