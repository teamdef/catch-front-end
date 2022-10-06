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
          <title>캐치캐치</title>
          <link rel="icon" href="/catch_favicon.ico" />
          <script async defer src="https://developers.kakao.com/sdk/js/kakao.min.js"></script>
          <meta property="og:type" content="website" />
          <meta property="og:title" content="캐치캐치" />
          <meta property="og:description" content="나만의 퀴즈를 만들고 공유해보세요! " />
          <meta property="og:image" content={'/assets/img/catchcatch_logo1.png'} />
          
        </Head>
        <body>
          <Main />
          <NextScript />
          <div id="modal-root" />
        </body>
      </Html>
    );
  }
}
