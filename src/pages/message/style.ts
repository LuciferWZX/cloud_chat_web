import styled from 'styled-components';
import { Scrollbars } from 'react-custom-scrollbars';
const MessagePageBox = styled.div`
  height: 100%;
  overflow-y: hidden;
  display: flex;
`;
const ContactBox = styled.div`
  height: 100%;
  width: 300px;
  border-right: 1px solid #d1d8e0;
`;
const ContactSearchBarBox = styled.div`
  height: 70px;
  border-bottom: 1px solid #d1d8e0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ContactListBox = styled(Scrollbars)`
  background-color: rgba(236, 240, 241, 1);
  //height: calc(100% - 170px);
  .conversation-item {
    box-sizing: border-box;
    padding: 10px 10px 0 10px;
    will-change: transform, opacity;
    :last-child {
      margin-bottom: 10px;
    }
  }
  .contact-active {
    background-color: rgba(47, 53, 66, 1);
    .name {
      color: white;
    }
    .date,
    .content {
      color: rgba(241, 242, 246, 1);
    }
  }
`;
const ContactContainerBox = styled.div`
  flex: 1;
  .Message.right .Bubble {
    background: url('https://gw.alicdn.com/tfs/TB1HURhcBCw3KVjSZR0XXbcUpXa-750-364.png');
  }
`;
const AddFriendBox = styled.div`
  width: 300px;
  .user-input {
  }
  .user-result-box {
    margin-top: 10px;
    .find-user {
      height: 60px;
      display: flex;
      .user-avatar {
        width: 70px;
      }
      .user-info-action {
        display: flex;
        flex: 1;
        flex-direction: column;
        justify-content: space-around;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-weight: bold;
        .user-nickname {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .user-email {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 12px;
          color: #747d8c;
        }
      }
      .user-action {
        width: 80px;
        padding-left: 10px;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        .add-action {
          color: rgba(30, 144, 255, 1);
        }
        .check-info-action {
          color: rgba(30, 144, 255, 1);
        }
      }
    }
    .no-user {
      text-align: center;
      height: 100px;
      img {
        height: 80px;
        width: 100%;
      }
      label {
        font-size: 12px;
        color: rgba(164, 176, 190, 1);
      }
    }
  }
`;
export {
  MessagePageBox,
  ContactBox,
  ContactSearchBarBox,
  ContactListBox,
  ContactContainerBox,
  AddFriendBox,
};
