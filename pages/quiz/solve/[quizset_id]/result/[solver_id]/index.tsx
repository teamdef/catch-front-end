import { useState, useEffect } from 'react';
import Router from 'next/router';
import * as S from 'styles/quiz/solve/result.style';
import { Header } from 'components/common';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { QuizRankingListApi } from 'pages/api/quiz';
import { useRouter } from 'next/router';

import { NotFound, PopularQuiz, RankingBoard } from 'components/common';
import Comment from 'components/comment/Comment';
import EmotionShare from 'components/emotionShare/EmotionShare';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';

const Page = () => {
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
    <>
      <Header />
      <S.Container>
        {solveUserScore !== undefined ? (
          <S.QuizResultSection>
            <S.ScoreContainer>
              <div>
                <p>
                  <span className="nickname">{solveUserName}</span> 님
                </p>
                <p>
                  <b>{quizList.length} 문제</b> 중 <b>{solveUserScore}문제</b> 맞혔네요!
                </p>
              </div>
              <span
                className="go-match-note"
                onClick={() => Router.push(`/quiz/solve/${quizset_id}/result/${solver_id}/matchnote`)}
              >
                정답 확인 <MdOutlineKeyboardArrowRight size={20} />
              </span>
            </S.ScoreContainer>
            <S.RankingContainer>
              <RankingBoard rankingList={rankingList} />
            </S.RankingContainer>
            <S.EmotionShareContainer>
              <EmotionShare />
            </S.EmotionShareContainer>
          </S.QuizResultSection>
        ) : (
          <S.ErrorWrapper>
            <NotFound title="잘못된 접근이에요!" subTitle="더이상 결과를 불러올 수 없어요" />
          </S.ErrorWrapper>
        )}
        <S.Divider />
        <S.CommentSection>
          <div className="margin-bottom-20">
            <span className="section-title">한줄평</span>
            <span className="section-count">10</span>
          </div>
          <Comment />
        </S.CommentSection>
        <S.Divider />
        <S.PopularQuizSection>
          <div className="section-title">추천퀴즈</div>
          <div className="section-description margin-bottom-20">참여율이 높은 퀴즈들을 추천해드려요!</div>
          <PopularQuiz />
        </S.PopularQuizSection>
      </S.Container>
    </>
  );
};

export default Page;
