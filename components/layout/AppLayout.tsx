// 렌더링할 화면의 가로폭을 고정하고, 가운데로 위치시키는 레이아웃.

import { useEffect } from 'react';
import styled from 'styled-components';

const AppLayout = (props: { children: React.ReactNode }) => {
  
  return (
    <Centering>
      <FixedWidth>{props.children}</FixedWidth>
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
const FixedWidth = styled.div`
  min-height: 100vh;
  padding: 0 3%;
  background-color: #fff;
`;
export default AppLayout;
