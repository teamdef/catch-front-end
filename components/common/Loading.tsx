import styled, { keyframes } from 'styled-components';
import { PortalWrapper } from 'components/modal'

interface LoadingProps {
  ment?: string;
}
const Loading = ({ ment }: LoadingProps) => {
  return (
    <PortalWrapper wrapperId="react-portal-loading-container">
      <Background>
        <Title>
          <span>캐</span>
          <span>치</span>
          <span>캐</span>
          <span>치</span>
        </Title>
        {ment && <div id="ment">{ment}</div>}
      </Background>
    </PortalWrapper>
  );
};

const Background = styled.div`
  background-color: #00000085;
  width: 500px;
  height: 100vh;
  z-index: 999;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  #ment {
    color: #fff6f7;
  }
`;
const bounce = keyframes` 
  0% {transform: translatey(0px);}
  5% {transform: translatey(-10px);}
  10% {transform: translatey(0px);}
  100% {transform: translatey(0px);}
`;

const Title = styled.div`
  span {
    position: relative;
    display: inline-block;
    animation: ${bounce} 2s linear 0.1s infinite;
    &:nth-child(2) {
      animation-delay: 0.2s;
    }
    &:nth-child(3) {
      animation-delay: 0.3s;
    }
    &:nth-child(4) {
      animation-delay: 0.4s;
    }
  }
  font-family: 'RixInooAriDuriR';
  font-size: 2rem;
  color: #ff4d57;
  padding: 1rem 0 1rem 0;
`;
export default Loading;
