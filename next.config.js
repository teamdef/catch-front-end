/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // 렌더링 2회 방지
  async redirects() { // 라우터 직접 접근을 막는 용도
    return [
      {
        source: '/404',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig
