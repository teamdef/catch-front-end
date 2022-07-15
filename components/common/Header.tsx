// 임시 헤더 제작

import styled, { keyframes } from 'styled-components';
import Link from 'next/link';
import { MdLogout, MdOutlineHistory } from 'react-icons/md';
import { RiKakaoTalkFill, RiQuestionLine } from 'react-icons/ri';
import React, { useState, useEffect, useRef, forwardRef } from 'react';

// ref를 props로 전달하기 위해 forwardRef 사용
// inner component
const DropDownMyMenu = forwardRef<HTMLDivElement, any>((props, ref) => {
  return (
    <DropDownMenuContainer {...props} ref={ref}>
      <UserInfoContainer>
        <ProfileImageContainer>
          <img src={'/assets/img/user_default.png'} />
        </ProfileImageContainer>
        <ProfileOtherContainer>
          <div className="user-nickname">
            <strong>전하영 </strong>님
          </div>
          <div className="user-code">usercode 01023456789</div>
        </ProfileOtherContainer>
      </UserInfoContainer>
      <MyMenuContainer>
        <ul>
          <li>
            <Link href="#">
              <a>
                <MdOutlineHistory />내 퀴즈 내역
              </a>
            </Link>
          </li>
          <li>
            <Link href="#">
              <a>
                <RiQuestionLine />
                FAQ
              </a>
            </Link>
          </li>
          <li>
            <Link href="#">
              <a>
                <RiKakaoTalkFill />
                카카오톡 오픈채팅 문의
              </a>
            </Link>
          </li>
          <li style={{ color: 'lightgrey' }}>
            <Link href="#">
              <a>
                <MdLogout />
                로그아웃
              </a>
            </Link>
          </li>
          <li style={{ color: 'red' }}>
            <Link href="#">
              <a>
                <MdLogout />
                회원탈퇴
              </a>
            </Link>
          </li>
        </ul>
      </MyMenuContainer>
    </DropDownMenuContainer>
  );
});

// main component
const Header = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const menuHandler = () => {
    setMenuOpen(!menuOpen);
  };

  // 메뉴바 바깥의 요소를 클릭 했을 때 메뉴 닫기
  const menuRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
   useEffect(() => {
     const handleClickOutside = (e: MouseEvent): void =>{
       if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
         if (!headerRef.current?.contains(e.target as Node)) { // 헤더와 메뉴를 제외한 모든 외부 컴포넌트 클릭시 메뉴를 닫음.
           setMenuOpen(false);
         }
       }
     }
     document.addEventListener('mousedown', handleClickOutside);
     // 컴포넌트가 unmount 되었을 때 액션
     return () => {
       document.removeEventListener('mousedown', handleClickOutside);
     };
   }, [menuRef]);
  
  return (
    <Wrapper>
      <HeaderContentWrapper ref={headerRef}>
        <HeaderContent>
          <Logo>CatchMe</Logo>
          <UserName onClick={menuHandler}>전하영 님</UserName>
        </HeaderContent>
      </HeaderContentWrapper>
      <DropDownMyMenu className={menuOpen && 'active'} ref={menuRef} />
    </Wrapper>
  );
};


const Wrapper = styled.div`
  position: relative;
`;
// header
const HeaderContentWrapper = styled.div`
  display: flex;
  padding: 0.5rem 1rem 0.5rem 1rem;
  width: 100%;
  height: 60px;
  background-color: white;
  border-bottom: solid 1px #d6d6d6;
`;
const HeaderContent = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;
const Logo = styled.div`
  font-size: 20px;
  font-weight: bold;
`;
const UserName = styled.div`
  font-size: 18px;
`;

// drop down my menu
const GrowDown = keyframes` 
    0% {
        transform: scaleY(0)
    }
    80% {
        transform: scaleY(1.1)
    }
    100% {
        transform: scaleY(1)
    }
`;
const DropDownMenuContainer = styled.div`
  border: solid 1px #eee;
  color: rgb(59, 59, 59);
  padding: 1rem;
  max-width: 15rem;
  animation: ${GrowDown} 0.3s ease-in-out forwards;
  transform-origin: top center;
  position: absolute;
  background-color: white;
  top: 59px;
  right: 0;
  z-index: 99;
  display:none;
  &.active{
    display:inline-block;
  }
`;
const ContentContainer = styled.div`
  padding-top: 1rem;
  padding-bottom: 1rem;
  border-bottom: solid 1px #eee;
  display: flex;
  &:first-child {
    padding-top: 0;
  }
  &:last-child {
    border: none;
  }
`;
const UserInfoContainer = styled(ContentContainer)`
  display: flex;
`;
const ProfileImageContainer = styled.div`
  width: 3rem;
  height: 3rem;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
`;
const ProfileOtherContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 1rem;
  .user-nickname {
  }
  .user-code {
    color: lightgrey;
    font-size: 12px;
  }
`;
const MyMenuContainer = styled(ContentContainer)`
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    width: 100%;
    li {
      a {
        display: flex;
        align-items: center;
        font-size: 14px;
        svg {
          /* icon */
          margin-right: 0.5rem;
        }
      }
      padding: 0.5rem;
    }
  }
`;
export default Header;
