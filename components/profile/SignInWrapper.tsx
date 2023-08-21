import Router from 'next/router';
import React from 'react';
import styled from 'styled-components';

const SignInWrapper = () => {
  const moveLogin = () => {
    Router.push('/member/login');
  };
  return (
    <Wrapper>
      <Text onClick={moveLogin}>로그인/회원가입</Text>
      <Description>로그인을 해야 퀴즈를 만들 수 있어요.</Description>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 32px;
`;
const Text = styled.div`
  color: ${({ theme }) => theme.colors.secondary_500};
  font-size: ${({ theme }) => theme.fontSize.subtitle_2};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;
const Description = styled.div`
  color: ${({ theme }) => theme.colors.blackColors.grey_500};
  font-size: ${({ theme }) => theme.fontSize.caption};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  margin-top: 8px;
`;
export default SignInWrapper;
