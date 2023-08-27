import { ReactElement, useEffect } from 'react';
import type { NextPageWithLayout } from 'pages/_app';
import { AppLayout } from 'components/layout';
import { kakaoLoginApi } from 'pages/api/member';
import Router from 'next/router';
import { useDispatch } from 'react-redux';
import { loginAction } from 'store/user';
import { saveToken, saveRefreshToken } from 'utils/token';
import { Loading } from 'components/common';

interface DataProps {
  id: string;
  kakao_uid: number;
  nickname: string;
  profile_img: string;
  is_signup: boolean;
  access_token: string;
  refresh_token: string;
}

const redirect: NextPageWithLayout = () => {
  const dispatch = useDispatch();
  const dataFetch = async () => {
    try {
      const res = await kakaoLoginApi(getKakaoAuthorizationCode());
      saveUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getKakaoAuthorizationCode = (): string => {
    const urlParams = new URL(window.location.href).searchParams;
    return urlParams.get('code') || '';
  };

  const redirectPage = (isSignUp: boolean) => {
    if (isSignUp) {
      Router.replace({
        pathname: '/member/profile',
        query: { isSignUp },
      }); // 뒤로가기를 통해 로그인 redirection 페이지로 재접근 하는 것을 방지
    }
    Router.replace('/');
  };

  const saveUser = async (data: DataProps) => {
    // nullish 체크를 통해 에러가 아닌 undefined를 표시하도록 함.
    const id: string = data?.id;
    const kakaoUid: number = data?.kakao_uid;
    const nickName: string = data?.nickname;
    const profileImg: string = data?.profile_img;
    const isSignUp: boolean = data?.is_signup;
    const accessToken: string = data?.access_token;
    const refreshToken: string = data?.refresh_token;

    await saveToken(accessToken); // 토큰을 쿠키에 저장 비동기 함수
    await saveRefreshToken(refreshToken); // 리프레시 토큰을 쿠키에 저장하는 비동기 함수

    dispatch(loginAction({ id, profileImg, nickName, kakaoUid })); // 개인정보를 redux에 저장

    redirectPage(isSignUp);
  };

  useEffect(() => {
    dataFetch();
  }, []);

  return <Loading text="로그인 진행 중 입니다." />;
};

redirect.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};

export default redirect;
