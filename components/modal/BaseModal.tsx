import React, { useEffect, RefObject, useRef, MouseEvent } from 'react';
import styled from 'styled-components';
import ModalPortal from 'components/modal/ModalPortal';
import { useOnOutsideClick } from 'hooks/useModal';

export interface BaseModalType {
  escClickable?: boolean; // esc로 모달을 닫을 수 있는지에 대한 여부
  backgroundClickable?: boolean; // 백그라운드 클릭으로 모달을 닫을 수 있는지에 대한 여부
  yesTitle?: string; // yes 버튼에 표시할 이름
  noTitle?: string; // no 버튼에 표시할 이름
  yesAction?: () => void; // yes 버튼 클릭시 수행할 함수
  noAction?: () => void; // no 버튼 클릭시 수행할 함수
  contents: JSX.Element;
}

interface BaseModalProps {
  props: BaseModalType;
  closeModal: () => void;
}
/* 이 Modal 컴포넌트는 ReactDom.createPortal 로 관리 될 예정임. */
const BaseModal = ({ props, closeModal }: BaseModalProps) => {
  //  const modalRef = useRef<HTMLDivElement>(null); // mutableRefObject가 아닌 readonly refObject로 사용하기 위해서 ...

  /* https://darrengwon.tistory.com/865
  이 Modal 컴포넌트는 ReactDom.createPortal 로 관리 될 예정임.
  모달 켜졌을 때 배경 스크롤 방지 */

  const close = (e: MouseEvent) => {
    if (props.backgroundClickable) {
      closeModal();
    }
    e.stopPropagation();
  };

  useEffect(() => {
    const body = document.querySelector('body') as HTMLBodyElement;
    body.style.overflowY = 'hidden';
    return () => {
      body.style.overflowY = 'auto';
    };
  }, []);

  return (
    <ModalPortal wrapperId="react-portal-modal-container">
      <Background onClick={close}>
        <ModalWrapper onClick={(e) => e.stopPropagation()}>
          <ModalBody>{props.contents}</ModalBody>
          <ActionButtonContainer>
            {props.yesTitle && (
              <ActionButtonYes
                onClick={() => {
                  props.yesAction ? props.yesAction() : closeModal();
                }}
              >
                {props.yesTitle || '확인'}
              </ActionButtonYes>
            )}
            {props.noTitle && (
              <ActionButtonNo
                onClick={() => {
                  props.noAction ? props.noAction() : closeModal();
                }}
              >
                {props.noTitle || '취소'}
              </ActionButtonNo>
            )}
          </ActionButtonContainer>
        </ModalWrapper>
      </Background>
    </ModalPortal>
  );
};

const Background = styled.div`
  z-index: 100;
  position: fixed;
  left: 50%;
  top: 0;
  width: 500px;
  transform: translate(-50%, 0%);
  height: 100vh;
  background: #56565650;
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const ModalWrapper = styled.div`
  z-index: 99;
  background-color: white;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.11), 0 2px 2px rgba(0, 0, 0, 0.11), 0 4px 4px rgba(0, 0, 0, 0.11),
    0 6px 8px rgba(0, 0, 0, 0.11), 0 8px 16px rgba(0, 0, 0, 0.11);
  border-radius: 12px;
  padding: 1.5rem 2rem 1.5rem 2rem;

  width: 350px; /* 모달창 기본 사이즈 */
  @media (max-width: 500px) {
    width: 80vw;
  }
  max-height: 50vh;
  overflow: auto;

  font-size: 16px;
  font-weight: 300;
  color: rgb(59, 59, 59);
  transform: scale(1.15);

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
`;
const ActionButtonContainer = styled.div`
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
  @media (max-width: 500px) {
    font-size: 14px;
  }
  &:hover {
    cursor: pointer;
  }
`;
const ActionButtonYes = styled(ActionButton)`
  color: white;
  background-color: #ff4d57;
`;
const ActionButtonNo = styled(ActionButton)`
  background-color: #ececec;
  color: #7c7c7c;
`;

export default BaseModal;
