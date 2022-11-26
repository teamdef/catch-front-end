import { ReactElement, useState, useEffect } from 'react';
import type { NextPageWithLayout } from 'pages/_app';
import { AppLayout, HeaderLayout } from 'components/layout';
import { Card, RecentQuiz } from 'components/common';
import { useRouter } from 'next/router';
import { RootState } from 'store';
import { useSelector } from 'react-redux';
import { useModal } from 'hooks';
import { UserQuizListApi } from 'pages/api/quiz';
import * as S from 'styles/index.style';

// Import Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';

interface MyQuizType {
  average: number;
  id: string;
  solverCnt: number;
  thumbnail: string | null;
  set_title: string;
}

const Page: NextPageWithLayout = () => {
  const router = useRouter();
  const { isLoggedin, id } = useSelector((state: RootState) => state.user);
  const [myQuizList, setMyQuizList] = useState<MyQuizType[] | null>(null);
  const [openLoginModal, _, RenderLoginModal] = useModal({
    backgroundClickable: true,
    yesTitle: '로그인',
    noTitle: '닫기',
    yesAction: () => router.push('/member/login'),
    contents: <div>로그인이 필요한 서비스입니다.</div>,
  });

  const checkLogin = () => {
    isLoggedin ? goQuizCreateIndex() : goLogin();
  };
  const goQuizCreateIndex = () => {
    router.push('/quiz/create');
  };
  const goLogin = () => {
    openLoginModal();
  };

  const getMyQuizList = async () => {
    const res = await UserQuizListApi(id);
    const _myQuizList: MyQuizType[] = res?.data?.map((quiz: any) => {
      let _obj: MyQuizType = quiz;
      _obj['average'] = Number(quiz.average.substring(0, 3));
      _obj['id'] = quiz?.id;
      _obj['set_title'] = quiz?.set_title;
      _obj['thumbnail'] = quiz?.thumbnail === '' ? null : quiz.thumbnail;
      _obj['solverCnt'] = Number(quiz?.solverCnt);
      return _obj;
    });
    setMyQuizList(_myQuizList);
  };

  useEffect(() => {
    if (isLoggedin) {
      getMyQuizList();
    }
  }, []);

  return (
    <>
      <S.Background>
        <S.MyQuizList>
          <div id="title">
            <div>내가 만든 퀴즈들 🐻‍❄️</div>
          </div>
          <Swiper spaceBetween={0} pagination={{ clickable: true }} modules={[Pagination]} loop={false}>
            {isLoggedin &&
              (myQuizList ? (
                myQuizList?.map((quiz, index) => {
                  return (
                    <SwiperSlide>
                      <S.MyQuizCard key={quiz?.id} url={quiz?.thumbnail}>
                        <div id="quiz-title">{quiz?.set_title}</div>
                        <div id="quiz-info">
                          참여 {quiz?.solverCnt} · 평균점수 {quiz?.average}점
                        </div>
                        <div id="quiz-detail-btn-wrapper">
                          <button
                            id="quiz-detail-btn"
                            onClick={() => {
                              router.push(`/quiz/detail/${quiz?.id}`);
                            }}
                          >
                            자세히 보기
                          </button>
                        </div>
                      </S.MyQuizCard>
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
                <button id="create-btn" onClick={checkLogin}>
                  새로 만들기
                </button>
              </S.CreateCard>
            </SwiperSlide>
          </Swiper>
        </S.MyQuizList>

        <S.RecentQuizList>
          <div id="section-title">
            <div>최근에 생성된 퀴즈에요! 🐣</div>
          </div>
          <div id="section-contents">
            <RecentQuiz />
          </div>
        </S.RecentQuizList>
      </S.Background>

      <RenderLoginModal />
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
