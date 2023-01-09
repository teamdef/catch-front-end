import * as S from 'styles/quiz/solve/result.style';
import { FlatButton } from 'styles/common';
import { useState } from 'react';
import type { ReactElement } from 'react';
import { AppLayout, HeaderLayout } from 'components/layout';
import { useSelector } from 'react-redux';
import Router from 'next/router';
import { RootState } from 'store';
import type { NextPageWithLayout } from 'pages/_app';
import { MatchNote, Comment, Header } from 'components/common';

const Page: NextPageWithLayout = () => {
  const { solveUserName, solveUserScore } = useSelector((state: RootState) => state.user_solve);
  const { solveProblems } = useSelector((state: RootState) => state.solve);
  const { isLoggedin } = useSelector((state: RootState) => state.user);
  const [openMatch, setOpenMatch] = useState<Boolean>(false);
  let today = new Date();
  let year = today.getFullYear(); // 년도
  let month = today.getMonth() + 1; // 월
  let date = today.getDate(); //일
  return (
    <S.Container>
      <Header />
      <S.ScoreCard>
        <p>
          <span className="nickname">{solveUserName}</span> 님
        </p>
        <p>
          <span>{solveProblems.length} 문제</span> 중 <span>{solveUserScore}문제</span> 맞추셨어요!
        </p>
        <span className="date">
          {year}.{month}.{date}
        </span>
      </S.ScoreCard>
      <S.ButtonArea>
        <FlatButton onClick={() => Router.push(`${isLoggedin ? '/quiz/create' : '/'}`)}>나도 퀴즈 만들기</FlatButton>
        <FlatButton onClick={() => setOpenMatch(true)}>정답 확인</FlatButton>
      </S.ButtonArea>
      <Comment />
      {openMatch && <MatchNote setOpenMatch={setOpenMatch} />}
    </S.Container>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <AppLayout>
      <HeaderLayout>{page}</HeaderLayout>
    </AppLayout>
  );
};
export default Page;
