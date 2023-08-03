import { RootState } from 'store';
import { useSelector, useDispatch } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import { saveSolveUserScoreAction } from 'store/user_solve';
import { useModal } from 'hooks';
import { NicknameModal } from 'components/modal';
import styled from 'styled-components';
import { LargeContainedBtn } from 'components/style/button';
import { useRouter } from 'next/router';
import { saveEmotionCount } from 'store/emotion';
import { SaveScoreApi } from 'pages/api/quiz';
import { Loading } from 'components/common';
import QuizItem from './QuizItem';

const QuizList = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { quizset_id } = router.query;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { quizList, answerList } = useSelector((state: RootState) => state.solve);
  const { solveUserName, solveUserScore } = useSelector((state: RootState) => state.user_solve);
  const { userId } = useSelector((state: RootState) => state.user);
  const isDisabled = !answerList.includes(5);
  const [openModal, , RenderModal] = useModal({
    escClickable: false,
    backgroundClickable: false,
    contents: <NicknameModal />,
  });

  const onClickResult = useCallback(() => {
    const score: number = quizList.filter(
      (quiz: SolveQuizType, quiz_num: number) => quiz.correct_idx === answerList[quiz_num],
    ).length;
    dispatch(saveSolveUserScoreAction({ solveUserScore: score }));
    openModal();
  }, [answerList]);

  const moveResult = (_solver_id: string) => router.push(`/quiz/solve/${quizset_id}/result/${_solver_id}`);

  const saveUserScore = async () => {
    setIsLoading(true);
    try {
      const res = await SaveScoreApi(solveUserName, solveUserScore, quizset_id as string, userId, quizList.length);
      const { quizset_emotion, solver_id } = res.data;
      dispatch(saveEmotionCount({ quizSetEmotion: quizset_emotion }));
      moveResult(solver_id);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (solveUserName) saveUserScore();
  }, [solveUserName]);

  if (isLoading) return <Loading text="결과 출력중 입니다." />;
  return (
    <Wrapper>
      {quizList.map((item: SolveQuizType, quiz_num: number) => (
        <QuizItem item={item} quiz_num={quiz_num} key={quiz_num} />
      ))}
      <LargeContainedBtn onClick={onClickResult} disabled={!isDisabled}>
        결과 확인하기
      </LargeContainedBtn>
      <RenderModal />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 65px;
  margin-bottom: 42px;
`;
export default QuizList;
