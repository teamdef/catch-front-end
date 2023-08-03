import { ReactElement } from 'react';
import type { NextPageWithLayout } from 'pages/_app';
import { AppLayout, HeaderLayout } from 'components/layout';

// Import Swiper
import 'swiper/css';
import 'swiper/css/pagination';
import { AllQuizSetWrapper, Banner } from 'components/partials/main';
import styled from 'styled-components';
import LoginText from 'components/partials/main/LoginText';

const Page: NextPageWithLayout = () => {
  return (
    <Wrapper>
      <LoginText />
      <Banner />
      <AllQuizSetWrapper />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 8px;
`;

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <AppLayout>
      <HeaderLayout>{page}</HeaderLayout>
    </AppLayout>
  );
};

export default Page;
