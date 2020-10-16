import React, { ChangeEvent, FC } from 'react';
import { ContactSearchBarBox } from '@/pages/message/style';
import { Button, Form, Input } from 'antd';
import { useDispatch, useSelector } from '@@/plugin-dva/exports';
import { ConnectState } from '@/models/connect';
import { PlusOutlined } from '@ant-design/icons';
const ContactSearchBar: FC = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const searchFriendsValue = useSelector(
    (state: ConnectState) => state.message.searchFriendsValue,
  );

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
  const onFocus = () => {
    form.setFieldsValue({
      searchValue: searchFriendsValue,
    });
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
          <Button
            style={{ marginLeft: 10 }}
            type={'primary'}
            shape={'circle'}
            icon={<PlusOutlined />}
          />
        </Form.Item>
      </Form>
    </ContactSearchBarBox>
  );
};
export default ContactSearchBar;
