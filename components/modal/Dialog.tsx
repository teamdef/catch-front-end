import { ModalProps } from 'hooks/useModal';
import React, { useEffect } from 'react';
import styled from 'styled-components';

const Dialog = ({ props, closeModal }: ModalProps) => {
  //  const modalRef = useRef<HTMLDivElement>(null); // mutableRefObject가 아닌 readonly refObject로 사용하기 위해서 ...

  /* https://darrengwon.tistory.com/865
  이 Modal 컴포넌트는 ReactDom.createPortal 로 관리 될 예정임.
  모달 켜졌을 때 배경 스크롤 방지 */

  const yesActionAndClose = () => {
    if (props.yesAction) {
      props.yesAction();
      closeModal();
    } else closeModal();
  };

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
    <ModalWrapper onClick={(e) => e.stopPropagation()}>
      <ModalBody>{props.contents}</ModalBody>
      <ActionBtnContainer>
        {props.yesTitle && <ActionYesBtn onClick={yesActionAndClose}>{props.yesTitle || '확인'}</ActionYesBtn>}
        {props.noTitle && <ActionNoBtn onClick={noActionAndClose}>{props.noTitle || '취소'}</ActionNoBtn>}
      </ActionBtnContainer>
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
const ActionBtnContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const ActionButton = styled.div`
  border-radius: 25px;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1.5rem 0 1.5rem;
  margin: 0 0.25rem 0 0.25rem;
  &:hover {
    cursor: pointer;
  }
`;
const ActionYesBtn = styled(ActionButton)`
  color: white;
  background-color: #ff4d57;
`;
const ActionNoBtn = styled(ActionButton)`
  background-color: #ececec;
  color: #7c7c7c;
`;

export default Dialog;