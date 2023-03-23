import { AppLayout, HeaderLayout } from 'components/layout';
import type { NextPageWithLayout } from 'pages/_app';
import type { ReactElement } from 'react';
import * as S from 'styles/quiz/solve/result.style';
import { MainButton } from 'styles/common';
import { useSelector } from 'react-redux';
import Router from 'next/router';
import { RootState } from 'store';
import { Comment, Header, SNSShare, PopularQuiz } from 'components/common';
import { AiOutlineShareAlt } from 'react-icons/ai';

const Page: NextPageWithLayout = () => {
  const { solveUserName, solveUserScore } = useSelector((state: RootState) => state.user_solve);
  const { quizList, quizSetId, setTitle, quizMaker, quizSetThumbnail } = useSelector((state: RootState) => state.solve);
  const today = new Date().toISOString().replace('T', ' ').substring(0, 10);


  return (
    <S.Container>
      <Header />
      {/* <S.ScoreCard>
        <div>
          <p>
            <span className="nickname">{solveUserName}</span> 님
          </p>
          <p>
            <b>{quizList.length} 문제</b> 중 <b>{solveUserScore}문제</b> 맞히셨어요!
          </p>
        </div>
        <span className="date">{today}</span>
        <img src="/assets/img/catch_character3.png" alt="캐릭터 이미지" />
      </S.ScoreCard>
      <S.ButtonArea>
        <MainButton id="replay" onClick={() => Router.push(`/quiz/solve/${quizSetId}`)}>
          다시 풀기
        </MainButton>
        <MainButton id="note" onClick={() => Router.push(`/quiz/solve/${quizSetId}/result/matchnote`)}>
          오답노트
        </MainButton>
      </S.ButtonArea>
      <S.SNSShareContainer>
        <div id="explain">
          <AiOutlineShareAlt />
          <div>퀴즈 세트를 공유해보세요!</div>
        </div>
        <SNSShare
          nickName={quizMaker.nickname}
          setTitle={setTitle}
          id={quizSetId}
          thumbnail={quizSetThumbnail}
          profileImg={quizMaker.profileImg}
        />
      </S.SNSShareContainer> */}
      {/* <Comment /> */}
      <PopularQuiz/>
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
