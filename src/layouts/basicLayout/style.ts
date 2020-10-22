import styled from 'styled-components';
const BasicLayoutBox = styled.div`
  height: 100%;
  display: flex;
`;
const SiderBarBox = styled.div`
  width: 80px;
  background-color: white;
  padding: 10px;
  z-index: 1;
  text-align: center;
  box-shadow: 7px 3px 7px -7px #5e5e5e;
  .avatar-box {
    cursor: pointer;
    .first-char {
      font-size: 36px;
    }
  }
  .ant-divider-horizontal {
    margin: 12px 0;
    border-top-color: rgba(210, 218, 226, 1);
  }
  .ant-dropdown {
    left: 80px !important;
    top: 0 !important;
  }
  .active {
    background: #2c3a47;
    color: white;
  }
`;
const SiderMenuBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .sider-item {
    margin-bottom: 12px;
  }
  .ant-badge-count {
    background-color: rgba(72, 84, 96, 1);
  }
`;
const SiderItem = styled.div`
  border-radius: 6px;
  width: 60px;
  height: 60px;
  background: linear-gradient(45deg, #dedede, #ffffff);
  box-shadow: 10px -10px 20px #dcdcdc, -10px 10px 20px #ffffff;
  display: flex;
  cursor: pointer;
  flex-direction: column;
  justify-content: center;
  will-change: transform, opacity;
  transition-property: all;
  transition-duration: 300ms;
  :hover {
    transform: scale(1.1, 1.1);
  }
  .menu-icon {
    font-size: 24px;
  }
  .text {
    font-size: 12px;
    margin-top: 5px;
  }
`;
const ChildrenBox = styled.div`
  flex: 1;
`;
export { BasicLayoutBox, SiderBarBox, ChildrenBox, SiderMenuBox, SiderItem };
