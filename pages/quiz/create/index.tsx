/* react, next 관련 */
import { ReactElement, useEffect, useState } from 'react';
import type { NextPageWithLayout } from 'pages/_app';
import { useModal } from 'hooks';
/* redux 관련 */
import { useSelector } from 'react-redux';
import { RootState } from 'store';
/* 컴포넌트 */
import { AppLayout, HeaderLayout } from 'components/layout';
import { theme } from 'styles/theme';
import Sketchbook from 'components/style/Sketchbook';
import QuizSetInput from 'components/partials/create/QuizSetInput';
import styled from 'styled-components';
import AddQuizBtn from 'components/partials/create/AddQuizBtn';
import CreateQuizList from 'components/partials/create/CreateQuizList';
import CreateQuizSetBtn from 'components/partials/create/CreateQuizSetBtn';

const Page: NextPageWithLayout = () => {
  const { quizList, setTitle } = useSelector((state: RootState) => state.quiz);
  const [_quizList, _setQuizList] = useState<(TextQuiz | ImageQuiz)[]>([]); // 문제 내부 저장 배열

  /* 모달 관리 */
  const [openContinueModal, ,] = useModal({
    // yesTitle: '이어서',
    // noTitle: '새롭게',
    // noAction: () => {
    //   resetLocalProblemSet();
    // },
    contents: (
      <div>
        <div>
          제작하던 <strong style={{ color: '#ff4d57' }}>{setTitle}</strong>
          <br />
          퀴즈 세트가 있습니다
        </div>
        <div style={{ marginTop: '10px', fontSize: '12px', color: '#999' }}>이어서 제작하시겠습니까?</div>
      </div>
    ),
  });

  // const resetLocalProblemSet = () => {
  //   _setDescription('');
  //   _setQuizList([]);
  //   titleClear();
  // };
  // const quizListHandler = (_params: (TextQuiz | ImageQuiz)[]) => {
  //   _setQuizList(_params);
  // };

  useEffect(() => {
    if (quizList[0]) openContinueModal();
    if (quizList) _setQuizList(quizList);
  }, []);
  return (
    <Sketchbook>
      <Wrapper>
        {/* <RenderContinueModal /> */}
        <QuizSetInput />
        <CreateQuizList quizList={_quizList} setQuizList={_setQuizList} />
        <AddQuizBtn setQuizList={_setQuizList} />
        <CreateQuizSetBtn _quizList={_quizList} />
      </Wrapper>
    </Sketchbook>
  );
};
const Wrapper = styled.div`
  margin-top: 56px;
  border: 0;
  &::placeholder {
    font-weight: ${theme.fontWeight.regular};
  }
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
