import React, { FC } from 'react';
import { notification } from 'antd';
import { CloseCircleFilled } from '@ant-design/icons';
import { BasicLayoutBox, ChildrenBox } from '@/layouts/basicLayout/style';
import SiderBar from '@/layouts/basicLayout/SiderBar';

notification.config({
  closeIcon: <CloseCircleFilled style={{ fontSize: 16 }} />,
});
const BasicLayout: FC = ({ children }) => {
  return (
    <BasicLayoutBox>
      <SiderBar />
      <ChildrenBox>{children}</ChildrenBox>
    </BasicLayoutBox>
  );
};
export default BasicLayout;
