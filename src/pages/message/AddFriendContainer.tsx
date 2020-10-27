import React, { FC, useState } from 'react';
import { AddFriendBox } from '@/pages/message/style';
import { Avatar, Button, Input, Popconfirm } from 'antd';
import { useRequest, useThrottle, useUpdateEffect } from 'ahooks';
import { useDispatch } from '@@/plugin-dva/exports';
import { Friend } from '@/models/user';
import { InviteStatusType } from '@/utils/constans';

interface IProps {
  visible: boolean;
  closeVisible: Function;
}

const AddFriendContainer: FC<IProps> = ({ visible, closeVisible }) => {
  const { run, data } = useRequest(searchOneUser, {
    manual: true,
    formatResult: (response: Friend) => response,
  });
  const sendInviteRequest = useRequest(sendInvite, {
    manual: true,
  });

  const [value, setValue] = useState('');
  const [desc, setDesc] = useState('');
  const dispatch = useDispatch();
  const debouncedValue = useThrottle(value, { wait: 500 });
  //依赖变更执行
  useUpdateEffect(() => {
    run(debouncedValue);
  }, [debouncedValue]);
  useUpdateEffect(() => {
    if (visible) {
      setValue('');
    }
  }, [visible]);
  //输入的时候搜索好友
  const searchUser = (e: any) => {
    setValue(e.target.value);
  };

  /**
   * 发送好友请求
   */
  async function sendInvite() {
    return dispatch({
      type: 'message/sendInviteMessage',
      payload: {
        desc: desc,
        fid: data?.id,
      },
    });
  }
  /**
   * 查询用户
   * @param value
   */
  async function searchOneUser(value: string) {
    return dispatch({
      type: 'user/searchUser',
      payload: {
        searchValue: value,
      },
    });
  }
  //点击发送好友的按钮
  const confirm = async () => {
    const result = await sendInviteRequest.run();
    if (result) {
      closeVisible();
    }
  };
  //改变备注的显示
  const changeDescVisible = (visible: true) => {
    if (visible) {
      setDesc('');
    }
  };
  const renderText = () => {
    if (data) {
      switch (data.inviteStatus) {
        case InviteStatusType.NoMessageSend:
          return '添加好友';
        case InviteStatusType.NotCheck:
          return '待对方处理';
        case InviteStatusType.Accepted:
          return '以添加';
      }
    }
    return '添加好友';
  };
  return (
    <AddFriendBox>
      <Input
        value={value}
        onChange={searchUser}
        placeholder={'请输入昵称/邮箱'}
        className={'user-input'}
      />
      <div className={'user-result-box'}>
        {debouncedValue === '' ? (
          <div>请搜索</div>
        ) : data ? (
          <div className={'find-user'}>
            <div className={'user-avatar'}>
              <Avatar
                size={60}
                src={data?.avatar || undefined}
                shape={'square'}
              />
            </div>
            <div className={'user-info-action'}>
              <div className={'user-nickname'}>{data.nickname}</div>
              <div className={'user-email'}>{data.email}</div>
            </div>
            <div className={'user-action'}>
              <div className={'add-action'}>
                <Popconfirm
                  title={
                    <div>
                      备注:
                      <Input.TextArea
                        value={desc}
                        onChange={e => setDesc(e.target.value)}
                        maxLength={50}
                        placeholder={'备注'}
                      />
                    </div>
                  }
                  onConfirm={confirm}
                  placement={'right'}
                  onVisibleChange={changeDescVisible as any}
                  disabled={
                    (data &&
                      (data.inviteStatus === InviteStatusType.Accepted ||
                        data.inviteStatus === InviteStatusType.NotCheck)) ||
                    false
                  }
                  okText="发送好友申请"
                  cancelText="取消"
                >
                  <Button
                    disabled={
                      (data &&
                        (data.inviteStatus === InviteStatusType.Accepted ||
                          data.inviteStatus === InviteStatusType.NotCheck)) ||
                      false
                    }
                    loading={sendInviteRequest.loading}
                    size={'small'}
                    type={'primary'}
                  >
                    {renderText()}
                  </Button>
                </Popconfirm>
              </div>
              <div className={'check-info-action'}>
                <Button size={'small'} type={'link'}>
                  查看信息
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className={'no-user'}>
            <img src={require('@/assets/svg/empty.svg')} alt={'empty'} />
            <label>无该用户</label>
          </div>
        )}
      </div>
    </AddFriendBox>
  );
};
export default AddFriendContainer;
