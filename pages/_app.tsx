import '../styles/globals.css';
import type { ReactElement, ReactNode } from 'react';
import type { AppProps } from 'next/app';
import type { NextPage } from 'next';
import { wrapper, persistor } from 'store';
import { GetServerSideProps } from 'next';
import { PersistGate } from 'redux-persist/integration/react';
import Cookies from 'universal-cookie';
export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

/*
    NextPageWithLayout으로 Page의 타입을 지정하면,
    getLayout 속성함수를 사용할 수 있게된다. (사용해도 되고 안해도 되고 )

  */

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
}; // 기존 AppProps타입에 Layout을 추가한 것.

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // 페이지 단위에서 정의한 레이아웃이 있다면 해당 레이아웃을 적용한다.
  const getLayout = Component.getLayout ?? ((page) => page);
  return <PersistGate persistor={persistor}>{getLayout(<Component {...pageProps} />)}</PersistGate>;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookieReq = context.req ? context.req.headers.cookie : null;
  const cookie = new Cookies();
  console.log(cookie.get('access_token'));
/*
  return {
    redirect: {
      destination: '/',
      permanent: false,
    },
    props: { data: 'zz' },
  };*/
  return {
    props: { data: 'zz' },
  };

};

export default wrapper.withRedux(MyApp);
