import styled from 'styled-components';
import type { ReactElement } from 'react';
import { AppLayout } from 'components/layout';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'components/common';
import axios from 'axios';
import type { NextPageWithLayout } from 'pages/_app';
import { RootState } from 'store';
import { saveSolveProblemsAction, saveSolveProblemSetAction, saveQuizIdAction } from 'store/quiz_solve'


const Page: NextPageWithLayout = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { solveSetTitle } = useSelector((state: RootState) => state.solve);
  const { solveProblems } = useSelector((state: RootState) => state.solve);
  const [ thumbnail, setThumbnail] = useState('');
  let { id } = router.query;
  // id 값이 변경될 시
  useEffect(() => {
    async function getQuiz() {
      try {
        const response = await axios.get(
          `https://api.catchcatch.link/v1/loadprobset/${id}`,
        );
        dispatch(saveSolveProblemSetAction({solveSetTitle : response.data[0].set_title}));
        dispatch(saveSolveProblemsAction({solveProblems : response.data[0].prob}));
        dispatch(saveQuizIdAction({quizId : `${id}`}));
        setThumbnail(response.data[0].thumbnail);
        // 정답 배열 생성
        
      } catch (error) {
        console.error(error);
      }
    }
    getQuiz();
  }, [id]);

  return (
    <Container>
      <Logo>캐치캐치</Logo>
      <QuizInfo>
        <Circle>
          <img src={thumbnail} />
          <span>
            총 <em>{solveProblems.length}</em> 문제
          </span>
        </Circle>
        <p>"{solveSetTitle}"</p>
        <span>출제자 : {}</span>
      </QuizInfo>
      <Button
        width="250px"
        height="55px"
        fontSize="1.4rem"
        bgColor="#ff4d57"
        fontColor="#fff"
        id="create-btn"
        onClick={() => {
          router.push(`/quiz/solve/${id}/main`);
        }}
      >
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
  justify-content: space-around;
  width: 100%;
  height: 100vh;
  background-color: #fff;
`;
const Logo = styled.div`
  position: relative;
  display: block;
  font-size: 2.5rem;
  padding-top: 5%;
  font-family: 'RixInooAriDuriR';
  color: #ff4d57;
`;
const QuizInfo = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: bold;
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
  overflow: hidden;
  span {
    z-index: 1;
    font-size: 2rem;
    color: #fff;
    
    em {
      font-style: normal;
      color: #ff4d57;
    }
    &::before {
      content: '';
      position:absolute;
      top: 0;
      left: 0;
      display:block;
      width: 100%;
      height: 100%;
      z-index:-1;
      background-color: rgba(0,0,0,.5);
    }
  }
  img {
    position:absolute;
    object-fit: cover;
    height: 100%;
    
  }
`;

Page.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};
export default Page;
