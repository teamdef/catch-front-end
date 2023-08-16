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
      <div>{text}</div>
      <button onClick={(e: MouseEvent) => deleteChoice(e)}>항목삭제</button>
    </Wrapper>
  );
};
const Wrapper = styled.li<{ correct: boolean }>`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ correct }) => (correct ? '#AAD775' : '#eee')};
  color: ${({ correct }) => (correct ? '#244E10' : '#888')};
  font-weight: ${({ correct }) => correct && 'bold'};
  border-radius: 8px;
  margin-top: 20px;
  padding-left: 34px;
  padding-right: 20px;
  height: 60px;
  cursor: pointer;
  font-size: 1rem;
  button {
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    border: none;
    color: ${({ correct }) => (correct ? '#244E10' : '#888')};
  }
`;

export default CreateChoiceText;
