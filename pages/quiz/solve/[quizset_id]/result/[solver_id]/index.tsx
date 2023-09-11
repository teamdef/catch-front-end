import { ReactElement } from 'react';
import styled from 'styled-components';
import { Emotion, Loading, NotFound } from 'components/common';
import { useQuery } from '@tanstack/react-query';
import { NextPageWithLayout } from 'pages/_app';
import { AppLayout, HeaderLayout } from 'components/layout';
import { theme } from 'styles/theme';
import UserScore from 'components/partials/solve/result/UserScore';
import Sketchbook from 'components/style/Sketchbook';
import Comment from 'components/comment/Comment';
import { ShareModalBtn } from 'components/share';
import { RankingBoard } from 'components/ranking';
import { QuizSolverResultApi } from 'pages/api/quiz';

const Page: NextPageWithLayout = () => {
  const { isLoading, data, isError } = useQuery({
    queryKey: ['fetchSolverResult'],
    queryFn: () => QuizSolverResultApi(),
    select: (_data) => _data.data,
  });
  // 추후 data 값에 유저의 풀이결과에 대한 데이터가 추가될 예정
  // ex : data.user.score data.user.nickname data.user.answer
  console.log(data);
  return (
    <>
      {isError && <NotFound text="잘못된 접근이에요!" />}
      {isLoading && <Loading text="결과를 불러오는 중 입니다." />}
      {!isLoading && (
        <Sketchbook>
          <Wrapper>
            <UserScore name={data.nickname} score={data.score} total={data.submission.length} />
            <RankingBoard />
            <Emotion />
            <ShareModalBtn />
            <Comment />
          </Wrapper>
        </Sketchbook>
      )}
    </>
  );
};

const Wrapper = styled.div`
  position: relative;
  margin-top: 56px;
  margin-bottom: 12px;
`;

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <AppLayout bgColor={theme.colors.primary_bg}>
      <HeaderLayout bgColor={theme.colors.primary_bg}>{page}</HeaderLayout>
    </AppLayout>
  );
};
export default Page;
