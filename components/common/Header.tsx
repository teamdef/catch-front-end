// 임시 헤더 제작

import styled, { keyframes } from 'styled-components';
import Link from 'next/link';
import { MdLogout, MdOutlineHistory, MdMenu } from 'react-icons/md';
import { RiKakaoTalkFill, RiQuestionLine } from 'react-icons/ri';
import {} from 'react-icons/hi';
import { TiArrowSortedDown } from 'react-icons/ti';
import React, { useEffect, useRef, forwardRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutAction } from 'store/user';
import { RootState } from 'store';

// Header 및 DropDownMyMenu 내 유저 프로필 이미지가 존재하지 않을 시 대체 이미지 출력 
const userImgError = (e:any) => {
    e.target.src = '/assets/img/user.png';
  };
// ref를 props로 전달하기 위해 forwardRef 사용
// inner component
const DropDownMyMenu = forwardRef<HTMLDivElement, any>((props, ref) => {
  const dispatch = useDispatch();
  const { userId, userNickname, userProfileImage } = useSelector((state: RootState) => state.user);

  const Logout = () => {
    dispatch(logoutAction());
  };

  return (
    <DropDownMenuContainer {...props} ref={ref}>
      <UserInfoContainer>
        <ProfileImageContainer>
          <img src={userProfileImage} onError={userImgError} />
        </ProfileImageContainer>
        <ProfileOtherContainer>
          <div className="user-nickname">
            <strong>{userNickname} </strong>님
          </div>
          <div className="user-code">usercode {userId}</div>
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
          <li style={{ color: 'red' }} onClick={Logout}>
            <Link href="#">
              <a>
                <MdLogout />
                로그아웃
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
  const { userProfileImage } = useSelector((state: RootState) => state.user);
  // 메뉴바 바깥의 요소를 클릭 했을 때 메뉴 닫기
  const menuRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent): void => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        if (!headerRef.current?.contains(e.target as Node)) {
          // 헤더와 메뉴를 제외한 모든 외부 컴포넌트 클릭시 메뉴를 닫음.
          // details를 찾아서 open 클래스를 제거. open 클래스가 제거되면 메뉴가 닫힘
          const dropdown: HTMLDetailsElement = document.getElementById('details-menu') as HTMLDetailsElement;
          dropdown.removeAttribute('open');
        }
      }
    };
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
          <Logo>캐치캐치</Logo>
          <UserProfileMenuContainer id="details-menu">
            <summary>
              <div id="image-wrapper">
                {/* 이미지 없을 시 대체 이미지 보이기 */}
                <img src={userProfileImage} onError={userImgError} />
              </div>
              <TiArrowSortedDown id="arrow" size="24" color="555" />
            </summary>
            <DropDownMyMenu ref={menuRef} id="dropdown" />
          </UserProfileMenuContainer>
        </HeaderContent>
      </HeaderContentWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  background-color: #fff;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
`;
// header
const HeaderContentWrapper = styled.div`
  display: flex;
  padding: 0.5rem 1.5rem 0.5rem 1.5rem;
  width: 100%;
`;
const HeaderContent = styled.div`
  display: flex;
  width: 100%;
  height: 100px;
  justify-content: space-between;
  align-items: center;
`;
const Logo = styled.div`
  font-size: 1.5rem;
  font-family: 'RixInooAriDuriR';
  color: #ff4d57;
`;

const UserProfileMenuContainer = styled.details`
  summary {
    display: flex;
    align-items: center;
    list-style: none;
    &::-webkit-details-marker {
      display: none;
    }
  }
  #image-wrapper {
    width: 2rem;
    height: 2rem;
    margin-right: 10px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
    }
  }
  &[open] {
    #arrow {
      transition: transform 0.3s;
      transform: rotate(-180deg);
    }
  }
  &:not([open]) {
    #arrow {
      transition: transform 0.3s;
    }
  }
`;

// drop down my menu

const DropDownMenuContainer = styled.div`
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 10%), 0 1px 2px 0 rgb(0 0 0 / 6%);
  position: absolute;
  display: inline-block;
  border: solid 1px #eee;
  color: rgb(59, 59, 59);
  padding: 1rem;
  max-width: 15rem;
  transform-origin: top center;
  border-radius: 6px;
  background-color: white;
  top: 100px;
  right: 0;
  z-index: 99;
  &:after {
    content: '';
    position: absolute;
    top: -9px;
    right: 26px;
    width: 16px;
    height: 16px;
    border-top: solid 1px #eee;
    border-right: solid 1px #eee;
    transform: rotate(-45deg);
    z-index: 100;
    background-color: white;
  }
`;
const ContentContainer = styled.div`
  border-bottom: solid 1px #eee;
  display: flex;
  &:first-child {
    padding-bottom: 1rem;
  }
  &:last-child {
    padding-top: 1rem;
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
    padding: 20%;
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
