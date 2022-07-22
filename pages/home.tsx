import type { ReactElement } from 'react';
import type { NextPageWithLayout } from 'pages/_app';
import { AppLayout, HeaderLayout } from 'components/layout';
import { Card,Button } from 'components/common';
import styled from 'styled-components';
const Home: NextPageWithLayout = () => {
  return (
    <>
      <Background>
        <MenuCardContainer>
          <Card>인기 문제집 보기!</Card>
          <Card>인기 문제집 보기!</Card>
          <Card>인기 문제집 보기!</Card>
        </MenuCardContainer>
        <QuizCardContainer>
          <CustomCard radius={'30px'} height={'10rem'}>
            생성한 퀴즈가 없어요!
            <Button bgColor="rgb(148, 55, 255)" fontColor="white" width="150px" height="50px">
              새로 만들기
            </Button>
          </CustomCard>
        </QuizCardContainer>
      </Background>
    </>
  );
};

const Background = styled.div`
  height: calc(100vh - 60px);
  background-color: #fafbfc;
  position: relative;
  &:before {
    content: '';
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 200px;
    background: rgb(148, 55, 255);
    background: linear-gradient(
      180deg,
      rgba(148, 55, 255, 1) 0%,
      rgba(148, 55, 255, 1) 30%,
      rgba(193, 101, 221, 1) 100%
    );
    border-bottom-left-radius: 5rem;
    border-bottom-right-radius: 5rem;
  }
`;

const MenuCardContainer = styled.div`
display:flex;
  height: 50px;
  width: 100%;
`;
const QuizCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
`;

const CustomCard = styled(Card)` 
  display:flex;
  flex-direction:column;
  align-items:center;
`;
Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <AppLayout>
      <HeaderLayout>{page}</HeaderLayout>
    </AppLayout>
  );
};
export default Home;
