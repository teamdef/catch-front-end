import { useEffect, useState, useCallback } from 'react';
import type { ReactElement } from 'react';
import type { NextPageWithLayout } from 'pages/_app';
import { useModal } from 'hooks';
import * as S from 'styles/quiz/solve/main.style';
import { MainButton } from 'styles/common';
import { AppLayout, HeaderLayout } from 'components/layout';
import { Loading, QuizList } from 'components/common';
import { NickNameModal } from 'components/modal';
import { useDispatch, useSelector } from 'react-redux';
import { saveSolveUserScoreAction } from 'store/user_solve';
import { RootState } from 'store';

const Page: NextPageWithLayout = () => {
  const dispatch = useDispatch();
  const { quizList, answerList } = useSelector((state: RootState) => state.solve);
  const [loading, setLoading] = useState<Boolean>(false);
  const [isDisable, setIsDisable] = useState<boolean>(false);
  const [openModal, , RenderModal] = useModal({
    escClickable: false,
    backgroundClickable: false,
    contents: <NickNameModal setLoading={setLoading} />,
  });

  const onClickResult = useCallback(() => {
    const score = quizList.filter(
      (quiz: SolveQuizType, quiz_num: number) => quiz.correct_idx === answerList[quiz_num],
    ).length;
    dispatch(
      saveSolveUserScoreAction({
        solveUserScore: score,
      }),
    );
    openModal();
  }, [answerList]);

  useEffect(() => {
    if (!answerList.includes(5)) setIsDisable(true);
  }, [answerList]);

  return (
    <S.Container>
      <S.QuizSolveContent>
        <QuizList />
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
  return (
    <AppLayout>
      <HeaderLayout>{page}</HeaderLayout>
    </AppLayout>
  );
};
export default Page;
