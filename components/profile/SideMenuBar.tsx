import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { Account, MyInfoWrapper, SignInWrapper, MyQuizNav } from '.';

interface SideMenuBarProps {
  bgColor?: string;
  onTransitionEnd: () => void;
  triggerAnimation: boolean;
  handleSideBar: () => void;
}
const SideMenuBar = ({ bgColor, onTransitionEnd, triggerAnimation, handleSideBar }: SideMenuBarProps) => {
  const { isLoggedin } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const body = document.querySelector('body') as HTMLBodyElement;
    body.style.overflowY = 'hidden';
    return () => {
      body.style.overflowY = 'auto';
    };
  }, []);

  useEffect(() => {
    if (!triggerAnimation) {
      setTimeout(() => {
        onTransitionEnd();
      }, 300);
    }
  }, [triggerAnimation]);

  return (
    <Wrapper bgColor={bgColor} triggerAnimation={triggerAnimation}>
      <SideBarTitle>마이페이지</SideBarTitle>
      {!isLoggedin && <SignInWrapper />}
      {isLoggedin && (
        <>
          <MyInfoWrapper />
          <MyQuizNav />
          <Account handleSideBar={handleSideBar} />
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div<{ bgColor: string | undefined; triggerAnimation: boolean }>`
  z-index: 999;
  position: absolute;
  left: 0;
  width: 100%;
  max-width: 480px;
  transform: translateX(100%);
  top: 56px;
  height: 100vh;
  overflow: hidden;
  background-color: ${({ bgColor }) => bgColor || '#fff'};
  padding: 0 24px;
  ${({ triggerAnimation }) => triggerAnimation && 'transform: translateX(0);'};

  transition: 300ms ease;
`;

const SideBarTitle = styled.div`
  margin-top: 24px;
  font-size: ${({ theme }) => theme.fontSize.subtitle_2};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

export default SideMenuBar;
