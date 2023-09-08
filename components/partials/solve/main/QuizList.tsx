import { RootState } from 'store';
import { useSelector, useDispatch } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import { saveSolveUserScoreAction } from 'store/user_solve';
import { useModal } from 'hooks';
import styled from 'styled-components';
import { LargeContainedBtn } from 'components/style/button';
import { saveEmotionCount } from 'store/emotion';
import { SaveScoreApi } from 'pages/api/quiz';
import { Loading } from 'components/common';
import { useMutation } from '@tanstack/react-query';
import { moveResult } from 'utils/move';
import { QuizItem, NicknameModal } from '.';

const QuizList = () => {
  const dispatch = useDispatch();
  const [isNickname, setIsNickname] = useState<boolean>(false);
  const { quizList, answerList } = useSelector((state: RootState) => state.solve);
  const { solveUserName, solveUserScore } = useSelector((state: RootState) => state.user_solve);
  const { userId } = useSelector((state: RootState) => state.user);
  const isDisabled = !answerList.includes(5);
  const [openModal, , RenderModal] = useModal({
    escClickable: false,
    backgroundClickable: false,
    contents: <NicknameModal setIsNickname={setIsNickname} />,
  });

  const onClickResult = useCallback(() => {
    const score: number = quizList.filter(
      (quiz: SolveQuizType, quiz_num: number) => quiz.correct_idx === answerList[quiz_num],
    ).length;
    dispatch(saveSolveUserScoreAction({ solveUserScore: score }));
    openModal();
  }, [answerList]);

  const { isLoading, mutate } = useMutation({
    mutationFn: () => {
      return SaveScoreApi(solveUserName, solveUserScore, userId, quizList.length);
    },
    onSuccess: (data) => {
      const { quizset_emotion, solver_id } = data.data;
      dispatch(saveEmotionCount({ quizSetEmotion: quizset_emotion }));
      moveResult(solver_id);
    },
  });

  useEffect(() => {
    if (isNickname) mutate();
  }, [isNickname]);

  if (isLoading) return <Loading text="결과 출력 중 입니다." />;
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
