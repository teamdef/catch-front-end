import * as S from 'styles/quiz/solve/result.style';
import { FlatButton } from 'styles/common';
import { useState } from 'react';
import type { ReactElement } from 'react';
import { AppLayout } from 'components/layout';
import { useSelector } from 'react-redux';
import Router, { useRouter } from 'next/router';
import { RootState } from 'store';
import type { NextPageWithLayout } from 'pages/_app';
import { MatchNote, Logo, Comment } from 'components/common';

const Page: NextPageWithLayout = () => {
  const { solveUserName, solveUserScore } = useSelector((state: RootState) => state.user_solve);
  const { solveProblems } = useSelector((state: RootState) => state.solve);

  const { isLoggedin } = useSelector((state: RootState) => state.user);
  const [openMatch, setOpenMatch] = useState<Boolean>(false);
  
  return (
    <S.Container>
      <Logo />
      <S.ScoreArea>
        <h1>
          <strong>{solveUserName}</strong> 님
        </h1>
        <S.ScorePostIt>
          <img id="tack-img" src="/assets/img/tack.png" />
          <div id="score">{solveUserScore}</div>
          <img id="red-pencil-img" src="/assets/img/redpencil.png" />
        </S.ScorePostIt>
        <p>
          총 <span>{solveProblems.length}</span> 문제 중 <span>{solveUserScore}</span> 문제 맞았어요{' '}
        </p>
      </S.ScoreArea>
      <S.ButtonArea>
        <FlatButton onClick={() => Router.push(`${isLoggedin ? '/quiz/create' : '/'}`)}>나도 퀴즈 만들기</FlatButton>
        <FlatButton onClick={() => setOpenMatch(true)}>오답 노트</FlatButton>
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
