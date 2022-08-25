/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // 렌더링 2회 방지
  async redirects() { // 라우터 직접 접근을 막는 용도
    return [
      {
        source: '/quiz/create',
        destination: '/quiz/start',
        permanent: true,
      },
      {
        source: '/404',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig
