import { AppLayout, HeaderLayout } from 'components/layout';
import type { NextPageWithLayout } from 'pages/_app';
import type { ReactElement } from 'react';
import { RootState } from 'store';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { theme } from 'styles/theme';
import styled from 'styled-components';
import MarkList from 'components/partials/solve/mark/MarkList';
import Sketchbook from 'components/style/Sketchbook';

const Page: NextPageWithLayout = () => {
  const router = useRouter();
  const { quizList, quizSetId } = useSelector((state: RootState) => state.solve);
  const { solveUserScore } = useSelector((state: RootState) => state.user_solve);

  const goReplay = () => router.push(`/quiz/solve/${quizSetId}`);
  const moveHome = () => router.push(`/`);

  return (
    <Sketchbook>
      <Wrapper>
        <UserScore>점수: {`${solveUserScore}/${quizList.length}`}</UserScore>
        <QuizTitle>{quizList.title}</QuizTitle>
        <MarkList />
        <ButtonBox>
          <Button onClick={goReplay}>퀴즈 다시 풀기</Button>
          <Button onClick={moveHome}>
            퀴즈 둘러보기
            <img src="/assets/img/rebranding/icon/arrow_right_grey800.svg" alt="퀴즈둘러보기아이콘이미지" />
          </Button>
        </ButtonBox>
      </Wrapper>
    </Sketchbook>
  );
};

const Wrapper = styled.div`
  margin-top: 48px;
  margin-bottom: 37px;
  font-weight: ${theme.fontWeight.bold};
`;
const UserScore = styled.p`
  color: ${theme.colors.error};
`;

const QuizTitle = styled.h2`
  margin-top: 8px;
  font-size: ${theme.fontSize.subtitle_2};
  color: ${theme.colors.blackColors.grey_900};
`;
const ButtonBox = styled.div`
  display: flex;
  justify-content: space-evenly;
`;
const Button = styled.button`
  display: flex;
  color: ${theme.colors.blackColors.grey_800};
  img {
    margin-left: 10px;
  }
`;

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <AppLayout bgColor={theme.colors.mintColor}>
      <HeaderLayout bgColor={theme.colors.mintColor}>{page}</HeaderLayout>
    </AppLayout>
  );
};
export default Page;
