import type { ReactElement } from 'react';
import type { NextPageWithLayout } from 'pages/_app';
import { AppLayout } from 'components/layout';

const Page: NextPageWithLayout = () => {
  return <div>404 NOT FOUND 잘못된 경로이거나 존재하지 않는 경로입니다.</div>;
};
Page.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};

export default Page;
