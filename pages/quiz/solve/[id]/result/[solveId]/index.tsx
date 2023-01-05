import * as S from 'styles/quiz/solve/result.style';
import { FlatButton } from 'styles/common';
import { useState } from 'react';
import type { ReactElement } from 'react';
import { AppLayout } from 'components/layout';
import { useSelector } from 'react-redux';
import Router from 'next/router';
import { RootState } from 'store';
import type { NextPageWithLayout } from 'pages/_app';
import { MatchNote, Comment, Header } from 'components/common';

const Page: NextPageWithLayout = () => {
  const { solveUserName, solveUserScore } = useSelector((state: RootState) => state.user_solve);
  const { solveProblems, solveProblemSetTitle } = useSelector((state: RootState) => state.solve);
  const { isLoggedin } = useSelector((state: RootState) => state.user);
  const [openMatch, setOpenMatch] = useState<Boolean>(false);
  let today = new Date();
  let year = today.getFullYear(); // 년도
  let month = today.getMonth() + 1; // 월
  let date = today.getDate(); //일
  return (
    <S.Container>
      <Header />
        <S.ScoreTxt>
          총 <span>{solveProblems.length}</span> 문제 중 <span>{solveUserScore}</span> 문제 맞았어요{' '}
        </S.ScoreTxt>
        <S.ScoreTable>
          <thead>
            <tr>
              <th>닉네임</th>
              <th>일자</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{solveUserName}</td>
              <td>
                {year}.{month}.{date}
              </td>
            </tr>
          </tbody>
          <thead>
            <tr>
              <th>퀴즈 제목</th>
              <th>점수</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{solveProblemSetTitle}</td>
              <td>
              {solveUserScore}
              </td>
            </tr>
          </tbody>
        </S.ScoreTable>
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
  return <AppLayout>{page}</AppLayout>;
};
export default Page;
