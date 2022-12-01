import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        });
      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
  render() {
    return (
      <Html>
        <Head>
          <script async defer src="https://developers.kakao.com/sdk/js/kakao.min.js"></script>
          {/* 구글 서치 콘솔 소유 확인 메타태그 */}
          <meta name="google-site-verification" content="a4Z71Wfn9SBTmaIDT2fszmWzufGRL99ABDbjxXyOrzY" />
          {/* 네이버 서치 어드바이저 소유 확인 메타태그 */}
          <meta name="naver-site-verification" content="5ad1c88273ffa0429165abb4f1b905a060e03b0b" />
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7873415242511235"
            crossOrigin="anonymous"
          ></script>
        </Head>
        <body>
          <Main />
          <NextScript />
          <div id="react-portal-modal-container" />
        </body>
      </Html>
    );
  }
}
