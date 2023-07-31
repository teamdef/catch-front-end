import styled from 'styled-components';
import { ChoiceImage, ChoiceText } from '.';

interface QuizItemPropsType {
  item: SolveQuizType;
  quiz_num: number;
}

const QuizItem = ({ item, quiz_num }: QuizItemPropsType) => {
  return (
    <QuizSolveCard key={quiz_num}>
      <QuizTitle>
        <QuizCount>Q {quiz_num + 1}.</QuizCount>
        {item.quiz_title}
      </QuizTitle>
      {item.quiz_thumbnail && <QuizImageWrapper src={item.quiz_thumbnail} />}
      {item.choice_type === 'img' && <ChoiceImage choices={item.choices} quizNum={quiz_num} />}
      {item.choice_type === 'text' && <ChoiceText choices={item.choices} quizNum={quiz_num} />}
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

const QuizTitle = styled.div`
  display: flex;
  color: #000;
  font-size: ${({ theme }) => theme.fontSize.body_2};
  font-weight: 700;
  line-height: 130%; /* 18.2px */
  letter-spacing: -0.7px;
  margin-left: 4px;
`;

const QuizCount = styled.span`
  margin-right: 12px;
  flex: none;
`;

const QuizImageWrapper = styled.img`
  margin-top: 12px;
  width: 100%;
  height: 185px;
  object-fit: contain;
  border-radius: 4px;
`;

const QuizGuide = styled.span`
  margin-top: 16px;
  color: ${({ theme }) => theme.colors.blackColors.grey_500};
  font-size: 12px;
  font-weight: ${({ theme }) => theme.fontWeight.regular};
`;
export default QuizItem;
