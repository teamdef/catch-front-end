import styled, { css, keyframes } from 'styled-components';
import { MdOutlineSettings } from 'react-icons/md';
import Link from 'next/link';
import { AiOutlineNotification, AiOutlineLogout, AiOutlineClose } from 'react-icons/ai';
import { HiOutlineEmojiSad } from 'react-icons/hi';
import { useEffect, useRef, useState } from 'react';

interface SideBarProps {
  profileImg: string;
  closeSideBar: () => void;
  sideBarOpen: boolean;
}
const SideBar = ({ profileImg, closeSideBar }: SideBarProps) => {
  const sidebarRef = useRef<HTMLDivElement>(null);

  const [animation, setAnimation] = useState('openAnimation');
  const login = true;

  const close = () => {
    setAnimation('closeAnimation');
    setTimeout(() => {
      closeSideBar();
    }, 490);
  };

  useEffect(() => {
    const body = document.querySelector('body') as HTMLBodyElement;
    body.style.overflowY = 'hidden';

    return () => {
      body.style.overflowY = 'auto';
    };
  }, []);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent): void => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
        if (!sidebarRef.current?.contains(e.target as Node)) {
          // 사이드바를 제외한 모든 외부 컴포넌트 클릭시 메뉴를 닫음.
          close();
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    // 컴포넌트가 unmount 되었을 때 액션
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sidebarRef]);

  return (
    <Background>
      <Wrapper id="side-bar" ref={sidebarRef} className={animation}>
        <div id="greeting">
          <strong>환영</strong>해요!
        </div>
        <Profile>
          <div id="profile-img">
            <img src={profileImg} />
          </div>
          <div id="profile-info-container">
            {login ? (
              <>
                <div id="user-nickname">
                  전하영 님<MdOutlineSettings size={16} />
                </div>
                <div id="user-code"># 123456789</div>
              </>
            ) : (
              <div id="signup">
                <strong>로그인</strong>이 필요합니다!
              </div>
            )}
          </div>
        </Profile>
        <hr />
        <MenuList>
          <li>
            <Link href="/notice" passHref>
              <a>
                <AiOutlineNotification />
                공지사항
              </a>
            </Link>
          </li>
          <li>
            <Link href="/home" passHref>
              <a>
                <img src="/assets/img/kakao_icon.png" />
                카카오톡 오픈채팅 문의
              </a>
            </Link>
          </li>
          {login && <li id="out">
            <Link href="/home" passHref>
              <a>
                <AiOutlineLogout />
                로그아웃
              </a>
            </Link>
          </li>}
          {login && <li id="out">
            <Link href="/home" passHref>
              <a>
                <HiOutlineEmojiSad />
                회원탈퇴
              </a>
            </Link>
          </li>}
        </MenuList>
        <div id="bottom-info">최신버전 0.1.0</div>
        <CloseButton onClick={close}>
          <AiOutlineClose size={24} />
        </CloseButton>
      </Wrapper>
    </Background>
  );
};

const Background = styled.div`
  z-index: 50;
  position: fixed;
  width: 500px;
  @media (max-width: 500px) {
    width: 100%;
  }
  height: 100vh;
  right: 50%;
  top: 0;
  transform: translate(50%, 0%);
  @media (max-width: 500px) {
    right: 0;
    transform: translate(0, 0);
  }
  background: #56565650;
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: right;
  overflow: hidden;
`;

const slidein = keyframes` 
  from{right:-90%;}
  to{right:0px; }
`;
const slideout = keyframes` 
  from{right:0px;}
  to{right:-90%;}
`;
const Wrapper = styled.div`
  z-index: 51;
  background-color: #fff;
  width: 90%;
  padding: 2.5rem 2rem 2rem 2rem;
  position: relative;
  color: #595959;
  min-height: 100vh;
  &.openAnimation {
    animation: ${slidein} 0.5s ease-in-out 0s 1 normal forwards;
  }

  &.closeAnimation {
    animation: ${slideout} 0.5s ease-in-out 0s 1 normal forwards;
  }
  strong {
    font-weight: 400;
    color: #ff4d57;
  }
  #greeting {
    font-family: 'RixInooAriDuriR';
    font-size: 28px;
    color: #9b9b9b;
  }
  #bottom-info {
    position: absolute;
    bottom: 2rem;
    left: calc(50% - 42px);
    color: #9b9b9b;
    font-size: 14px;
  }
  hr {
    border:none;
    border-top: solid 1px #f1f1f1;
  }
`;

const CloseButton = styled.button`
  background-color: transparent;
  color: #888;
  border: none;
  position: absolute;
  top: 2.5rem;
  right: 2rem;
  &:hover {
    cursor: pointer;
  }
`;
const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
  #profile-img {
    width: 75px;
    height: 75px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 50%;
    }
  }
  #profile-info-container {
    margin-left: 1.5rem;
    #user-nickname {
      color: #000;
      font-size: 20px;
      font-weight: bold;
      display: flex;
      align-items: center;
      svg {
        margin-left: 0.5rem;
        color: #505050;
      }
    }
    #user-code {
      color: #d6d6d6;
      margin-top: 4px;
    }
    #signup {
      font-size: 20px;
      font-weight: bold;
      strong {
        font-weight: bold;
      }
    }
  }
`;

const MenuList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  margin-top: 3rem;
  li {
    margin-bottom: 1.5rem;
    font-size: 20px;
    @media (max-width:500px){
      font-size:1rem;
    }
    img {
      width: 18px;
      height: 17px;
    }
    svg {
      font-size: 20px;
    }
    a {
      display: flex;
      align-items: center;
      & *:nth-child(1) {
        margin-right: 10px;
      }
    }
  }
  #out {
    color: #d6d6d6;
  }
`;

export default SideBar;

// 서비스 footer 작성필요
