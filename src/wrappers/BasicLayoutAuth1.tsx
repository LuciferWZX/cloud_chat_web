import React, { FC, Fragment } from 'react';
import { useBoolean, useMount, useRequest } from 'ahooks';
import { useTransition } from 'react-spring';
import { useDispatch, useSelector } from '@@/plugin-dva/exports';
import { ConnectState } from '@/models/connect';
import { GlobalLoading } from '@/components';
import { BasicLayoutBox } from '@/wrappers/style';
import { useModel } from '@@/plugin-model/useModel';
const BasicLayoutAuth1: FC = ({ children }) => {
  const { initialState, loading, error, refresh, setInitialState } = useModel(
    '@@initialState',
  );
  console.log({ initialState });
  console.log(loading);
  return <BasicLayoutBox>{222}</BasicLayoutBox>;
};
export default BasicLayoutAuth1;
