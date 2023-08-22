import { useRouter } from 'next/router';
import { ChangeEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { getComperssedImg } from 'utils/image';

const ImageSetter = () => {
  const router = useRouter();
  const { quizSetThumb, quizSetId } = router.query;
  const [thumbnailURL, setThumbnailURL] = useState<string>('');

  const onImgChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const imgFile = await getComperssedImg(e, quizSetId as string);
    router.push({
      query: {
        quizSetThumb: imgFile,
      },
    });
    setThumbnailURL(imgFile);
  };
  const deleteThumbnail = async () => {
    console.log('퀴즈이미지 썸네일 삭제버튼 추후 기능 추가');
  };
  useEffect(() => {
    if (router.isReady) setThumbnailURL(quizSetThumb as string);
  }, [router.isReady]);
  return (
    <Wrapper>
      <Input type="file" accept="image/*" onChange={onImgChange} id="thumbnail-input" name="thumbnail-input" />
      <Label htmlFor="thumbnail-input">
        {thumbnailURL ? (
          <>
            <DeleteThumbnailBtn onClick={deleteThumbnail} />
            <Image src={thumbnailURL} alt="퀴즈 세트 썸네일 이미지" />
          </>
        ) : (
          <div>기본이미지</div>
        )}
      </Label>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  position: relative;
`;
const Input = styled.input`
  display: none;
`;
const Label = styled.label`
  position: relative;
  display: block;
  border-radius: 8px;
  width: 100%;
  aspect-ratio: 286/250;
`;
const Image = styled.img`
  width: 100%;
  aspect-ratio: 286/250;
  object-fit: cover;
`;
const DeleteThumbnailBtn = styled.button`
  position: absolute;
  display: block;
  top: 12px;
  right: 12px;
  width: 24px;
  height: 24px;
  background: url(/assets/img/rebranding/icon/close_bg.svg) no-repeat center;
`;
export default ImageSetter;
