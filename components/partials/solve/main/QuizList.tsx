import { RootState } from 'store';
import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { saveSolveUserScoreAction } from 'store/user_solve';
import { useModal } from 'hooks';
import { NicknameModal } from 'components/modal';
import styled from 'styled-components';
import { LargeContainedBtn } from 'components/style/button';
import QuizItem from './QuizItem';

const QuizList = () => {
  const dispatch = useDispatch();
  const { quizList, answerList } = useSelector((state: RootState) => state.solve);
  const isDisabled = !answerList.includes(5);
  const [openModal, , RenderModal] = useModal({
    escClickable: false,
    backgroundClickable: false,
    contents: <NicknameModal />,
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
