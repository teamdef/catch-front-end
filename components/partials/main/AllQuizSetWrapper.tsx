import { QuizSetCardType } from 'types/quiz';
import { useEffect, useState } from 'react';
import { RecentQuizListApi } from 'pages/api/quiz';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { QuizCard } from 'components/common';
import { parseQuizSetList } from 'utils/quiz';
import { TabBar } from '.';

function AllQuizSetWrapper() {
  const [quizSetList, setQuizSetList] = useState<QuizSetCardType[] | null>();
  const { data } = useQuery({
    queryKey: ['fetchAllQuizSet'],
    queryFn: () => RecentQuizListApi(),
    select: (_data) => parseQuizSetList(_data.data.recent_quizset),
  });

  const listHandler = (_list: QuizSetCardType[]) => {
    setQuizSetList(_list);
  };

  useEffect(() => {
    if (data) setQuizSetList(data);
  }, [data]);

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
