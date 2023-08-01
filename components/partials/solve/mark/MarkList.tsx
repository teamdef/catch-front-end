import { useSelector } from 'react-redux';
import { RootState } from 'store';
import styled from 'styled-components';
import { MarkCard } from '.';

const MarkList = () => {
  const { quizList } = useSelector((state: RootState) => state.solve);

  return (
    <Wrapper>
      {quizList.map((quiz: SolveQuizType, quiz_num: number) => (
        <MarkCard key={quiz_num} quiz={quiz} quiz_num={quiz_num} />
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 56px;
  margin-top: 46px;
  margin-bottom: 13px;
`;
export default MarkList;
