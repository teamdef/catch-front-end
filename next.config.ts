/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // 렌더링 2회 방지
  trailingSlash: true, // 빌드 시 폴더 구조 그대로 생성하도록
  async redirects() {
    // 라우터 직접 접근을 막는 용도
    return [
      {
        source: '/404', // 404 페이지에 URL 접근 방지
        destination: '/',
        permanent: true,
      },
      {
        source: '/quiz/create/share', // share 페이지에 URL 접근 방지
        destination: '/',
        permanent: true,
      },
    ];
  },
  // async rewrites() {
  //   // proxy 설정
  //   return [
  //     {
  //       source: '/:path*', // 원래 보내려 했떤 요청 주소
  //       destination: 'https://catchcatch.link/:path*',
  //       // process.env.NODE_ENV === 'development'
  //       //   ? 'https://dev.catchcatch.link/:path*'
  //       //   : 'https://api.catchcatch.link/:path*', // 실제로 보내진 요청 주소
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
