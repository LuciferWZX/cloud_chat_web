import React, { FC,Fragment } from 'react';
import { useMount, useRequest } from 'ahooks';
import { useDispatch, useSelector } from '@@/plugin-dva/exports';
import { ConnectState } from '@/models/connect';
const BasicLayoutAuth:FC=({children})=>{
  const dispatch = useDispatch();
  const userRequest=useRequest(fetchUser,{
    manual:true
  })
  const user = useSelector((state:ConnectState)=>state.user.user);

  console.log({user});
  useMount(async ()=>{
    await userRequest.run();
  })
  async function fetchUser(){
    await dispatch({
      type:'user/fetchUserInfo'
    })
  }
  return (
    <Fragment>
      {children}
    </Fragment>
  )
}
export default BasicLayoutAuth
