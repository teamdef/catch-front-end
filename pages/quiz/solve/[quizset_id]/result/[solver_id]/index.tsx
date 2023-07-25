import { useState, useEffect, ReactElement } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { NotFound, RankingBoard } from 'components/common';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { QuizRankingListApi } from 'pages/api/quiz';

import { NextPageWithLayout } from 'pages/_app';
import { AppLayout, HeaderLayout } from 'components/layout';
import { theme } from 'styles/theme';
import { Sketchbook } from 'styles/common';
import UserScore from 'components/resultPage/UserScore';

const Page: NextPageWithLayout = () => {
  const { solveUserName, solveUserScore } = useSelector((state: RootState) => state.user_solve);
  const { quizList } = useSelector((state: RootState) => state.solve);
  const [rankingList, setRankingList] = useState<RankingType[] | null>(null);
  const router = useRouter();
  const { quizset_id } = router.query;

  const fetchRankingList = async () => {
    try {
      const res = await QuizRankingListApi(quizset_id as string);
      parseRankingList(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const parseRankingList = (data: RankingDtoType[]) => {
    console.log(data);
    const _rankingList = data.map((ranking: RankingDtoType) => {
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
    if (quizset_id) fetchRankingList();
  }, [router.isReady]);

  useEffect(() => {
    fetchRankingList();
  }, []);

  return (
    <>
      {solveUserScore && (
        <Sketchbook>
          <Wrapper>
            <UserScore name={solveUserName} score={solveUserScore} total={quizList.length} />
            <RankingBoard rankingList={rankingList} />
          </Wrapper>
        </Sketchbook>
      )}
      {!solveUserScore && <NotFound title="잘못된 접근이에요!" subTitle="더이상 결과를 불러올 수 없어요" />}
    </>
  );
};

const Wrapper = styled.div`
  position: relative;
  margin-top: 56px;
  margin-bottom: 52px;
`;
Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <AppLayout bgColor={theme.colors.mintColor}>
      <HeaderLayout bgColor={theme.colors.mintColor}>{page}</HeaderLayout>
    </AppLayout>
  );
};
export default Page;
