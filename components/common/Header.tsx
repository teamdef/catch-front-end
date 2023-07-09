import styled from 'styled-components';
import React, { useState } from 'react';
import { Logo, Icon, SideNavigationBar } from 'components/common';

const Header = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState<boolean>(false);

  const handleSideBar = () => {
    setIsSideBarOpen((state) => !state);
  };
  const handleSideBarIconSrc = () => {
    if (isSideBarOpen) return '/assets/img/icon/close_24px.png';
    return '/assets/img/icon/menu_24px.png';
  };

  return (
    <>
      <Wrapper>
        <Logo width="100px" />
        <Icon src={handleSideBarIconSrc()} onClick={handleSideBar} />
      </Wrapper>
      {isSideBarOpen && <SideNavigationBar />}
    </>
  );
};

const Wrapper = styled.div`
  position: fixed;
  background-color: #fff;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  max-width: 480px;
  width: 100%;
  height: 56px;
  z-index: 99;
  ${({ theme }) => theme.mixin.flex({ align: 'center', justify: 'space-between' })} /* mixin 사용 */
  padding:16px;
`;

export default Header;
