import styled from 'styled-components';
import { MarkChoiceProps } from './MarkChoiceText';

const MarkChoiceImage = ({ choices, answerObj }: MarkChoiceProps) => {
  console.log(answerObj);
  return (
    <>
      {choices.map((choice: string, j: number) => (
        <Wrapper key={j}>
          <img src={choice} alt="오답노트항목이미지" />
        </Wrapper>
      ))}
    </>
  );
};
const Wrapper = styled.div``;
export default MarkChoiceImage;
