import styled from 'styled-components';
import { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import { AppLayout } from 'components/layout';
import { useSelector } from 'react-redux';
import { Button } from 'components/common';
import Router from 'next/router';
import { useRouter } from 'next/router';
import { RootState } from 'store';
import type { NextPageWithLayout } from 'pages/_app';
import MatchNote from 'components/common/MatchNote';
import ProgressBar from '@ramonak/react-progress-bar';
import RankBoard from 'components/common/RankBoard';

const Page: NextPageWithLayout = () => {
  const router = useRouter();
  const { solveUserName, solveUserScore, solveProblems } = useSelector((state: RootState) => state.solve);
  const [openMatch, setOpenMatch] = useState<Boolean>(false);
  let { solveId } = router.query;
  return (
    <Container>
      <ScoreArea>
        <h1>
          <strong>{solveUserName}</strong> 님
        </h1>
        <ProgressArea>
          <ProgressBar completed={`${solveUserScore}`} maxCompleted={solveProblems.length} bgColor={'#ff4d57'} />
        </ProgressArea>
        <p>
          총 <span>{solveProblems.length}</span> 문제 중 <span>{solveUserScore}</span> 문제 맞았어요{' '}
        </p>
        <Button
          width="40%"
          height="35px"
          fontSize=".9rem"
          bgColor="#fff"
          fontColor="#ff4d57"
          onClick={() => setOpenMatch(true)}
        >
          오답 노트
        </Button>
      </ScoreArea>

      <RankingArea>
        <h2>
          <strong>{solveUserName}</strong> 님의 랭킹을 확인해 보세요!
        </h2>
        <RankBoard solveId={solveId}/>
      </RankingArea>

      <ButtonArea>
        <Button
          width="150px"
          height="50px"
          fontSize="1.2rem"
          bgColor="#ff4d57"
          fontColor="#fff"
          onClick={() => Router.push('/home')}
        >
          홈으로
        </Button>
        <Button width="150px" height="50px" fontSize="1rem" bgColor="#ff4d57" fontColor="#fff">
          나도 퀴즈 만들기
        </Button>
      </ButtonArea>
      {openMatch ? <MatchNote setOpenMatch={setOpenMatch} /> : ''}
    </Container>
  );
};
const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: #fff;
`;
const ButtonArea = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  align-items: center;
`;
const ScoreArea = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  > h1 {
    font-size: 1rem;
    font-weight: normal;
    color: #888;
    margin: 0 0 5%;
    strong {
      font-weight: 500;
      font-size: 1.5rem;
      font-weight: normal;
      color: #ff4d57;
    }
  }
  > p {
    color: #888;
    margin: 5% 0;
    span {
      color: #ff4d57;
    }
  }
  button {
    border: 2px solid #ff4d57;
  }
`;
const ProgressArea = styled.div`
  position: relative;
  display: block;
  width: 80%;
  span {
    padding: 0 15px !important;
    display:none !important;
  }
`;
const RankingArea = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  > h2 {
    margin-top: 0;
    font-weight: normal;
    color: #888;
    font-size: 1rem;
    strong {
      font-weight: 500;
      color: #ff4d57;
    }
  }
  ul {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    margin: 0;
    flex-direction: column;
    align-items: center;
    width: 80%;
    li {
      position: relative;
      display: block;
      color: #595959;
      width: 100%;
      list-style: none;
      border-radius: 4px;
      color: #595959;
      font-size: 0.9rem;
      > div {
        position: relative;
        margin: 3px;
        height: 44px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #fff;
      }
      span {
        position: relative;
        width: 44px;
        height: 44px;
      }
      strong {
        font-weight: normal;
      }
      i,
      em {
        display: flex;
        justify-content: center;
        font-style: normal;
        width: 50px;
      }
      i {
        color: #ff4d57;
        font-size: 1rem;
      }
      &.rank_1 > div {
        background-color: #fff1b4;
      }
      &.rank_2 > div {
        background-color: #ececec;
      }
      &.rank_3 > div {
        background-color: #ffe6d4;
      }
      @keyframes AnimateBG {
        0% {
          background-position: 0% 50%;
        }
        100% {
          background-position: -150% 50%;
        }
      }
      &.active {
        box-shadow: 0px 0px 5px 5px rgba(255,165,170,.5);
        background-size: 300% 300%;
        background-image: linear-gradient(-45deg, #ff4d57 0%, #ff4d57 10%, #fff 20%, #ff4d57 30%, #ff4d57 100%);
        animation: AnimateBG 2s cubic-bezier(1, 0, 0.2, 0.2) infinite;
        strong {
          font-weight: 500;
        }
      }
    }
  }
`;
Page.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};
export default Page;
