import { ModalProps } from 'hooks/useModal';
import { MouseEvent, cloneElement } from 'react';
import styled, { keyframes } from 'styled-components';

const BottomSheet = ({ contents, closeModal, triggerAnimation }: ModalProps) => {
  console.log(triggerAnimation);
  return (
    <ModalWrapper onClick={(e: MouseEvent) => e.stopPropagation()} triggerAnimation={triggerAnimation}>
      {cloneElement(contents, { closeModal })}
    </ModalWrapper>
  );
};
const BottomUpAni = keyframes`
  0% {
    transform: translateY(100%);
  }100% {
    transform: translateY(0);
  }
`;
const BottomUpAni2 = keyframes`
  0% {
    transform: translateY(0);
  }100% {
    transform: translateY(100%);
  }
`;
const ModalWrapper = styled.div<{ triggerAnimation?: boolean }>`
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: end;
  > div {
    border-radius: 24px 24px 0 0;
    background-color: #fff;
  }
  animation: ${({ triggerAnimation }) => (triggerAnimation ? BottomUpAni : BottomUpAni2)};
  animation-duration: 300ms;
  animation-timing-function: ease-out;
`;

export default BottomSheet;
