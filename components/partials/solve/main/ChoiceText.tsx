import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store';
import { saveSolveAnswersAction } from 'store/quiz_solve';
import styled from 'styled-components';
import { ChoiceProps } from 'types/quiz';

// interface ChoiceReturn {
//   (choices: ChoiceProps): React.ReactElement[]; // or JSX.Element[]
// }

const ChoiceText = ({ choices, quizNum }: ChoiceProps) => {
  const dispatch = useDispatch();
  const { answerList } = useSelector((state: RootState) => state.solve);
  const copy_answer = [...answerList];

  const answerHandler = (_choice_num: number) => {
    copy_answer[quizNum] = _choice_num;
    dispatch(saveSolveAnswersAction({ answerList: copy_answer }));
  };

  return (
    <Wrapper>
      {choices.map((choice: string, choice_num: number) => {
        return (
          <>
            <ChoiceTextInput
              type="radio"
              id={`${quizNum}_${choice_num}`}
              name={`${quizNum}`}
              value={choice}
              checked={answerList[quizNum] === choice_num}
              onChange={() => {
                answerHandler(choice_num);
              }}
            />
            <ChoiceTextLabel htmlFor={`${quizNum}_${choice_num}`}>{choice}</ChoiceTextLabel>
          </>
        );
      })}
    </Wrapper>
  );
};

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  gap: 8px;
`;

const ChoiceTextLabel = styled.label`
  width: 100%;
  padding: 22px 24px;
  font-size: ${({ theme }) => theme.fontSize.body_2};
  border: 1px solid ${({ theme }) => theme.colors.secondary_500};
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.secondary_500};
`;
const ChoiceTextInput = styled.input`
  display: none;
  &:checked + ${ChoiceTextLabel} {
    border-radius: 8px;
    background: ${({ theme }) => theme.colors.secondary_500};
    color: #fff;
    &::before {
      content: '';
      position: absolute;
      right: 24px;
      display: block;
      width: 18px;
      height: 14px;
      background-image: url(/assets/img/rebranding/icon/check_text.svg);
    }
  }
`;
export default ChoiceText;
