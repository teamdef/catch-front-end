import styled from 'styled-components';

import Emotion from 'components/emotionShare/Emotion';
import BottomUpShare from 'components/emotionShare/BottomUpShare';

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

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;
const Content = styled.div`
  display: inline-block;
`;

export default EmotionShare;
