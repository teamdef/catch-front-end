import type { ReactElement } from 'react';
import type { NextPageWithLayout } from 'pages/_app';
import { AppLayout } from 'components/layout';


const Page: NextPageWithLayout = () => {
  return <div>퀴즈 풀이 메인 페이지 예정</div>;
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};
export default Page;

