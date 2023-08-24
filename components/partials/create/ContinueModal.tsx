import { SmallContainedBtn, SmallOutlinedBtn } from 'components/style/button';
import { ModalProps } from 'hooks/useModal';
import { Dispatch, SetStateAction } from 'react';
import { useDispatch } from 'react-redux';
import { saveProblemDescriptionAction, saveProblemSetTitleAction } from 'store/quiz';
import styled from 'styled-components';

interface ContinueModalProps {
  closeModal?: ModalProps['closeModal'];
  setQuizList: Dispatch<SetStateAction<(TextQuiz | ImageQuiz)[]>>;
  titleSetter: (value: string) => void;
  descSetter: (value: string) => void;
}
const ContinueModal = ({ closeModal, setQuizList, titleSetter, descSetter }: ContinueModalProps) => {
  const dispatch = useDispatch();

  const newCreate = () => {
    dispatch(saveProblemDescriptionAction({ description: '' })); // 설명 저장
    dispatch(saveProblemSetTitleAction({ setTitle: '' })); // 제목 저장
    titleSetter('');
    descSetter('');
    setQuizList([]);
    if (closeModal) closeModal();
  };
  return (
    <Wrapper>
      <Title>앗, 이미 제작중인 퀴즈가 있습니다.</Title>
      <Description>이어서 퀴즈를 제작 하시겠습니까?</Description>
      <ButtonBox>
        <SmallOutlinedBtn onClick={newCreate}>새로 만들기</SmallOutlinedBtn>
        <SmallContainedBtn onClick={closeModal}>이어서 만들기</SmallContainedBtn>
      </ButtonBox>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 184px;
  background-color: #fff;
  border-radius: 10px;
  padding: 36px 24px 28px;
  margin: 0 9%;
`;
const Title = styled.h2`
  color: ${({ theme }) => theme.colors.blackColors.grey_900};
  font-size: ${({ theme }) => theme.fontSize.body_1};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;
const Description = styled.p`
  margin-top: 4px;
  flex-grow: 1;
  color: ${({ theme }) => theme.colors.blackColors.grey_500};
`;
const ButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 18px;
  button {
    flex-grow: 1;
  }
`;
export default ContinueModal;
