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
};

module.exports = nextConfig;
