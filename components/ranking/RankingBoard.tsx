import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { QuizRankingListApi } from 'pages/api/quiz';
import { useMutation } from '@tanstack/react-query';
import { RankCard, Ranker } from '.';

interface RankingBoardProps {
  quizRankingList?: RankingType[];
}
const RankingBoard = ({ quizRankingList }: RankingBoardProps) => {
  const router = useRouter();
  const { quizset_id, solver_id } = router.query;
  const [rankingList, setRankingList] = useState<RankingType[] | null>(quizRankingList || null);
  const [userRanking, setUserRanking] = useState<RankingType>();
  const { mutate } = useMutation(() => QuizRankingListApi(quizset_id as string), {
    onSuccess: (_data) => {
      setRankingList(_data.slice(0, 3));
      setUserRanking(_data[_data.findIndex((user: RankingType) => user.id === solver_id)]);
    },
  });

  useEffect(() => {
    if (quizset_id && !quizRankingList) mutate();
  }, [router.isReady]);

  if (rankingList?.length === 0 && !userRanking) return <Empty>아직 등록된 순위가 없습니다.</Empty>;
  return (
    <Wrapper>
      <Podium>
        {rankingList && <Ranker ranker={rankingList[1]} />}
        {rankingList && <Ranker ranker={rankingList[0]} />}
        {rankingList && <Ranker ranker={rankingList[2]} />}
      </Podium>
      {userRanking && userRanking.ranking > 3 && <RankCard user={userRanking} />}
    </Wrapper>
  );
};

const Wrapper = styled.ul`
  position: relative;
`;
const Empty = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  margin-top: 22px;
  margin-bottom: 43px;
`;
const Podium = styled.div`
  padding: 0 8px;
  display: flex;
  width: 100%;
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: 100% 100%;
  margin-bottom: 10px;
  aspect-ratio: 294/200;
  background-image: url(/assets/img/rebranding/anyquiz/podium.svg);
`;

export default RankingBoard;
