const RankBoard = () => {
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
  const list_sort = props.score_list.sort(
    (a: { nickname: string; score: number }, b: { nickname: string; score: number }) => {
      return b.score - a.score;
    },
  );
  // 문제를 푼 사람의 순위
  const isRank = (element: { nickname: string; score: number }) => {
    if (element.nickname === new_user) return true;
  };
  const new_user_rank = list_sort.findIndex(isRank) + 1;
  // 랭킹 순으로 JSX 로 변환
  
  const Ranking = list_sort.map((item, index) => (
    <li className={`rank_${index + 1} ${item.nickname == new_user ? 'active' : ''}`} key={index}>
      <div>
        <i>{index + 1 == 1 ? '🥇' : index + 1 == 2 ? '🥈' : index + 1 == 3 ? '🥉' : index + 1}</i>
        <strong>{item.nickname}</strong>
        <em>{item.score}점</em>
      </div>
    </li>
  ));
  return (
    <>
      {new_user_rank > 5 ? (
        <ul>
          {Ranking.slice(0, 5)}
          <li className={`rank_${new_user_rank} active`}>
            <div>
              <i>{new_user_rank}</i>
              <strong>{new_user}</strong>
              <em>{new_user_score}점</em>
            </div>
          </li>
        </ul>
      ) : (
        <ul>{Ranking.slice(0, 6)}</ul>
      )}
    </>
  );
};

export default RankBoard;
