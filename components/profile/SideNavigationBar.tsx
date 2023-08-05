import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import MyInfoWrapper from './MyInfoWrapper';
import SignInWrapper from './SignInWrapper';

const SideNavigationBar = ({ bgColor }: { bgColor?: string }) => {
  const { isLoggedin } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const body = document.querySelector('body') as HTMLBodyElement;
    body.style.overflowY = 'hidden';
    return () => {
      body.style.overflowY = 'auto';
    };
  }, []);

  return (
    <Wrapper bgColor={bgColor}>
      <SideBarTitle>마이페이지</SideBarTitle>
      {isLoggedin ? <MyInfoWrapper /> : <SignInWrapper />}
    </Wrapper>
  );
};

const Wrapper = styled.div<{ bgColor: string | undefined }>`
  z-index: 50;
  position: fixed;
  width: 480px;
  right: 50%;
  top: 56px;
  height: 100vh;
  transform: translate(50%, 0%);
  @media (max-width: 480px) {
    width: 100%;
    right: 0;
    transform: translate(0, 0);
  }
  overflow: hidden;
  background-color: ${({ bgColor }) => bgColor || '#fff'};

  padding: 0 18px;
`;
const SideBarTitle = styled.div`
  margin-top: 24px;
  font-size: ${({ theme }) => theme.fontSize.subtitle_2};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

export default SideNavigationBar;
