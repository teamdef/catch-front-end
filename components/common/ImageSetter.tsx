import { changeQuizThumbnail } from 'pages/api/quiz';
import { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import { getComperssedImg } from 'utils/image';
import Loading from './Loading';

interface ImageSetterProps {
  quizSetThumb: string | string[] | undefined | null;
  quizSetId: string;
}
const ImageSetter = ({ quizSetThumb, quizSetId }: ImageSetterProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [thumbnailURL, setThumbnailURL] = useState<string | null>(quizSetThumb as string);

  const onImgChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    try {
      const imgFileObj = await getComperssedImg(e);
      if (imgFileObj) {
        const imgFile = await changeQuizThumbnail(imgFileObj, quizSetId);
        setThumbnailURL(imgFile as string);
      }
    } catch (err) {
      console.log('onImgChange', err);
    } finally {
      setLoading(false);
    }
  };
  const deleteThumbnail = async () => {
    console.log('퀴즈이미지 썸네일 삭제버튼 추후 기능 추가');
  };
  return (
    <Wrapper>
      {loading && <Loading text="이미지 저장 중 입니다." />}
      <Input type="file" accept="image/*" onChange={onImgChange} id="thumbnail-input" name="thumbnail-input" />
      <Label htmlFor="thumbnail-input">
        {thumbnailURL ? (
          <>
            <DeleteThumbnailBtn onClick={deleteThumbnail} />
            <Image src={thumbnailURL} alt="퀴즈 세트 썸네일 이미지" />
          </>
        ) : (
          <NoImage>
            <Text>퀴즈의 대표 이미지를 선택해주세요.</Text>
            <Sub>이미지를 선택하지 않으면 기본 이미지로 표시됩니다.</Sub>
          </NoImage>
        )}
      </Label>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  position: relative;
  width: 100%;
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
  overflow: hidden;
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
const NoImage = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary_50};
  ::before {
    content: '';
    position: relative;
    display: block;
    width: 34px;
    height: 31px;
    background: url(/assets/img/rebranding/icon/camera_secondary100.svg) no-repeat center;
  }
`;
const Text = styled.span`
  color: ${({ theme }) => theme.colors.blackColors.grey_800};
  font-size: ${({ theme }) => theme.fontSize.caption};
  margin-top: 12px;
  margin-bottom: 4px;
`;
const Sub = styled.span`
  color: ${({ theme }) => theme.colors.blackColors.grey_600};
  font-size: ${({ theme }) => theme.fontSize.caption};
`;
export default ImageSetter;
