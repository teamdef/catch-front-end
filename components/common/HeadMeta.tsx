import Head from 'next/head';

interface HeadTypes {
  title?: string;
  description?: string;
  thumbnail?: string;
  url?: string;
}
const HeadMeta = ({ title, description, thumbnail, url }: HeadTypes) => {
  return (
    <Head>
      <title>{title || '당신의 마음을 캐치캐치'}</title>
      <meta
        name="description"
        content={description || '유저들이 직접 만들고 푸는 퀴즈 컨텐츠! 캐치캐치에 접속해서 즐겨보세요 😊'}
      />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta property="og:title" content={title || '캐치캐치'} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url || 'https://catchcatch.link'} />
      <meta property="og:image" content={thumbnail || '/assets/img/catch_share.png'} />
      <meta property="og:article:author" content={'캐치캐치'} />
      <link rel="icon" href="/catch_favicon.ico" />
    </Head>
  );
};

export default HeadMeta;