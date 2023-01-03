// 헤더와 사이드바를 포함하는 레이아웃.

import { Header } from 'components/common';
import styled from 'styled-components';
const HeaderLayout = (props: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <SpaceWrapper >{props.children}</SpaceWrapper>
    </>
  );
};

const SpaceWrapper = styled.div` 
  padding-left:3%;
  padding-right:3%;
  margin-top:80px; /* 딱 헤더의 높이 만큼 위에 공간을 띄움*/
`
export default HeaderLayout;
