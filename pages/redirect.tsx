import { ReactElement, useEffect } from 'react';
import type { NextPageWithLayout } from 'pages/_app';
import { AppLayout } from 'components/layout';
import { NextPageContext } from 'next';
import { kakaoLoginApi } from 'pages/api/test';
import Router from 'next/router';
import { useDispatch } from 'react-redux';
import { loginAction } from 'store/user';
import { saveToken } from 'utils/token';

// 카카오 로그인 리다이렉트용.
interface Tokens {
  access_token?: string;
  token_type?: string;
  refresh_token?: string;
  expires_in?: number;
  scope?: string;
  refresh_token_expries_in?: number;
}
interface Props {
  data?: any;
  status?: number;
}
const redirect: NextPageWithLayout = ({ data, status }: Props) => {
  const dispatch = useDispatch();
  const saveUser = async() => {
    // nullish 체크를 통해 에러가 아닌 undefined를 표시하도록 함.
    const userId: string = data?.id;
    const userNickname: string = data?.kakao_account?.profile?.nickname;
    const userProfileImage: string = data?.kakao_account?.profile?.thumbnail_image_url;
    const accessToken: string = data?.access_token;
    dispatch(loginAction({ userId, userProfileImage, userNickname })); // 개인정보를 redux에 저장
    await saveToken(accessToken); // 토큰을 쿠키에 저장 비동기 함수
  }
  useEffect(() => {
    if (status === 200) {
      saveUser();
      Router.push('/home');
    }
  }, []);
  return <div>wait ... redirect...</div>;
};

redirect.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};

// url 의 params 를 가져와서 초기값으로 세팅하기 SSR
redirect.getInitialProps = async (context: NextPageContext) => {
  const code = context.query.code as string; // 타입 단언
  const res = await kakaoLoginApi(code);
  return { data: res.data, status: res.status };
};

export default redirect;
