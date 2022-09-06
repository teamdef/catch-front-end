import styled, { keyframes } from 'styled-components';
import { SyncLoader } from 'react-spinners';

interface LoadingProps {
  ment?: string;
}
const Loading = ({ ment }: LoadingProps) => {
  return (
    <Background>
      <SyncLoader loading margin={4} size={11} speedMultiplier={1} color={'#FFF6F7'} />
      {ment && <div id="ment">{ment}</div>}
    </Background>
  );
};

const Background = styled.div`
  background-color: #00000070;
  width: 500px;
  height: 100vh;
  z-index: 999;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  #ment {
    margin-top: 1.5rem;
    color: #fff6f7;
  }
`;

export default Loading;
