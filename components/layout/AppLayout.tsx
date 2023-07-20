// 렌더링할 화면의 가로폭을 고정하고, 가운데로 위치시키는 레이아웃.

import styled from 'styled-components';
import { theme } from 'styles/theme';
import { layoutProps } from 'types/layout';

const AppLayout = ({ children, bg }: layoutProps) => {
  return (
    <Centering>
      <FixedWidth bg={bg}>{children}</FixedWidth>
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
const FixedWidth = styled.div<{ bg: boolean }>`
  min-height: 100vh;
  padding: 0 1rem;
  background-color: ${(props) => (props.bg ? theme.colors.mintColor : '#fff')};
`;
export default AppLayout;
