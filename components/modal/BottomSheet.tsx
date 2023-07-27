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
      <button onClick={noActionAndClose}>닫기</button>
      <ModalBody>{props.contents}</ModalBody>
    </ModalWrapper>
  );
};

const ModalWrapper = styled.div`
  z-index: 99;
  background-color: white;
  box-shadow:
    0 1px 1px rgba(0, 0, 0, 0.11),
    0 2px 2px rgba(0, 0, 0, 0.11),
    0 4px 4px rgba(0, 0, 0, 0.11),
    0 6px 8px rgba(0, 0, 0, 0.11),
    0 8px 16px rgba(0, 0, 0, 0.11);
  border-radius: 12px;
  padding: 1.5rem 2rem 1.5rem 2rem;
  width: 384px; /* 480px 의 80% 너비가 384px임. */
  @media (max-width: 480px) {
    width: 80vw;
  }
  max-height: 50vh;
  overflow: auto;
  font-size: 1rem;
  color: rgb(59, 59, 59);

  .close-button-wrapper {
    display: flex;
    justify-content: right;
    color: #d6d6d6;
    &:hover {
      cursor: pointer;
    }
  }
`;

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding-top: 1.5rem;
  padding-bottom: 2rem;
  /*line-height:1.5rem;*/
`;
export default BottomSheet;
