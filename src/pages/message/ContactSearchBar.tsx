import React, { ChangeEvent, FC } from 'react';
import { ContactSearchBarBox } from '@/pages/message/style';
import { Button, Form, Input, Popover } from 'antd';
import { useDispatch, useSelector } from '@@/plugin-dva/exports';
import { ConnectState } from '@/models/connect';
import { PlusOutlined } from '@ant-design/icons';
import { useBoolean } from 'ahooks';
import AddFriendContainer from '@/pages/message/AddFriendContainer';
const ContactSearchBar: FC = () => {
  const [form] = Form.useForm();
  //Popover的visible
  const [popoverVisible, { toggle }] = useBoolean(false);
  const dispatch = useDispatch();
  const searchFriendsValue = useSelector(
    (state: ConnectState) => state.message.searchFriendsValue,
  );
  //保存搜索的值
  const changeSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'message/save',
      payload: {
        searchFriendsValue: e.target.value,
      },
    });
  };
  const onBlur = () => {
    form.resetFields();
  };
  //当点击的时候显示
  const onFocus = () => {
    form.setFieldsValue({
      searchValue: searchFriendsValue,
    });
  };
  //改变visible
  const changePopoverVisible = () => {
    toggle();
  };
  return (
    <ContactSearchBarBox>
      <Form
        form={form}
        initialValues={{
          searchValue: '',
        }}
      >
        <Form.Item noStyle={true}>
          <Form.Item noStyle={true} name={'searchValue'}>
            <Input
              style={{ width: 230 }}
              onFocus={onFocus}
              onBlur={onBlur}
              placeholder={'搜索'}
              onChange={changeSearchValue}
            />
          </Form.Item>
          <Popover
            content={
              <AddFriendContainer
                closeVisible={() => toggle()}
                visible={popoverVisible}
              />
            }
            title="添加好友"
            trigger="click"
            visible={popoverVisible}
            onVisibleChange={changePopoverVisible}
          >
            <Button
              style={{ marginLeft: 10 }}
              type={'primary'}
              shape={'circle'}
              icon={<PlusOutlined />}
            />
          </Popover>
        </Form.Item>
      </Form>
    </ContactSearchBarBox>
  );
};
export default ContactSearchBar;
