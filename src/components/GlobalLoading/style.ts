import styled from 'styled-components';
import { animated } from 'react-spring';

const GlobalLoadingBox = styled(animated.div)`
  position: absolute;
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: rgba(47, 53, 66, 1);
  z-index: 100;
  .container {
    h2 {
      color: #ccc;
      margin: 0;
      font: 0.8em verdana;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }
    /*
   * Loading Dots
   * Can we use pseudo elements here instead :after?
   */
    span {
      display: inline-block;
      vertical-align: middle;
      width: 0.6em;
      height: 0.6em;
      margin: 0.19em;
      background: #007db6;
      border-radius: 0.6em;
      animation: loading 1s infinite alternate;
    }
    /*
   * Dots Colors
   * Smarter targeting vs nth-of-type?
   */
    span:nth-of-type(2) {
      background: #008fb2;
      animation-delay: 0.2s;
    }
    span:nth-of-type(3) {
      background: #009b9e;
      animation-delay: 0.4s;
    }
    span:nth-of-type(4) {
      background: #00a77d;
      animation-delay: 0.6s;
    }
    span:nth-of-type(5) {
      background: #00b247;
      animation-delay: 0.8s;
    }
    span:nth-of-type(6) {
      background: #5ab027;
      animation-delay: 1s;
    }
    span:nth-of-type(7) {
      background: #a0b61e;
      animation-delay: 1.2s;
    }
  }

  /*
   * Animation keyframes
   * Use transition opacity instead of keyframes?
   */
  @keyframes loading {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;
export { GlobalLoadingBox };
