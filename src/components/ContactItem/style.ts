import styled from 'styled-components';

const ContactItemBox = styled.div`
  height: 74px;
  background-color: white;
  border-radius: 5px;
  will-change: transition;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  //transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  transition: all 0.6s;
  cursor: pointer;
  box-sizing: border-box;
  :hover {
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.25), 0 5px 5px rgba(0, 0, 0, 0.22);
  }
  display: flex;
  align-items: center;
  padding: 12px;
  .avatar {
    width: 60px;
  }
  .detail {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    .nick-name {
      display: flex;
      .name {
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 14px;
        font-weight: bold;
      }
      .date {
        max-width: 70px;
        color: rgba(164, 176, 190, 1);
        font-size: 12px;
        text-align: right;
      }
    }
    .content {
      font-size: 14px;
      font-weight: 600;
      color: rgba(116, 125, 140, 1);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
`;
export { ContactItemBox };
