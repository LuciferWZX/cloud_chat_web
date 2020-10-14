import styled from 'styled-components';
const BasicLayoutBox = styled.div`
  height: 100%;
  display: flex;
`;
const SiderBarBox = styled.div`
  width: 80px;
  background-color: #000;
  padding: 10px;
  text-align: center;
  .avatar-box {
    cursor: pointer;
    .first-char {
      font-size: 36px;
    }
  }
  .ant-divider-horizontal {
    margin: 12px 0 0 0;
    border-top-color: rgba(210, 218, 226, 1);
  }
  .ant-dropdown {
    left: 80px !important;
    top: 0 !important;
  }
`;
const SiderMenuBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .ant-badge-count {
    background-color: rgba(72, 84, 96, 1);
  }

  .active {
    margin: 30px 0 20px 0;
    .layer {
      transform: rotate(-35deg) skew(20deg);
    }
    .layer span {
      background-color: #3498db;
    }
    .layer span.fab {
      color: white;
    }
    .layer span:nth-child(1) {
      opacity: 0.2;
    }
    .layer span:nth-child(2) {
      opacity: 0.4;
      transform: translate(5px, -5px);
    }
    .layer span:nth-child(3) {
      opacity: 0.6;
      transform: translate(10px, -10px);
    }
    .layer span:nth-child(4) {
      opacity: 0.8;
      transform: translate(15px, -15px);
    }
    .layer span:nth-child(5) {
      opacity: 1;
      transform: translate(20px, -20px);
    }
    .text {
      bottom: -20px;
      opacity: 1;
      color: white !important;
    }
  }
  a {
    width: 40px;
    height: 40px;
    text-decoration: none;
    color: #fff;
    display: inline-block;
    position: relative;
    margin-top: 10px;
    transition-property: all;
    transition-duration: 0.3s;
  }
  a .layer {
    width: 40px;
    height: 40px;
    transition: transform 0.3s;
  }
  a:hover {
    margin: 30px 0 20px 0;
  }
  a:hover .layer {
    transform: rotate(-35deg) skew(20deg);
  }
  a .layer span {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    border: 1px solid #fff;
    border-radius: 5px;
    transition: all 0.3s;
  }
  a .layer span.fab {
    font-size: 24px;
    line-height: 45px;
    text-align: center;
  }
  a:hover .layer span:nth-child(1) {
    opacity: 0.2;
  }
  a:hover .layer span:nth-child(2) {
    opacity: 0.4;
    transform: translate(5px, -5px);
  }
  a:hover .layer span:nth-child(3) {
    opacity: 0.6;
    transform: translate(10px, -10px);
  }
  a:hover .layer span:nth-child(4) {
    opacity: 0.8;
    transform: translate(15px, -15px);
  }
  a:hover .layer span:nth-child(5) {
    opacity: 1;
    transform: translate(20px, -20px);
  }
  a:nth-child(1) .layer span,
  a:nth-child(1) .text {
    color: #4267b2;
    border-color: #4267b2;
  }
  a:nth-child(2) .layer span,
  a:nth-child(2) .text {
    color: #1da1f2;
    border-color: #1da1f2;
  }
  a:nth-child(3) .layer span,
  a:nth-child(3) .text {
    color: #e1306c;
    border-color: #e1306c;
  }
  a:nth-child(4) .layer span,
  a:nth-child(4) .text {
    color: #2867b2;
    border-color: #2867b2;
  }
  a:nth-child(5) .layer span,
  a:nth-child(5) .text {
    color: #ff0000;
    border-color: #ff0000;
  }
  a:nth-child(1) .layer span {
    box-shadow: -1px 1px 3px #4267b2;
  }
  a:nth-child(2) .layer span {
    box-shadow: -1px 1px 3px #1da1f2;
  }
  a:nth-child(3) .layer span {
    box-shadow: -1px 1px 3px #e1306c;
  }
  a:nth-child(4) .layer span {
    box-shadow: -1px 1px 3px #4267b2;
  }
  a:nth-child(5) .layer span {
    box-shadow: -1px 1px 3px #ff0000;
  }
  a .text {
    position: absolute;
    font-size: 16px;
    width: 80px;
    left: 50%;
    bottom: -5px;
    opacity: 0;
    transform: translateX(-50%);
    transition: bottom 0.3s ease, opacity 0.3s ease;
  }
  a:hover .text {
    bottom: -20px;
    opacity: 1;
  }
`;
const ChildrenBox = styled.div`
  flex: 1;
`;
export { BasicLayoutBox, SiderBarBox, ChildrenBox, SiderMenuBox };
