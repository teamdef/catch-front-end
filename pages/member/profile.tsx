import styled, { keyframes } from 'styled-components';
import type { ReactElement } from 'react';
import type { NextPageWithLayout } from 'pages/_app';
import { AppLayout } from 'components/layout';
import Router from 'next/router';
import { Title, ProfileImg } from 'components/common';
const Profile: NextPageWithLayout = () => {
  return (
    <Wrapper>
      <LogoWrapper>
        <Logo>캐치캐치</Logo>
      </LogoWrapper>
      <Title title={'프로필 등록'} subTitle={'서비스에서 사용하실 프로필을 등록해보세요!'} />
      <ProfileImgInputContainer>
        <ProfileImg diameter="150px" changeable={true} />
          </ProfileImgInputContainer>
          <div>
              <button>변경값으로 등록</button>
          </div>
    </Wrapper>
  );
};
Profile.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};

const Wrapper = styled.div``;
const LogoWrapper = styled.div`
  width: 100%;
  height: 100px;
  padding: 0.5rem 1.5rem 0.5rem 1.5rem;
  display: flex;
  align-items: center;
`;
const Logo = styled.div`
  color: #ff4d57;
  font-size: 1.5rem;
  font-family: 'RixInooAriDuriR';
  &:hover {
    cursor: pointer;
  }
`;

const ProfileImgInputContainer = styled.div`
    display:flex;
    justify-content:center;
    margin-top:2rem;
    margin-bottom:2rem;
`;
export default Profile;
