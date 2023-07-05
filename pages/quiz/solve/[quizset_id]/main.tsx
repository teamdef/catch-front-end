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
  const [userAnswers, setUserAnswers] = useState<number[]>(Array(quizList.length).fill(5));
  const [loading, setLoading] = useState<Boolean>(false);
  const [isDisable, setIsDisable] = useState<boolean>(false);
  const [openModal, , RenderModal] = useModal({
    escClickable: false,
    backgroundClickable: false,
    contents: <NickNameModal setLoading={setLoading} />,
  });

  const onClickResult = () => {
    let score = 0;
    quizList.map((quiz: SolveQuizType, quiz_num: number) => {
      if (quiz.correctIndex == userAnswers[quiz_num]) {
        score++;
      }
    });
    dispatch(saveSolveAnswersAction({ answerList: userAnswers }));
    dispatch(
      saveSolveUserScoreAction({
        solveUserScore: score,
      }),
    );
    openModal();
  };

  useEffect(() => {
    if (!userAnswers.includes(5)) setIsDisable(true);
  }, [userAnswers]);

  return (
    <S.Container>
      <Logo />
      <S.QuizSolveContent>
        <QuizList userAnswers={userAnswers} setUserAnswers={setUserAnswers} />
      </S.QuizSolveContent>
      <S.QuizSolveBottom>
        <MainButton className={isDisable ? 'on' : ''} onClick={onClickResult}>
          결과 확인하기
        </MainButton>
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
