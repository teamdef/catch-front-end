// 헤더와 사이드바를 포함하는 레이아웃.

import { Header } from 'components/common';
const HeaderLayout = (props: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      {props.children}
    </>
  );
};

export default HeaderLayout;
