import { ReactElement } from 'react';
import styled from 'styled-components';
import { Emotion, NotFound } from 'components/common';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { NextPageWithLayout } from 'pages/_app';
import { AppLayout, HeaderLayout } from 'components/layout';
import { theme } from 'styles/theme';
import UserScore from 'components/partials/solve/result/UserScore';
import Sketchbook from 'components/style/Sketchbook';
import Comment from 'components/comment/Comment';
import { ShareModalBtn } from 'components/share';
import { RankingBoard } from 'components/ranking';

const Page: NextPageWithLayout = () => {
  const { solveUserName, solveUserScore } = useSelector((state: RootState) => state.user_solve);
  const { quizList, answerList } = useSelector((state: RootState) => state.solve);
  const isValid = solveUserScore !== undefined;
  console.log(answerList);
  return (
    <>
      {!isValid && <NotFound text="잘못된 접근이에요!" />}
      {isValid && (
        <Sketchbook>
          <Wrapper>
            <UserScore name={solveUserName} score={solveUserScore} total={quizList.length} />
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
    <AppLayout bgColor={theme.colors.mintColor}>
      <HeaderLayout bgColor={theme.colors.mintColor}>{page}</HeaderLayout>
    </AppLayout>
  );
};
export default Page;
