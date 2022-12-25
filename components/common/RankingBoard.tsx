import styled, { keyframes } from 'styled-components';
import { NotFound } from 'components/common';
interface RankingType {
  created_at: string;
  nickname: string;
  score: number;
  ranking: string;
  id: string;
}

interface PropsType {
  rankingList: RankingType[] | null;
}
const RankingBoard = ({ rankingList }: PropsType) => {
  return (
    <Wrapper>
      {rankingList ? (
        rankingList.length !== 0 ? (
          rankingList.map((userRanking: RankingType) => {
            return (
              <li
                key={userRanking.id}
                id={
                  userRanking.ranking === '1'
                    ? 'first'
                    : userRanking.ranking === '2'
                    ? 'second'
                    : userRanking.ranking === '3'
                    ? 'third'
                    : ''
                }
              >
                <i>
                  {userRanking.ranking === '1'
                    ? '🥇'
                    : userRanking.ranking === '2'
                    ? '🥈'
                    : userRanking.ranking === '3'
                    ? '🥉'
                    : userRanking.ranking}
                </i>
                <strong>{userRanking?.nickname}</strong>
                <em>{userRanking?.score}점</em>
              </li>
            );
          })
        ) : (
          <NotFound title={'아직 퀴즈에 참여한 유저가 없습니다 😶'} subTitle={'퀴즈집을 공유하여 다같이 풀어보세요!'} />
        )
      ) : (
        <>
          <SkeletonRankingCard />
          <SkeletonRankingCard />
          <SkeletonRankingCard />
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.ul`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 0;
  margin: 0;
  flex-direction: column;
  align-items: center;
  width: 100%;
  li {
    position: relative;
    display: flex;
    color: #595959;
    width: 100%;
    list-style: none;
    border-radius: 4px;
    font-size: 0.9rem;
    border: solid 1px #f6f6f6;
    border-radius: 4px;
    height: 50px;
    justify-content: space-between;
    align-items: center;
    span {
      position: relative;
      width: 44px;
      height: 44px;
    }
    strong {
      font-weight: normal;
    }
    i,
    em {
      display: flex;
      justify-content: center;
      align-items: center;
      font-style: normal;
      width: 50px;
    }
    i {
      color: #ff4d57;
      font-size: 1rem;
    }
  }
  #first {
    border: none;
    background-color: #fff1b4;
  }
  #second {
    border: none;
    background-color: #ececec;
  }
  #third {
    border: none;
    background-color: #ffe6d4;
  }
`;

const gradient = keyframes` 
  0% {background-color: rgba(165, 165, 165, 0.1);}
  50% {background-color: rgba(165, 165, 165, 0.3);}
  100% {background-color: rgba(165, 165, 165, 0.1);}
`;

const SkeletonRankingCard = styled.div`
  height: 50px;
  width: 100%;
  background-color: #d6d6d6;
  border-radius: 4px;
  animation: ${gradient} 1.5s linear infinite alternate;
`;
export default RankingBoard;
