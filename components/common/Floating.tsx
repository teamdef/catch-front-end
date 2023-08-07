import { Background } from 'hooks/useModal';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Floating = () => {
  const [isActive, setIsActive] = useState(false);
  const activeHandler = () => {
    setIsActive((current) => !current);
  };

  useEffect(() => {
    const body = document.querySelector('body') as HTMLBodyElement;
    if (isActive) {
      body.style.overflowY = 'hidden';
    }
    return () => {
      body.style.overflowY = 'auto';
    };
  }, [isActive]);

  return (
    <>
      {isActive && <Background onClick={activeHandler} />}
      <Content>
        <ButtonBox isActive={isActive}>
          <AnyQuizBtn>
            <TextBox>모두의 퀴즈</TextBox>
          </AnyQuizBtn>
          <CatchMeBtn>
            <TextBox>캐치미 퀴즈</TextBox>
          </CatchMeBtn>
        </ButtonBox>
        <PlusBtn onClick={activeHandler} />
      </Content>
    </>
  );
};

const Content = styled.div`
  z-index: 999;
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
const ButtonBox = styled.div<{ isActive: boolean }>`
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
    ${({ isActive }) => isActive && 'transform: translateY(0); opacity: 1;'}
    transition-timing-function: ease-in-out;
    &${AnyQuizBtn} {
      ${({ isActive }) => (isActive ? 'transition-delay:0' : 'transition-delay: 0.25s;')};
    }
    &${CatchMeBtn} {
      ${({ isActive }) => (isActive ? 'transition-delay: 0.15s;' : 'transition-delay: 0.1s')};
    }
    & ${TextBox} {
      ${({ isActive }) => isActive && 'transform: translateX(calc(-100% - 21px)); opacity: 1;'}
      ${({ isActive }) => (isActive ? 'transition-delay: 0.3s;' : 'transition-delay: 0')};
    }
  }
`;

export default Floating;
