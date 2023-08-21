import { Dispatch, MouseEvent, SetStateAction } from 'react';
import styled from 'styled-components';

interface CreateChoiceImageProps {
  props: {
    quiz: ImageQuiz;
    quizIndex: number;
    choiceIndex: number;
    quizList: (TextQuiz | ImageQuiz)[];
    setQuizList: Dispatch<SetStateAction<(TextQuiz | ImageQuiz)[]>>;
    imageObj: ChoiceImageType;
  };
}

const CreateChoiceImage = ({ props }: CreateChoiceImageProps) => {
  const { quiz, quizIndex, quizList, setQuizList, choiceIndex, imageObj } = props;
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
      <img alt="미리보기" src={imageObj.imgURL} />
      <DeleteChoiceBtn onClick={deleteChoice} />
    </Wrapper>
  );
};
const Wrapper = styled.div<{ correct: boolean }>``;
const DeleteChoiceBtn = styled.button`
  position: absolute;
  display: block;
`;
export default CreateChoiceImage;
