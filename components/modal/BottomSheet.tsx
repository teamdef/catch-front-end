import { ModalProps } from 'hooks/useModal';
import { MouseEvent, cloneElement, useEffect } from 'react';
import styled from 'styled-components';

const BottomSheet = ({ contents, closeModal }: ModalProps) => {
  useEffect(() => {
    const body = document.querySelector('body') as HTMLBodyElement;
    body.style.overflowY = 'hidden';
    return () => {
      body.style.overflowY = 'auto';
    };
  }, []);
  return (
    <ModalWrapper onClick={(e: MouseEvent) => e.stopPropagation()}>
      {cloneElement(contents, { closeModal })}
    </ModalWrapper>
  );
};

const ModalWrapper = styled.div`
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
`;
// animation: ${BottomUp} 0.4s ease-out;
// animation: ${TopDown} 0.4s ease-in-out;
// 0% {
//   transform: translateY(100%);
// }
// 100% {
//   transform: translateY(0);
// }
export default BottomSheet;
