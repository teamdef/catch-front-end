import styled, { keyframes } from 'styled-components';
import { ChangeEvent, useState } from 'react';
import { QuizThumbnailChangeApi } from 'pages/api/quiz';
import imageCompression from 'browser-image-compression'; // 이미지 최적화용
import { MdPhotoCamera, MdDelete } from 'react-icons/md';
import {Loading} from 'components/common'
interface ThumbnailChangeProps {
  url: string | null | undefined;
  probsetId: string;
}
const ThumbnailChange = ({ url, probsetId }: ThumbnailChangeProps) => {
  const [thumbnailURL, setThumbnailURL] = useState<string | null | undefined>(url);
  const [isLoading, setIsLoading] = useState(false);

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

  const onImgChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    const files = e.target.files as FileList; // 입력 받은 파일 리스트
    // 이미지가 있을 경우
    if (files && files[0]) {
      const _compressed = (await imageCompression(files[0], options)) as File;
      const timestamp = new Date().toISOString().substring(0, 10);
      const _imgFile = new File([_compressed], `${timestamp}_${randomString(20)}.${_compressed.type.split('/')[1]}`, {
        type: _compressed.type,
      }); // 압축 이미지 대입
      if ((await QuizThumbnailChangeApi(probsetId as string, _imgFile)) === 200) {
        const _imgURL = await imageCompression.getDataUrlFromFile(_compressed);
        setThumbnailURL(_imgURL);
        setIsLoading(false);
      }
    }
  };

  const thumbDelete = () => {
    alert('삭제');
  };

  return (
    <>
      {isLoading && <Loading />}
      <ThumbnailChangeWrapper>
        <input type="file" accept="image/*" onChange={onImgChange} id="thumbnail-input" name="thumbnail-input" />
        <label htmlFor="thumbnail-input">
          {thumbnailURL ? (
            <>
              {thumbnailURL && (
                <>
                  <ThumbnailChangeButton>
                    <MdPhotoCamera size={20} />
                  </ThumbnailChangeButton>
                  <img src={thumbnailURL} alt="문제집 썸네일 이미지" />
                </>
              )}
            </>
          ) : (
            <DefaultThumbnail>
              <MdPhotoCamera size={40} />
            </DefaultThumbnail>
          )}
        </label>
      </ThumbnailChangeWrapper>
    </>
  );
};

const ThumbnailChangeWrapper = styled.div`
  margin-top: 24px;
  width: 100%;
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
    svg {
      filter: drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4));
    }
  }
  #thumbnail-delete-btn {
  }
`;
const ThumbnailButton = styled.div`
  position: absolute;
  color: white;
  
  &:hover {
    cursor: pointer;
  }
  svg {
    filter: drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4));
  }
`;
const ThumbnailDeleteButton = styled(ThumbnailButton)`
  top: 1rem;
  right: 1rem;
`;
const ThumbnailChangeButton = styled(ThumbnailButton)`
  top: 1rem;
  right: 1rem;
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

export default ThumbnailChange;
