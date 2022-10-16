import '../styles/globals.css';
import { ReactElement, ReactNode, useEffect } from 'react';
import type { AppProps, AppContext } from 'next/app';
import type { NextPage } from 'next';
import { useSelector } from 'react-redux';
import { wrapper, persistor } from 'store';
import { PersistGate } from 'redux-persist/integration/react';
import { authAxios } from 'utils/customAxios';
import { RootState } from 'store';
import { useRouter } from 'next/router';
import { getCookie } from 'utils/token';

// NextPageWithLayout으로 Page의 타입을 지정하면,
// getLayout 속성함수를 사용할 수 있게된다. (사용해도 되고 안해도 되고 )
export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
}; // 기존 AppProps타입에 Layout을 추가한 것.

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // 페이지 단위에서 정의한 레이아웃이 있다면 해당 레이아웃을 적용한다.
  const { isLoggedin } = useSelector((state: RootState) => state.user);
  const getLayout = Component.getLayout ?? ((page) => page);
  const router = useRouter();

  // Next.js에서는 document.referrer을 사용할 수 없다
  // 현재 코드를 세션에 저장해 두었다가 다른 코드로 이동하면 저장되어있던 path를 prevPath로 저장해주고 현재 path를 currentPath에 덮어쓰기 해준다.
  // https://velog.io/@deli-ght/Next.js%EC%97%90%EC%84%9C-document.referrer%EA%B0%80-%EC%9E%91%EB%8F%99%ED%95%98%EC%A7%80-%EC%95%8A%EB%8A%94-%EC%9D%B4%EC%9C%A0
  const storePathValues = () => {
    const storage = globalThis?.sessionStorage;
    if (!storage) return;
    // Set the previous path as the value of the current path.
    const prevPath = storage.getItem('currentPath');
    prevPath && storage.setItem('prevPath', prevPath);
    // Set the current path value by looking at the browser's location object.
    storage.setItem('currentPath', globalThis.location.pathname);
  };

  // 카카오 sdk 초기화
  // useEffect(() => {
  //   if (!window.Kakao.isInitialized()) {
  //     window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY);
  //   }
  // }, []);

  useEffect(() => {
    const access_token = getCookie('access_token');
    if (access_token) {
      authAxios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
    }
  }, [router]);

  useEffect(() => storePathValues, [router.asPath]);

  useEffect(() => {
    if (isLoggedin) {
      const now_router = router.pathname;
      if (now_router === '/home') router.push('/home'); // 현재 라우터가 home 이라면 home으로
      else router.push(now_router); // 현재 라우터가 home이 아니라면 기존에 있더 라우터로
    }
  }, [isLoggedin]);

  return (
    <>
      <PersistGate persistor={persistor}>{getLayout(<Component {...pageProps} />)}</PersistGate>
    </>
  );
}

//cookie에서 token을 가져와서 axios의 header에 추가
// _app 에서 getInitialProps 에서 가져오는 context의 타입은 AppContext임.
// https://github.com/vercel/next.js/discussions/36832

MyApp.getInitialProps = async ({ Component, ctx }: AppContext) => {
  console.log('흐음 ');
  const cookie = ctx.req ? ctx.req.headers.cookie : null;
  if (cookie) {
    // 빠르게 정규식으로 한다 .. 문자열 내장함수로 하게되면 매우 비효율적...
    let match = cookie.match(new RegExp('(^| )' + 'access_token' + '=([^;]+)'));
    if (match) {
      const access_token = match[2]; // RegExp 객체 반환값 참고
      authAxios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
    }
  }
  const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

  return { pageProps };
};

export default wrapper.withRedux(MyApp);
