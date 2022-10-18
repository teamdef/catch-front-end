import styled, { keyframes } from 'styled-components';
import { ReactElement, useEffect } from 'react';
import type { NextPageWithLayout } from 'pages/_app';
import { AppLayout, HeaderLayout } from 'components/layout';
import Router from 'next/router';
import { Title } from 'components/common';
import { MdOutlineSettings } from 'react-icons/md';
import { useState, ChangeEvent } from 'react';
import imageCompression from 'browser-image-compression'; // 이미지 최적화용
import { ProfileChangeApi } from 'pages/api/test';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { profileUploadAction } from 'store/user';
import { useRouter } from 'next/router';

const Profile: NextPageWithLayout = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  let { isReqSignUp } = router.query;
  const { id, nickName, profileImg } = useSelector((state: RootState) => state.user);
  const [tempProfileImg, setTempProfileImg] = useState<string>(profileImg);
  const [tempNickname, setTempNickname] = useState<string>(nickName);
  const [error, setError] = useState<string | null>(null);
  const [isRegister, setIsRegister] = useState<boolean>(false);
  const _tempNicknameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTempNickname(e.target.value);
  };
  // 이미지 압축을 위한 옵션
  const options = {
    maxSizeMB: 1, // 원본 이미지 최대 용량
    maxWidthOrHeight: 300, // 리사이즈 이미지 최대 width를 300px로 설정
    //useWebWorker: true, // 이미지 변환 작업 다중 스레드 사용 여부
    fileType: 'images/*', // 파일 타입
  };

  const randomString = (len: number): string => {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; // 중복의 여지가 있긴 함.
    for (let i = 0; i < len; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));
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
    console.log(tempNickname);

    if (tempNickname && (tempNickname.length < 3 || tempNickname.length > 6)) {
      setError('닉네임은 최소 2글자에서 최대 6글자까지 입력 필수입니다');
    } else {
      setError(null);
      // 기존 등록된 닉네임이랑 변경하고자 하는 닉네임이 다를 경우에만 변경 진행
      let _obj: any = {};
      _obj['id'] = id;
      if (tempNickname !== nickName) {
        _obj['nickname'] = tempNickname;
      }
      if (tempProfileImg !== profileImg) {
        const timestamp = new Date().toISOString().substring(0, 10);
        const _file = await imageCompression.getFilefromDataUrl(tempProfileImg, '1234');
        const _compressed: File = await imageCompression(_file, options);
        const _imgFile = new File([_compressed], `${timestamp}_${randomString(20)}.${_compressed.type.split('/')[1]}`, {
          type: _compressed.type,
        }); // 압축 이미지 대입
        _obj['imgBlob'] = _imgFile;
      }
      const res = await ProfileChangeApi(_obj);
      if (res.status === 200) {
        const { profile_img, nickname } = res.data;
        dispatch(profileUploadAction({ profileImg: profile_img, nickName: nickname }));
        alert('성공적으로 저장되었습니다'); // 모달창으로 바꿀것.
        router.push('/') // 홈으로
      }
    }
  };

  useEffect(() => {
    if (isReqSignUp) {
      isReqSignUp === 'true' ? setIsRegister(true) : setIsRegister(false);
    }
  },[router.isReady])
  return (
    <Wrapper>
      {isRegister && <MarginDiv />}
      <Title
        title={isRegister ? '프로필 등록 👧' : '프로필 수정 👧'}
        subTitle={`서비스에서 사용하실 프로필을 ${isRegister ? '등록' : '수정'}해보세요!`}
        backRoute={isRegister ? undefined : '/'}
      />
      <ProfileContentContainer>
        <ProfileImgInputContainer>
          <ProfileThumbnail>
            <img src={profileImg ? tempProfileImg : '/assets/img/user_default.png'} />
            {id && (
              <ProfileSetting>
                <input
                  type="file"
                  accept="image/*"
                  id="select-image"
                  name="select-image"
                  onClick={onImgClick}
                  onChange={onImgChange}
                />
                <label htmlFor="select-image">
                  <MdOutlineSettings size={20} color={'#B4B4B4'} />
                </label>
              </ProfileSetting>
            )}
          </ProfileThumbnail>
        </ProfileImgInputContainer>
        <ProfileNicknameInput
          type="text"
          placeholder="최소 2글자, 최대 6글자 입력이 가능합니다."
          value={tempNickname}
          onChange={_tempNicknameHandler}
        />
        {error && <Error>{error}</Error>}
        <SaveButton disabled={!!tempNickname === false} onClick={saveProfile}>
          {isRegister ? '등록' : '수정'}완료
        </SaveButton>
      </ProfileContentContainer>
    </Wrapper>
  );
};
Profile.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const MarginDiv = styled.div`
  height: 62px;
`;
const ProfileImgInputContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
`;
const ProfileContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ProfileNicknameInput = styled.input`
  height: 50px;
  width: 80%;
  border-radius: 25px;
  border: solid 1px #d6d6d6;
  outline: none;
  padding-left: 2rem;
  padding-right: 2rem;
  text-align: center;
  margin-bottom: 1rem;
  &::placeholder {
    color: #888;
  }
`;
const SaveButton = styled.button`
  bottom: 0;
  font-size: 14px;
  border-radius: 30px;
  border: none;
  height: 50px;
  font-weight: 500;
  margin-right: 0.5rem;
  margin-left: 0.5rem;
  background-color: #ff4d57;
  color: #fff;
  width: 50%;
  margin-top: 3rem;
  &:disabled {
    color: #7c7c7c;
    background-color: #ececec;
  }
  &:hover {
    cursor: pointer;
  }
`;
const ProfileThumbnail = styled.div`
  width: 150px;
  height: 150px;
  position: relative;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`;

const ProfileSetting = styled.div`
  display: flex;
  align-items: center;
  input {
    display: none;
  }
  label {
    display: flex;
    align-items: center;
    justify-content: center;
    display: flex;
    position: absolute;
    top: 5px;
    right: 0px;
    border: solid 1px #d6d6d6;
    background-color: white;
    padding: 0.5rem;
    border-radius: 50%;
    color: rgb(59, 59, 59);
    &:hover {
      background-color: lightgrey;
      cursor: pointer;
    }
  }
`;
const Error = styled.div`
  color: #ff4d57;
  font-size: 14px;
  text-align: center;
`;

export default Profile;
