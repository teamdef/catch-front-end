import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import useAnimation from 'hooks/useAnimation';
import { disableScroll, enableScroll } from 'utils/scroll';
import Logo from './Logo';
import SideMenuBar from '../profile/SideMenuBar';

const Header = ({ bgColor }: { bgColor?: string | undefined }) => {
  const currentUrl = window.location.href;
  const [isSideBarOpen, setIsSideBarOpen] = useState<boolean>(false);
  const [renderSideBar, handleTransitionEnd, triggerAnimation] = useAnimation(isSideBarOpen);

  const handleSideBar = () => {
    setIsSideBarOpen((current) => !current);
  };

  useEffect(() => {
    if (!triggerAnimation) {
      setTimeout(() => {
        handleTransitionEnd();
      }, 300);
    }
  }, [triggerAnimation]);
  useEffect(() => {
    if (isSideBarOpen) disableScroll();
    else enableScroll();
  }, [isSideBarOpen]);
  useEffect(() => {
    setIsSideBarOpen(false); // url 이 변경되면 사이드메뉴바는 닫히도록 함.
  }, [currentUrl]);
  return (
    <>
      <Wrapper bgColor={bgColor}>
        <Logo width="100px" />
        <SideMenuBtn onClick={handleSideBar} isSideBarOpen={isSideBarOpen} />
      </Wrapper>
      {renderSideBar && (
        <SideMenuBar bgColor={bgColor} triggerAnimation={triggerAnimation} handleSideBar={handleSideBar} />
      )}
    </>
  );
};

const Wrapper = styled.div<{ bgColor: string | undefined }>`
  position: fixed;
  background-color: ${(props) => (props.bgColor ? props.bgColor : '#fff')};
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
const SideMenuBtn = styled.button<{ isSideBarOpen: boolean }>`
  position: relative;
  display: block;
  width: 24px;
  height: 24px;
  background-image: ${({ isSideBarOpen }) =>
    isSideBarOpen ? 'url(/assets/img/icon/close_24px.png)' : 'url(/assets/img/icon/menu_24px.png)'};
`;
export default Header;
