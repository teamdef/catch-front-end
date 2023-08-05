import { ProfileImage } from 'components/common';
import Router from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import styled from 'styled-components';

const MyInfoWrapper = () => {
  const { nickName, profileImg } = useSelector((state: RootState) => state.user);
  const moveProfile = () => {
    Router.push('/member/profile');
  };
  return (
    <Wrapper onClick={moveProfile}>
      <ProfileImage src={profileImg} size="48px" />
      <Content>
        <Nickname>{nickName}</Nickname>
        <ProfileEditBtn>
          프로필 수정
          <img src="/assets/img/rebranding/icon/arrow_right_secondary300.svg" alt="" />
        </ProfileEditBtn>
      </Content>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 32px;
  display: flex;
  align-items: center;
`;
const Content = styled.div`
  margin-left: 16px;
`;
const Nickname = styled.div`
  color: #000;
  font-size: ${({ theme }) => theme.fontSize.body_2};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;
const ProfileEditBtn = styled.button`
  color: ${({ theme }) => theme.colors.secondary_300};
  font-size: ${({ theme }) => theme.fontSize.caption};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  display: flex;
  align-items: center;
  padding: 8px 12px 8px 0;
  img {
    margin-left: 8px;
  }
`;
export default MyInfoWrapper;
