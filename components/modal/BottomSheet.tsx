import { ModalProps } from 'hooks/useModal';
import React, { MouseEvent, useEffect } from 'react';
import styled from 'styled-components';

const BottomSheet = ({ props, closeModal }: ModalProps) => {
  // const yesActionAndClose = () => {
  //   if (props.yesAction) {
  //     props.yesAction();
  //     closeModal();
  //   } else closeModal();
  // };

  const noActionAndClose = () => {
    if (props.noAction) {
      props.noAction();
      closeModal();
    } else closeModal();
  };
  useEffect(() => {
    const body = document.querySelector('body') as HTMLBodyElement;
    body.style.overflowY = 'hidden';
    return () => {
      body.style.overflowY = 'auto';
    };
  }, []);

  return (
    <ModalWrapper onClick={(e: MouseEvent) => e.stopPropagation()}>
      <CloseBtn onClick={noActionAndClose} />
      {props.contents}
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
const CloseBtn = styled.button`
  position: absolute;
  display: block;
  top: 21px;
  right: 4.27%;
  width: 24px;
  height: 24px;
  z-index: 1;
  background: url(/assets/img/rebranding/icon/close_24px.svg) no-repeat center;
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
