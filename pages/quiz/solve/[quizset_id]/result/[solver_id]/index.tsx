import { ReactElement } from 'react';
import styled from 'styled-components';
import { NotFound, RankingBoard } from 'components/common';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { NextPageWithLayout } from 'pages/_app';
import { AppLayout, HeaderLayout } from 'components/layout';
import { theme } from 'styles/theme';
import UserScore from 'components/resultPage/UserScore';
import { Emotion } from 'components/emotion';
import Sketchbook from 'components/style/Sketchbook';
import Comment from 'components/comment/Comment';
import { ShareModalBtn } from 'components/share';

const Page: NextPageWithLayout = () => {
  const { solveUserName, solveUserScore } = useSelector((state: RootState) => state.user_solve);
  const { quizList } = useSelector((state: RootState) => state.solve);
  return (
    <>
      {!solveUserScore && <NotFound text="잘못된 접근이에요!" />}
      {solveUserScore && (
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
