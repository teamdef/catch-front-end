import styled from 'styled-components';
import { MarkCardProps } from './MarkCard';
import { MarkChoiceText, MarkChoiceImage } from '.';

const WrongCard = ({ quiz, quiz_num }: MarkCardProps) => {
  // const { answerList } = useSelector((state: RootState) => state.solve);
  const { quiz_title, quiz_thumbnail, choice_type, choices } = quiz;
  const isImage = choice_type === 'img';
  return (
    <Wrapper>
      <Question>
        {quiz_num + 1}. {quiz_title}
      </Question>
      {quiz_thumbnail && <QuizImage alt="퀴즈 설명 이미지" src={quiz_thumbnail} />}
      {isImage && <MarkChoiceImage choices={choices} />}
      {!isImage && <MarkChoiceText choices={choices} />}
    </Wrapper>
  );
};
const Wrapper = styled.div``;
const Question = styled.h2``;
const QuizImage = styled.img``;

export default WrongCard;
