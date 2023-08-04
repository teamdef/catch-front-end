import styled from 'styled-components';
import { QuizImage, QuizTitle } from 'components/style';
import { ChoiceImage, ChoiceText } from '.';

interface QuizItemPropsType {
  item: SolveQuizType;
  quiz_num: number;
}

const QuizItem = ({ item, quiz_num }: QuizItemPropsType) => {
  const { quiz_title, quiz_thumbnail, choice_type, choices } = item;

  return (
    <QuizSolveCard key={quiz_num}>
      <QuizTitle>
        <QuizCount>Q {quiz_num + 1}.</QuizCount>
        {quiz_title}
      </QuizTitle>
      {quiz_thumbnail && <QuizImage src={quiz_thumbnail} />}
      {choice_type === 'img' && <ChoiceImage choices={choices} quizNum={quiz_num} />}
      {choice_type === 'text' && <ChoiceText choices={choices} quizNum={quiz_num} />}
      <QuizGuide>퀴즈의 정답을 선택해주세요!</QuizGuide>
    </QuizSolveCard>
  );
};

const QuizSolveCard = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  margin-bottom: 56px;
  &:last-child {
    margin-bottom: 0;
  }
  flex-direction: column;
  flex-wrap: nowrap;
`;

const QuizCount = styled.span`
  margin-right: 12px;
  flex: none;
`;

const QuizGuide = styled.span`
  margin-top: 16px;
  color: ${({ theme }) => theme.colors.blackColors.grey_500};
  font-size: ${({ theme }) => theme.fontSize.caption};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
`;

export default QuizItem;
