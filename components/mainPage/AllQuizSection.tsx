// 전체 보기 섹션

import styled from 'styled-components';
import QuizCard from './QuizCard';
import SectionHeader from './SectionHeader';

import { useState, useEffect } from 'react';
import { QuizSetCardType } from 'types/quiz';
import { RecentQuizListApi } from 'pages/api/quiz';
const AllQuizSection = () => {
  const [allQuizList, setAllQuizList] = useState<QuizSetCardType[] | null>(null);

  const fetchAllQuizList = async () => {
    try {
      const res = await RecentQuizListApi();
      const { recent_quizset } = res.data;
      parseAllQuizList(recent_quizset);
    } catch (err) {
      console.log(err);
    }
  };

  const parseAllQuizList = (data: any) => {
    const _allQuizList = data.map((quizSet: any) => {
      const _quizObj: QuizSetCardType = {
        quizSetId: quizSet.id,
        createdAt: quizSet.created_at,
        quizSetTitle: quizSet.set_title,
        solverCnt: quizSet.solver_cnt,
        quizSetThumbnail: quizSet.thumbnail ?? null,
        quizSetMaker: { nickname: quizSet.user.nickname, profileImg: quizSet.user.profile_img },
      };
      return _quizObj;
    });

      const _sliceAllQuizList = _allQuizList.slice(0, 4);
      console.log(_sliceAllQuizList);
    setAllQuizList(_sliceAllQuizList);
  };

  useEffect(() => {
    fetchAllQuizList();
  }, []);

  if (!!!allQuizList) return <></>;

  return (
    <Wrapper>
      <SectionHeader title={'전체 보기'} moreViewUri={'/'} simply={true} />
      <SectionContent>
        {allQuizList.map((quizSet: QuizSetCardType, idx: number) => {
            return <QuizCard quizSet={quizSet} key={`quiz-set-card-${idx}`} />;
        })}
      </SectionContent>
    </Wrapper>
  );
};

const Wrapper = styled.div``;
const SectionContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 14px;
  margin-bottom: 24px;
`;
export default AllQuizSection;
