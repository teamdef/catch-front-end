import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { QuizRankingListApi } from 'pages/api/quiz';
import { RankCard, Ranker } from '.';

interface RankingBoardProps {
  quizRankingList?: RankingType[];
}
const RankingBoard = ({ quizRankingList }: RankingBoardProps) => {
  const router = useRouter();
  const { quizset_id, solver_id } = router.query;
  const [rankingList, setRankingList] = useState<RankingType[] | null>(quizRankingList || null);
  const [userRanking, setUserRanking] = useState<RankingType>();

  const fetchRankingList = async () => {
    try {
      const response = await QuizRankingListApi(quizset_id as string);
      setRankingList(response.slice(0, 3));
      setUserRanking(response[response.findIndex((user: RankingType) => user.id === solver_id)]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (quizset_id && !quizRankingList) fetchRankingList();
  }, [router.isReady]);

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
