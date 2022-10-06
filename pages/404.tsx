// 404 not found 페이지. 사용자가 잘못된 링크로 접속하였을 때 보여줄 페이지 디자인 필요

import type { ReactElement } from 'react';
import type { NextPageWithLayout } from 'pages/_app';
import { AppLayout } from 'components/layout';
const Page: NextPageWithLayout = () => {
  return (
    <div>
      notfound
    </div>
  );
};
Page.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};

export default Page;
 