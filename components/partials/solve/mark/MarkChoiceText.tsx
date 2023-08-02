import styled from 'styled-components';
import { AnswerObjProps } from './MarkCard';

export interface MarkChoiceProps {
  choices: SolveQuizType['choices'];
  answerObj: AnswerObjProps;
}
const MarkChoiceText = ({ choices, answerObj }: MarkChoiceProps) => {
  const { correct, user } = answerObj;
  const textCard = (_text: string, _index: number) => {
    if (correct === _index) return <CorrectText key={_index}>{_text}</CorrectText>;
    if (user === _index && user !== correct) return <UserAnswerText key={_index}>{_text}</UserAnswerText>;
    return <WrongText key={_index}>{_text}</WrongText>;
  };

  return <Wrapper>{choices.map((choice: string, index: number) => textCard(choice, index))}</Wrapper>;
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  span {
    display: block;
    width: 100%;
    padding: 22px 24px;
    border-radius: 8px;
  }
`;
const CorrectText = styled.span`
  color: #fff;
  background: ${({ theme }) => theme.colors.secondary_500};
  font-size: ${({ theme }) => theme.fontSize.body_2};
  &::before {
    content: '';
    position: absolute;
    right: 24px;
    display: block;
    width: 18px;
    height: 14px;
    background-image: url(/assets/img/rebranding/icon/check_text.svg);
  }
`;
const UserAnswerText = styled.span`
  background-color: ${({ theme }) => theme.colors.error_2};
  color: ${({ theme }) => theme.colors.error_1};
  &::before {
    content: '';
    position: absolute;
    right: 24px;
    display: block;
    width: 18px;
    height: 14px;
    background-image: url(/assets/img/rebranding/icon/check_text_wrong.svg);
  }
`;
const WrongText = styled.span`
  border: 1px solid ${({ theme }) => theme.colors.error_1};
  color: ${({ theme }) => theme.colors.error_1};
`;
export default MarkChoiceText;
