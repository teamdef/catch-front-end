import { RootState } from 'store';
import { useSelector, useDispatch } from 'react-redux';
import { MainBtn } from 'styles/common';
import { useCallback, useState } from 'react';
import { saveSolveUserScoreAction } from 'store/user_solve';
import { useModal } from 'hooks';
import { NickNameModal } from 'components/modal';
import styled from 'styled-components';
import QuizItem from './QuizItem';
import Loading from './Loading';

const QuizList = () => {
  const dispatch = useDispatch();
  const { quizList, answerList } = useSelector((state: RootState) => state.solve);
  const [loading, setLoading] = useState<Boolean>(false);
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

  return (
    <Wrapper>
      {quizList.map((item: SolveQuizType, quiz_num: number) => (
        <QuizItem item={item} quiz_num={quiz_num} />
      ))}
      <MainBtn onClick={onClickResult} isBlur={answerList.includes(5)}>
        결과 확인하기
      </MainBtn>
      <RenderModal />
      {loading ? <Loading ment="결과 출력 중 . . ." /> : ''}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 65px;
  margin-bottom: 42px;
`;
export default QuizList;
