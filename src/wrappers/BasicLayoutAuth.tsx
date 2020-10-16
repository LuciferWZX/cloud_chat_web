import React, { FC, Fragment } from 'react';
import { useBoolean, useMount, useRequest } from 'ahooks';
import { useTransition } from 'react-spring';
import { useDispatch, useSelector } from '@@/plugin-dva/exports';
import { ConnectState } from '@/models/connect';
import { GlobalLoading } from '@/components';
import { BasicLayoutBox } from '@/wrappers/style';
const BasicLayoutAuth: FC = ({ children }) => {
  const [isFirstFetch, { setFalse }] = useBoolean(true);
  const userRequest = useRequest(fetchUser, {
    manual: true,
  });

  const transitions = useTransition(userRequest.loading || isFirstFetch, null, {
    from: { opacity: 1 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: {
      duration: 200,
    },
  });
  const dispatch = useDispatch();
  const user = useSelector((state: ConnectState) => state.user.user);
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
    <Fragment>
      {transitions.map(({ item, key, props }) =>
        item ? (
          <GlobalLoading style={props} key={key}>
            正在加载数据...
          </GlobalLoading>
        ) : null,
      )}
      <BasicLayoutBox>
        {!userRequest.loading && !user ? <div>出错请刷新</div> : children}
      </BasicLayoutBox>
    </Fragment>
  );
};
export default BasicLayoutAuth;
