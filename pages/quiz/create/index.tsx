/* react, next 관련 */
import { ReactElement, useEffect, useState } from 'react';
import type { NextPageWithLayout } from 'pages/_app';
import { useInput, useModal } from 'hooks';
/* redux 관련 */
import { useSelector } from 'react-redux';
import { RootState } from 'store';
/* 컴포넌트 */
import { AppLayout, HeaderLayout } from 'components/layout';
import { theme } from 'styles/theme';
import QuizSetInput from 'components/partials/create/QuizSetInput';
import styled from 'styled-components';
import AddQuizBtn from 'components/partials/create/AddQuizBtn';
import CreateQuizList from 'components/partials/create/CreateQuizList';
import CreateQuizSetBtn from 'components/partials/create/CreateQuizSetBtn';
import ContinueModal from 'components/partials/create/ContinueModal';
import Torn from 'components/style/Torn';

const Page: NextPageWithLayout = () => {
  const { quizList, setTitle, description } = useSelector((state: RootState) => state.quiz);
  const [_quizList, _setQuizList] = useState<(TextQuiz | ImageQuiz)[]>([]); // 문제 내부 저장 배열
  const [title, titleSetter, , titleHandler] = useInput<string>('');
  const [desc, descSetter, , descHandler] = useInput<string>('');

  const [openContinueModal, , RenderContinueModal] = useModal({
    contents: <ContinueModal setQuizList={_setQuizList} titleSetter={titleSetter} descSetter={descSetter} />,
  });

  useEffect(() => {
    if (quizList[0]) openContinueModal();
    if (quizList) _setQuizList(quizList);
    if (setTitle) titleSetter(setTitle);
    if (description) descSetter(description);
  }, []);

  return (
    <Wrapper>
      <Title>모두의 퀴즈 만들기</Title>
      <Torn>
        <ContentWrapper>
          <RenderContinueModal />
          <QuizSetInput props={{ title, titleHandler, desc, descHandler }} />
          <CreateQuizList quizList={_quizList} setQuizList={_setQuizList} />
          <AddQuizBtn setQuizList={_setQuizList} />
          <CreateQuizSetBtn />
        </ContentWrapper>
      </Torn>
    </Wrapper>
  );
};
const Wrapper = styled.div``;
const Title = styled.h2`
  padding: 14px 0;
  color: ${theme.colors.blackColors.grey_900};
  font-weight: ${theme.fontWeight.bold};
  font-size: ${theme.fontSize.subtitle_2};
`;
const ContentWrapper = styled.div`
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
