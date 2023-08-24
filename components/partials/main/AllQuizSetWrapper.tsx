// 전체 보기 섹션

import { QuizSetCardType } from 'types/quiz';
import { useState, useEffect } from 'react';
import { RecentQuizListApi } from 'pages/api/quiz';
import styled from 'styled-components';
import { QuizCard } from 'components/common';
import { TabBar } from '.';

function AllQuizSetWrapper() {
  const [quizSetList, setQuizSetList] = useState<QuizSetCardType[] | null>(null);

  const fetchAllQuizSet = async () => {
    try {
      const res = await RecentQuizListApi();
      const { recent_quizset } = res.data;
      parseQuizSetList(recent_quizset);
    } catch (err) {
      console.log(err);
    }
  };

  const listHandler = (_list: QuizSetCardType[]) => {
    setQuizSetList(_list);
  };

  const parseQuizSetList = (data: any) => {
    const allQuizMap = data.map((quizSet: any) => {
      const quizObj: QuizSetCardType = {
        quizSetId: quizSet.id,
        createdAt: quizSet.created_at,
        quizSetTitle: quizSet.set_title,
        solverCnt: quizSet.solver_cnt,
        quizSetThumbnail: quizSet.thumbnail ?? null,
        quizSetMaker: { nickname: quizSet.user.nickname, profile_img: quizSet.user.profile_img },
      };
      return quizObj;
    });
    setQuizSetList(allQuizMap);
  };

  useEffect(() => {
    fetchAllQuizSet();
  }, []);

  if (!quizSetList) return <div />;
  return (
    <Wrapper>
      <TabBar props={{ quizSetList, listHandler }} />
      <SectionContent>
        {quizSetList.map((quizSet: QuizSetCardType, idx: number) => {
          const quizInfo = {
            quizSetId: quizSet.quizSetId,
            quizSetTitle: quizSet.quizSetTitle,
            createdAt: quizSet.createdAt,
            thumbnail: quizSet.quizSetThumbnail,
            profileImg: quizSet.quizSetMaker.profile_img,
            nickname: quizSet.quizSetMaker.nickname,
            solverCnt: quizSet.solverCnt,
          };
          return <QuizCard quizInfo={quizInfo} key={`quiz-set-card-${idx}`} />;
        })}
      </SectionContent>
    </Wrapper>
  );
}

const Wrapper = styled.div``;
const SectionContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 15px;
  margin-bottom: 24px;
`;
export default AllQuizSetWrapper;
