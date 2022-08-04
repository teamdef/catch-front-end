import { ReactElement } from 'react';
import type { NextPageWithLayout } from 'pages/_app';
import { AppLayout, HeaderLayout } from 'components/layout';
import { Card } from 'components/common';
import styled from 'styled-components';
import { HiOutlinePlus } from 'react-icons/hi';
import { RiHeart3Fill } from 'react-icons/ri';
import {useRouter} from 'next/router'
const Home: NextPageWithLayout = () => {
  const router = useRouter();
  return (
    <>
      <Background>
        <QuickMenu>
          <MenuCustomCard bgColor={'#e4ccff'}>메뉴1</MenuCustomCard>
          <MenuCustomCard bgColor={'#cfd8dc'}>메뉴2</MenuCustomCard>
          <MenuCustomCard bgColor={'#fffde3'}>메뉴3</MenuCustomCard>
        </QuickMenu>
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
        <MyQuizList>
          <div id="title">문제집 목록</div>
          <QuizCardContainer>
            <CustomCard>
              <HiOutlinePlus size={30} color="white" />
            </CustomCard>
          </QuizCardContainer>
        </MyQuizList>
        <button
          onClick={() => {
            router.push('/quiz/start');
          }}
        >퀴즈만들기 임시</button>
      </Background>
    </>
  );
};

const Background = styled.div`
  height: calc(100vh - 60px);
  background: linear-gradient(180deg, rgba(148, 55, 255, 1) 0%, rgba(148, 55, 255, 1) 50%, rgba(193, 101, 221, 1) 100%);
  position: relative;
`;

const QuickMenu = styled.div`
  display: flex;
  padding: 1rem;
  width: 100%;
`;
const MenuCustomCard = styled(Card)`
  margin-right: 0.5rem;
  height: 5rem;
  border-radius: 12px;
  &:last-child {
    margin: 0;
  }
`;

const PopularQuizList = styled.div`
  padding: 1rem;
  #title {
    padding: 1rem 0.5rem 1rem 0.5rem;
    color: white;
    font-size: 18px;
  }
`;
const ImageCardContainer = styled.div`
  display: flex;
  width: inherit;
  flex-wrap:nowrap;
  
`;
interface ImageCardProps {
  url?: string;
}

const ImageCard = styled.div<ImageCardProps>`
  #like {
    display: flex;
    align-items: center;
    justify-content:right;
  }
  #card-title{
    font-size:20px;
    font-size:bold;
  }
  #card-sub-title{
    font-size:12px;
  }

  display:flex;
  flex-direction:column;
  justify-content:space-between;
  color:white;
  width:240px;
  height: 10rem;
  border-radius: 12px;
  padding:1rem;
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
    padding: 1rem 0.5rem 1rem 0.5rem ;
    color: white;
    font-size: 18px;
  }
  padding: 1rem;
`;
const QuizCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CustomCard = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 30px;
  height: 10rem;
`;
Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <AppLayout>
      <HeaderLayout>{page}</HeaderLayout>
    </AppLayout>
  );
};
export default Home;
