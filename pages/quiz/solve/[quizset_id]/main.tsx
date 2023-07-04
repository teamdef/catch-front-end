import type { NextPageWithLayout } from 'pages/_app';
import type { ReactElement } from 'react';
import { useState } from 'react';
import { useModal } from 'hooks';
import * as S from 'styles/quiz/solve/main.style';
import { MainButton } from 'styles/common';
import { AppLayout } from 'components/layout';
import { Loading, Logo, QuizList } from 'components/common';
import { NickNameModal } from 'components/modal';
import { useDispatch, useSelector } from 'react-redux';
import { saveSolveAnswersAction } from 'store/quiz_solve';
import { saveSolveUserScoreAction } from 'store/user_solve';
import { RootState } from 'store';
import { useEffect } from 'react';

const Page: NextPageWithLayout = () => {
  const dispatch = useDispatch();
  const { quizList } = useSelector((state: RootState) => state.solve);
  const [userAnswers, setUserAnswers] = useState<number[]>(Array(quizList.length));

  console.log(userAnswers);
  const [loading, setLoading] = useState<Boolean>(false);
  const [openModal, , RenderModal] = useModal({
    escClickable: false,
    backgroundClickable: false,
    contents: <NickNameModal setLoading={setLoading} />,
  });

  const onClickResult = () => {
    // dispatch(saveSolveAnswersAction({ answerList: userAnswers }));
    // dispatch(
    //   saveSolveUserScoreAction({
    //     solveUserScore: userAnswers.filter((element: any) => 'catch' === element).length,
    //   }),
    // );
    openModal();
  };
  return (
    <S.Container>
      <Logo />
      <S.QuizSolveContent>
        <QuizList userAnswers={userAnswers} setUserAnswers={setUserAnswers} />
      </S.QuizSolveContent>
      <S.QuizSolveBottom>
        <MainButton onClick={onClickResult}>결과 확인하기</MainButton>
        <RenderModal />
        {loading ? <Loading ment="결과 출력 중 . . ." /> : ''}
      </S.QuizSolveBottom>
    </S.Container>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};
export default Page;
