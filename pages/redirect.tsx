import { ReactElement, useEffect } from 'react';
import type { NextPageWithLayout } from 'pages/_app';
import { AppLayout } from 'components/layout';
import { NextPageContext } from 'next';
import { kakaoLoginApi } from 'pages/api/test';
import Router from 'next/router';

interface Tokens {
  access_token?: string;
  token_type?: string;
  refresh_token?: string;
  expires_in?: number;
  scope?: string;
  refresh_token_expries_in?: number;
}
interface Props {
  tokens?: Tokens;
  status?: number;
}
const redirect: NextPageWithLayout = ({ tokens, status }: Props) => {
  useEffect(() => {
    if (status === 200) {
      Router.push('/test/main');
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
  return { tokens: res.data, status: res.status };
};

export default redirect;
