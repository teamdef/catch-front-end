import * as S from 'styles/member/profile.style';
import { ReactElement, useEffect } from 'react';
import type { NextPageWithLayout } from 'pages/_app';
import { AppLayout } from 'components/layout';
import { Title, HeadMeta, Loading } from 'components/common';
import { MdOutlineSettings } from 'react-icons/md';
import { useState, ChangeEvent } from 'react';
import imageCompression from 'browser-image-compression'; // 이미지 최적화용
import { ProfileChangeApi } from 'pages/api/test';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { profileUploadAction } from 'store/user';
import { useRouter } from 'next/router';

// next.js 위한 라이브러리 및 타입
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

export const getServerSideProps: GetServerSideProps = async ({ req, res, params }: GetServerSidePropsContext) => {
  // 클라이언트는 여러 대지만 서버는 한대이기 때문에 서버 사용한 쿠키는 반드시 제거해 줘야 한다
  const cookie = req ? req?.headers?.cookie : null;
  if (cookie) {
    let match = cookie.match(new RegExp('(^| )' + 'access_token' + '=([^;]+)'));
    // 쿠키가 적용되어 있다면 (로그인 상태라면)
    if (!!match === false) {
      res.statusCode = 302;
      res.setHeader('Location', `/`);
      res.end();
    }
  } else {
    res.statusCode = 302;
    res.setHeader('Location', `/`);
    res.end();
  }
  return { props: {} };
};
const Profile: NextPageWithLayout = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  let { isReqSignUp } = router.query;
  const { id, nickName, profileImg } = useSelector((state: RootState) => state.user);
  const [tempProfileImg, setTempProfileImg] = useState<string>(profileImg);
  const [tempNickname, setTempNickname] = useState<string>(nickName);
  const [error, setError] = useState<string | null>(null);
  const [isRegister, setIsRegister] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
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
    if (tempNickname && (tempNickname.length < 3 || tempNickname.length > 6)) {
      setError('닉네임은 최소 2글자에서 최대 6글자까지 입력 필수입니다');
    } else {
      setError(null);
      setIsLoading(true);
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
        setIsLoading(false);
        router.push('/'); // 홈으로
      }
    }
  };

  useEffect(() => {
    if (isReqSignUp) {
      isReqSignUp === 'true' ? setIsRegister(true) : setIsRegister(false);
    }
  }, [router.isReady]);
  return (
    <>
      {isLoading && <Loading ment={'저장중 입니다...'} />}
      <S.Wrapper>
        {isRegister && <S.MarginDiv />}
        <Title
          title={isRegister ? '프로필 등록 👧' : '프로필 수정 👧'}
          subTitle={`서비스에서 사용하실 프로필을 ${isRegister ? '등록' : '수정'}해보세요!`}
          backRoute={isRegister ? undefined : '/'}
        />
        <S.ProfileContentContainer>
          <S.ProfileImgInputContainer>
            <S.ProfileThumbnail>
              <img src={profileImg ? tempProfileImg : '/assets/img/user_default.png'} />
              {id && (
                <S.ProfileSetting>
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
                </S.ProfileSetting>
              )}
            </S.ProfileThumbnail>
          </S.ProfileImgInputContainer>
          <S.ProfileNicknameInput
            type="text"
            placeholder="한글 2~6자까지 입력 가능합니다."
            value={tempNickname}
            onChange={_tempNicknameHandler}
          />
          {error && <S.Error>{error}</S.Error>}
          {isRegister ? (
            <S.Info>
              소셜 로그인에서 설정된 프로필 값이 기본으로 설정되며,
              <br /> 이 단계에서 수정하지 않아도 서비스 내에서 수정 가능 합니다 :)
            </S.Info>
          ) : (
            <S.Info>
              수정 완료 버튼을 누르면 변경사항이 저장되고,
              <br /> 홈 화면으로 이동됩니다.
            </S.Info>
          )}

          <S.SaveButton disabled={!!tempNickname === false} onClick={saveProfile}>
            {isRegister ? '등록' : '수정'}완료
          </S.SaveButton>
        </S.ProfileContentContainer>
      </S.Wrapper>
    </>
  );
};
Profile.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};

export default Profile;
