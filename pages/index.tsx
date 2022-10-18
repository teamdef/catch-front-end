import { ReactElement, useState } from 'react';
import type { NextPageWithLayout } from 'pages/_app';
import { AppLayout, HeaderLayout } from 'components/layout';
import { Card, QuizCard } from 'components/common';
import styled from 'styled-components';
import { IoIosArrowForward } from 'react-icons/io';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { RootState } from 'store';
import { useSelector } from 'react-redux';
import Head from 'next/head';

// Import Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';



const Page: NextPageWithLayout = () => {
  const router = useRouter();
  const { isLoggedin } = useSelector((state: RootState) => state.user);

  const goQuizCreateIndex = () => {
    if (isLoggedin) {
      router.push('/quiz/create');
    } else {
      //setLoginModal(true);
    }
  };

  return (
    <div>
      <Head>
        <title>캐치캐치</title>
        <meta name="description" content="나만의 퀴즈를 만들고 공유해보세요!" />
        <link rel="icon" href="/catch_favicon.ico" />
        <meta property="og:type" content="website" />
      </Head>

      <main>
        <Background>
          <MyQuizList>
            <Swiper spaceBetween={0} pagination={{ clickable: true }} modules={[Pagination]} loop={isLoggedin}>
              {isLoggedin && (
                <SwiperSlide>
                  <MyQuizCard
                    url={
                      'https://press.com.mx/wp-content/uploads/2022/01/licenciatura-en-psicologi%CC%81a-1140x641.png'
                    }
                  >
                    <div id="quiz-title">팡머가 좋아하는 것들</div>
                    <div id="quiz-info">참여 19 · 평균점수 7.7점</div>
                    <div id="quiz-detail-btn-wrapper">
                      <button
                        id="quiz-detail-btn"
                        onClick={() => {
                          router.push('/quiz/detail/q');
                        }}
                      >
                        자세히 보기
                      </button>
                    </div>
                  </MyQuizCard>
                </SwiperSlide>
              )}
              <SwiperSlide>
                <CreateCard>
                  <span>{isLoggedin ? '퀴즈를 만들어 볼까요 ? ✨' : '퀴즈를 만들려면 로그인이 필요해요! 🤗'}</span>
                  <button id="create-btn" onClick={goQuizCreateIndex}>
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
              <QuizCard
                userName="전하영"
                quizDate="6일전"
                quizTitle="메이플스토리 몬스터 퀴즈"
                quizCount={10}
                quizPlay={365}
                quizRoute="/home"
                quizThumbnail="https://t1.daumcdn.net/cfile/tistory/205419184B3C998139"
              />
              <QuizCard
                userName="배광호"
                quizDate="12일전"
                quizTitle="haha ha 고양이 이름 맞추기"
                quizCount={6}
                quizPlay={111}
                quizRoute="/home"
                quizThumbnail="https://thumbs.gfycat.com/PoshBountifulAndalusianhorse-size_restricted.gif"
              />
              <QuizCard
                userName="진현우"
                quizDate="14일전"
                quizTitle="팡머가 좋아하는 것들"
                quizCount={7}
                quizPlay={19}
                quizRoute="/home"
              />
            </ImageCardContainer>
          </RecentQuizList>
        </Background>
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
  padding-top: 3rem;
  position: relative;
  background-color: #fff6f7;
`;

const RecentQuizList = styled.div`
  padding: 1rem;
  background-color: #fff;
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
  url?: string;
}

const MyQuizList = styled.div`
  #title {
    padding: 1rem 0.5rem 1rem 0.5rem;
    color: white;
    font-size: 18px;
  }
  .swiper-wrapper {
    padding-bottom: 25px;
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
  background: linear-gradient(
      to bottom,
      rgba(20, 20, 20, 0) 10%,
      rgba(20, 20, 20, 0.1) 25%,
      rgba(20, 20, 20, 0.25) 50%,
      rgba(20, 20, 20, 0.5) 75%,
      rgba(20, 20, 20, 0.75) 100%
    ),
    url(${(props) => props.url});
  background-size: cover;

  flex-direction: column;
  justify-content: flex-end;
  color: #fff;
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
      &:hover {
        cursor: pointer;
      }
    }
  }
`;
export default Page;
