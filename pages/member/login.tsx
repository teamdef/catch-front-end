/* react, next 관련 */
import type { ReactElement } from 'react';
import type { NextPageWithLayout } from 'pages/_app';
import Router from 'next/router';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

import { AppLayout } from 'components/layout'; /* 컴포넌트 */
import * as S from 'styles/member/login.style'; /* 스타일 코드 */

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
  const currentDomain = window.location.origin;
  const redirectUri =
    process.env.NODE_ENV === 'development'
      ? process.env.NEXT_PUBLIC_DEV_KAKAO_REDIRECT_URI
      : currentDomain === 'https://beta.catchcatch.link'
      ? process.env.NEXT_PUBLIC_BETA_KAKAO_REDIRECT_URI
      : process.env.NEXT_PUBLIC_DEPLOY_KAKAO_REDIRECT_URI;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_RESTAPI_KEY}&redirect_uri=${redirectUri}&response_type=code`;

  const goKakaoLogin = () => {
    Router.push(KAKAO_AUTH_URL);
  };

  return (
    <S.Wrapper>
      <S.MainContainer>
        <S.Title>
          <span>캐</span>
          <span>치</span>
          <span>캐</span>
          <span>치</span>
        </S.Title>
        <S.SubTitle>
          로그인 <strong>1</strong>초컷 하고 <br />
          <strong>나만의 퀴즈</strong>를 만들어보세요!
        </S.SubTitle>
        <S.KakaoLoginBtn onClick={goKakaoLogin}>
          <img src={'/assets/img/kakao_icon.png'} />
          <span>카카오로 시작하기</span>
        </S.KakaoLoginBtn>
      </S.MainContainer>
    </S.Wrapper>
  );
};
Page.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};

export default Page;
