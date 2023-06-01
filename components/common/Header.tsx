import styled from 'styled-components';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { SideBar, Logo } from 'components/common';
import { useScroll } from 'hooks';
import Link from 'next/link';

const Header = () => {
  const { profileImg, isLoggedin } = useSelector((state: RootState) => state.user);
  
  const isScrolled = useScroll();

  const [sideBarOpen, setSideBarOpen] = useState<boolean>(false);

  const openSideBar = () => setSideBarOpen(true);
  const closeSideBar = () => setSideBarOpen(false);


  const userImgError = (e: any) => {
    e.target.src = '/assets/img/user_default.png';
  };

  return (
    <>
      <Wrapper isScrolled={isScrolled}>
        <HeaderContentWrapper>
          <HeaderContent>
            <LogoWrapper>
              <Logo />
              <div className="sub-logo">너와 나를 연결하는 퀴즈 플랫폼</div>
            </LogoWrapper>
            {isLoggedin ? (
              <UserProfile onClick={openSideBar}>
                <img src={profileImg || '/assets/img/user_default.png'} onError={userImgError} />
              </UserProfile>
            ) : (
              <Link href="/member/login" passHref>
                <LoginButton>로그인</LoginButton>
              </Link>
            )}
          </HeaderContent>
        </HeaderContentWrapper>
      </Wrapper>
      {sideBarOpen && <SideBar closeSideBar={closeSideBar} sideBarOpen={sideBarOpen} />}
    </>
  );
};

const Wrapper = styled.div<{ isScrolled: boolean }>`
  position: fixed;
  background-color: #fff;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  max-width: 480px;
  width: 100%;
  z-index: 10;
  height: 120px;
  border-bottom: solid 1px ${(props) => (props.isScrolled ? '#eee' : 'none')};
`;
// header
const HeaderContentWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: 0 1rem 0 1.3rem;
`;

const HeaderContent = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  transition: ease-in-out 0.2s;
`;

const LogoWrapper = styled.div`
  display: block;
  .sub-logo {
    font-size: 10px;
    color: ${({ theme }) => theme.colors.blackColors.grey_800};
    font-weight: ${({ theme }) => theme.fontWeight.extra_bold};
  }
`;
const UserProfile = styled.div`
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const LoginButton = styled.a`
  ${({ theme }) => theme.mixin.flex()} /* mixin 사용 */
  color: #fff;
  border-radius: 15px;
  width: 64px;
  height: 30px;
  background-color: ${({ theme }) => theme.colors.blackColors.grey_900};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  font-size: ${({ theme }) => theme.fontSize.caption};
`;
export default Header;
