import React, { FC } from 'react';
import { ContactItem } from '@/components';
import { ContactListBox } from '@/pages/message/style';
import { useSelector } from '@@/plugin-dva/exports';
import { ConnectState } from '@/models/connect';
import { animated } from 'react-spring';
import useAnimatedList from '@/hooks/useAnimatedList';

const ContactList: FC = () => {
  const conversations = useSelector(
    (state: ConnectState) => state.message.conversations,
  );
  //数组动画
  const transitions = useAnimatedList(conversations.length);

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
            nickname={item.nickname}
            date={item.createDate}
            unRead={item.unRead}
            content={item.content}
            type={item.type}
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
