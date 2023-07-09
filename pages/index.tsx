import { ReactElement, useState, useEffect } from 'react';
import type { NextPageWithLayout } from 'pages/_app';
import { AppLayout, HeaderLayout } from 'components/layout';
import { RecentQuiz, MyQuizCard } from 'components/common';
import { useRouter } from 'next/router';
import { RootState } from 'store';
import { useSelector } from 'react-redux';
import { UserQuizListApi } from 'pages/api/quiz';
import * as S from 'styles/index.style';
import { FlatButton } from 'styles/common';

// Import Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';

import PopularQuizSection from 'components/mainPage/PopularQuizSection';
import NoisyQuizSection from 'components/mainPage/NoisyQuizSection';
import AllQuizSection from 'components/mainPage/AllQuizSection';
import Banner from 'components/mainPage/Banner';
const Page: NextPageWithLayout = () => {
  const router = useRouter();
  const { isLoggedin, userId } = useSelector((state: RootState) => state.user);
  const [myQuizList, setMyQuizList] = useState<MyQuizType[] | null>(null);


  const goQuizCreateIndex = () => {
    router.push('/quiz/create');
  };
  const goLogin = () => {
    router.push('/member/login');
  };


  return (
    <>
      <S.Background>
        <Banner/>
        <PopularQuizSection />
        <NoisyQuizSection />
        <AllQuizSection/>
      </S.Background>
    </>
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
