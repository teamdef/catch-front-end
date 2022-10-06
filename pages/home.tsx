import { ReactElement } from 'react';
import type { NextPageWithLayout } from 'pages/_app';
import { AppLayout, HeaderLayout } from 'components/layout';
import { Card, Navbar } from 'components/common';
import styled from 'styled-components';
import { RiHeart3Fill } from 'react-icons/ri';
import { useRouter } from 'next/router';
// Import Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';

const Home: NextPageWithLayout = () => {
  const router = useRouter();
  return (
    <>
      <Background>
        <MyQuizList>
          <Swiper
            spaceBetween={0}
            slidesPerView={1}
            pagination={true}
            modules={[Pagination]}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
          >
            <SwiperSlide>
              <CustomCard>
                <CreateCard>
                  <span>생성된 퀴즈가 없어요 !</span>
                  <button
                    id="create-btn"
                    onClick={() => {
                      router.push('/quiz/create');
                    }}
                  >
                    새로 만들기
                  </button>
                </CreateCard>
              </CustomCard>
            </SwiperSlide>
            <SwiperSlide>
              <CustomCard>
                <CreateCard>
                  <span>생성된 퀴즈가 없어요 !</span>
                  <button
                    id="create-btn"
                    onClick={() => {
                      router.push('/quiz/create');
                    }}
                  >
                    새로 만들기
                  </button>
                </CreateCard>
              </CustomCard>
            </SwiperSlide>
          </Swiper>
        </MyQuizList>

        <PopularQuizList>
          <div id="title">인기 문제집 (❁´◡`❁)</div>
          <ImageCardContainer>
            <ImageCard
              url={
                'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
              }
            >
              <div id="like">
                <RiHeart3Fill />
                <div id="count">12</div>
              </div>
              <div>
                <div id="card-title">Do You Know Me?</div>
                <div id="card-sub-title">당신의 친구들은 당신에 대해서 얼마나 알고 있을까요?</div>
              </div>
            </ImageCard>
            <ImageCard
              url={'https://press.com.mx/wp-content/uploads/2022/01/licenciatura-en-psicologi%CC%81a-1140x641.png'}
            >
              <div id="like">
                <RiHeart3Fill />
                <div id="count">12</div>
              </div>
              <div>
                <div id="card-title">MBTI 기반 행동 맞추기</div>
                <div id="card-sub-title">나는 이런 상황에 이런 행동을 한다!</div>
              </div>
            </ImageCard>
          </ImageCardContainer>
        </PopularQuizList>
      </Background>
    </>
  );
};

const Background = styled.div`
  padding-top: 3rem;
  padding-bottom: 80px;
  position: relative;
`;

const PopularQuizList = styled.div`
  padding: 1rem;
  #title {
    padding: 1rem 0.5rem 1rem 0.5rem;
    color: #000;
    font-weight: bold;
    font-size: 18px;
  }
`;
const ImageCardContainer = styled.div`
  display: flex;
  width: inherit;
  flex-wrap: nowrap;
`;
interface ImageCardProps {
  url?: string;
}

const ImageCard = styled.div<ImageCardProps>`
  #like {
    display: flex;
    align-items: center;
    justify-content: right;
  }
  #card-title {
    font-size: 20px;
    font-size: bold;
  }
  #card-sub-title {
    font-size: 12px;
  }

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: white;
  width: 240px;
  height: 10rem;
  border-radius: 12px;
  padding: 1rem;
  background: linear-gradient(
      to bottom,
      rgba(20, 20, 20, 0) 10%,
      rgba(20, 20, 20, 0.25) 25%,
      rgba(20, 20, 20, 0.5) 50%,
      rgba(20, 20, 20, 0.75) 75%,
      rgba(20, 20, 20, 1) 100%
    ),
    url(${(props) => props.url});
  margin-right: 0.5rem;
  background-size: cover;
  background-repeat: no-repeat;
  &:last-child {
    margin: 0;
  }
  transition: all 0.1s ease-in-out;
  &:hover {
    transform: scale(1.025);
  }
`;

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
      width: 10px;
      height: 10px;
    }
    .swiper-pagination-bullet-active {
      background-color: #ff4d57;
    }
  }
`;
const CustomCard = styled(Card)`
  margin: 0 auto;
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-radius: 30px;
  height: 20rem;
`;
const CreateCard = styled.div`
  text-align: center;
  span {
    position: relative;
    display: block;
    color: #777;
  }
  button {
    margin: 50px 0;
    padding: 10px 20px;
    background-color: #ff4d57;
    border: none;
    border-radius: 20px;
    font-size: 1.2rem;
    font-weight: bold;
    color: #fff;
  }
`;
Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <AppLayout>
      <HeaderLayout>{page}</HeaderLayout>
    </AppLayout>
  );
};
export default Home;
