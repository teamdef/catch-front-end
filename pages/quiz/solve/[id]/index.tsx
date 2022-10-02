import styled from 'styled-components';
import type { ReactElement } from 'react';
import { AppLayout } from 'components/layout';
import { useRouter } from 'next/router';
import { Button } from 'components/common';
import type { NextPageWithLayout } from 'pages/_app';

// quiz/solve/1
const Page: NextPageWithLayout = () => {
  const router = useRouter();
  let { id } = router.query;

  // 더미 데이터
  const props = {
    id: 1,
    title: '내가 좋아하는 것들',
    count: 10,
    maker: '진현우',
  };

  return (
    <Container>
      <Logo>캐치캐치</Logo>
      <QuizInfo>
        <Circle>
          <span>
            총 <em>{props.count}</em> 문제
          </span>
        </Circle>
        <p>"{props.title}"</p>
        <span>출제자 : {props.maker}</span>
      </QuizInfo>
      <Button width="250px" height="55px" fontSize="1.4rem" bgColor="#ff4d57" fontColor="#fff">
        시작하기
      </Button>
    </Container>
  );
};
const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding-top: 20%;
`;
const Logo = styled.div`
  position: relative;
  display: block;
  font-size: 2.5rem;
  font-family: 'RixInooAriDuriR';
  color: #ff4d57;
`;
const QuizInfo = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: bold;
  padding: 20% 0;
  > p {
    color: #ff4d57;
    font-size: 1.5rem;
    margin: 0;
    margin-top: 25%;
    margin-bottom: 10%;
  }
  > span {
    font-size: 1.1rem;
  }
`;
const Circle = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 250px;
  height: 250px;
  border-radius: 50%;
  border: 8px solid #ff4d57;
  span {
    font-size: 2rem;
    em {
      font-style: normal;
      color: #ff4d57;
    }
  }
`;

Page.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};
export default Page;
