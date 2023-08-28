import { useState, useCallback, MouseEvent, useEffect } from 'react';
import { BottomSheet, Dialog } from 'components/modal'; // 모달 컴포넌트
import ModalPortal from 'components/modal/PortalWrapper';
import { disableScroll, enableScroll } from 'utils/scroll';
import { Background } from 'components/style';
import useAnimation from './useAnimation';

export interface ModalType {
  escClickable?: boolean; // esc로 모달을 닫을 수 있는지에 대한 여부
  backgroundClickable?: boolean; // 백그라운드 클릭으로 모달을 닫을 수 있는지에 대한 여부
  contents: JSX.Element;
  bottomSheet?: boolean; // 바텀시트 여부
}

export interface ModalProps {
  contents: ModalType['contents'];
  closeModal: () => void;
  triggerAnimation: boolean;
}

const useModal = (initialState: ModalType): [() => void, () => void, () => JSX.Element | null] => {
  const [modalValue] = useState<ModalType>(initialState);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isRenderModal, handleTransitionEnd, triggerAnimation] = useAnimation(isOpen);

  const openModal = useCallback(() => {
    setIsOpen(true);
    disableScroll();
  }, [isOpen]);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    enableScroll();
  }, [isOpen]);

  const close = (e: MouseEvent) => {
    if (modalValue.backgroundClickable) {
      closeModal();
    }
    e.stopPropagation();
  };

  useEffect(() => {
    if (!triggerAnimation) {
      setTimeout(() => {
        handleTransitionEnd();
      }, 300);
    }
  }, [triggerAnimation]);
  const renderModal = (): JSX.Element | null => {
    return isRenderModal ? (
      <ModalPortal wrapperId="react-portal-modal-container">
        {modalValue.bottomSheet && (
          <Background onClick={close} triggerAnimation={isOpen}>
            <BottomSheet contents={modalValue.contents} closeModal={closeModal} triggerAnimation={isOpen} />
          </Background>
        )}
        {!modalValue.bottomSheet && (
          <Background onClick={close} triggerAnimation={isOpen}>
            <Dialog contents={modalValue.contents} closeModal={closeModal} triggerAnimation={isOpen} />
          </Background>
        )}
      </ModalPortal>
    ) : null;
  };

  return [openModal, closeModal, renderModal];
};

export default useModal;
