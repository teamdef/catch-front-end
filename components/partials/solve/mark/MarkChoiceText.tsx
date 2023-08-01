import styled from 'styled-components';

const MarkChoiceText = ({ choices }: { choices: SolveQuizType['choices'] }) => {
  return (
    <>
      {choices.map((choice: string) => (
        <Wrapper>
          <span>{choice}</span>
        </Wrapper>
      ))}
    </>
  );
};
const Wrapper = styled.div``;
export default MarkChoiceText;
