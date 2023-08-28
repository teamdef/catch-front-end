import { PortalWrapper } from 'components/modal';
import { Background } from 'components/style';
import useAnimation from 'hooks/useAnimation';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { disableScroll, enableScroll } from 'utils/scroll';

const Floating = () => {
  const [isActive, setIsActive] = useState(false);
  const [renderSideBar, handleTransitionEnd, triggerAnimation] = useAnimation(isActive);
  const activeHandler = () => {
    setIsActive((current) => !current);
  };
  const moveCreateQuiz = () => {
    Router.push('/quiz/create');
  };

  useEffect(() => {
    if (isActive) disableScroll();
    return () => enableScroll();
  }, [isActive]);

  useEffect(() => {
    if (!triggerAnimation) {
      setTimeout(() => {
        handleTransitionEnd();
      }, 300);
    }
  }, [triggerAnimation]);
  return (
    <PortalWrapper wrapperId="react-portal-loading-container">
      {renderSideBar && <Background onClick={activeHandler} triggerAnimation={isActive} />}
      <Content>
        {renderSideBar && (
          <ButtonBox triggerAnimation={triggerAnimation}>
            <AnyQuizBtn onClick={moveCreateQuiz}>
              <TextBox>모두의 퀴즈</TextBox>
            </AnyQuizBtn>
            <CatchMeBtn>
              <TextBox>캐치미 퀴즈</TextBox>
            </CatchMeBtn>
          </ButtonBox>
        )}
        <PlusBtn onClick={activeHandler} />
      </Content>
    </PortalWrapper>
  );
};

const Content = styled.div`
  z-index: 9999;
  position: fixed;
  width: 72px;
  height: 72px;
  bottom: 10%;
  right: 10%;
  button {
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
  }
`;
const PlusBtn = styled.button`
  position: relative;
  width: 100%;
  height: 100%;
  justify-content: center;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.secondary_500};
  background-image: url(/assets/img/rebranding/icon/plus_icon.svg);
  background-repeat: no-repeat;
  background-position: center;
`;

const AnyQuizBtn = styled.button`
  background-image: url(/assets/img/rebranding/icon/anyQuiz_btn_icon.svg);
`;
const CatchMeBtn = styled.button`
  background-image: url(/assets/img/rebranding/icon/catchme_btn_icon.svg);
`;
const TextBox = styled.span`
  position: relative;
  display: block;
  width: 90px;
  padding: 8px 0;
  opacity: 0;
  background-color: ${({ theme }) => theme.colors.blackColors.grey_200};
  border-radius: 8px;
  transform: translateX(calc(-100%));
  transition-duration: 200ms;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.14);
`;
const ButtonBox = styled.div<{ triggerAnimation: boolean }>`
  position: absolute;
  width: 72px;
  bottom: 88px;
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
  align-items: center;
  gap: 16px;
  > button {
    position: relative;
    display: block;
    border-radius: 50%;
    width: 52px;
    height: 52px;
    background-color: ${({ theme }) => theme.colors.secondary_500};
    background-repeat: no-repeat;
    background-position: center;
    transform: translateY(100%);
    opacity: 0;
    transition-duration: 200ms;
    ${({ triggerAnimation }) => triggerAnimation && 'transform: translateY(0); opacity: 1;'}
    transition-timing-function: ease-in-out;
    &${AnyQuizBtn} {
      ${({ triggerAnimation }) => (triggerAnimation ? 'transition-delay:0' : 'transition-delay: 0.25s;')};
    }
    &${CatchMeBtn} {
      ${({ triggerAnimation }) => (triggerAnimation ? 'transition-delay: 0.15s;' : 'transition-delay: 0.1s')};
    }
    & ${TextBox} {
      ${({ triggerAnimation }) => triggerAnimation && 'transform: translateX(calc(-100% - 21px)); opacity: 1;'}
      ${({ triggerAnimation }) => (triggerAnimation ? 'transition-delay: 0.3s;' : 'transition-delay: 0')};
    }
  }
`;

export default Floating;
