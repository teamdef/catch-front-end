import styled from 'styled-components';
import { ShareBox } from '.';

const ShareModal = () => {
  return (
    <Wrapper>
      <Title>퀴즈 공유하기</Title>
      <ShareBox />
    </Wrapper>
  );
};
const Wrapper = styled.div`
  height: 28.8vh;
`;
const Title = styled.div`
  font-size: ${({ theme }) => theme.fontSize.subtitle_2};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.blackColors.grey_900};
  height: 69px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: none;
`;
export default ShareModal;
