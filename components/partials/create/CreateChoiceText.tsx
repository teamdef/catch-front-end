import { Dispatch, MouseEvent, SetStateAction } from 'react';
import styled from 'styled-components';

interface CreateChoiceTextProps {
  props: {
    quiz: TextQuiz;
    quizIndex: number;
    choiceIndex: number;
    quizList: (TextQuiz | ImageQuiz)[];
    setQuizList: Dispatch<SetStateAction<(TextQuiz | ImageQuiz)[]>>;
    text: string;
  };
}
const CreateChoiceText = ({ props }: CreateChoiceTextProps) => {
  const { quiz, quizIndex, quizList, setQuizList, choiceIndex, text } = props;
  const isCorrect = quiz.correctIndex === choiceIndex;
  const key = `${quiz.choiceType} ${quizIndex + choiceIndex}`;

  // 정답 체크
  const setCorrectIndex = () => {
    const temp = JSON.parse(JSON.stringify(quizList));
    temp[quizIndex].correctIndex = choiceIndex;
    setQuizList(temp);
  };

  // 답안 항목 삭제
  const deleteChoice = (e: MouseEvent) => {
    e.stopPropagation();
    const temp = JSON.parse(JSON.stringify(quizList));
    temp[quizIndex].choices.splice(choiceIndex, 1);
    if (temp[quizIndex].correctIndex > temp[quizIndex].choices.length - 1) {
      temp[quizIndex].correctIndex = 0;
    }
    setQuizList(temp);
  };

  return (
    <Wrapper correct={isCorrect} key={key} onClick={setCorrectIndex}>
      {text}
      <DeleteChoiceBtn onClick={(e: MouseEvent) => deleteChoice(e)} />
    </Wrapper>
  );
};

const DeleteChoiceBtn = styled.button`
  position: relative;
  display: block;
  width: 14px;
  height: 14px;
  background-position: center;
`;

const Wrapper = styled.button<{ correct: boolean }>`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 22px 24px;
  border-radius: 8px;
  background-color: ${({ correct, theme }) => (correct ? theme.colors.secondary_500 : '#fff')};
  color: ${({ correct, theme }) => (correct ? '#fff' : theme.colors.secondary_500)};
  border: 1px solid ${({ theme }) => theme.colors.secondary_500};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  border-radius: 8px;
  height: 60px;
  & ${DeleteChoiceBtn} {
    background: ${({ correct }) =>
      correct
        ? 'url(/assets/img/rebranding/icon/close_white.svg)'
        : 'url(/assets/img/rebranding/icon/close_secondary500.svg)'};
  }
`;

export default CreateChoiceText;
