import { ReactElement } from 'react';
import type { NextPageWithLayout } from 'pages/_app';
import { AppLayout, HeaderLayout } from 'components/layout';
// import { useRouter } from 'next/router';
import * as S from 'styles/index.style';

// Import Swiper
import 'swiper/css';
import 'swiper/css/pagination';
import { AllQuizSection, Banner } from 'components/partials/main';

const Page: NextPageWithLayout = () => {
  // const router = useRouter();

  // const goQuizCreateIndex = () => {
  //   router.push('/quiz/create');
  // };
  // const goLogin = () => {
  //   router.push('/member/login');
  // };

  return (
    <S.Background>
      <Banner />
      <AllQuizSection />
    </S.Background>
  );
};
Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <AppLayout>
      <HeaderLayout>{page}</HeaderLayout>
    </AppLayout>
  );
};

export default Page;
