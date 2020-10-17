import styled from 'styled-components';
import { userStateColor, UserStateType } from '@/utils/constans';
interface NavBarProps {
  status: UserStateType;
}
const ChatNavBarBox = styled.div<NavBarProps>`
  z-index: 1;
  height: 69px;
  box-shadow: 0 6px 6px 0 rgba(0, 0, 0, 0.03), 0 4px 2px 0 rgba(0, 0, 0, 0.04);
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  .left-content {
    display: flex;
    .left-avatar {
      width: 60px;
    }
    .left-detail {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .nickname {
        font-size: 16px;
        font-weight: bold;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .user-status {
        font-size: 14px;
        color: ${props => userStateColor[props.status]};
      }
    }
  }
  .right-actions {
    > button {
      margin-right: 10px;
    }
  }
`;
export { ChatNavBarBox };
