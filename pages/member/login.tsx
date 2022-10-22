import styled, { keyframes } from 'styled-components';
import type { ReactElement } from 'react';
import type { NextPageWithLayout } from 'pages/_app';
import { AppLayout } from 'components/layout';
import Router from 'next/router';
import {HeadMeta} from 'components/common'

// next.js 위한 라이브러리 및 타입
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

export const getServerSideProps: GetServerSideProps = async ({ req, res, params }: GetServerSidePropsContext) => {
  // 클라이언트는 여러 대지만 서버는 한대이기 때문에 서버 사용한 쿠키는 반드시 제거해 줘야 한다
  const cookie = req ? req?.headers?.cookie : null;
  if (cookie) {
    let match = cookie.match(new RegExp('(^| )' + 'access_token' + '=([^;]+)'));
    // 쿠키가 적용되어 있다면 (로그인 상태라면)
    // 로그인 상태에서는 로그인 페이지에 접근할 수 없으니 돌려보내야 한다.
    if (!!match === true) {
      res.statusCode = 302;
      res.setHeader('Location', `/`);
      res.end();
    }
  } 
  return { props: {} };
};
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
    <>
      <HeadMeta />
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
    </>
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
    position: relative;
    display: inline-block;
    animation: ${bounce} 2s linear 0.1s infinite;
    &:nth-child(2) {
      animation-delay: 0.2s;
    }
    &:nth-child(3) {
      animation-delay: 0.3s;
    }
    &:nth-child(4) {
      animation-delay: 0.4s;
    }
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
