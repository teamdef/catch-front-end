import { AppLayout, HeaderLayout } from 'components/layout';
import type { NextPageWithLayout } from 'pages/_app';
import type { ReactElement } from 'react';
import { RootState } from 'store';
import { useSelector } from 'react-redux';
import { theme } from 'styles/theme';
import styled from 'styled-components';
import Sketchbook from 'components/style/Sketchbook';
import { NotFound } from 'components/common';
import { ButtonBox, MarkList } from 'components/partials/solve/mark';

const Page: NextPageWithLayout = () => {
  const { quizList, setTitle, answerList } = useSelector((state: RootState) => state.solve);
  const { solveUserScore } = useSelector((state: RootState) => state.user_solve);
  const isNotFound = answerList.includes(5);
  return (
    <>
      {isNotFound && <NotFound text="데이터를 불러오지 못했습니다.다시 시도해주세요." />}
      {!isNotFound && (
        <Sketchbook>
          <Wrapper>
            <UserScore>점수: {`${solveUserScore}/${quizList.length}`}</UserScore>
            <QuizTitle>{setTitle}</QuizTitle>
            <MarkList />
            <ButtonBox />
          </Wrapper>
        </Sketchbook>
      )}
    </>
  );
};

const Wrapper = styled.div`
  margin-top: 48px;
  margin-bottom: 37px;
  font-weight: ${theme.fontWeight.bold};
`;
const UserScore = styled.p`
  color: ${theme.colors.error_1};
`;

const QuizTitle = styled.h2`
  margin-top: 8px;
  font-size: ${theme.fontSize.subtitle_2};
  color: ${theme.colors.blackColors.grey_900};
`;

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <AppLayout bgColor={theme.colors.primary_bg}>
      <HeaderLayout bgColor={theme.colors.primary_bg}>{page}</HeaderLayout>
    </AppLayout>
  );
};
export default Page;
