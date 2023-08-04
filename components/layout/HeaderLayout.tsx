// 헤더와 사이드바를 포함하는 레이아웃.

// eslint-disable-next-line import/no-cycle
import { Header } from 'components/common';
import styled from 'styled-components';
import { layoutProps } from 'types/layout';

const HeaderLayout = ({ children, bgColor }: layoutProps) => {
  return (
    <>
      <Header bgColor={bgColor} />
      <SpaceWrapper>{children}</SpaceWrapper>
    </>
  );
};

const SpaceWrapper = styled.div`
  position: relative;
  padding-top: 56px;
  padding-bottom: 28px;
`;
export default HeaderLayout;
