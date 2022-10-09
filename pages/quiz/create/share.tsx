import { ReactElement, useState, ChangeEvent, useEffect } from 'react';
import { useRouter } from 'next/router';
import styled, { keyframes } from 'styled-components';
import type { NextPageWithLayout } from 'pages/_app';
import { AppLayout } from 'components/layout';
import { SNSShare } from 'components/common';
import { MdPhotoCamera, MdHomeFilled } from 'react-icons/md';
import { HiOutlineShare } from 'react-icons/hi';
import imageCompression from 'browser-image-compression'; // 이미지 최적화용
import { ThumbnailChangeApi } from 'pages/api/test';

const Page: NextPageWithLayout = () => {
  const router = useRouter();
  const { probSetTitle, probSetCount, returnSetId, returnThumb } = router?.query;
  const [thumbnailURL, setThumbnailURL] = useState<string>('');

  const goHome = () => {
    router.push('/home');
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
      if ((await ThumbnailChangeApi(returnSetId as string, _imgFile)) === 200) {
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
    <Wrapper>
      <div id="inner-wrapper">
        <Complete>퀴즈 완성 !!!</Complete>
        <QuizInfoContainer>
          <div id="top">{probSetTitle}</div>
          <div id="bottom">
            총<strong>{probSetCount}</strong>문제
          </div>
        </QuizInfoContainer>
        <ThumbnailSettingContainer>
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
                <DefaultThumbnail>
                  <MdPhotoCamera size={40} />
                </DefaultThumbnail>
              )}
            </label>
          </div>
        </ThumbnailSettingContainer>
        <ShareContainer>
          <div id="explain">
            <HiOutlineShare />
            <span>직접 만든 퀴즈를 공유해보세요!</span>
          </div>
          <div id="share-wrapper">
            <SNSShare quiz_thumb={thumbnailURL} title={probSetTitle as string} url={returnSetId as string} />
          </div>
        </ShareContainer>
        <HomeButton onClick={goHome}>
          <MdHomeFilled size={20} />
          홈으로
        </HomeButton>
      </div>
    </Wrapper>
  );
};
Page.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};

// 기능 가시성을 위한 임시 디자인
const Wrapper = styled.div`
  background-color: #fff6f7;
  height: 100vh;
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  overflow-y: scroll;
  & {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
  #inner-wrapper {
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media (max-width: 400px) {
      width: 100%;
    }
  }
  strong {
    font-weight: 400;
    color: #ff4d57;
    margin: 0 0.5rem 0 0.5rem;
  }
`;

const bounce = keyframes` 
  0% {transform: translatey(0px);}
  5% {transform: translatey(-10px);}
  10% {transform: translatey(0px);}
  100% {transform: translatey(0px);}
`;

const Complete = styled.div`
  color: #ff4d57;
  font-size: 40px;
  font-family: 'RixInooAriDuriR';
  margin-top: 36px;
  animation: ${bounce} 2s linear 0.1s infinite;
`;

const QuizInfoContainer = styled.div`
  width: 90%;
  margin-top: 36px;
  #top {
    padding: 1.5rem 0 1.5rem 0;
    background-color: #ff4d57;
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
    color: white;
    font-size: 20px;
    font-weight: bold;
    display: flex;
    justify-content: center;
  }
  #bottom {
    padding: 1.5rem 0 1.5rem 0;
    background-color: #fff;
    border-bottom-right-radius: 1rem;
    border-bottom-left-radius: 1rem;
    border: solid 1px #f2f2f2;
    border-top: none;
    display: flex;
    justify-content: center;
    font-size: 20px;
    font-weight: 300;
  }
`;

const ThumbnailSettingContainer = styled.div`
  margin-top: 24px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  #explain {
    color: #888;
    text-align: center;
    font-size: 14px;
    strong {
      margin: 0;
    }
  }
  #thumbnail-img-wrapper {
    margin-top: 24px;
    width: 90%;
    height: 200px;
    position: relative;

    input {
      display: none;
    }
    label {
      &:hover {
        cursor: pointer;
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 1rem;
      }
    }

    #thumbnail-input-btn {
      position: absolute;
      top: 1rem;
      right: 1rem;
      color: white;
      &:hover {
        cursor: pointer;
      }
    }
  }
`;

const ShareContainer = styled.div`
  margin-top: 36px;
  width: 75%;
  #explain {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #888;
    font-size: 14px;
    span {
      margin-left: 0.5rem;
    }
  }
  #share-wrapper {
    margin-top: 24px;
  }
`;

const HomeButton = styled.div`
  margin-top: 48px;
  width: 60%;

  font-size: 16px;
  border-radius: 30px;
  padding: 1rem 1.5rem 1rem 1.5rem;

  background-color: #ff4d57;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    margin-right: 4px;
  }
  &:hover {
    cursor: pointer;
    background-color: #ffa5aa;
  }
`;

const DefaultThumbnail = styled.div`
  background-color: #fff6f7;
  border-radius: 1rem;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    color: #ffa5aa;
  }
`;
export default Page;
