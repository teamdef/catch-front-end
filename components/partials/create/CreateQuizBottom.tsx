import { Dispatch, SetStateAction, useCallback } from 'react';
import styled from 'styled-components';

interface CreateQuizBottomProps {
  quizList: (TextQuiz | ImageQuiz)[];
  setQuizList: Dispatch<SetStateAction<(TextQuiz | ImageQuiz)[]>>;
  quizIndex: number;
}
const CreateQuizBottom = ({ quizList, setQuizList, quizIndex }: CreateQuizBottomProps) => {
  const deleteProblem = useCallback(() => {
    const temp = [...quizList];
    temp.splice(quizIndex, 1);
    setQuizList(temp);
  }, [quizList]);

  return (
    <Wrapper>
      <Notice>퀴즈의 정답을 선택해주세요!</Notice>
      <DeleteQuizBtn onClick={deleteProblem}>삭제</DeleteQuizBtn>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
`;
const Notice = styled.div`
  font-size: ${({ theme }) => theme.fontSize.caption};
  color: ${({ theme }) => theme.colors.blackColors.grey_500};
`;
const DeleteQuizBtn = styled.button`
  padding-right: 14px;
  font-size: ${({ theme }) => theme.fontSize.caption};
  color: ${({ theme }) => theme.colors.secondary_300};
`;
export default CreateQuizBottom;
