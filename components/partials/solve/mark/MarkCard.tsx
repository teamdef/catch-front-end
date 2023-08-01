import { useSelector } from 'react-redux';
import { RootState } from 'store';
import styled from 'styled-components';
import { MarkChoiceText, MarkChoiceImage } from '.';

export interface MarkCardProps {
  quiz: SolveQuizType;
  quiz_num: number;
}

const MarkCard = ({ quiz, quiz_num }: MarkCardProps) => {
  const { answerList } = useSelector((state: RootState) => state.solve);
  const { quiz_title, quiz_thumbnail, choice_type, choices } = quiz;
  const isCorrect = answerList[quiz_num] === quiz.correct_idx;
  const isImage = choice_type === 'img';
  return (
    <Wrapper>
      <MarkCount correct={isCorrect}>Q {quiz_num + 1}.</MarkCount>
      <Question>{quiz_title}</Question>
      {quiz_thumbnail && <QuizImage src={quiz_thumbnail} alt="퀴즈 설명 이미지" />}
      {isImage && <MarkChoiceImage choices={choices} />}
      {!isImage && <MarkChoiceText choices={choices} />}
    </Wrapper>
  );
};
const Wrapper = styled.div`
  position: relative;
`;

const MarkCount = styled.span<{ correct: boolean }>`
  position: relative;
  display: block;
  margin-left: 3px;
  &::before {
    content: '';
    position: absolute;
    display: block;
    top: -25px;
    left: -19px;
    background-repeat: no-repeat;
    background-image: url(/assets/img/rebranding/anyquiz/wrong.svg);
    width: 68px;
    height: 70px;
    ${({ correct }) =>
      correct &&
      'width:74px; height:70px;background-image:url(/assets/img/rebranding/anyquiz/correct.svg); top: - 31px;left:-15px;'}
  }
`;
const Question = styled.p``;
const QuizImage = styled.img``;

export default MarkCard;
