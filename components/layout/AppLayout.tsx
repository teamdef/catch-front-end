// 렌더링할 화면의 가로폭을 고정하고, 가운데로 위치시키는 레이아웃.

import styled from 'styled-components';
import { layoutProps } from 'types/layout';

const AppLayout = ({ children, bgColor }: layoutProps) => {
  return (
    <Centering>
      <FixedWidth bgColor={bgColor}>{children}</FixedWidth>
    </Centering>
  );
};

const Centering = styled.div`
  display: block;
  margin: 0 auto;
  justify-content: center;
  max-width: 480px; /* 기준 width가 480px */
  width: 100%;
`;
const FixedWidth = styled.div<{ bgColor: string | undefined }>`
  min-height: 100vh;
  padding: 0 1rem;
  background-color: ${(props) => (props.bgColor ? props.bgColor : '#fff')};
`;
export default AppLayout;
