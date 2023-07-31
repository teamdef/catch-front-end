import { useState, useCallback, MouseEvent } from 'react';
import { BottomSheet, Dialog } from 'components/modal'; // 모달 컴포넌트
import ModalPortal from 'components/modal/PortalWrapper';
import styled from 'styled-components';
/* 특정 컴포넌트 이외를 클릭하였을 때 모달을 닫도록 함 */
/* 
    clickRef : 현재 클릭한 컴포넌트
    exceptRefs : 현재 클릭한 컴포넌트 외에도 제외시킬 컴포넌트 배열
    callback : 위의 것들을 제외한 컴포넌트 클릭시 실행시킬 함수 
*/
export interface ModalType {
  escClickable?: boolean; // esc로 모달을 닫을 수 있는지에 대한 여부
  backgroundClickable?: boolean; // 백그라운드 클릭으로 모달을 닫을 수 있는지에 대한 여부
  yesTitle?: string; // yes 버튼에 표시할 이름
  noTitle?: string; // no 버튼에 표시할 이름
  yesAction?: () => void; // yes 버튼 클릭시 수행할 함수
  noAction?: () => void; // no 버튼 클릭시 수행할 함수
  contents: JSX.Element;
  bottomSheet?: boolean; // 바텀시트 여부
}

export interface ModalProps {
  props: ModalType;
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
          {modalValue.bottomSheet && <BottomSheet props={modalValue} closeModal={closeModal} />}
          {!modalValue.bottomSheet && <Dialog props={modalValue} closeModal={closeModal} />}
        </Background>
      </ModalPortal>
    ) : null;
  };

  return [openModal, closeModal, renderModal]; // [T, (e: any)=>void]
};

const Background = styled.div`
  z-index: 100;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  top: 0;
  max-width: 480px;
  width: 100%;
  height: 100vh;
  background: #56565650;
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

export default useModal;
