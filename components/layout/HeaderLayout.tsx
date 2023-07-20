// 헤더와 사이드바를 포함하는 레이아웃.

// eslint-disable-next-line import/no-cycle
import { Header } from 'components/common';
import styled from 'styled-components';
import { layoutProps } from 'types/layout';

const HeaderLayout = ({ children, bg }: layoutProps) => {
  return (
    <>
      <Header bg={bg} />
      <SpaceWrapper>{children}</SpaceWrapper>
    </>
  );
};

const SpaceWrapper = styled.div`
  position: relative;
  padding-top: 120px; /* 딱 헤더의 높이 만큼 위에 공간을 띄움*/
`;
export default HeaderLayout;
