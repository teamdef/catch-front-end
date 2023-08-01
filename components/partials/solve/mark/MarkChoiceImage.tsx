import styled from 'styled-components';

const MarkChoiceImage = ({ choices }: { choices: SolveQuizType['choices'] }) => {
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
