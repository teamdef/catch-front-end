// 렌더링할 화면의 가로폭을 고정하고, 가운데로 위치시키는 레이아웃.

import styled from 'styled-components';

const AppLayout = (props: { children: React.ReactNode }) => {
  return (
    <Centering>
      <FixedWidth>{props.children}</FixedWidth>
    </Centering>
  );
};

const Centering = styled.div`
  display: flex;
  justify-content: center;
`;
const FixedWidth = styled.div`
  max-width:500px;
  width: 100%;
`;
export default AppLayout;
