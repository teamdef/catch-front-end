import { useState, useEffect } from 'react';
import { QuizMiniCard, SkeletonQuizCard, NotFound } from 'components/common';
import styled from 'styled-components';
import { RecentQuizListApi } from 'pages/api/quiz';

const PopularQuizList = () => {
  const [popularQuizList, setPopularQuizList] = useState<RecentQuizType[] | null>(null);

  const fetchPopularQuizList = async () => {
    try {
      const res = await RecentQuizListApi();
      const { recent_quizset } = res.data;
      parsePopularQuizList(recent_quizset);
    } catch (err) {
      console.log(err);
    }
  };

  const parsePopularQuizList = (data: any) => {
    const _popularQuizList = data.map((quizSet: any) => {
      const _quizObj: RecentQuizType = {
        id: quizSet.id,
        createdAt: quizSet.created_at,
        setTitle: quizSet.set_title,
        solverCnt: quizSet.solver_cnt,
        thumbnail: quizSet.thumbnail ?? null,
        user: { nickname: quizSet.user.nickname, profileImg: quizSet.user.profile_img },
      };
      return _quizObj;
    });
    const _sortPopularQuizList = _popularQuizList.filter((item: RecentQuizType) => item.solverCnt !== 0); /* 풀이자가 0명인데 인기있을리가 .. */
    _sortPopularQuizList.sort((a: RecentQuizType, b: RecentQuizType) => {
      return b.solverCnt - a.solverCnt;
    });
    const _slicePopularQuizList = _sortPopularQuizList.slice(0, 4);
    setPopularQuizList(_slicePopularQuizList);
  };
  
  useEffect(() => {
    fetchPopularQuizList();
  }, []);

  /* 컴포넌트 구조 개선하기 */
  return (
    <>
      {popularQuizList && (
        <Wrapper>
          <Title>
            <h2>추천 퀴즈</h2>
            <span>참여율이 높은 퀴즈들을 추천해드려요!</span>
            {/* <button>
              <img src="/assets/img/arrow_right.svg" alt="추천퀴즈더보기버튼" />
            </button> */}
          </Title>

          <ListWrapper>
            {popularQuizList.slice(0,4).map((quiz) => {
              return <QuizMiniCard key={quiz.id} recentQuiz={quiz} />;
            })}
          </ListWrapper>
        </Wrapper>
      )}
    </>
  );
};


const Wrapper = styled.div`
  position: relative;
  width: 100%;
  margin: 0 auto;
  border: 1px solid #ffa5aa;
  border-radius: 16px;
  margin-bottom:40px;
`;

const Title = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-top: 25px;
  padding: 0 6.75%;
  text-align: left;
  h2 {
    font-size: 1.4rem;
    color: #212121;
    font-weight: 600;
  }
  span {
    margin-top: 5px;
    color: #616161;
    font-size: 0.85rem;
  }
  button {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    right: 3%;
    top: 0;
    border: 0;
    width: 24px;
    height: 24px;
    padding: 0;
    background: none;
  }
`;
const ListWrapper = styled.div`
  display: grid;
  align-items: center;
  flex-direction: column;
  padding: 24px 16px 40px;
  column-gap: 14px;
  row-gap: 16px;
  grid-template-columns: repeat(2, calc(50% - 7px));
  grid-template-rows: repeat(2, 1fr);
`;

export default PopularQuizList;
