import { AppLayout, HeaderLayout } from 'components/layout';
import { ReactElement } from 'react';
import { theme } from 'styles/theme';

const Page = () => {
  return <div>하이염</div>;
};
Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <AppLayout bgColor={theme.colors.primary_bg}>
      <HeaderLayout bgColor={theme.colors.primary_bg}>{page}</HeaderLayout>
    </AppLayout>
  );
};

export default Page;
