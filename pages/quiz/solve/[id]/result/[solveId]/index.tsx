 import * as S from 'styles/quiz/solve/result.style';
import {useState } from 'react';
import type { ReactElement } from 'react';
import { AppLayout } from 'components/layout';
import { useSelector } from 'react-redux';
import Router from 'next/router';
import { useRouter } from 'next/router';
import { RootState } from 'store';
import { MainButton } from 'styles/common';
import type { NextPageWithLayout } from 'pages/_app';
import { MatchNote, Logo, RankBoard } from 'components/common';
import ProgressBar from '@ramonak/react-progress-bar';

const Page: NextPageWithLayout = () => {
  const router = useRouter();
  const { solveUserName, solveUserScore, solveProblems } = useSelector((state: RootState) => state.solve);
  const { isLoggedin } = useSelector((state: RootState) => state.user);
  const [openMatch, setOpenMatch] = useState<Boolean>(false);
  let { solveId } = router.query;
  return (
    <S.Container>
      <Logo />
      <S.ScoreArea>
        <h1>
          <strong>{solveUserName}</strong> 님
        </h1>
        <S.ProgressArea>
          <ProgressBar completed={`${solveUserScore}`} maxCompleted={solveProblems.length} bgColor={'#ff4d57'} />
        </S.ProgressArea>
        <p>
          총 <span>{solveProblems.length}</span> 문제 중 <span>{solveUserScore}</span> 문제 맞았어요{' '}
        </p>
        <button onClick={() => setOpenMatch(true)}>오답 노트</button>
      </S.ScoreArea>

      <S.RankingArea>
        <h2>
          <strong>{solveUserName}</strong> 님의 랭킹을 확인해 보세요!
        </h2>
        <RankBoard solveId={solveId} />
      </S.RankingArea>

      <S.ButtonArea>
        <MainButton onClick={() => Router.push(`${isLoggedin ? '/quiz/create' : '/'}`)}>나도 퀴즈 만들기</MainButton>
      </S.ButtonArea>
      {openMatch ? <MatchNote setOpenMatch={setOpenMatch} /> : ''}
    </S.Container>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};
export default Page;
