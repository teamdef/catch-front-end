/* 스타일 코드 */
import * as S from 'styles/quiz/create/index.style';
import { ChangeEvent, Dispatch, SetStateAction, useEffect } from 'react';
/* 라이브러리 */
import styled from 'styled-components';
import { QuizTitle } from 'components/style';
/* react-icons */
import { MdClose } from 'react-icons/md';
import { AiFillCamera } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { saveProblemsAction } from 'store/quiz';
import { FileListToImageObject } from 'utils/image';
import { QuizCount, QuizSolveCard } from '../solve/main/QuizItem';
import CreateChoiceTextList from './CreateChoiceTextList';
import CreateQuizBottom from './CreateQuizBottom';
import QuizImageWrapper from './QuizImageWrapper';

interface CreateQuizListProps {
  quizList: (TextQuiz | ImageQuiz)[];
  setQuizList: Dispatch<SetStateAction<(TextQuiz | ImageQuiz)[]>>;
}
const CreateQuizList = ({ quizList, setQuizList }: CreateQuizListProps) => {
  const dispatch = useDispatch();
  // 문제 정보를 변경하는 함수
  const onChangeProblem = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    const problem = { ...quizList[index], [name]: value };
    const temp = [...quizList];
    temp[index] = problem;
    setQuizList(temp);
  };

  // 정답 체크
  const setCorrectIndex = (quizIndex: number, choiceIndex: number) => {
    const temp = JSON.parse(JSON.stringify(quizList));
    temp[quizIndex].correctIndex = choiceIndex;
    setQuizList(temp);
  };

  // 퀴즈 객관식 이미지 onChange 이벤트 처리 함수
  const onChoiceImgChange = async (e: ChangeEvent<HTMLInputElement>, quizIndex: number) => {
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

  // 답안 항목 삭제
  const deleteChoice = (quizIndex: number, choiceIndex: number) => {
    const temp = JSON.parse(JSON.stringify(quizList));
    temp[quizIndex].choices.splice(choiceIndex, 1);
    if (temp[quizIndex].correctIndex > temp[quizIndex].choices.length - 1) {
      temp[quizIndex].correctIndex = 0;
    }
    setQuizList(temp);
  };
  // 퀴즈 세트 문항 변경 사항 바로 redux에 저장
  useEffect(() => {
    dispatch(saveProblemsAction({ quizList }));
  }, [quizList]);

  return (
    <>
      {quizList.map((quiz: TextQuiz | ImageQuiz, quizIndex: number) => (
        <QuizSolveCard>
          <QuizTitle>
            <QuizCount>Q {quizIndex + 1}.</QuizCount>
            <QuizTitleInput
              placeholder="질문을 입력해주세요."
              value={quiz.quizTitle}
              name="quizTitle"
              onChange={(e) => {
                onChangeProblem(e, quizIndex);
              }}
            />
          </QuizTitle>
          <QuizImageWrapper
            quizList={quizList}
            setQuizList={setQuizList}
            imgURL={quiz.quizThumbnail?.imgURL}
            quizIndex={quizIndex}
          />
          {quiz.choiceType === 'text' && <CreateChoiceTextList props={{ quiz, quizIndex, quizList, setQuizList }} />}
          {quiz.choiceType === 'img' && (
            <S.ImgChoiceContainer>
              <S.ImgChoiceListContainer>
                {quiz.choices.map((item: ChoiceImageType, choiceIndex: number) => {
                  return (
                    <S.ImgWrapper
                      correct={quiz.correctIndex === choiceIndex}
                      key={`${quiz.choiceType} ${quizIndex + choiceIndex}`}
                      onClick={() => {
                        setCorrectIndex(quizIndex, choiceIndex);
                      }}
                    >
                      <img alt="미리보기" src={item.imgURL} />
                      <S.DeleteButton
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteChoice(quizIndex, choiceIndex);
                        }}
                      >
                        <MdClose />
                      </S.DeleteButton>
                    </S.ImgWrapper>
                  );
                })}
                {quiz.choices.length < 4 && (
                  <S.ImgInputContainer>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => {
                        onChoiceImgChange(e, quizIndex);
                      }}
                      id={`choice-image-input-${quizIndex}`}
                      name={`choice-image-input-${quizIndex}`}
                    />
                    <label htmlFor={`choice-image-input-${quizIndex}`}>
                      <AiFillCamera size={30} />
                      <span>이미지추가</span>
                    </label>
                  </S.ImgInputContainer>
                )}
              </S.ImgChoiceListContainer>
            </S.ImgChoiceContainer>
          )}
          <CreateQuizBottom quizList={quizList} setQuizList={setQuizList} quizIndex={quizIndex} />
        </QuizSolveCard>
      ))}
    </>
  );
};

const QuizTitleInput = styled.input`
  border: 0;
`;

export default CreateQuizList;
