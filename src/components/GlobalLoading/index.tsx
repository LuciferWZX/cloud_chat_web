import React, { FC } from 'react';
import { GlobalLoadingBox } from '@/components/GlobalLoading/style.ts';
import { useMount, useSetState } from 'ahooks';
interface IProps {
  style?: Object;
}
const GlobalLoading: FC<IProps> = ({ style }) => {
  return (
    <GlobalLoadingBox style={style}>
      <div className={'container'}>
        <h2>正在加载用户数据</h2>
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
    </GlobalLoadingBox>
  );
};
export default GlobalLoading;
