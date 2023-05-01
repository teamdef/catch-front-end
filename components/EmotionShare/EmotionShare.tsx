import styled from 'styled-components';
import { Emotion, BottomUpShare } from 'components/EmotionShare';

const EmotionShare = () => {
  return (
    <Wrapper>
      <Content>
        <Emotion />
        <BottomUpShare />
      </Content>
    </Wrapper>
  );
};

export default EmotionShare;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;
const Content = styled.div`
  display: inline-block;
`;
