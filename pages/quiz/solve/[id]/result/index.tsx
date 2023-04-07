import { AppLayout, HeaderLayout } from 'components/layout';
import type { NextPageWithLayout } from 'pages/_app';
import type { ReactElement } from 'react';
import * as S from 'styles/quiz/solve/result.style';
import { useState, useEffect } from 'react';
import { MainButton } from 'styles/common';
import { useSelector } from 'react-redux';
import Router from 'next/router';
import { RootState } from 'store';
import { Comment, SNSShare, PopularQuiz, RankingBoard } from 'components/common';
import { BottomUpModal } from 'components/modal';
import { shareProps } from 'components/common/SNSShare';
import { AiOutlineShareAlt } from 'react-icons/ai';
import { QuizRankingListApi } from 'pages/api/quiz';

const Page: NextPageWithLayout = () => {
  const { solveUserName, solveUserScore } = useSelector((state: RootState) => state.user_solve);
  const { quizList, quizSetId, setTitle, quizMaker, quizSetThumbnail } = useSelector((state: RootState) => state.solve);
  const [bottomUpisOpen, setBottomUpIsOpen] = useState<boolean>(false); /* 퀴즈 공유 바텀업 */

  const snsShareObj: shareProps = {
    thumbnail: quizSetThumbnail,
    setTitle: setTitle,
    id: quizSetId,
    profileImg: quizMaker.profileImg,
    nickName: quizMaker.nickname,
  };

  const bottomUpOpen = () => {
    setBottomUpIsOpen(true);
  };
  const bottomUpClose = () => {
    setBottomUpIsOpen(false);
  };
  const [rankingList, setRankingList] = useState<RankingType[] | null>(null);

  const fetchRankingList = async () => {
    try {
      const res = await QuizRankingListApi(quizSetId);
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
    fetchRankingList();
  }, []);

  return (
    <S.Container>
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
          <MainButton onClick={() => Router.push(`/quiz/solve/${quizSetId}/result/matchnote`)}>정답확인</MainButton>
        </S.ButtonWrapper>

        <S.ResponseContainer>
          <span>퀴즈는 어떠셨나요?</span>
          <span>여러분의 의견을 알려주세요!</span>
        </S.ResponseContainer>

        <S.ShareButton
          id="quiz-share-btn"
          onClick={(e) => {
            bottomUpOpen();
            e.stopPropagation(); /* 이벤트 전파 방지 */
          }}
        >
          <img src="/assets/img/share2.svg" alt="" />
          퀴즈 공유하기
        </S.ShareButton>
      </S.QuizResultCard>

      {/* <Comment /> */}
      <PopularQuiz />
      {bottomUpisOpen && <BottomUpModal shareInfo={snsShareObj} bottomUpClose={bottomUpClose} />}
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
