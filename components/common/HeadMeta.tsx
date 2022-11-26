const HeadMeta = () => {
  return (
    <>
      {/* SEO최적화, 나중에 동적으로 변경할 예정임.  */}
      <title>{'당신의 시간을 캐치캐치'}</title>
      <meta
        name="description"
        content={'유저들이 직접 만들고 푸는 퀴즈 컨텐츠! 캐치캐치에 접속해서 즐겨보세요 😊'}
      />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta property="og:title" content={'캐치캐치'} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={'https://catchcatch.link'} />
      <meta property="og:image" content={'/assets/img/catch_share.png'} />
      <meta property="og:article:author" content={'캐치캐치'} />
      <link rel="icon" href="/favicon.ico" />

      {/* 스크립트 구문  */}
      <script async defer src="https://developers.kakao.com/sdk/js/kakao.min.js"></script>
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7873415242511235"
        crossOrigin="anonymous"
      ></script>
    </>
  );
};

export default HeadMeta;