/* react, next 관련 */
import type { ReactElement } from 'react';
import type { NextPageWithLayout } from 'pages/_app';
import Router from 'next/router';
import { AppLayout } from 'components/layout'; /* 컴포넌트 */
import styled from 'styled-components';

const Page: NextPageWithLayout = () => {
  const REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;
  const API_KEY = process.env.NEXT_PUBLIC_KAKAO_RESTAPI_KEY;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const goKakaoLogin = () => {
    Router.push(KAKAO_AUTH_URL);
  };

  return (
    <Wrapper>
      <Logo src="/assets/img/rebranding/login_logo.svg" />
      <LoginButton onClick={goKakaoLogin} />
      <Background src="/assets/img/rebranding/amusement_park.svg" />
    </Wrapper>
  );
};
const Wrapper = styled.div`
  position: relative;
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Logo = styled.img`
  padding-left: 14px;
`;
const LoginButton = styled.button`
  margin-top: 7.4vh;
  width: 190px;
  height: 45px;
  background-repeat: no-repeat;
  background-image: url('/assets/img/rebranding/kakao_login.svg');
`;
const Background = styled.img`
  width: 100%;
  position: absolute;
  bottom: 0;
`;
Page.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};

export default Page;
