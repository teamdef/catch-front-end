/* 스타일 코드 */
import * as S from 'styles/quiz/create/index.style';
import { ChangeEvent, Dispatch, SetStateAction, useEffect } from 'react';
/* 라이브러리 */
import imageCompression from 'browser-image-compression'; // 이미지 최적화용
import styled from 'styled-components';
import { QuizImage, QuizTitle } from 'components/style';
/* react-icons */
import { MdClose } from 'react-icons/md';
import { AiFillCamera } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { saveProblemsAction } from 'store/quiz';
import { QuizCount, QuizSolveCard } from '../solve/main/QuizItem';
import CreateChoiceTextList from './CreateChoiceTextList';
import CreateQuizBottom from './CreateQuizBottom';

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

  // 이미지 압축을 위한 옵션
  const options = {
    maxSizeMB: 1, // 원본 이미지 최대 용량
    maxWidthOrHeight: 300, // 리사이즈 이미지 최대 width를 300px로 설정
    // useWebWorker: true, // 이미지 변환 작업 다중 스레드 사용 여부
    fileType: 'images/*', // 파일 타입
  };

  // 랜덤 문자열 생성 함수
  const randomString = (len: number): string => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; // 중복의 여지가 있긴 함.
    for (let i = 0; i < len; i += 1) text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  };
  // 오늘 날짜 date객체 -> yyyy/mm/dd 함수
  const dateString = (): string => {
    return new Date().toISOString().substring(0, 10).replace(/-/g, '/');
  };

  // 이미지 로더. 이미지의 가로세로 크기를 구하기 위함 File Object to Image Object
  const loadImage = (url: string): Promise<HTMLImageElement> => {
    return new Promise((resolve) => {
      const _img = new Image();
      _img.src = url;
      _img.addEventListener('load', () => {
        resolve(_img);
      });
    });
  };

  // 이미지를 불러온 후 이미지 사이즈에 맞게 압축하는 과정
  const ReturnFileByImageSize = async (img: HTMLImageElement, file: File): Promise<ChoiceImageType> => {
    let _tempImgFile: File;
    // 이미지의 가로 또는 세로 길이가 300px 이하일 경우에는 압축하지 않음
    if (img.width < 300 || img.height < 300) {
      _tempImgFile = file;
    } else {
      // 이미지 압축 후 임시 이미지 파일 객체에 대입
      _tempImgFile = (await imageCompression(file, options)) as File;
    }
    const _imgFile = new File(
      [_tempImgFile],
      `${dateString()}_${randomString(20)}.${_tempImgFile.type.split('/')[1]}`,
      {
        type: _tempImgFile.type,
      },
    ); // 파일 객체 이름 변경

    // resize된 , 또는 압축되지 않은 이미지 파일의 썸네일 url을 생성함.
    const _imgURL = await imageCompression.getDataUrlFromFile(_imgFile);
    return { imgURL: _imgURL, imgName: _imgFile.name };
  };

  // File 객체를 ChoiceImageTypes 타입 객체로 변환하는 함수
  const FileListToImageObject = (_files: FileList) => {
    const _URL = window.URL || window.webkitURL;
    // FileList -> File Array
    const _fileArray = Array.from(_files);
    return _fileArray.map(async (file) => {
      const _imgElement = await loadImage(_URL.createObjectURL(file)); // 이미지 element 구하기
      const _thumbnail = await ReturnFileByImageSize(_imgElement, file); // 이미지 파일 url 저장
      return _thumbnail;
    });
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

  // 퀴즈 설명 이미지 onChange 이벤트 처리 함수
  const onQuizImageChange = async (e: ChangeEvent<HTMLInputElement>, quizIndex: number) => {
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

  const deleteQuizImage = (quizIndex: number) => {
    const temp = JSON.parse(JSON.stringify(quizList));
    temp[quizIndex].quizThumbnail = undefined;
    setQuizList(temp);
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
          <QuizImageInput
            type="file"
            accept="image/*"
            onChange={(e) => {
              onQuizImageChange(e, quizIndex);
            }}
            name={`quiz-image-input-${quizIndex}`}
            id={`quiz-image-input-${quizIndex}`}
          />
          <QuizImageLabel htmlFor={`quiz-image-input-${quizIndex}`}>
            {quiz.quizThumbnail ? (
              <>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    deleteQuizImage(quizIndex);
                  }}
                >
                  닫기
                </button>
                <QuizImage src={quiz.quizThumbnail.imgURL} alt="퀴즈썸네일이미지" />
              </>
            ) : (
              <QuizImageUpload>이미지를 선택해주세요. (선택사항)</QuizImageUpload>
            )}
          </QuizImageLabel>
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
const QuizImageInput = styled.input`
  display: none;
`;
const QuizImageLabel = styled.label`
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
const QuizTitleInput = styled.input`
  border: 0;
`;

export default CreateQuizList;
