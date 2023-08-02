import { useSelector } from 'react-redux';
import { RootState } from 'store';
import styled from 'styled-components';
import { MarkChoiceText, MarkChoiceImage } from '.';
import { QuizImageWrapper, QuizTitle } from '../main/QuizItem';

export interface MarkCardProps {
  quiz: SolveQuizType;
  quiz_num: number;
}
export interface AnswerObjProps {
  correct: number;
  user: number;
}
const MarkCard = ({ quiz, quiz_num }: MarkCardProps) => {
  const { answerList } = useSelector((state: RootState) => state.solve);
  const { quiz_title, quiz_thumbnail, choice_type, choices, correct_idx } = quiz;
  const isCorrect = answerList[quiz_num] === correct_idx;
  const isImage = choice_type === 'img';
  const answer_obj: AnswerObjProps = { correct: correct_idx, user: answerList[quiz_num] }; // 정답 / 유저답이 담긴 객체
  return (
    <Wrapper>
      <QuizTitle>
        <MarkCount correct={isCorrect}>Q {quiz_num + 1}.</MarkCount>
        {quiz_title}
      </QuizTitle>
      {quiz_thumbnail && <QuizImageWrapper src={quiz_thumbnail} alt="퀴즈 설명 이미지" />}
      {isImage && <MarkChoiceImage choices={choices} answerObj={answer_obj} />}
      {!isImage && <MarkChoiceText choices={choices} answerObj={answer_obj} />}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const MarkCount = styled.span<{ correct: boolean }>`
  position: relative;
  display: block;
  margin-right: 12px;
  flex: none;
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

export default MarkCard;
