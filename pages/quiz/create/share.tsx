import { ReactElement, useState, ChangeEvent, useEffect } from 'react';
import { useRouter } from 'next/router';
import * as S from 'styles/quiz/create/share.style';
import type { NextPageWithLayout } from 'pages/_app';
import { AppLayout } from 'components/layout';
import { SNSShare} from 'components/common';
import { MdPhotoCamera, MdHomeFilled } from 'react-icons/md';
import { HiOutlineShare } from 'react-icons/hi';
import imageCompression from 'browser-image-compression'; // 이미지 최적화용
import { QuizThumbnailChangeApi } from 'pages/api/quiz';
import { MainButton } from 'styles/common';
import { RootState } from 'store';
import { useSelector } from 'react-redux';
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
const Page: NextPageWithLayout = () => {
  const router = useRouter();
  const { probSetTitle, probSetCount, returnSetId, returnThumb } = router?.query;
  const [thumbnailURL, setThumbnailURL] = useState<string>('');
  const { profileImg, nickName } = useSelector((state: RootState) => state.user);

  const goHome = () => {
    router.push('/');
  };

  const randomString = (len: number): string => {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; // 중복의 여지가 있긴 함.
    for (let i = 0; i < len; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  };

  const onImgChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files as FileList; // 입력 받은 파일 리스트
    // 이미지가 있을 경우
    if (files && files[0]) {
      const _compressed = (await imageCompression(files[0], options)) as File;
      const timestamp = new Date().toISOString().substring(0, 10);
      const _imgFile = new File([_compressed], `${timestamp}_${randomString(20)}.${_compressed.type.split('/')[1]}`, {
        type: _compressed.type,
      }); // 압축 이미지 대입
      if ((await QuizThumbnailChangeApi(returnSetId as string, _imgFile)) === 200) {
        const _imgURL = await imageCompression.getDataUrlFromFile(_compressed);
        setThumbnailURL(_imgURL);
      }
    }
  };
  // 이미지 압축을 위한 옵션
  const options = {
    maxSizeMB: 1, // 원본 이미지 최대 용량
    maxWidthOrHeight: 300, // 리사이즈 이미지 최대 width를 300px로 설정
    //useWebWorker: true, // 이미지 변환 작업 다중 스레드 사용 여부
    fileType: 'images/*', // 파일 타입
  };
  
  useEffect(() => {
    if (!router.isReady) return;
    setThumbnailURL(router?.query?.returnThumb as string);
  }, [router.isReady]);
  return (
    <S.Wrapper>
      <div id="inner-wrapper">
        <S.Complete>퀴즈 완성 !!!</S.Complete>
        <S.QuizInfoContainer>
          <div id="top">{probSetTitle}</div>
          <div id="bottom">
            총<strong>{probSetCount}</strong>문제
          </div>
        </S.QuizInfoContainer>
        <S.ThumbnailSettingContainer>
          <div id="explain">
            <span>
              퀴즈의 대표 사진을 설정해보세요! <br />
              설정하지 않으면, 등록된 이미지 중 <strong>랜덤</strong>으로 설정됩니다.
              <br />
              대표 사진의 <strong>수정 및 삭제</strong>는 문제집 상세보기에서 가능합니다!
            </span>
          </div>
          <div id="thumbnail-img-wrapper">
            <input type="file" accept="image/*" onChange={onImgChange} id="thumbnail-input" name="thumbnail-input" />
            <label htmlFor="thumbnail-input">
              {thumbnailURL ? (
                <>
                  {thumbnailURL && (
                    <div id="thumbnail-input-btn">
                      <MdPhotoCamera size={20} />
                    </div>
                  )}
                  <img src={thumbnailURL} alt="문제집 썸네일 이미지" />
                </>
              ) : (
                <S.DefaultThumbnail>
                  <MdPhotoCamera size={40} />
                </S.DefaultThumbnail>
              )}
            </label>
          </div>
        </S.ThumbnailSettingContainer>
        <S.ShareContainer>
          <div id="explain">
            <HiOutlineShare />
            <span>직접 만든 퀴즈를 공유해보세요!</span>
          </div>
          <div id="share-wrapper">
            <SNSShare
              nickName={nickName}
              profileImg={profileImg}
              thumbnail={thumbnailURL}
              set_title={probSetTitle as string}
              url={returnSetId as string}
            />
          </div>
        </S.ShareContainer>
        <MainButton onClick={goHome}>
          <MdHomeFilled size={20} />
          홈으로
        </MainButton>
      </div>
    </S.Wrapper>
  );
};
Page.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};

export default Page;
