import React, { FC } from 'react';
import { notification } from 'antd';
import { CloseCircleFilled } from '@ant-design/icons';

notification.config({
  closeIcon: <CloseCircleFilled style={{ fontSize: 16 }} />,
});
const BasicLayout: FC = ({ children }) => {
  return (
    <div>
      基础布局
      {children}
    </div>
  );
};
export default BasicLayout;
