import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import useAnimation from 'hooks/useAnimation';
import Logo from './Logo';
import Icon from './Icon';
import SideMenuBar from '../profile/SideMenuBar';

const Header = ({ bgColor }: { bgColor?: string | undefined }) => {
  const [isSideBarOpen, setIsSideBarOpen] = useState<boolean>(false);
  const [renderSideBar, handleTransitionEnd, triggerAnimation] = useAnimation(isSideBarOpen);

  const handleSideBar = () => {
    setIsSideBarOpen((current) => !current);
  };

  const handleSideBarIconSrc = () => {
    if (isSideBarOpen) return '/assets/img/icon/close_24px.png';
    return '/assets/img/icon/menu_24px.png';
  };

  useEffect(() => {
    if (!triggerAnimation) {
      setTimeout(() => {
        handleTransitionEnd();
      }, 300);
    }
  }, [triggerAnimation]);

  return (
    <>
      <Wrapper bgColor={bgColor}>
        <Logo width="100px" />
        <Icon src={handleSideBarIconSrc()} onClick={handleSideBar} />
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

export default Header;
