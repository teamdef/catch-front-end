/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // 렌더링 2회 방지
  assetPrefix: process.env.NODE_ENV === 'production' ? 'https://undefined-catchme.github.io/front-end' : '',
  async redirects() {
    // 라우터 직접 접근을 막는 용도
    return [
      {
        source: '/404', // 404 페이지에 URL 접근 방지
        destination: '/home',
        permanent: true,
      },
      {
        source: '/quiz/create/share', // share 페이지에 URL 접근 방지
        destination: '/home',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
