import styled from 'styled-components';
import { ShareBox } from '.';

const ShareModal = () => {
  return (
    <Wrapper>
      <Title>퀴즈 공유하기</Title>
      <SubTitle>
        퀴즈를 재밌게 풀었다면
        <br />
        친구들에게 공유해보세요!
      </SubTitle>
      <ShareBox />
    </Wrapper>
  );
};
const Wrapper = styled.div`
  height: 234px;
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
const SubTitle = styled.p`
  color: ${({ theme }) => theme.colors.blackColors.grey_700};
  text-align: center;
  margin-bottom: 25px;
`;
export default ShareModal;
