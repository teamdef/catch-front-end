import { useInput } from 'hooks';
import { Dispatch, KeyboardEvent, SetStateAction, useState } from 'react';
import styled from 'styled-components';
import CreateChoiceText from './CreateChoiceText';

interface CreateChoiceTextListProps {
  props: {
    quiz: TextQuiz;
    quizIndex: number;
    quizList: (TextQuiz | ImageQuiz)[];
    setQuizList: Dispatch<SetStateAction<(TextQuiz | ImageQuiz)[]>>;
  };
}
const CreateChoiceTextList = ({ props }: CreateChoiceTextListProps) => {
  const { quiz, quizIndex, quizList, setQuizList } = props;
  const [activeInput, setActiveInput] = useState<boolean>(false); // 퀴즈 정답 입력창 활성화 여부
  const [textChoiceInput, , textChoiceInputClear, textChoiceInputHandler] = useInput<string>(''); // 객관식 텍스트 답안 전용 input 핸들러
  const activeInputHandler = () => setActiveInput((prev) => !prev);
  // 엔터키 클릭시 답안 등록
  const onKeyDown = (e: KeyboardEvent<HTMLElement>): void => {
    if (e.key === 'Enter') addChoiceText();
  };
  // 텍스트 답안 추가
  const addChoiceText = () => {
    if (textChoiceInput === '') {
      alert('빈 값은 추가할 수 없습니다.');
    } else {
      const temp = JSON.parse(JSON.stringify(quizList));
      temp[quizIndex].choices.push(textChoiceInput);
      setQuizList(temp);
      textChoiceInputClear();
      activeInputHandler();
    }
  };

  return (
    <Wrapper>
      {quiz.choices.map((text: string, choiceIndex: number) => (
        <CreateChoiceText props={{ quiz, quizIndex, quizList, setQuizList, choiceIndex, text }} />
      ))}
      {quiz.choices.length < 4 && !activeInput && (
        <AddChoiceTextBtn onClick={activeInputHandler}>퀴즈 문항 추가하기</AddChoiceTextBtn>
      )}
      {activeInput && (
        <CreateChoiceTextInputBox>
          <Input
            placeholder="추가할 항목을 입력해주세요."
            maxLength={30}
            value={textChoiceInput}
            onChange={textChoiceInputHandler}
            onBlur={addChoiceText}
            onKeyDown={(e) => {
              onKeyDown(e);
            }}
          />
          <DeleteInputBtn onClick={activeInputHandler} />
        </CreateChoiceTextInputBox>
      )}
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const AddChoiceTextBtn = styled.button`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 22px 24px;
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.secondary_500};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  border: 1px solid ${({ theme }) => theme.colors.secondary_500};
  ::after {
    content: '';
    position: relative;
    display: block;
    width: 16px;
    height: 16px;
    background: url(/assets/img/rebranding/icon/plus_secondary500.svg) center no-repeat;
  }
`;
const CreateChoiceTextInputBox = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 22px 24px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.secondary_500};
  color: ${({ theme }) => theme.colors.secondary_500};
`;
const Input = styled.input`
  flex-grow: 1;
  border: 0;
  color: ${({ theme }) => theme.colors.secondary_500};
  ::placeholder {
    color: ${({ theme }) => theme.colors.secondary_200};
    font-weight: ${({ theme }) => theme.fontWeight.regular};
  }
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;
const DeleteInputBtn = styled.button`
  position: relative;
  display: block;
  width: 14px;
  height: 14px;
  background: url(/assets/img/rebranding/icon/close_secondary500.svg) center no-repeat;
`;
export default CreateChoiceTextList;
