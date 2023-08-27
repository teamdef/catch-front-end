import { ReactElement, useEffect, useState } from 'react';
import type { NextPageWithLayout } from 'pages/_app';
import { useModal } from 'hooks';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store';
import { AppLayout, HeaderLayout } from 'components/layout';
import { theme } from 'styles/theme';
import styled from 'styled-components';
import Torn from 'components/style/Torn';
import { QuizSetInput, CreateQuizList, CreateQuizSetBtn, ContinueModal } from 'components/partials/create/';
import { saveProblemDescriptionAction, saveProblemSetTitleAction, saveQuizListAction } from 'store/quiz';

const Page: NextPageWithLayout = () => {
  const dispatch = useDispatch();
  const [isContinue, setIsContinue] = useState(false);
  const { quizList } = useSelector((state: RootState) => state.quiz);
  const [openContinueModal, , RenderContinueModal] = useModal({
    contents: <ContinueModal setIsContinue={setIsContinue} />,
  });

  const resetReduxProblemSet = () => {
    dispatch(saveProblemDescriptionAction({ description: '' }));
    dispatch(saveProblemSetTitleAction({ setTitle: '' }));
    dispatch(saveQuizListAction({ quizList: [] }));
  };

  useEffect(() => {
    if (quizList[0]) openContinueModal();
  }, []);

  useEffect(() => {
    if (isContinue) resetReduxProblemSet();
  }, [isContinue]);
  return (
    <>
      <Title>모두의 퀴즈 만들기</Title>
      <Torn>
        <Content>
          <RenderContinueModal />
          <QuizSetInput isContinue={isContinue} />
          <CreateQuizList isContinue={isContinue} />
          <CreateQuizSetBtn />
        </Content>
      </Torn>
    </>
  );
};

const Title = styled.h2`
  padding: 14px 0;
  color: ${theme.colors.blackColors.grey_900};
  font-weight: ${theme.fontWeight.bold};
  font-size: ${theme.fontSize.subtitle_2};
`;
const Content = styled.div`
  position: relative;
  margin-top: 31px;
  padding-bottom: 40px;
`;

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <AppLayout bgColor={theme.colors.primary_bg}>
      <HeaderLayout bgColor={theme.colors.primary_bg}>{page}</HeaderLayout>
    </AppLayout>
  );
};

export default Page;
