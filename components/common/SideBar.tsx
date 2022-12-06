import styled, { keyframes } from 'styled-components';
import { MdOutlineSettings } from 'react-icons/md';
import { AiOutlineNotification, AiOutlineLogout, AiOutlineClose } from 'react-icons/ai';
import { HiOutlineEmojiSad } from 'react-icons/hi';
import { useEffect, useRef, useState } from 'react';
import { RootState } from 'store';
import { useSelector, useDispatch } from 'react-redux';
import { kakaoLeaveApi } from 'pages/api/member';
import { logoutAction } from 'store/user';
import Router from 'next/router';
import { useModal } from 'hooks';
import {Loading} from 'components/common'

interface SideBarProps {
  closeSideBar: () => void;
  sideBarOpen: boolean;
}
const SideBar = ({ closeSideBar }: SideBarProps) => {
  const dispatch = useDispatch();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const { isLoggedin, profileImg, nickName, kakaoUid } = useSelector((state: RootState) => state.user);
  const [animation, setAnimation] = useState('openAnimation');
  const [isLoading, setIsLoading] = useState(false);
  const [openLeaveModal, _, RenderLeaveModal] = useModal({
    escClickable: true,
    backgroundClickable: true,
    yesTitle: '탈퇴',
    noTitle: '취소',
    yesAction: () => seviceLeave(),
    contents: 
      <div>
        <div>
          <strong style={{ color: '#ff4d57' }}>탈퇴하시겠습니까? 😥</strong>
          <br />
          지금 탈퇴하시면 등록된 회원정보 및 관련 게시글은 모두 삭제됩니다.
        </div>
        <div style={{ marginTop: '10px', fontSize: '12px', color: '#999' }}>진행하시겠습니까? ㅜㅜㅜ</div>
      </div>
    ,
  });
  const [openLogoutModal, closeLogoutModal, RenderLogoutModal] = useModal({
    escClickable: true,
    backgroundClickable: true,
    yesTitle: '로그아웃',
    noTitle: '닫기',
    yesAction: () => logout(),
    contents: (
      <div>
        로그아웃 하시겠습니까? 다시 로그인 할 수 있습니다.
      </div>
    ),
  });

  const close = () => {
    setAnimation('closeAnimation');
    setTimeout(() => {
      closeSideBar();
    }, 490);
  };
  const goNotice = () => {
    Router.push('/notice');
  };
  const goLogin = () => {
    Router.push('/member/login');
  };
  const goProfile = () => {
    Router.replace({
      pathname: '/member/profile',
      query: { isReqSignUp: false },
    });
  };
  const goOpenChat = () => {
    window.open('https://open.kakao.com/o/sLi3afJe');
  }
  const goIntroducePage = () => {
    window.open('https://teamdef.notion.site/ba4b38482a0d4d359114bf479b169c44');
  }
  const seviceLeave = () => {
    setIsLoading(true);
    kakaoLeaveApi().then((res) => {
      if (res.status === 200) {
        alert(res.data.message);
        dispatch(logoutAction()); // 로그아웃 처리. 쿠키 삭제
        Router.push('/'); // 메인화면으로 이동
        setIsLoading(false);
      }
    });
  };
  const logout = () => {
    dispatch(logoutAction()); // 로그아웃 처리. 쿠키 삭제
    closeSideBar(); // 사이드바 닫기.
  };
  useEffect(() => {
    const body = document.querySelector('body') as HTMLBodyElement;
    body.style.overflowY = 'hidden';

    return () => {
      body.style.overflowY = 'auto';
    };
  }, []);

  useEffect(() => {
    const body = document.querySelector('body') as HTMLBodyElement;
    const handleClickOutside = (e: MouseEvent): void => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
        // 원래는 DOM 객체에 직접 접근하는건 좋진 않지만... portal로 생성된 모달이라 ㅜ
        const modal = document.getElementById('react-portal-modal-container');
        if (!modal?.contains(e.target as Node)) {
          // 모달을 제외한 모든 외부 컴포넌트 클릭시 메뉴를 닫음.
          close();
        }
      }
    };
    body.addEventListener('mousedown', handleClickOutside);
    // 컴포넌트가 unmount 되었을 때 액션
    return () => {
      body.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sidebarRef]);

  return (
    <>
      {isLoading && <Loading ment={'탈퇴 진행중 입니다...'} />}
      <Background>
        <Wrapper id="side-bar" ref={sidebarRef} className={animation}>
          <div id="greeting">
            <strong>환영</strong>해요!
          </div>
          <Profile>
            <div id="profile-img">
              <img src={profileImg || '/assets/img/user_default.png'} />
            </div>
            <div id="profile-info-container">
              {isLoggedin ? (
                <>
                  <div id="user-nickname" onClick={goProfile}>
                    {nickName} 님<MdOutlineSettings size={16} />
                  </div>
                  <div id="user-code"># {kakaoUid}</div>
                </>
              ) : (
                <div id="signup" onClick={goLogin}>
                  <strong>로그인</strong>이 필요합니다!
                </div>
              )}
            </div>
          </Profile>
          <hr />
          <MenuList>
            <li onClick={goNotice}>
              <AiOutlineNotification />
              공지사항
            </li>
            <li onClick={goOpenChat}>
              <img src={'/assets/img/kakao_icon.png'} />
              카카오톡 오픈채팅 문의
            </li>
            <li onClick={goIntroducePage}>
              <img src={'/assets/img/catch_logo1.png'} />
              캐치캐치를 소개합니다
            </li>
            {isLoggedin && (
              <>
                <li id="out" onClick={openLogoutModal}>
                  <AiOutlineLogout />
                  로그아웃
                </li>
                <li
                  id="out"
                  onClick={() => {
                    openLeaveModal();
                  }}
                >
                  <HiOutlineEmojiSad />
                  회원탈퇴
                </li>
              </>
            )}
          </MenuList>
          <div id="bottom-info">최신버전 0.1.0</div>
          <CloseButton onClick={close}>
            <AiOutlineClose size={24} />
          </CloseButton>
        </Wrapper>

        <RenderLeaveModal />
        <RenderLogoutModal />
      </Background>
    </>
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
    border: none;
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
    @media (max-width: 400px) {
      width:60px;
      height: 60px;
    } 
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
      cursor: pointer;
    }
    #user-code {
      color: #d6d6d6;
      margin-top: 4px;
    }
    #signup {
      &:hover {
        cursor: pointer;
      }
      font-size: 20px;
      @media (max-width:400px){
        font-size:18px;
      }
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
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: left;

  li {
    margin-bottom: 2rem;
    font-size: 18px;
    display: flex;
    align-items: center;
    & *:nth-child(1) {
      margin-right: 10px;
    }
    &:hover {
      cursor: pointer;
    }
    img {
      width: 18px;
      height: 17px;
    }
    svg {
      font-size: 20px;
    }
  }
  #out {
    color: #d6d6d6;
  }
`;

// 임시 변수명, 제작중있음 모달
const Modal2 = styled.div`
  strong {
    color: #ff4d57;
  }
  #last-modified {
    margin-top: 10px;
    font-size: 12px;
    color: #999;
  }
`;

export default SideBar;

// 서비스 footer 작성필요
