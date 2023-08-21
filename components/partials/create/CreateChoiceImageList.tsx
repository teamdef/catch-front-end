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
      if (files.length + quizList[quizIndex].choices.length > 4) {
        alert('이미지는 최대 4장까지 업로드 가능합니다');
        return;
      }
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
      <ImgChoiceListContainer>
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
      </ImgChoiceListContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div``;
const ImgChoiceListContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 10px;
  grid-row-gap: 10px;
`;
const CreateChoiceImageInputBox = styled.div``;
const CreateChoiceImageInput = styled.input``;
const CreateChoiceImageLabel = styled.label``;

export default CreateChoiceImageList;
