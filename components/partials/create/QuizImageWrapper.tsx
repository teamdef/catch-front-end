import { QuizImage } from 'components/style';
import { ChangeEvent, Dispatch, MouseEvent, SetStateAction } from 'react';
import styled from 'styled-components';
import { ReturnFileByImageSize, loadImage } from 'utils/image';

interface CreateQuizThumbProps {
  quizList: (TextQuiz | ImageQuiz)[];
  setQuizList: Dispatch<SetStateAction<(TextQuiz | ImageQuiz)[]>>;
  imgURL?: string;
  quizIndex: number;
}
const QuizImageWrapper = ({ quizList, setQuizList, imgURL, quizIndex }: CreateQuizThumbProps) => {
  const deleteQuizImage = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const temp = JSON.parse(JSON.stringify(quizList));
    temp[quizIndex].quizThumbnail = undefined;
    setQuizList(temp);
  };

  // 퀴즈 설명 이미지 onChange 이벤트 처리 함수
  const onQuizImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files as FileList; // 입력 받은 파일 리스트
    const _URL = window.URL || window.webkitURL;
    // 이미지가 있을 경우
    if (files && files[0]) {
      const _quizImageFile = files[0];
      const _imgElement = await loadImage(_URL.createObjectURL(_quizImageFile)); // 이미지 element 구하기
      const _thumbnail = await ReturnFileByImageSize(_imgElement, _quizImageFile); // 이미지 파일 url 저장
      const temp = JSON.parse(JSON.stringify(quizList));
      temp[quizIndex].quizThumbnail = _thumbnail;
      setQuizList(temp);
      e.target.value = '';
    }
  };
  return (
    <>
      <QuizImageInput
        type="file"
        accept="image/*"
        onChange={onQuizImageChange}
        name={`quiz-image-input-${quizIndex}`}
        id={`quiz-image-input-${quizIndex}`}
      />
      <QuizImageLabel htmlFor={`quiz-image-input-${quizIndex}`}>
        {!imgURL && <QuizImageUpload>이미지를 선택해주세요. (선택사항)</QuizImageUpload>}
        {imgURL && (
          <>
            <ImageDeleteBtn onClick={deleteQuizImage} />
            <QuizImage src={imgURL} alt="퀴즈썸네일이미지" />
            <EditBtn htmlFor={`quiz-image-input-${quizIndex}`} />
          </>
        )}
      </QuizImageLabel>
    </>
  );
};

const QuizImageInput = styled.input`
  display: none;
`;
const QuizImageLabel = styled.label`
  position: relative;
  margin-top: 12px;
  margin-bottom: 20px;
`;
const QuizImageUpload = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 4px;
  padding: 35px 0;
  background-color: ${({ theme }) => theme.colors.blackColors.grey_100};
  color: ${({ theme }) => theme.colors.blackColors.grey_500};
  gap: 8px;
  &::before {
    content: '';
    position: relative;
    display: block;
    width: 28px;
    height: 22px;
    background: url(/assets/img/rebranding/icon/camera.svg) center no-repeat;
  }
`;
const ImageDeleteBtn = styled.button`
  position: absolute;
  display: block;
  bottom: 0;
  right: 10px;
`;
const EditBtn = styled.label`
  position: absolute;
  bottom: 12px;
  right: 12px;
  display: block;
  width: 18px;
  height: 18px;
  background: url(/assets/img/rebranding/icon/image_box.svg) no-repeat center;
`;
export default QuizImageWrapper;
