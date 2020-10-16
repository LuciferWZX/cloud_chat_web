import React, { FC } from 'react';
import { NotFoundBox } from '@/pages/style';
import { history } from 'umi';
import { Button, Result } from 'antd';
const NotFound: FC = () => {
  const goBack = () => {
    history.goBack();
  };
  return (
    <NotFoundBox>
      <Result
        status="404"
        title="404"
        subTitle="抱歉，您访问的页面不存在"
        extra={
          <Button type="primary" onClick={goBack}>
            返回上一页
          </Button>
        }
      />
    </NotFoundBox>
  );
};
export default NotFound;
