import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import ModalPortal from 'components/modal/PortalWrapper';
import ShareModal, { ShareModalProps } from 'components/share/ShareModal';

interface BottomUpProps {
  bottomUpClose: () => void;
  shareInfo: ShareModalProps;
}

const BottomUpModal = ({ bottomUpClose, shareInfo }: BottomUpProps) => {
  const [animation, setAnimation] = useState('openAnimation');

  const close = () => {
    setAnimation('closeAnimation');
    setTimeout(() => {
      bottomUpClose();
    }, 390);
  };
  return (
    <ModalPortal wrapperId="react-portal-modal-container">
      <Background onClick={close}>
        <ModalWrapper onClick={(e) => e.stopPropagation()} className={animation}>
          <QuizTitleAndShareInfo>
            <div id="title">{shareInfo.setTitle}</div>
            <div id="info">퀴즈를 공유하고 다같이 즐겨보세요 ❤️</div>
          </QuizTitleAndShareInfo>
          <SNSShareWrapper>
            <ShareModal
              nickName={shareInfo.nickName}
              profileImg={shareInfo.profileImg}
              thumbnail={shareInfo.thumbnail}
              setTitle={shareInfo.setTitle}
              id={shareInfo.id}
            />
          </SNSShareWrapper>
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
  width: 480px;
  @media (max-width: 480px) {
    width: 100%;
  }
  transform: translate(-50%, 0%);
  height: 100vh;
  background: #56565650;
  backdrop-filter: blur(4px);
  display: flex;
  align-items: end;
  overflow: hidden;
`;

const BottomUp = keyframes` 
      0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(0);
  }

`;
const TopDown = keyframes` 
      0% {
    transform: translateY(0);
  }
  100% {
        transform: translateY(100%);
  }

`;

const ModalWrapper = styled.div`
  z-index: 99;
  background-color: white;
  box-shadow:
    0 1px 1px rgba(0, 0, 0, 0.11),
    0 2px 2px rgba(0, 0, 0, 0.11),
    0 4px 4px rgba(0, 0, 0, 0.11),
    0 6px 8px rgba(0, 0, 0, 0.11),
    0 8px 16px rgba(0, 0, 0, 0.11);
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  padding: 1.5rem 2rem 1.5rem 2rem;

  width: 100%;
  height: 50vh;
  overflow: auto;

  font-size: 16px;
  font-weight: 300;
  color: rgb(59, 59, 59);
  display: flex;
  flex-direction: column;
  align-items: center;
  &.openAnimation {
    animation: ${BottomUp} 0.4s ease-out;
  }
  &.closeAnimation {
    animation: ${TopDown} 0.4s ease-in-out;
  }
`;

const QuizTitleAndShareInfo = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
  #title {
    color: #ff4d57;
    font-size: 1.3rem;
    /*line-height: 1.6rem;*/
    max-width: 300px;
    word-break: keep-all;
  }
  #info {
    margin-top: 20px;
    color: #595959;
    font-size: 1rem;
  }
`;

const SNSShareWrapper = styled.div`
  width: 80%;
  margin-top: 40px;
`;
export default BottomUpModal;
