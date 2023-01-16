// 임시 헤더 제작

import styled from 'styled-components';
import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { SideBar, Logo } from 'components/common';
import Router from 'next/router';

const Header = () => {
  const { profileImg } = useSelector((state: RootState) => state.user);
  
  const [sideBarOpen, setSideBarOpen] = useState<boolean>(false);
  const [resizeHeader, setResizeHeader] = useState<boolean>(false);

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

  const handleScroll = useCallback(() => {
    window.scrollY > 200 ? setResizeHeader(true) : setResizeHeader(false);
  }, [window.scrollY]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll); // 스크롤 이벤트 등록
    return () => {
      window.removeEventListener('scroll', handleScroll); // 스크롤 이벤트 제거
    };
  }, []);

  return (
    <>
      <Wrapper>
        <HeaderContentWrapper>
          <HeaderContent resize={resizeHeader}>
            <Logo/>
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

const Wrapper = styled.div`
  position: fixed;
  background-color: #fff;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  max-width: 480px;
  width: 100%;
  
  z-index: 10;
  border-bottom: solid 1px #eee;
  height: 80px; /* 변동 헤더 없이 헤더 높이 80px로 고정 */
`;
// header
const HeaderContentWrapper = styled.div`
  display: flex;
  /*padding: 5% 0.5rem;*/ /* 좌우 패딩 5% 상하 패딩 0.5rem*/
  padding:  0 5%;
  align-items: center;
  height: 100%;
  width: 100%;
`;
interface HeaderProps {
  resize: boolean;
}
const HeaderContent = styled.div<HeaderProps>`
  display: flex;
  width: 100%;
  justify-content: space-between;
  transition:ease-in-out 0.2s;
`;
const UserProfile = styled.div`
  width: 2rem;
  height: 2rem;
  cursor:pointer;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
`;

export default Header;
