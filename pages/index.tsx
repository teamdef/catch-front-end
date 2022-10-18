import { ReactElement, useState, useEffect } from 'react';
import type { NextPageWithLayout } from 'pages/_app';
import { AppLayout, HeaderLayout } from 'components/layout';
import { Card, NotFound, QuizCard } from 'components/common';
import styled, { keyframes, css } from 'styled-components';
import { IoIosArrowForward } from 'react-icons/io';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { RootState } from 'store';
import { useSelector } from 'react-redux';
import { useModal } from 'hooks';
import { UserQuizListApi } from 'pages/api/test';
import Head from 'next/head';

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
    <div>
      <Head>
        <title>캐치캐치</title>
        <meta name="description" content="나만의 퀴즈를 만들고 공유해보세요!" />
        <link rel="icon" href="/catch_favicon.ico" />
        <meta property="og:type" content="website" />
      </Head>

      <main>
        <>
          <Background>
            <MyQuizList>
              <div id="title">
                <div>내가 만든 퀴즈들 🐻‍❄️</div>
              </div>
              <Swiper spaceBetween={0} pagination={{ clickable: true }} modules={[Pagination]} loop={isLoggedin}>
                {isLoggedin &&
                  (myQuizList ? (
                    myQuizList?.map((quiz, index) => {
                      return (
                        <SwiperSlide>
                          <MyQuizCard key={index} url={quiz?.thumbnail}>
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
                          </MyQuizCard>
                        </SwiperSlide>
                      );
                    })
                  ) : (
                    <SwiperSlide>
                      <SkeletonMyQuizCard url={null}>
                        <div id="quiz-title"></div>
                        <div id="quiz-info"></div>
                        <div id="quiz-detail-btn-wrapper">
                          <div id="quiz-detail-btn"></div>
                        </div>
                      </SkeletonMyQuizCard>
                    </SwiperSlide>
                  ))}
                <SwiperSlide>
                  <CreateCard>
                    <span>{isLoggedin ? '퀴즈를 만들어 볼까요 ? ✨' : '퀴즈를 만들려면 로그인이 필요해요! 🤗'}</span>
                    <button id="create-btn" onClick={checkLogin}>
                      새로 만들기
                    </button>
                  </CreateCard>
                </SwiperSlide>
              </Swiper>
            </MyQuizList>

            <RecentQuizList>
              <div id="title">
                <div>최근에 생성된 퀴즈에요! 🐣</div>
                <Link passHref href="/recent">
                  <a>
                    전체 목록
                    <IoIosArrowForward />
                  </a>
                </Link>
              </div>
              <ImageCardContainer>
                <NotFound title={'최근 생성한 문제를 보려면?'} subTitle={'잠시동안만 목록보기를 이용해주세요'} />
              </ImageCardContainer>
            </RecentQuizList>
          </Background>

          <RenderLoginModal />
        </>
      </main>
    </div>
  );
};
Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <AppLayout>
      <HeaderLayout>{page}</HeaderLayout>
    </AppLayout>
  );
};

const Background = styled.div`
  position: relative;
  background-color: #fff6f7;
`;

const RecentQuizList = styled.div`
  padding: 1rem;
  background-color: #fff;
  margin-bottom: 7rem;
  #title {
    padding: 1rem 0.5rem 2rem 0.5rem;
    color: #595959;
    font-weight: bold;
    font-size: 18px;
    display: flex;
    justify-content: space-between;
    a {
      font-weight: 400;
      display: flex;
      align-items: center;
      color: #ff4d57;
      svg {
        margin-left: 4px;
      }
    }
  }
`;
const ImageCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: inherit;
  flex-wrap: nowrap;
  align-items: center;
  width: 95%;
  margin: 0 auto;
`;
interface ImageCardProps {
  url: string | null;
}

const MyQuizList = styled.div`
  margin-bottom: 1rem;
  padding-top: 2rem;
  background-color: #fff;
  #title {
    padding: 0 0 2rem 1.5rem;
    color: #595959;
    font-weight: bold;
    font-size: 18px;
    display: flex;
    justify-content: space-between;
  }
  .swiper-wrapper {
    padding-bottom: 2rem;
  }
  .swiper-pagination {
    position: relative;
    .swiper-pagination-bullet {
      width: 1rem;
      height: 1rem;
      &:last-child {
        background-color: #ffa5aa;
        position: relative;
        &:after {
          content: '+';
          color: #fff;
          font-size: 17px;
          position: absolute;
          top: -5px;
          right: 3px;
        }
      }
    }
    .swiper-pagination-bullet-active {
      background-color: #ff4d57;
    }
  }
`;

const CustomCard = styled(Card)`
  height: 18rem;
  border-radius: 30px;
  margin: 0 auto;
  width: 90%;
  @media (max-width: 400px) {
    width: 95%;
    height: 15rem;
  }
  display: flex;
`;
const CreateCard = styled(CustomCard)`
  text-align: center;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  span {
    position: relative;
    display: block;
    color: #888;
    font-size: 18px;
  }
  button {
    background-color: #ff4d57;
    border: none;
    border-radius: 2rem;
    font-size: 1rem;
    color: #fff;
    font-weight: 500;
    padding: 0.75rem 1.75rem 0.75rem 1.75rem;
    margin-top: 50px;
    &:hover {
      cursor: pointer;
    }
  }
`;
const MyQuizCard = styled(CustomCard)<ImageCardProps>`
  ${(props) =>
    props.url
      ? css`
          background: linear-gradient(
              to bottom,
              rgba(20, 20, 20, 0) 10%,
              rgba(20, 20, 20, 0.1) 25%,
              rgba(20, 20, 20, 0.25) 50%,
              rgba(20, 20, 20, 0.5) 75%,
              rgba(20, 20, 20, 0.75) 100%
            ),
            url(${props.url});
          background-size: cover;
        `
      : css`
          background: url('/assets/img/catch_character4.jpg');
          background-size: cover;
          background-repeat: no-repeat;
        `}

  flex-direction: column;
  justify-content: flex-end;
  color: ${(props) => (props.url ? '#fff' : '#595959')};
  padding: 1.5rem;
  #quiz-title {
    font-size: 24px;
    font-weight: 500;
  }
  #quiz-info {
    font-weight: 300;
  }
  #quiz-detail-btn-wrapper {
    display: flex;
    justify-content: flex-end;
    margin-top: 0.5rem;
    button {
      border-radius: 20px;
      border: none;
      padding: 0.5rem 1rem 0.5rem 1rem;
      color: #595959;
      color: ${(props) => (props.url ? '#595959' : '#fff')};
      background-color: ${(props) => (props.url ? 'none' : '#ff4d57')};
      &:hover {
        cursor: pointer;
      }
    }
  }
`;
const gradient = keyframes` 
  0% {background-color: rgba(165, 165, 165, 0.1);}
  50% {background-color: rgba(165, 165, 165, 0.3);}
  100% {background-color: rgba(165, 165, 165, 0.1);}
`;

const SkeletonMyQuizCard = styled(MyQuizCard)`
  background: none;
  background-color: #eee;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1.5rem;
  #quiz-title {
    animation: ${gradient} 1.5s linear infinite alternate;
    height: 30px;
    background-color: #d6d6d6;
    width: 300px;
    font-weight: 500;
    border-radius: 25px;
  }
  #quiz-info {
    animation: ${gradient} 1.5s linear infinite alternate;
    height: 16px;
    width: 200px;
    margin-top: 4px;
    border-radius: 25px;
    background-color: #d6d6d6;
  }
  #quiz-detail-btn-wrapper {
    display: flex;
    justify-content: flex-end;
    margin-top: 0.5rem;
    div {
      animation: ${gradient} 1.5s linear infinite alternate;
      border-radius: 25px;
      padding: 0.5rem 1rem 0.5rem 1rem;
      background-color: #d6d6d6;
      height: 40px;
      width: 110px;
    }
  }
`;
export default Page;
