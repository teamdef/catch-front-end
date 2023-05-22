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
              >
                <div className='user-ranking'>{user.ranking} </div>
                <div className='user-nickname'>{user.nickname}</div>
                <div className='user-score'>{user.score}/{user.quizCount}</div>
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
  color:#212121;
  li {
    position: relative;
    display: flex;
    width: 100%;
    list-style: none;
    border-radius: 4px;
    font-size: 0.9rem;
    border: solid 1px #757575;
    border-radius: 8px;
    height: 42px;
    justify-content: space-between;
    align-items: center;
    .user-ranking{
      font-size:1.2rem;
      font-weight:500;
      width:120px;
      display: flex;
      justify-content: center;
      align-items: center;
      
    }
    .user-nickname{
      color:#424242;
      text-align: left;
      width:100%;
    }
    .user-score{
      width: 100px;
    }
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
