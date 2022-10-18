import styled from 'styled-components';
import { MdOutlineSettings } from 'react-icons/md';
import { useState, ChangeEvent } from 'react';
import imageCompression from 'browser-image-compression'; // 이미지 최적화용
import { ProfileImgChangeApi } from 'pages/api/test';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { profileUploadAction } from 'store/user';
interface ProfileImgProps {
  diameter: string;
  changeable?: boolean;
  profileImg?: string;
}
const ProfileImg = ({ diameter, changeable }: ProfileImgProps) => {
  const dispatch = useDispatch();
  const { id, profileImg } = useSelector((state: RootState) => state.user);
  const [profileURL, setProfileURL] = useState<string | undefined>(profileImg);
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
      const _compressed = (await imageCompression(files[0], options)) as File;
      const timestamp = new Date().toISOString().substring(0, 10);
      const _imgFile = new File([_compressed], `${timestamp}_${randomString(20)}.${_compressed.type.split('/')[1]}`, {
        type: _compressed.type,
      }); // 압축 이미지 대입
      const res = await ProfileImgChangeApi(id, _imgFile);
      if (res.status === 200) {
        const _imgURL = await imageCompression.getDataUrlFromFile(_compressed);
        dispatch(profileUploadAction({ profileImg:res.data.profile_img }));
        setProfileURL(_imgURL);
      }
    }
  };
  return (
    <>
      <ProfileThumbnail diameter={diameter}>
        <img src={profileURL || '/assets/img/user_default.png'} />
        {changeable && id && (
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
    </>
  );
};

interface ProfileProps {
  diameter: string;
}
const ProfileThumbnail = styled.div<ProfileProps>`
  width: ${(props) => props.diameter};
  height: ${(props) => props.diameter};
  position: absolute;
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

export default ProfileImg;
