// import '../styles/globals.css';
import { ReactElement, ReactNode, useEffect } from 'react';

import { ThemeProvider } from 'styled-components';
import { theme } from 'styles/theme';
import GlobalStyle from 'styles/GlobalStyle';
import 'styles/font/NanumSquare.css';

import type { AppProps } from 'next/app';
import type { NextPage } from 'next';
import Script from 'next/script';
import { wrapper, persistor } from 'store';
import { PersistGate } from 'redux-persist/integration/react';
import { useRouter } from 'next/router';
import { getCookie } from 'utils/token';
import * as gtag from 'lib/gtag';
import { logoutAction } from 'store/user';
import { useDispatch } from 'react-redux';
import TagManager from 'react-gtm-module';

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
  const getLayout = Component.getLayout ?? ((page) => page);
  const router = useRouter();
  const dispatch = useDispatch();

  const setScreenSize = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

  useEffect(() => {
    TagManager.initialize({ gtmId: gtag.GTM_ID });
    setScreenSize();
    window.addEventListener('resize', () => {
      setScreenSize();
    });
  }, []);
  // Next.js에서는 document.referrer을 사용할 수 없다
  // 현재 코드를 세션에 저장해 두었다가 다른 코드로 이동하면 저장되어있던 path를 prevPath로 저장해주고 현재 path를 currentPath에 덮어쓰기 해준다.
  // https://velog.io/@deli-ght/Next.js%EC%97%90%EC%84%9C-document.referrer%EA%B0%80-%EC%9E%91%EB%8F%99%ED%95%98%EC%A7%80-%EC%95%8A%EB%8A%94-%EC%9D%B4%EC%9C%A0
  const storePathValues = () => {
    const storage = globalThis?.sessionStorage;
    if (!storage) return;
    // Set the previous path as the value of the current path.
    const prevPath = storage.getItem('currentPath');
    if (prevPath) storage.setItem('prevPath', prevPath);
    // Set the current path value by looking at the browser's location object.
    storage.setItem('currentPath', globalThis.location.pathname);
  };

  // 페이지 이동 마다 쿠키에 저장된 토큰 및 isLoggedIn 확인하기
  useEffect(() => {
    // 쿠키 값 받아오기
    const accessToken = getCookie('access_token');
    const refreshToken = getCookie('refresh_token');

    if (!!accessToken === false || !!refreshToken === false) {
      dispatch(logoutAction());
    }
  }, [router]);

  useEffect(() => storePathValues, [router.asPath]);

  return (
    <>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`} />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <PersistGate persistor={persistor}>{getLayout(<Component {...pageProps} />)}</PersistGate>
      </ThemeProvider>
    </>
  );
}

export default wrapper.withRedux(MyApp);
