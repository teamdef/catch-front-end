/* react, next 관련 */
import { ReactElement, ChangeEvent, useState } from 'react';
import type { NextPageWithLayout } from 'pages/_app';
import { useRouter } from 'next/router';
/* redux 관련 */
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { profileUploadAction } from 'store/user';
/* 통신 */
import { ProfileChangeApi, ProfileChangeProps } from 'pages/api/member';
/* 컴포넌트 */
import { AppLayout, HeaderLayout } from 'components/layout';
import { Loading, ProfileImage } from 'components/common';
import imageCompression from 'browser-image-compression'; /* 라이브러리 */
import styled from 'styled-components';
import { SmallContainedBtn, SmallOutlinedBtn } from 'components/style/button';
import HeaderContentWrapper from 'components/style/HeaderContentWrapper';

const Profile: NextPageWithLayout = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { userId, nickName, profileImg } = useSelector((state: RootState) => state.user);
  const [tempProfileImg, setTempProfileImg] = useState<string>(profileImg);
  const [tempNickname, setTempNickname] = useState<string>(nickName);
  const [isLoading, setIsLoading] = useState(false);
  const isValid = tempNickname.length < 2 || (tempNickname === nickName && tempProfileImg === profileImg);

  const _tempNicknameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTempNickname(e.target.value);
  };
  const moveHome = () => {
    router.push('/');
  };
  // 이미지 압축을 위한 옵션
  const options = {
    maxSizeMB: 1, // 원본 이미지 최대 용량
    maxWidthOrHeight: 300, // 리사이즈 이미지 최대 width를 300px로 설정
    // useWebWorker: true, // 이미지 변환 작업 다중 스레드 사용 여부
    fileType: 'images/*', // 파일 타입
  };

  const randomString = (len: number): string => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; // 중복의 여지가 있긴 함.
    for (let i = 0; i < len; i + 1) text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  };

  // 동일 파일이 재업로드 되지 않는 오류 해결을 위한 함수
  const onImgClick = (e: any) => {
    e.target.value = null;
  };

  // 이미지 onChange 이벤트 처리 함수
  const onImgChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files as FileList; // 입력 받은 파일 리스트
    // 이미지가 있을 경우
    if (files && files[0]) {
      const _thumb = await imageCompression.getDataUrlFromFile(files[0]);
      setTempProfileImg(_thumb);
    }
  };

  const saveProfile = async () => {
    setIsLoading(true);
    try {
      const _obj: ProfileChangeProps = { id: userId };
      if (tempNickname !== nickName) _obj.nickname = tempNickname;
      if (tempProfileImg !== profileImg) {
        const timestamp = new Date().toISOString().substring(0, 10);
        const _file = await imageCompression.getFilefromDataUrl(tempProfileImg, '1234');
        const _compressed: File = await imageCompression(_file, options);
        const _imgFile = new File([_compressed], `${timestamp}_${randomString(20)}.${_compressed.type.split('/')[1]}`, {
          type: _compressed.type,
        }); // 압축 이미지 대입
        _obj.imgBlob = _imgFile;
      }
      const res = await ProfileChangeApi(_obj);
      const { profile_img, nickname } = res.data;
      dispatch(profileUploadAction({ profileImg: profile_img, nickName: nickname }));
      moveHome();
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loading text="정보 저장중 입니다." />}
      <HeaderContentWrapper paddingTop="24px">
        <Title>프로필 수정</Title>
        <Content>
          <ImageSelectWrapper>
            <ImageSelectInput
              type="file"
              accept="image/*"
              id="select-image"
              name="select-image"
              onClick={onImgClick}
              onChange={onImgChange}
            />
            <ImageSelectLabel htmlFor="select-image">
              <ProfileImage src={tempProfileImg} size="56px" />
            </ImageSelectLabel>
          </ImageSelectWrapper>
          <Nickname>{nickName}</Nickname>
          <NicknameInput
            type="text"
            placeholder="닉네임을 설정하세요. (2~8 자)"
            value={tempNickname}
            onChange={_tempNicknameHandler}
            maxLength={8}
          />

          <ButtonBox>
            <SmallOutlinedBtn onClick={moveHome}>취소하기</SmallOutlinedBtn>
            <SmallContainedBtn disabled={isValid} onClick={saveProfile}>
              저장하기
            </SmallContainedBtn>
          </ButtonBox>
        </Content>
      </HeaderContentWrapper>
    </>
  );
};

const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.subtitle_2};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;
const Content = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 44px;
  margin-bottom: 52px;
  flex-grow: 1;
`;
const ImageSelectWrapper = styled.div``;
const ImageSelectInput = styled.input`
  display: none;
`;
const ImageSelectLabel = styled.label`
  position: relative;
  display: block;
  width: 56px;
  height: 56px;
  cursor: pointer;
  margin-bottom: 16px;
`;
const Nickname = styled.span`
  color: ${({ theme }) => theme.colors.blackColors.grey_900};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  margin-bottom: 26px;
`;
const NicknameInput = styled.input`
  width: 202px;
  text-align: center;
  border: 0;
  ::placeholder {
    color: ${({ theme }) => theme.colors.blackColors.grey_400};
    font-size: ${({ theme }) => theme.fontSize.caption};
  }
  padding: 5px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.blackColors.grey_500};
`;
const ButtonBox = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  width: 100%;
  gap: 20px;
  button {
    flex-grow: 1;
  }
`;

Profile.getLayout = function getLayout(page: ReactElement) {
  return (
    <AppLayout>
      <HeaderLayout>{page}</HeaderLayout>
    </AppLayout>
  );
};

export default Profile;
