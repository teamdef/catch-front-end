import { AppLayout, HeaderLayout } from 'components/layout';
import { ReactElement } from 'react';

const Page = () => {
  return <div />;
};
Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <AppLayout>
      <HeaderLayout>{page}</HeaderLayout>
    </AppLayout>
  );
};

export default Page;
