import { ReactElement } from 'react';
import type { NextPageWithLayout } from 'pages/_app';
import { AppLayout, HeaderLayout } from 'components/layout';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import styled from 'styled-components';
import { AllQuizSetWrapper, Banner, LoginText, Wellcome } from 'components/partials/main';
// Import Swiper
import 'swiper/css';
import 'swiper/css/pagination';
import Floating from 'components/common/Floating';

const Page: NextPageWithLayout = () => {
  const { isLoggedin } = useSelector((state: RootState) => state.user);
  return (
    <Wrapper>
      <Floating />
      {isLoggedin ? <Wellcome /> : <LoginText />}
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
