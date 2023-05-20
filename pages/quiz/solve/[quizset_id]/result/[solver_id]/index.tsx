import { AppLayout, HeaderLayout } from 'components/layout';
import type { NextPageWithLayout } from 'pages/_app';
import type { ReactElement } from 'react';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import * as S from 'styles/quiz/solve/result.style';
import { MainButton } from 'styles/common';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { QuizRankingListApi } from 'pages/api/quiz';
import { useRouter } from 'next/router';

import { NotFound, PopularQuiz, RankingBoard } from 'components/common';
import Comment from 'components/comment/Comment';
import  EmotionShare  from 'components/emotionShare/EmotionShare';

const Page: NextPageWithLayout = () => {
  const { solveUserName, solveUserScore } = useSelector((state: RootState) => state.user_solve);
  const { quizList } = useSelector((state: RootState) => state.solve);
  const [rankingList, setRankingList] = useState<RankingType[] | null>(null);
  const router = useRouter();
  const { quizset_id, solver_id } = router.query; // [quizset_id]/result/[solver_id] 형태의 url에서 사용 가능

  const fetchRankingList = async () => {
    try {
      const res = await QuizRankingListApi(quizset_id as string);
      parseRankingList(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const parseRankingList = (data: any) => {
    const _rankingList = data.map((ranking: any) => {
      const _ranking: RankingType = {
        nickname: ranking.nickname,
        score: ranking.score,
        ranking: ranking.ranking,
        quizCount: ranking.quiz_count,
      };
      return _ranking;
    });

    const _sliceRankingList = _rankingList.slice(0, 3);
    setRankingList(_sliceRankingList);
  };
  useEffect(() => {
    if (!!quizset_id) fetchRankingList();
  }, [router.isReady]);



  
  useEffect(() => {
    fetchRankingList();
  }, []);
  
  return (
    <S.Container>
      {solveUserScore !== undefined ? (
        <S.QuizResultCard>
          <S.ScoreContainer>
            <p>
              <span className="nickname">{solveUserName}</span> 님
            </p>
            <p>
              <b>{quizList.length} 문제</b> 중 <b>{solveUserScore}문제</b> 맞히셨어요!
            </p>
          </S.ScoreContainer>

          <S.RankingBoardWrapper>
            <h3>현재 랭킹 🏆</h3>
            <RankingBoard rankingList={rankingList} />
          </S.RankingBoardWrapper>

          <S.ButtonWrapper>
            <MainButton onClick={() => Router.push(`/quiz/solve/${quizset_id}/result/${solver_id}/matchnote`)}>
              정답확인
            </MainButton>
          </S.ButtonWrapper>

          <EmotionShare />
        </S.QuizResultCard>
      ) : (
        <S.ErrorWrapper>
          <NotFound title="잘못된 접근이에요!" subTitle="더이상 결과를 불러올 수 없어요" />
        </S.ErrorWrapper>
      )}

      <Comment/>
      <PopularQuiz />
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
