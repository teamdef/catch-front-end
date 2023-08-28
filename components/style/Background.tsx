import styled, { keyframes } from 'styled-components';

const BgColorAni = keyframes`
  0% {
    background-color: transparent;
  }
  100% {
    background-color: rgba(0, 0, 0, 0.47);
  }
`;
const BgColorAni2 = keyframes`
  0% {
    background-color: rgba(0, 0, 0, 0.47);
  }
  100% {
    background-color: transparent;
  }
`;

const Background = styled.div<{ triggerAnimation?: boolean }>`
  z-index: 9999;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 480px;
  height: calc(var(--vh, 1vh) * 100);
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  animation-duration: 300ms;
  animation-timing-function: ease-out;
  overflow: hidden;

  ${({ triggerAnimation }) => triggerAnimation === undefined && 'background-color: rgba(0, 0, 0, 0.47);'}

  background-color: ${({ triggerAnimation }) =>
    triggerAnimation !== undefined && (triggerAnimation ? 'rgba(0, 0, 0, 0.47)' : 'transparent')};

  animation: ${({ triggerAnimation }) =>
    triggerAnimation !== undefined && (triggerAnimation ? BgColorAni : BgColorAni2)};

  background-color: ${({ triggerAnimation }) =>
    triggerAnimation !== undefined && (triggerAnimation ? 'rgba(0, 0, 0, 0.47)' : 'transparent')};
`;

export default Background;
