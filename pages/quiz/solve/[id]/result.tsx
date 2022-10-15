import styled from 'styled-components';
import type { ReactElement } from 'react';
import { AppLayout } from 'components/layout';
import { useRouter } from 'next/router';
import { Button } from 'components/common';
import type { NextPageWithLayout } from 'pages/_app';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

// quiz/solve/1/result
const Page: NextPageWithLayout = () => {
  const router = useRouter();
  let { id } = router.query;
  // 해당 문제를 푼 사람 (결과를 받을 사람)의 닉네임
  const new_user: string = '주호민';
  // 해당 문제를 푼 사람의 점수
  const new_user_score: number = 4;

  // 더미 데이터
  const props = {
    id: 1,
    title: '내가 좋아하는 것들',
    count: 10,
    score_list: [
      {
        nickname: '병건이올시다',
        score: 8,
      },
      {
        nickname: '단군',
        score: 8,
      },
      {
        nickname: '최고민수',
        score: 7,
      },
      {
        nickname: '벌레아저씨',
        score: 6,
      },
      {
        nickname: '킨더조이',
        score: 4,
      },
      {
        nickname: '주호민',
        score: 4,
      },
      {
        nickname: '김풍',
        score: 2,
      },
    ],
    maker: '진현우',
  };

  // 퀴즈 점수 높은 순으로 나열
  const ranking = props.score_list.sort(
    (a: { nickname: string; score: number }, b: { nickname: string; score: number }) => {
      return b.score - a.score;
    },
  );
  // 문제를 푼 사람의 순위
  const isRank = (element: { nickname: string; score: number }) => {
    if (element.nickname === new_user) return true;
  };
  const new_user_rank = ranking.findIndex(isRank) + 1;
  // 랭킹 순으로 JSX 로 변환
  const RankBoard = ranking.map((item, index) => (
    <li className={`rank_${index + 1} ${item.nickname == new_user ? 'active' : ''}`} key={index}>
      <div>
        <i>{index + 1 == 1 ? '🥇' : index + 1 == 2 ? '🥈' : index + 1 == 3 ? '🥉' : index + 1}</i>
        <strong>{item.nickname}</strong>
        <em>{item.score}점</em>
      </div>
    </li>
  ));
  console.log(RankBoard);
  return (
    <Container>
      <ScoreArea>
        <h1>
          <strong>{new_user}</strong> 님
        </h1>
        <ProgressArea>
          <CircularProgressbar
            strokeWidth={10}
            value={new_user_score}
            text={`${new_user_score}`}
            maxValue={10}
            styles={buildStyles({
              textSize: '1.5rem',
              pathTransitionDuration: 0.5,
              trailColor: '#eee',
              backgroundColor: '#fff',
            })}
          />
        </ProgressArea>
        <p>총 <span>10</span> 문제 중 <span>4</span> 문제 맞았어요</p>
        <Button width="40%" height="35px" fontSize=".9rem" bgColor="#fff" fontColor="#ff4d57">정답 보기</Button>
      </ScoreArea>

      <RankingArea>
        <h2>
          <strong>{new_user}</strong> 님의 랭킹을 확인해 보세요!
        </h2>
        {new_user_rank > 5 ? (
          <ul>
            {RankBoard.slice(0, 5)}
            <li className={`rank_${new_user_rank} active`}>
              <div>
                <i>{new_user_rank}</i>
                <strong>{new_user}</strong>
                <em>{new_user_score}점</em>
              </div>
            </li>
          </ul>
        ) : (
          <ul>{RankBoard.slice(0, 6)}</ul>
        )}
      </RankingArea>

      <ButtonArea>
        <Button width="150px" height="55px" fontSize="1.2rem" bgColor="#ff4d57" fontColor="#fff">
          홈으로
        </Button>
        <Button width="150px" height="55px" fontSize="1rem" bgColor="#ff4d57" fontColor="#fff">
          나도 퀴즈 만들기
        </Button>
      </ButtonArea>
    </Container>
  );
};
const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding-top: 10%;
`;
const ButtonArea = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  margin: 10% 0;
  padding: 0 10%;
  justify-content: space-between;
`;
const ScoreArea = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  > h1 {
    font-size: 1.3rem;
    font-weight: normal;
    color: #888;
    margin-top: 0;
    strong {
      font-weight: 500;
      font-size: 1.8rem;
      font-weight: normal;
      color: #ff4d57;
    }
  }
  > p {
    color: #888;
    margin: 5% 0;
    span {
      color: #ff4d57;
    }
  }
  button {
    border: 2px solid #ff4d57;
  }
`;
const ProgressArea = styled.div`
  position: relative;
  display: block;
  width: 125px;
  height: 125px;
  .CircularProgressbar-path {
    stroke: #ff4d57;
  }
  .CircularProgressbar-text {
    fill: #ff4d57;
  }
`;
const RankingArea = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  > h2 {
    margin-top: 5%;
    font-weight: normal;
    color: #888;
    font-size: 1rem;
    strong {
      font-weight: 500;
      color: #ff4d57;
    }
  }
  ul {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    padding: 0;
    margin: 0;
    flex-direction: column;
    align-items: center;
    width: 80%;
    li {
      position: relative;
      display: block;
      color: #595959;
      width: 100%;
      list-style: none;
      border-radius: 4px;
      color: #595959;
      font-size: 0.9rem;
      > div {
        position: relative;
        margin: 3px;
        height: 44px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #fff;
      }
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
        font-style: normal;
        width: 50px;
      }
      i {
        color: #ff4d57;
        font-size: 1rem;
      }
      &.rank_1 > div {
        background-color: #fff1b4;
      }
      &.rank_2 > div {
        background-color: #ececec;
      }
      &.rank_3 > div {
        background-color: #ffe6d4;
      }
      @keyframes AnimateBG {
        0% {
          background-position: 0% 50%;
        }
        100% {
          background-position: -150% 50%;
        }
      }
      &.active {
        box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
        background-size: 300% 300%;
        background-image: linear-gradient(-45deg, #ff4d57 0%, #ff4d57 10%, #fff 20%, #ff4d57 30%, #ff4d57 100%);
        animation: AnimateBG 2s cubic-bezier(1, 0, 0.2, .2) infinite;
        strong {
          font-weight: 500;
        }
      }
    }
  }
`;
Page.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};
export default Page;
