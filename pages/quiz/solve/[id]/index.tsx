import styled from 'styled-components';
import type { ReactElement } from 'react';
import { AppLayout } from 'components/layout';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button,HeadMeta } from 'components/common';
import axios from 'axios';
import type { NextPageWithLayout } from 'pages/_app';
import { RootState } from 'store';
import { Loading } from 'components/common';
import Router from 'next/router';
import { saveSolveProblemsAction, saveSolveProblemSetAction, saveQuizIdAction } from 'store/quiz_solve';

const Page: NextPageWithLayout = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { solveSetTitle } = useSelector((state: RootState) => state.solve);
  const { solveProblems } = useSelector((state: RootState) => state.solve);
  const [thumbnail, setThumbnail] = useState('');
  const [maker, setMaker] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  let { id } = router.query;
  // id 값이 변경될 시
  useEffect(() => {
    setLoading(true);
    async function getQuiz() {
      try {
        const response = await axios.get(`https://api.catchcatch.link/v1/loadprobset/${id}`);
        dispatch(saveSolveProblemSetAction({ solveSetTitle: response.data[0].set_title }));
        dispatch(saveSolveProblemsAction({ solveProblems: response.data[0].prob }));
        dispatch(saveQuizIdAction({ quizId: `${id}` }));
        setMaker(response.data[0].user.nickname);
        setThumbnail(response.data[0].thumbnail);
        setLoading(false);
        // 정답 배열 생성
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }
    getQuiz();
  }, [id]);

  return (
    <Container>
      {loading ? <Loading /> : ''}
      <Logo onClick={() => Router.push('/home')}>캐치캐치</Logo>
      <QuizInfo>
        {thumbnail == '' ? (
          <Bubbling style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)' }}>
            <img src="/assets/img/catch_character.png" />
          </Bubbling>
        ) : (
          <BgImg src={thumbnail} />
        )}
        <InfoTxt>
          <InfoTitle>
            <h1>{solveSetTitle}</h1>
          </InfoTitle>
          <p>
            총 <em>{solveProblems.length}</em> 문제
          </p>
          <span>출제자 : {maker}</span>
        </InfoTxt>
      </QuizInfo>
      {thumbnail && (
        <Bubbling style={{padding:'5%'}}>
          <img src="/assets/img/chch.png" />
        </Bubbling>
      )}

      <ButtonWrap>
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
      </ButtonWrap>
    </Container>
  );
};
const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-color: #fff;
`;
const Logo = styled.div`
  position: absolute;
  top: 0;
  display: block;
  z-index: 9999;
  font-size: 1.5rem;
  padding: 5% 0 0 5%;
  font-family: 'RixInooAriDuriR';
  color: #ff4d57;
`;
const QuizInfo = styled.div`
  position: relative;
  display: block;
  height: 70%;
  overflow: hidden;
  border-radius: 0 0 30px 30px;
  span {
    position: relative;
  }
`;
const BgImg = styled.img`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: block;
  height: 100%;
`;
const InfoTxt = styled.div`
  position: absolute;
  padding: 7% 5%;
  display: flex;
  justify-content: end;
  flex-direction: column;
  width: 100%;
  height: 80%;
  bottom: 0;
  color: #fff;
  background: linear-gradient(
    180deg,
    rgba(20, 20, 20, 0) 0%,
    rgba(20, 20, 20, 0.2) 26.56%,
    rgba(20, 20, 20, 0.3) 52.6%,
    rgba(20, 20, 20, 0.4) 78.65%,
    rgba(20, 20, 20, 0.6) 100%
  );

  p {
    margin: 5% 0 2% 0;
    em {
      color: #ff4d57;
      font-style: normal;
    }
  }
  span {
    font-size: 0.8rem;
    color: #ccc;
  }
`;
const InfoTitle = styled.div`
  h1 {
    position: relative;
    display: inline-block;
    font-size: 1.5rem;
    margin: 0;
    padding-bottom: 5%;
    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      display: inline-block;
      width: 150%;
      height: 1px;
      background-color: #c9c9c98f;
    }
  }
`;
const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`;
const Bubbling = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  img {
    width: 60%;
  }
`;
Page.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};
export default Page;
