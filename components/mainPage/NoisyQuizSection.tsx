import styled from 'styled-components';
import SectionHeader from './SectionHeader';
import QuizCard from './QuizCard';

const NoisyQuizSection = () => {
  return (
    <Wrapper>
      <SectionHeader
        title={'시끌시끌 퀴즈'}
        subtitle={'퀴즈에 달린 한줄평이 많은 퀴즈를 추천해드려요!'}
        moreViewUri={'/'}
      />
      <SectionContent>
        <QuizCard />
        <QuizCard />
        <QuizCard />
        <QuizCard />
      </SectionContent>
    </Wrapper>
  );
};

const Wrapper = styled.div``;
const SectionContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 14px;
  margin-bottom: 24px;
`;
export default NoisyQuizSection;
