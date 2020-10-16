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
    :last-child {
      margin-bottom: 10px;
    }
  }
`;
export { MessagePageBox, ContactBox, ContactSearchBarBox, ContactListBox };
