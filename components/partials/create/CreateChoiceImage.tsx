import { Dispatch, MouseEvent, SetStateAction } from 'react';
import styled from 'styled-components';

interface CreateChoiceImageProps {
  props: {
    quiz: ImageQuiz;
    quizIndex: number;
    choiceIndex: number;
    quizList: (TextQuiz | ImageQuiz)[];
    _setQuizList: Dispatch<SetStateAction<(TextQuiz | ImageQuiz)[]>>;
    imageObj: ChoiceImageType;
  };
}

const CreateChoiceImage = ({ props }: CreateChoiceImageProps) => {
  const { quiz, quizIndex, quizList, _setQuizList, choiceIndex, imageObj } = props;
  const isCorrect = quiz.correctIndex === choiceIndex;
  const key = `${quiz.choiceType} ${quizIndex + choiceIndex}`;

  // 정답 체크
  const setCorrectIndex = () => {
    const temp = JSON.parse(JSON.stringify(quizList));
    temp[quizIndex].correctIndex = choiceIndex;
    _setQuizList(temp);
  };

  // 답안 항목 삭제
  const deleteChoice = (e: MouseEvent) => {
    e.stopPropagation();
    const temp = JSON.parse(JSON.stringify(quizList));
    temp[quizIndex].choices.splice(choiceIndex, 1);
    if (temp[quizIndex].correctIndex > temp[quizIndex].choices.length - 1) {
      temp[quizIndex].correctIndex = 0;
    }
    _setQuizList(temp);
  };

  return (
    <Wrapper correct={isCorrect} key={key}>
      <Image alt="미리보기" src={imageObj.imgURL} onClick={setCorrectIndex} />
      <DeleteChoiceBtn onClick={deleteChoice} />
    </Wrapper>
  );
};
const Wrapper = styled.div<{ correct: boolean }>`
  position: relative;
  display: block;
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  aspect-ratio: 152/138;
  ::before {
    content: '';
    top: 0;
    left: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    display: ${({ correct }) => (correct && 'block') || 'none'};
    background-color: #000;
    opacity: 0.4;
    z-index: 1;
  }
  ::after {
    content: '';
    position: absolute;
    display: ${({ correct }) => (correct && 'block') || 'none'};
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 38px;
    height: 29px;
    background: url(/assets/img/rebranding/icon/check_img.svg) no-repeat center;
    z-index: 1;
  }
`;
const DeleteChoiceBtn = styled.button`
  position: absolute;
  display: block;
  width: 24px;
  top: 8px;
  right: 8px;
  height: 24px;
  background: url(/assets/img/rebranding/icon/close_bg.svg) no-repeat center;
  z-index: 1;
`;
const Image = styled.img`
  position: relative;
  width: 100%;
  height: 100%;
  object-fit: contain;
`;
export default CreateChoiceImage;
