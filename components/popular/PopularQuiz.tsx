import { useState, useEffect } from 'react';
import styled from 'styled-components';

import PopularQuizCard from './PopularQuizCard';
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
          <ListWrapper>
            {popularQuizList.slice(0,4).map((quiz) => {
              return <PopularQuizCard key={quiz.id} recentQuiz={quiz} />;
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
  margin-bottom:40px;
`;

const ListWrapper = styled.div`
`;

export default PopularQuizList;
