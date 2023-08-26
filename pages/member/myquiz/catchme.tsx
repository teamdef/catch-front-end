import { NotFound } from 'components/common';
import { AppLayout, HeaderLayout } from 'components/layout';
import { ReactElement } from 'react';

const Page = () => {
  return <NotFound text="준비 중 입니다." />;
};
Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <AppLayout>
      <HeaderLayout>{page}</HeaderLayout>
    </AppLayout>
  );
};

export default Page;
