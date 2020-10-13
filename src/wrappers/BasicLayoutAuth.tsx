import React, { FC } from 'react';
import { useBoolean, useMount, useRequest, useSetState } from 'ahooks';
import { useSpring, animated } from 'react-spring';
import { useDispatch, useSelector } from '@@/plugin-dva/exports';
import { ConnectState } from '@/models/connect';
import { GlobalLoading } from '@/components';
import { BasicLayoutBox } from '@/wrappers/style';
const BasicLayoutAuth: FC = ({ children }) => {
  const [isFirstFetch, { setFalse }] = useBoolean(true);
  const userRequest = useRequest(fetchUser, {
    manual: true,
  });
  const props = useSpring({
    config: {
      duration: 120,
    },
    opacity: userRequest.loading || isFirstFetch ? 1 : 0,
  });
  const dispatch = useDispatch();

  const user = useSelector((state: ConnectState) => state.user.user);

  console.log({ 123: userRequest.loading });
  useMount(async () => {
    await userRequest.run();
    setFalse();
  });
  async function fetchUser() {
    await dispatch({
      type: 'user/fetchUserInfo',
    });
  }
  return (
    <BasicLayoutBox>
      <GlobalLoading style={props}>正在加载数据...</GlobalLoading>
      {!userRequest.loading && !user ? <div>出错请刷新</div> : children}
    </BasicLayoutBox>
  );
};
export default BasicLayoutAuth;
