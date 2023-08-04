import { useState, useCallback, MouseEvent } from 'react';
import { BottomSheet, Dialog } from 'components/modal'; // 모달 컴포넌트
import ModalPortal from 'components/modal/PortalWrapper';
import styled, { keyframes } from 'styled-components';
/* 특정 컴포넌트 이외를 클릭하였을 때 모달을 닫도록 함 */
/* 
    clickRef : 현재 클릭한 컴포넌트
    exceptRefs : 현재 클릭한 컴포넌트 외에도 제외시킬 컴포넌트 배열
    callback : 위의 것들을 제외한 컴포넌트 클릭시 실행시킬 함수 
*/
export interface ModalType {
  escClickable?: boolean; // esc로 모달을 닫을 수 있는지에 대한 여부
  backgroundClickable?: boolean; // 백그라운드 클릭으로 모달을 닫을 수 있는지에 대한 여부
  contents: JSX.Element;
  bottomSheet?: boolean; // 바텀시트 여부
}

export interface ModalProps {
  contents: ModalType['contents'];
  closeModal: () => void;
}

const useModal = (initialState: ModalType): [() => void, () => void, () => JSX.Element | null] => {
  const [modalValue] = useState<ModalType>(initialState);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, [isOpen]);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, [isOpen]);

  const close = (e: MouseEvent) => {
    if (modalValue.backgroundClickable) {
      closeModal();
    }
    e.stopPropagation();
  };

  const renderModal = (): JSX.Element | null => {
    return isOpen ? (
      <ModalPortal wrapperId="react-portal-modal-container">
        <Background onClick={close}>
          {modalValue.bottomSheet && <BottomSheet contents={modalValue.contents} closeModal={closeModal} />}
          {!modalValue.bottomSheet && <Dialog contents={modalValue.contents} closeModal={closeModal} />}
        </Background>
      </ModalPortal>
    ) : null;
  };

  return [openModal, closeModal, renderModal]; // [T, (e: any)=>void]
};
const BgColorAni = keyframes`
  0% {
    background-color: transparent;
  }
  100% {
    background-color: rgba(0, 0, 0, 0.47);
  }
`;

export const Background = styled.div`
  z-index: 100;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  top: 0;
  max-width: 480px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.47);
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  animation: ${BgColorAni} 0.2s ease;
`;

export default useModal;
