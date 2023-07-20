import React, { useEffect } from 'react';
import styled from 'styled-components';

import Link from 'next/link';
import ProfileImage from './ProfileImage';

interface Props {
  headerHeight?: string;
}
const SideNavigationBar = ({ headerHeight }: Props) => {
  // const { isLoggedin } = useSelector((state: RootState) => state.user);

  const isLoggedin = true;
  useEffect(() => {
    const body = document.querySelector('body') as HTMLBodyElement;
    body.style.overflowY = 'hidden';
    return () => {
      body.style.overflowY = 'auto';
    };
  }, []);

  return (
    <Wrapper headerHeight={headerHeight}>
      <SideBarTitle>마이페이지</SideBarTitle>
      {!isLoggedin && (
        <SignInWrapper>
          <Link href="/member/login" passHref>
            <a>
              <div className="title">로그인/회원가입</div>
            </a>
          </Link>
          <div className="sub-text">로그인을 해야 퀴즈를 만들 수 있어요.</div>
        </SignInWrapper>
      )}
      {isLoggedin && (
        <Link href="/member/profile" passHref>
          <a>
            <MyInfoWrapper>
              <ProfileImage src="" size="48px" />
              <div className="info-content">
                <div className="nickname">여행가고싶다</div>
                <div className="profile-edit">프로필 수정 {'>'} </div>
              </div>
            </MyInfoWrapper>
          </a>
        </Link>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div<Props>`
  z-index: 50;
  position: fixed;
  width: 480px;
  min-height: calc(100vh - ${({ headerHeight }) => headerHeight ?? '56px'});
  right: 50%;
  top: ${({ headerHeight }) => headerHeight ?? '56px'}; /* mixin 사용 */
  transform: translate(50%, 0%);
  background-color: #eee;
  @media (max-width: 480px) {
    width: 100%;
    right: 0;
    transform: translate(0, 0);
  }
  overflow: hidden;
  background-color: #fff;

  padding: 0 18px;
`;

const SideBarTitle = styled.div`
  margin-top: 24px;
  font-size: ${({ theme }) => theme.fontSize.subtitle_2};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

const SignInWrapper = styled.div`
  margin-top: 32px;
  .title {
    color: ${({ theme }) => theme.colors.secondary_500};
    font-size: ${({ theme }) => theme.fontSize.subtitle_2};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
  }
  .sub-text {
    color: ${({ theme }) => theme.colors.blackColors.grey_500};
    font-size: ${({ theme }) => theme.fontSize.caption};
    font-weight: ${({ theme }) => theme.fontWeight.regular};
    margin-top: 8px;
  }
`;

const MyInfoWrapper = styled.div`
  margin-top: 32px;
  display: flex;
  align-items: center;
  .info-content {
    margin-left: 16px;
    .nickname {
      color: #000;
      font-size: ${({ theme }) => theme.fontSize.body_2};
      font-weight: ${({ theme }) => theme.fontWeight.bold};
    }
    .profile-edit {
      margin-top: 8px;
      color: ${({ theme }) => theme.colors.secondary_300};
      font-size: ${({ theme }) => theme.fontSize.caption};
      font-weight: ${({ theme }) => theme.fontWeight.regular};
    }
  }
`;
export default SideNavigationBar;
