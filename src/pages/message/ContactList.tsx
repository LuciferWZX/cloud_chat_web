import React, { FC } from 'react';
import { ContactItem } from '@/components';
import { ContactListBox } from '@/pages/message/style';
import { useSelector } from '@@/plugin-dva/exports';
import { ConnectState } from '@/models/connect';
import { useTransition } from 'react-spring';
import { animated } from 'react-spring';

const ContactList: FC = () => {
  const conversations = useSelector(
    (state: ConnectState) => state.message.conversations,
  );
  //数组动画
  const transitions = useTransition(conversations, item => item.friendId, {
    from: { transform: 'translate3d(0,-40px,0)' },
    enter: { transform: 'translate3d(0,0px,0)' },
    leave: { transform: 'translate3d(0,-40px,0)' },
  });

  const renderConversations = () => {
    return transitions.map(({ item, key, props }) => {
      return (
        <animated.div style={props} className={'conversation-item'} key={key}>
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
