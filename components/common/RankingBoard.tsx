import styled, { keyframes } from 'styled-components';
import { NotFound } from 'components/common';

interface PropsType {
  rankingList: RankingType[] | null;
}
const RankingBoard = ({ rankingList }: PropsType) => {
  
  return (
    <Wrapper>
      {rankingList ? (
        rankingList.length !== 0 ? (
          rankingList.map((user: RankingType, idx: number) => {
            return (
              <li
                key={idx}
                id={user.ranking === 1 ? 'first' : user.ranking === 2 ? 'second' : user.ranking === 3 ? 'third' : ''}
              >
                <i>
                  {user.ranking === 1 ? '🥇' : user.ranking === 2 ? '🥈' : user.ranking === 3 ? '🥉' : user.ranking}
                </i>
                <strong>{user.nickname}</strong>
                <em>{user.score}점</em>
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
      color: #757575;
    }
    i {
      color: #757575;
      font-size: 1rem;
    }
  }
  #first {
    border: none;
    background-color: #fe747b;
    strong {
      color: white;
    }
    em {
      color: #212121;
    }
  }
  #second {
    border: none;
    background-color: #ffa5aa;
    strong {
      color: white;
    }
    em {
      color: #212121;
    }
  }
  #third {
    border: none;
    background-color: #fff6f7;
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
