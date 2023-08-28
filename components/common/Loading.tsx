import { PortalWrapper } from 'components/modal';
import { Background, ProgressCircle } from 'components/style';
import styled from 'styled-components';

interface LoadingProps {
  text?: string;
}
const Loading = ({ text }: LoadingProps) => {
  return (
    <PortalWrapper wrapperId="react-portal-loading-container">
      <Background>
        <Content>
          <ProgressCircle />
          <Text>{text}</Text>
        </Content>
      </Background>
    </PortalWrapper>
  );
};
const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
`;
const Text = styled.div`
  color: ${({ theme }) => theme.colors.blackColors.grey_50};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;
export default Loading;
