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

  const fetchMyQuizSetList = async () => {
    try {
      const res = await UserQuizListApi(userId);
      parseMyQuizSetList(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const parseMyQuizSetList = (data: any) => {
    const _myQuizSetList: MyQuizType[] = data.map((quiz: any) => {
      const { id, average, set_title, thumbnail, solver_cnt } = quiz;
      const _myQuiz: MyQuizType = {
        id,
        set_title,
        solver_cnt,
        average: average.toFixed(2), // 소수점 둘째자리 기준 반올림
        thumbnail: thumbnail ?? null, // 썸네일이 없을 경우 서버에서 "" 반환
      };
      return _myQuiz;
    });
    setMyQuizList(_myQuizSetList);
  };
  useEffect(() => {
    if (isLoggedin) fetchMyQuizSetList();
  }, []);

  return (
    <>
      <S.Background>
        <PopularQuizSection />
        <NoisyQuizSection/>
        {/* <S.MyQuizList>
          <div id="title">
            <div>내가 만든 퀴즈들 🐻‍❄️</div>
          </div>
          <Swiper spaceBetween={0} pagination={{ clickable: true }} modules={[Pagination]} loop={false}>
            {isLoggedin &&
              (myQuizList ? (
                myQuizList.map((quiz) => {
                  return (
                    <SwiperSlide>
                      <MyQuizCard key={quiz.id} myQuiz={quiz} />
                    </SwiperSlide>
                  );
                })
              ) : (
                <SwiperSlide>
                  <S.SkeletonMyQuizCard url={null}>
                    <div id="quiz-title"></div>
                    <div id="quiz-info"></div>
                    <div id="quiz-detail-btn-wrapper">
                      <div id="quiz-detail-btn"></div>
                    </div>
                  </S.SkeletonMyQuizCard>
                </SwiperSlide>
              ))}
            <SwiperSlide>
              <S.CreateCard>
                <span>{isLoggedin ? '퀴즈를 만들어 볼까요 ? ✨' : '퀴즈를 만들려면 로그인이 필요해요! 🤗'}</span>
                {isLoggedin ? (
                  <FlatButton onClick={goQuizCreateIndex}>새로 만들기</FlatButton>
                ) : (
                  <FlatButton onClick={goLogin}>로그인</FlatButton>
                )}
              </S.CreateCard>
            </SwiperSlide>
          </Swiper>
        </S.MyQuizList> */}

        {/* <S.RecentQuizList>
          <div id="section-title">
            <div>최근에 생성된 퀴즈에요! 🐣</div>
          </div>
          <div id="section-contents">
            <RecentQuiz />
          </div>
        </S.RecentQuizList> */}
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
