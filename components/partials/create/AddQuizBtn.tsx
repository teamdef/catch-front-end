import { Dispatch, SetStateAction, useState } from 'react';
import styled from 'styled-components';
import SelectBox from './SelectBox';

interface AddQuizBtnProps {
  setQuizList: Dispatch<SetStateAction<(TextQuiz | ImageQuiz)[]>>;
}
const AddQuizBtn = ({ setQuizList }: AddQuizBtnProps) => {
  const [isOpenSelect, setIsOpenSelect] = useState<boolean>(false);

  const changeOpenSelect = () => setIsOpenSelect((prev) => !prev);

  return (
    <Wrapper>
      {isOpenSelect && <SelectBox setQuizList={setQuizList} changeOpenSelect={changeOpenSelect} />}
      {!isOpenSelect && <AddButton onClick={changeOpenSelect}>퀴즈 추가하기</AddButton>}
    </Wrapper>
  );
};
const Wrapper = styled.div`
  position: relative;
  margin-bottom: 72px;
  height: 185px;
`;
const AddButton = styled.button`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  padding: 64px 0;
  border: 1px dashed #8c6eff;
  background: #fff;
  ::before {
    content: '';
    position: relative;
    display: block;
    width: 16px;
    height: 16px;
    background: url(/assets/img/rebranding/icon/plus_secondary500.svg) no-repeat center;
    gap: 10px;
  }
  font-size: ${({ theme }) => theme.fontSize.subtitle_2};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.secondary_500};
`;
export default AddQuizBtn;
