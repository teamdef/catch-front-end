import { ReactElement } from 'react';
import type { NextPageWithLayout } from 'pages/_app';
import { AppLayout, HeaderLayout } from 'components/layout';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
// Import Swiper
import 'swiper/css';
import 'swiper/css/pagination';
import { AllQuizSetWrapper, Banner } from 'components/partials/main';
import styled from 'styled-components';
import LoginText from 'components/partials/main/LoginText';
import Wellcome from 'components/partials/main/Wellcome';

const Page: NextPageWithLayout = () => {
  const { isLoggedin, user_id } = useSelector((state: RootState) => state.user);
  console.log(isLoggedin, user_id);
  return (
    <Wrapper>
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
