import { RootState } from 'store';
import { useSelector } from 'react-redux';
import { useModal } from 'hooks';
import styled from 'styled-components';
import { LargeContainedBtn } from 'components/style/button';
import { QuizItem, NicknameModal } from '.';

const QuizList = () => {
  const { quizList, answerList } = useSelector((state: RootState) => state.solve);
  const isDisabled = !answerList.includes(5);
  const [openModal, , RenderModal] = useModal({
    escClickable: false,
    backgroundClickable: false,
    contents: <NicknameModal />,
  });

  return (
    <Wrapper>
      {quizList.map((item: SolveQuizType, quiz_num: number) => (
        <QuizItem item={item} quiz_num={quiz_num} key={quiz_num} />
      ))}
      <LargeContainedBtn onClick={openModal} disabled={!isDisabled}>
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
