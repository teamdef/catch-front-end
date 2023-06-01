// 임시 헤더 제작

import styled from 'styled-components';
import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { SideBar, Logo } from 'components/common';
import Router from 'next/router';

const useScroll = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const handleScroll = () => setIsScrolled(window.scrollY > 120);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll); // 스크롤 이벤트 등록
    return () => {
      window.removeEventListener('scroll', handleScroll); // 스크롤 이벤트 제거
    };
  }, []);
  return isScrolled;
};
const Header = () => {
  const { profileImg } = useSelector((state: RootState) => state.user);

  const [sideBarOpen, setSideBarOpen] = useState<boolean>(false);
  const [resizeHeader, setResizeHeader] = useState<boolean>(false);

  const isScrolled = useScroll();
  const openSideBar = () => {
    setSideBarOpen(true);
  };
  const closeSideBar = () => {
    setSideBarOpen(false);
  };
  // Header 및 DropDownMyMenu 내 유저 프로필 이미지가 존재하지 않을 시 대체 이미지 출력
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
            <UserProfile onClick={openSideBar}>
              {/* 이미지 없을 시 대체 이미지 보이기 */}
              <img src={profileImg || '/assets/img/user_default.png'} onError={userImgError} />
            </UserProfile>
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
  padding: 0 1rem;
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

export default Header;
