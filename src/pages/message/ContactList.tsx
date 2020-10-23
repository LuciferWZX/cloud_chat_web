import React, { FC, memo } from 'react';
import { ContactItem } from '@/components';
import { ContactListBox } from '@/pages/message/style';
import { useDispatch, useSelector } from '@@/plugin-dva/exports';
import { ConnectState } from '@/models/connect';
import { animated } from 'react-spring';
import useAnimatedList from '@/hooks/useAnimatedList';
import classnames from 'classnames';
const ContactList: FC = () => {
  //交流列表
  const conversations = useSelector(
    (state: ConnectState) => state.message.conversations,
  );
  //当前聊天的好友id
  const currentFriendId = useSelector(
    (state: ConnectState) => state.message.currentFriendId,
  );
  const dispatch = useDispatch();
  //数组动画
  const transitions = useAnimatedList(conversations.length);

  //点击切换当前聊天的好友
  const changeCurrentFriend = (id: string) => {
    dispatch({
      type: 'message/save',
      payload: {
        currentFriendId: id,
      },
    });
  };

  const renderConversations = () => {
    return conversations.map((item, index) => {
      return (
        <animated.div
          style={transitions[index]}
          className={'conversation-item'}
          key={item.friendId}
        >
          <ContactItem
            avatar={item.avatar}
            onClick={() => changeCurrentFriend(item.friendId)}
            nickname={item.nickname}
            date={item.createDate}
            unRead={item.unRead}
            content={item.content}
            type={item.type}
            className={classnames({
              'contact-active': currentFriendId === item.friendId,
            })}
          />
        </animated.div>
      );
    });
  };
  return (
    <ContactListBox
      onScrollStart={() => {
        console.log(11);
      }}
      onScrollStop={() => {
        console.log(22);
      }}
      style={{
        height: 'calc(100% - 70px)',
      }}
    >
      {renderConversations()}
    </ContactListBox>
  );
};

export default ContactList;
