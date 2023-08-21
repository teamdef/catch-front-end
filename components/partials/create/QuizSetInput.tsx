import { ChangeEvent, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { saveProblemDescriptionAction, saveProblemSetTitleAction } from 'store/quiz';
import styled from 'styled-components';

interface QuizSetInputProps {
  props: {
    title: string;
    titleHandler: (e: ChangeEvent<HTMLInputElement>) => void;
    desc: string;
    descHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  };
}

const QuizSetInput = ({ props }: QuizSetInputProps) => {
  const { title, titleHandler, desc, descHandler } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(saveProblemSetTitleAction({ setTitle: title }));
  }, [title]);
  useEffect(() => {
    dispatch(saveProblemDescriptionAction({ description: desc }));
  }, [desc]);
  return (
    <Wrapper>
      <InputBox>
        <Label htmlFor="title">퀴즈 제목</Label>
        <Input
          name="title"
          type="text"
          placeholder="제목을 입력해주세요! (최대20자)"
          value={title}
          onChange={titleHandler}
          maxLength={20}
        />
      </InputBox>
      <InputBox>
        <Label htmlFor="description">퀴즈 설명</Label>
        <Input
          name="description"
          type="text"
          placeholder="퀴즈에 대한 정보를 입력해주세요. (선택사항)"
          value={desc}
          onChange={descHandler}
          maxLength={100}
        />
      </InputBox>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 88px;
`;
const InputBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;
const Label = styled.label`
  color: ${({ theme }) => theme.colors.blackColors.grey_900};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;
const Input = styled.input`
  margin-top: 12px;
  padding-bottom: 4px;
  border: 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondary_300};
  color: ${({ theme }) => theme.colors.blackColors.grey_700};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  font-size: ${({ theme }) => theme.fontSize.caption};
  &::placeholder {
    color: ${({ theme }) => theme.colors.blackColors.grey_400};
  }
`;
export default QuizSetInput;
