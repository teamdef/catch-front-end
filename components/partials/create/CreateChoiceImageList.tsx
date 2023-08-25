import styled from 'styled-components';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { FileListToImageObject } from 'utils/image';
import CreateChoiceImage from './CreateChoiceImage';

interface CreateChoiceImageListProps {
  props: {
    quiz: ImageQuiz;
    quizIndex: number;
    quizList: (TextQuiz | ImageQuiz)[];
    setQuizList: Dispatch<SetStateAction<(TextQuiz | ImageQuiz)[]>>;
  };
}

const CreateChoiceImageList = ({ props }: CreateChoiceImageListProps) => {
  const { quiz, quizIndex, quizList, setQuizList } = props;

  // 퀴즈 객관식 이미지 onChange 이벤트 처리 함수
  const onChoiceImgChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files as FileList; // 입력 받은 파일 리스트

    // 이미지가 있을 경우
    if (files && files[0]) {
      // 기존에 업로드 된 이미지와 새로 업로드 할 이미지의 총 합이 4개 이하
      if (files.length + quizList[quizIndex].choices.length > 4) return;
      const _imgFileTaskList = FileListToImageObject(files);
      // Promise.all 의 응답값은 filelist의 file객체를 모두 ChoiceImageTypes 타입으로 변경한 것
      Promise.all(_imgFileTaskList).then((res) => {
        const _choicesImgThumbnail = res;
        const temp = JSON.parse(JSON.stringify(quizList));
        const _choices = [...temp[quizIndex].choices, ..._choicesImgThumbnail];
        temp[quizIndex].choices = _choices;
        setQuizList(temp);
        e.target.value = '';
      });
    }
  };

  return (
    <Wrapper>
      {quiz.choices.map((imageObj: ChoiceImageType, choiceIndex: number) => (
        <CreateChoiceImage props={{ quiz, quizIndex, choiceIndex, quizList, setQuizList, imageObj }} />
      ))}
      {quiz.choices.length < 4 && (
        <CreateChoiceImageInputBox>
          <CreateChoiceImageInput
            type="file"
            accept="image/*"
            multiple
            onChange={onChoiceImgChange}
            id={`choice-image-input-${quizIndex}`}
            name={`choice-image-input-${quizIndex}`}
          />
          <CreateChoiceImageLabel htmlFor={`choice-image-input-${quizIndex}`} />
        </CreateChoiceImageInputBox>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 10px;
  grid-row-gap: 10px;
`;
const CreateChoiceImageInputBox = styled.div`
  position: relative;
  display: block;
  width: 100%;
  aspect-ratio: 152/138;
`;
const CreateChoiceImageInput = styled.input`
  display: none;
`;
const CreateChoiceImageLabel = styled.label`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.primary_50};
  ::before {
    content: '';
    position: relative;
    display: block;
    width: 26px;
    height: 24px;
    background: url(/assets/img/rebranding/icon/camera_secondary100.svg) no-repeat center;
    background-size: 100% 100%;
  }
`;

export default CreateChoiceImageList;
