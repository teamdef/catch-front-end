import { useState, useEffect } from 'react';
import { QuizCard, SkeletonQuizCard, NotFound } from 'components/common';
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
    let _sortPopularQuizList = _popularQuizList.slice(0, 10);
    _sortPopularQuizList = _sortPopularQuizList.filter((item: RecentQuizType) => item.solverCnt !== 0);  /* 풀이자가 0명인데 인기있을리가 .. */
    _sortPopularQuizList.sort((a: RecentQuizType, b: RecentQuizType) => {
      return b.solverCnt - a.solverCnt;
    });

    setPopularQuizList(_sortPopularQuizList);
  };

  useEffect(() => {
    fetchPopularQuizList();
  }, []);

  /* 컴포넌트 구조 개선하기 */
  return (
    <>
      {popularQuizList && (
        <Wrapper>
          <Title>인기있는 퀴즈에요 !</Title>
          <ListWrapper>
            <PaddingBottom>
              {popularQuizList.map((quiz) => {
                return <QuizCard key={quiz.id} recentQuiz={quiz} />;
              })}
            </PaddingBottom>
          </ListWrapper>
        </Wrapper>
      )}
    </>
  );
};

const Wrapper = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const Title = styled.h2`
  display: flex;
  font-size: 1.25rem;
  color: #ff4d57;
  font-weight: bold;
  align-items: center;
  text-align:left;
`;

const ListWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 1.5rem;
`;

const PaddingBottom = styled.div`
  padding-bottom: 80px;
  width: 100%;
`;
export default PopularQuizList;
