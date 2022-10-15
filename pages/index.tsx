import Head from 'next/head';
import styled, { keyframes } from 'styled-components';
import type { ReactElement } from 'react';
import type { NextPageWithLayout } from './_app';
import {useEffect} from 'react'
import { AppLayout } from 'components/layout';
import Router from 'next/router';
const Page: NextPageWithLayout = () => {

  const redirectUri =
    process.env.NODE_ENV === 'development'
      ? process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI
      : process.env.NEXT_PUBLIC_DEPLOY_KAKAO_REDIRECT_URI;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_RESTAPI_KEY}&redirect_uri=${redirectUri}&response_type=code`;

  const goKakaoLogin = () => {
    Router.push(KAKAO_AUTH_URL);
  };

  return (
    <div>
      <Head>
        <title>캐치캐치</title>
        <meta name="description" content="나만의 퀴즈를 만들고 공유해보세요!" />
        <link rel="icon" href="/catch_favicon.ico" />
        <meta property="og:type" content="website" />
      </Head>

      <main>
        <Wrapper>
          <MainContainer>
            <Title>
              <span>캐</span>
              <span>치</span>
              <span>캐</span>
              <span>치</span>
            </Title>
            <SubTitle>
              로그인 <strong>1</strong>초컷 하고 <br />
              <strong>나만의 퀴즈</strong>를 만들어보세요!
            </SubTitle>
            <KakaoLoginBtn onClick={goKakaoLogin}>
              <img src={'/assets/img/kakao_icon.png'} />
              <span>카카오로 시작하기</span>
            </KakaoLoginBtn>
          </MainContainer>
        </Wrapper>
      </main>
    </div>
  );
};
Page.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};

const bounce = keyframes` 
  0% {transform: translatey(0px);}
  5% {transform: translatey(-10px);}
  10% {transform: translatey(0px);}
  100% {transform: translatey(0px);}
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #fff;
`;
const MainContainer = styled.div`
  background-color: white;
  border-radius: 30px;
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;
const Title = styled.div`
  span {
    position:relative;
    display: inline-block;
    animation: ${bounce} 2s linear .1s infinite ;
    &:nth-child(2) {
      animation-delay: .2s;
    };
    &:nth-child(3) {
      animation-delay: .3s;
    };
    &:nth-child(4) {
      animation-delay: .4s;
    };
    
  }
  font-family: 'RixInooAriDuriR';
  font-size: 3.5rem;
  color: #ff4d57;
  padding: 1rem 0 1rem 0;
  margin-bottom: 10%;
`;
const SubTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20%;
  strong {
    color: #ff4d57;
  }
`;
const KakaoLoginBtn = styled.button`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
  border-radius: 30px;
  height: 50px;
  background-color: #fbe54d;
  border: none;
  margin-bottom: 20%;
  &:hover {
    cursor: pointer;
  }
  & img {
    position: relative;
    width: 18px;
    height: 17px;
    margin-right: 20px;
  }
  & span {
    font-weight: bold;
    color: #391c1c;
  }
`;

export default Page;
