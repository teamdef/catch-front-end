import styled from 'styled-components';
import { Dispatch, SetStateAction } from 'react';

interface AddQuizBtnProps {
  setQuizList: Dispatch<SetStateAction<(TextQuiz | ImageQuiz)[]>>;
  changeOpenSelect: () => void;
}
const SelectBox = ({ setQuizList, changeOpenSelect }: AddQuizBtnProps) => {
  const createTextQuiz = () => {
    const obj: TextQuiz = {
      quizTitle: '',
      quizThumbnail: undefined,
      choiceType: 'text',
      choices: [],
      correctIndex: 0,
    };
    // prev => [...prev, obj]
    setQuizList((prev) => [...prev, obj]);
    changeOpenSelect();
  };

  const createImageQuiz = () => {
    const obj: ImageQuiz = {
      quizTitle: '',
      quizThumbnail: undefined,
      choiceType: 'img',
      choices: [],
      correctIndex: 0,
    };
    // prev => [...prev, obj]
    setQuizList((prev) => [...prev, obj]);
    changeOpenSelect();
  };
  return (
    <Wrapper>
      <Title>퀴즈 형식을 선택해주세요.</Title>
      <Content>
        <AddTextQuizBtn onClick={createTextQuiz} />
        <AddImageQuizBtn onClick={createImageQuiz} />
      </Content>
    </Wrapper>
  );
};

const Wrapper = styled.div``;
const Title = styled.div`
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.blackColors.grey_900};
  margin-bottom: 12px;
`;
const Content = styled.div`
  display: flex;
  padding: 16px;
  gap: 16px;
  border-radius: 8px;
  border: 1px dashed #8c6eff;
  button {
    flex-grow: 1;
    aspect-ratio: 132/120;
  }
`;
const AddTextQuizBtn = styled.button`
  background: url(/assets/img/rebranding/create/text_quiz_add.svg) no-repeat center;
  &:hover,
  &:active {
    background: url(/assets/img/rebranding/create/text_quiz_add_active.svg) no-repeat center;
  }
`;
const AddImageQuizBtn = styled.button`
  background: url(/assets/img/rebranding/create/image_quiz_add.svg) no-repeat center;
  &:hover,
  &:active {
    background: url(/assets/img/rebranding/create/Image_quiz_add_active.svg) no-repeat center;
  }
`;
export default SelectBox;
