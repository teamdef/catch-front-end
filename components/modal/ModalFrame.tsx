import styled from 'styled-components';
import React, { useEffect, useRef } from 'react';
import ModalPortal from './ModalPortal';

type Listener = (this: HTMLElement, ev: KeyboardEvent) => any;

// esc 클릭시 
// const useOnEscapeClick = (callback: () => void) => {
//   useEffect(() => {
//     const closeOnEscapeKey: Listener = (e) => (e.key === 'Escape' ? callback() : null);
//     document.body.addEventListener('keydown', closeOnEscapeKey);
//     return () => {
//       document.body.removeEventListener('keydown', closeOnEscapeKey);
//     };
//   }, [callback]);
// };

function ModalFrame({
  children,
  isOpen,
  handleClose,
  handleYes,
  handleNo,
  yesTitle,
  noTitle,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  handleClose: () => void;
  handleYes?: () => void;
  handleNo?: () => void;
  yesTitle?: string;
  noTitle?: string;
}) {
  const nodeRef = useRef(null);
  const onClickNo = () => {
    handleNo && handleNo();
    handleClose();
  };
  const onClickYes = () => {
    handleYes && handleYes();
    handleClose();
  };

  return (
    <ModalPortal wrapperId="react-portal-modal-container">
      <Background>
        {/* Modal component클릭시 background 컴포넌트 클릭 방지 */}
        <ModalWrapper onClick={(e) => e.stopPropagation()} ref={nodeRef}>
          <ModalBody>{children}</ModalBody>
          <ActionButtonContainer>
            {handleNo && <ActionButtonNo onClick={onClickNo}>{noTitle || '취소'}</ActionButtonNo>}
            <ActionButtonDefault onClick={onClickYes}>{yesTitle || '닫기'}</ActionButtonDefault>
          </ActionButtonContainer>
        </ModalWrapper>
      </Background>
    </ModalPortal>
  );
}

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

  min-width: 300px; /* 모달창 기본 사이즈 */
  @media (max-width: 400px) {
    min-width: 200px;
  }
  max-width: 80vw;
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
  padding: 1rem 0.5rem 1rem 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;
const ActionButtonContainer = styled.div`
  padding: 0.5rem;
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
  @media (max-width: 400px) {
    font-size: 14px;
  }
  &:hover {
    cursor: pointer;
  }
`;
const ActionButtonDefault = styled(ActionButton)`
  color: white;
  background-color: #ff4d57;
`;
const ActionButtonNo = styled(ActionButton)`
  background-color: #ececec;
  color: #7c7c7c;
`;

export default ModalFrame;
