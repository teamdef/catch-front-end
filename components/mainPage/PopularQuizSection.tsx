import styled from 'styled-components';
import SectionHeader from './SectionHeader';
import QuizCard from './QuizCard';
const PopularQuizSection = () => {
  return (
    <Wrapper>
      <SectionHeader title={'인기 급상승 퀴즈'} subtitle={'많이 조회된 퀴즈를 확인해보세요!'} moreViewUri={'/'} />
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
  margin-top:14px;
  margin-bottom:24px;
`;
export default PopularQuizSection;
