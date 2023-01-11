import * as S from 'styles/quiz/solve/result.style';
import { MainButton } from 'styles/common';
import { useState } from 'react';
import type { ReactElement } from 'react';
import { AppLayout, HeaderLayout } from 'components/layout';
import { useSelector } from 'react-redux';
import Router from 'next/router';
import { RootState } from 'store';
import type { NextPageWithLayout } from 'pages/_app';
import { MatchNote, Comment, Header } from 'components/common';
import { AiTwotoneLike } from 'react-icons/ai';
import { FiShare } from 'react-icons/fi'

const Page: NextPageWithLayout = () => {
  const { solveUserName, solveUserScore } = useSelector((state: RootState) => state.user_solve);
  const { solveProblems } = useSelector((state: RootState) => state.solve);
  const { isLoggedin } = useSelector((state: RootState) => state.user);
  const [openMatch, setOpenMatch] = useState<Boolean>(false);
  const [like, setLike] = useState<Boolean>(false);
  let today = new Date();
  let year = today.getFullYear(); // 년도
  let month = today.getMonth() + 1; // 월
  let date = today.getDate(); //일
  return (
    <S.Container>
      <Header />
      <S.ScoreCard>
        <div>
          <p>
            <span className="nickname">{solveUserName}</span> 님
          </p>
          <p>
            <b>{solveProblems.length} 문제</b> 중 <b>{solveUserScore}문제</b> 맞추셨어요!
          </p>
        </div>
        <span className="date">
          {year}.{month}.{date}
        </span>
        <img src="/assets/img/catch_character3.png" alt="캐릭터 이미지" />
      </S.ScoreCard>
      <S.ButtonArea>
        <MainButton id="like" className={like ? 'on' : ''} onClick={() => setLike((current) => !current)}>
          <span>퀴즈 좋아요</span>
          <AiTwotoneLike size={20} />
        </MainButton>
        <MainButton id="share">
          <span>퀴즈 공유하기</span>
        <FiShare size={20}/>
        </MainButton>
        <MainButton id="note" onClick={() => setOpenMatch(true)}>
          오답노트
        </MainButton>
        <MainButton id="play" onClick={() => Router.push(`${isLoggedin ? '/quiz/create' : '/'}`)}>
          나도 퀴즈 만들기
        </MainButton>
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
