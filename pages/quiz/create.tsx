import { ReactElement, ChangeEvent, useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import type { NextPageWithLayout } from 'pages/_app';
import { AppLayout } from 'components/layout';
import useInput from 'hooks/useInput';
import { Button } from 'components/common';
import { useDispatch, useSelector } from 'react-redux';
import { saveProblemsAction } from 'store/quiz';
import { RootState } from 'store';
import { IoDice } from 'react-icons/io5';
import { IoIosArrowForward } from 'react-icons/io'
import data from 'data/question.json';
import imageCompression from 'browser-image-compression'; // 이미지 최적화용
import { MdClose, MdDelete,MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { AiOutlinePlus, AiFillCamera } from 'react-icons/ai';

interface ThumbnailObjectType {
  imgURL: string;
  imgName: string;
}
const Page: NextPageWithLayout = () => {
  const { problems } = useSelector((state: RootState) => state.quiz);
  const dispatch = useDispatch();
  const [problemCount, setProblemCount] = useState<number>(0); // 0부터 문제 개수 카운트. 9까지
  const [problemTitle, setProblemTitle, problemTitleClear, problemTitleHandler] = useInput<string>('');
  const [choiceType, setChoiceType, choiceTypeClear, choiceTypeHandler] = useInput<'img' | 'text'>('text'); // 텍스트 타입이 기본

  const [choicesText, setChoicesText] = useState<string[]>([]); // 텍스트 객관식 답안 리스트

  const [choicesImgThumbnail, setChoicesImgThumbnail] = useState<ThumbnailObjectType[]>([]); // 이미지 객관식 답안 썸네일 리스트 base64 url , image name
  const [choicesImgFile, setChoicesImgFile] = useState<File[]>([]); // 이미지 객관식 답안 파일 리스트 blob object

  const [correctIndex, setCorrectIndex] = useState<number>(0); // 정답 인덱스. 객관식 보기 배열 내에서 정답인 요소의 인덱스를 저장함.

  const [textChoice, , textChoiceClear, textChoiceHandler] = useInput<string>(''); // 텍스트 객관식 input 핸들러
  const randomProblemTitle = () => {
    const randomTitle = data.questions[Math.floor(Math.random() * data.questions.length)];
    setProblemTitle(randomTitle);
  };
  const addTextChoice = () => {
    if (textChoice === '') {
      alert('값을 입력하세요');
      return;
    }
    setChoicesText([...choicesText, textChoice]);
    textChoiceClear(); // 초기화
  };
  const deleteTextChoice = (index: number) => {
    let temp = [...choicesText];
    temp.splice(index, 1);
    setChoicesText(temp);
  };

  // 이미지 압축을 위한 옵션
  const options = {
    maxSizeMB: 1, // 원본 이미지 최대 용량
    maxWidthOrHeight: 300, // 리사이즈 이미지 최대 width를 300px로 설정
    //useWebWorker: true, // 이미지 변환 작업 다중 스레드 사용 여부
    fileType: 'images/*', // 파일 타입
  };

  // 이미지 onChange 이벤트 처리 함수
  const onImgChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files as FileList; // 입력 받은 파일 리스트

    let _compressedImgList: File[] = [];
    let _thumbnailImgList: ThumbnailObjectType[] = [];

    if (files && files[0]) {
      // 이미지가 있을 경우
      if (files.length > 4) {
        alert('이미지는 최대 4장까지 업로드 가능합니다');
        return;
      }
      for (let i = 0; i < files.length; i++) {
        try {
          // 이미지 압축 과정
          const _compressed = (await imageCompression(files[i], options)) as File;
          _compressedImgList.push(_compressed);

          console.log(_compressed);
          // resize된 이미지의 url을 생성 및 저장
          const _imgURL = await imageCompression.getDataUrlFromFile(_compressed);
          let _thumbnail: ThumbnailObjectType = { imgURL: _imgURL, imgName: _compressed.name };

          _thumbnailImgList.push(_thumbnail);
        } catch (e) {
          console.log(e);
        }
      }

      console.log(_compressedImgList);
      setChoicesImgFile(_compressedImgList);
      setChoicesImgThumbnail(_thumbnailImgList);
    }
  };

  const makeFileFromThumbnail = async (thumbnailList: ThumbnailObjectType[]) => {
    const _temp: File[] = []; // base64 encoded string 에서 File Blob Object 으로 변환
    for (let i = 0; i < thumbnailList.length; i++) {
      try {
        const _thumbnail = await imageCompression.getFilefromDataUrl(thumbnailList[i].imgURL, thumbnailList[i].imgName);
        console.log(_thumbnail);
        _temp.push(_thumbnail);
      } catch (e) {
        console.log(e);
      }
    }
    setChoicesImgFile(_temp);
  };

  const deleteImgChoice = (index: number) => {
    let thumbnail_temp = [...choicesImgThumbnail];
    thumbnail_temp.splice(index, 1);
    let file_temp = [...choicesImgFile];
    file_temp.splice(index, 1);
    console.log(thumbnail_temp, file_temp);
    setChoicesImgThumbnail(thumbnail_temp);
    setChoicesImgFile(file_temp);
  };

  const createNewProblem = () => {
    setProblemCount(problems.length); // 다음 문제 생성용
  };
  const saveProblem = () => {
    if (problemTitle === '') {
      alert('문제 제목을 작성해주세요.');
      return;
    }
    if (choiceType === 'text') {
      if (choicesText.length < 2) {
        alert('객관식 보기 답안을 2개 이상 작성해주세요.');
        return;
      }
    } else if (choiceType === 'img') {
      if (choicesImgFile.length < 2) {
        alert('이미지 보기 답안을 2개 이상 추가해주세요.');
        return;
      }
    }
    if (choiceType === 'text') {
      if (choicesText.length < 2) {
        alert('객관식 보기 답안을 2개 이상 작성해주세요.');
        return;
      }
    } else if (choiceType === 'img') {
      if (choicesImgFile.length < 2) {
        alert('이미지 보기 답안을 2개 이상 추가해주세요.');
        return;
      }
    }
    let temp = [...problems];
    temp[problemCount] = {
      problemTitle,
      choiceType,
      choices: choiceType === 'text' ? choicesText : choicesImgThumbnail, // 썸네일 말고 파일로 바꿔서 넣어야 함 .
      correctIndex,
    };
    dispatch(saveProblemsAction({ problems: temp }));
  };

  const deleteProblem = () => {
    let temp = [...problems];
    temp.splice(problemCount, 1);
    console.log(problemCount,temp)
    dispatch(saveProblemsAction({ problems: temp }));
    setProblemCount(problemCount-1)
  }

  const resetProblem = () => {
    problemTitleClear(); // 문제 제목 초기화
    textChoiceClear(); // 답안 입력란 초기화
    choiceTypeClear(); // 문제 유형 초기화
    setChoicesText([]); // 문제 답안 목록 초기화
    setChoicesImgFile([]); // 문제 이미지 답안 목록 초기화
    setChoicesImgThumbnail([]); // 문제 이미지 썸네일 목록 초기화
    setCorrectIndex(0); // 정답 인덱스 초기화
  };

  const publicationProblems = () => {
    console.log(problems);
  }

  useEffect(() => {
    resetProblem(); // 입력란 및 기존 데이터 모두 초기화
    if (problems.length == 0 && !!problems[problemCount]) {
      console.log(problems[problemCount]);

      setChoiceType(problems[problemCount].choiceType);
      setProblemTitle(problems[problemCount].problemTitle);

      const choices = problems[problemCount].choices; // img의 경우 base64 썸네일이 들어있음.
      if (problems[problemCount].choiceType === 'text') {
        setChoicesText(choices);
      } else {
        setChoicesImgThumbnail(choices);
        makeFileFromThumbnail(choices);
      }
    }
  }, [problemCount]);

  return (
    <Wrapper>
      <div id="inner-wrapper">
        <>
          <ProblemCountContainer>
            <span>{problems.length} / </span>
            <strong>{problemCount + 1}</strong>
          </ProblemCountContainer>
          <CircleShortcutContainer>
            {problems.map((item, index) => {
              return (
                <CircleShortcut
                  active={problemCount === index}
                  key={index}
                  onClick={() => {
                    setProblemCount(index);
                  }}
                ></CircleShortcut>
              );
            })}
          </CircleShortcutContainer>
          <ProblemTitleContainer>
            <ProblemTitleBubble>
              <input
                type="text"
                value={problemTitle}
                onChange={problemTitleHandler}
                placeholder="문제 제목을 입력하세요"
              />
            </ProblemTitleBubble>
            <button onClick={randomProblemTitle}>
              <IoDice size={30} onClick={randomProblemTitle} />
            </button>
          </ProblemTitleContainer>

          <ChoiceTypeRadioContainer>
            <input
              type="radio"
              name="choice"
              id="text_choice"
              value="text"
              onChange={choiceTypeHandler}
              checked={choiceType === 'text'}
            />
            <label htmlFor="text_choice">텍스트</label>
            <input
              type="radio"
              name="choice"
              id="img_choice"
              value="img"
              onChange={choiceTypeHandler}
              checked={choiceType === 'img'}
            />
            <label htmlFor="img_choice">이미지</label>
          </ChoiceTypeRadioContainer>
          {choiceType === 'text' && (
            <TextChoicesContainer>
              <div>
                <ul>
                  {choicesText.map((item, index) => {
                    return (
                      <TextBubble
                        key={index}
                        onClick={() => {
                          setCorrectIndex(index);
                        }}
                        correct={correctIndex === index}
                      >
                        {item}
                        <Button
                          onClick={() => {
                            deleteTextChoice(index);
                          }}
                        >
                          <MdClose size={20} />
                        </Button>
                      </TextBubble>
                    );
                  })}
                </ul>
                {choicesText.length < 4 && (
                  <div id="input-bubble">
                    <TextInputBubble>
                      <input
                        id="input-text"
                        type="text"
                        placeholder="답안 작성"
                        autoComplete="off"
                        value={textChoice}
                        onChange={textChoiceHandler}
                      />
                      <Button onClick={addTextChoice}>
                        <AiOutlinePlus size={20} />
                      </Button>
                    </TextInputBubble>
                  </div>
                )}
              </div>
            </TextChoicesContainer>
          )}
          {choiceType === 'img' && (
            <ImgChoicesContainer>
              <ImgChoiceBubble>
                <ImageInputContainer>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={onImgChange}
                    id="select-image"
                    name="select-image"
                  />
                  <label htmlFor="select-image">
                    <AiFillCamera size={30} />
                    <span>이미지추가 {choicesImgFile.length}/4</span>
                  </label>
                </ImageInputContainer>
              </ImgChoiceBubble>
              {choicesImgFile.length !== 0 && (
                <ImgBubble>
                  <ImageChoicesContainer>
                    {choicesImgThumbnail.map((item, index) => {
                      return (
                        <ImageWrapper
                          key={index}
                          onClick={() => {
                            setCorrectIndex(index);
                          }}
                          correct={index === correctIndex}
                        >
                          <img alt="미리보기" src={item.imgURL} />
                          <button
                            id="delete-btn"
                            onClick={() => {
                              deleteImgChoice(index);
                            }}
                          >
                            <MdClose />
                          </button>
                        </ImageWrapper>
                      );
                    })}
                  </ImageChoicesContainer>
                </ImgBubble>
              )}
            </ImgChoicesContainer>
          )}
          <ButtonContainer>

            {problems.length < 1 && <Button onClick={deleteProblem} width="50px" height="50px" fontSize="1rem">
              <MdDelete size="20" color="#777"/>
            </Button>}
            {problems.length < 9 && (
              <Button onClick={createNewProblem} width="150px" height="50px" bgColor="#ff4d57" fontColor="white" fontSize="1rem">
                <span style={{ marginLeft: "20px", marginRight:"5px"}}>다음 문제</span><IoIosArrowForward size="30"/>
              </Button>
            )}
            {problems.length < 1 && <Button onClick={publicationProblems} width="50px" height="50px" fontSize=".8rem" bgColor="#4aaf4e" fontColor="white">
              <span>생성</span>
            </Button>}
          </ButtonContainer>
        </>
      </div>
    </Wrapper>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};

// 기능 가시성을 위한 임시 디자인
const Wrapper = styled.div`
  position: relative;
  background-color: #fff6f7;
  height: 100vh;
  padding: 1rem;
  padding-bottom: 10%;
  #inner-wrapper {
    background-color: white;
    height: 100%;
    border-radius: 30px;
    padding: 1rem;
    overflow-y: scroll;
    & {
      -ms-overflow-style: none; /* IE and Edge */
      scrollbar-width: none; /* Firefox */
    }
    &::-webkit-scrollbar {
      display: none; /* Chrome, Safari, Opera*/
    }
  }
`;
const ButtonContainer = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  & button {
    margin: 0.5rem;
    @media (max-height: 750px) {
    }
  }
`;
const ProblemCountContainer = styled.div`
  font-size: 20px;
  padding-top:20px;
  strong {
    color: #ff4d57;
    font-weight: bold;
  }
  font-weight: bold;
  color: rgb(59, 59, 59);
  text-align: center;
`;
const ImageChoicesContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
`;

interface CorrectProps {
  correct?: boolean;
}
const ImageWrapper = styled.div<CorrectProps>`
  width: 100%;
  height: 150px;
  position: relative;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 1rem;
    border: ${({ correct }) => (correct ? 'solid 2px red' : 'none')};
  }
  #delete-btn {
    display: flex;
    position: absolute;
    top: 8px;
    right: 8px;
    border: solid 1px #d6d6d6;
    background-color: white;
    padding: 0.25rem;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    border-radius: 50%;
    font-size: 16px;
    color: rgb(59, 59, 59);
    justify-content: center;
    align-items: center;
    &:hover {
      background-color: lightgrey;
    }
  }
`;
const ImageInputContainer = styled.div`
  display: flex;
  align-items: center;
  & * {
    margin-right: 0.5rem;
  }
  input {
    display: none;
  }
  label {
    display: flex;
    align-items: center;
    color: #ffa5aa;
    &:hover{
      cursor:pointer;
    }
  }
`;

interface CircleShortcutButtonProps {
  active?: boolean;
}

const CircleShortcutContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem 0 1rem 0 ;
`;
const CircleShortcut = styled.div<CircleShortcutButtonProps>`
  border: none;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  margin: 4px;
  background-color: ${({ active }) => (active ? '#FF4D57' : '#d9d9d9')};
  &:hover{
    cursor:pointer;
  }
`;

const TextChoicesContainer = styled.div`
  ul {
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: end;
  }
  #input-bubble {
    display: flex;
    justify-content: right;
  }
`;

const ImgChoicesContainer = styled.div`
  display: flex;
  align-items: end;
  flex-direction: column;
`;
const ImgBubble = styled.div`
  border-radius: 30px 0px 30px 30px;
  background-color: #ffa5aa;
  width: 85%;
  padding: 1rem;
  margin: 0.5rem;
  width: 95%;
`;
const ImgChoiceBubble = styled.div`
  border-radius: 30px 0px 30px 30px;
  background-color: white;
  border: solid 1px #ffa5aa;
  margin: 0.5rem;
  padding: 1rem 2rem 1rem 2rem;
  span {
    color: #ffa5aa;
  }
  @media (max-height: 750px) {
    font-size: 14px;
    padding: 0.5rem 1.5rem 0.5rem 1.5rem;
  }
`;
const TextBubble = styled.li<CorrectProps>`
cursor: pointer;
  width: 70%;
  padding: 1rem 1.5rem 1rem 1.5rem;
  @media (max-height: 750px) {
    width: 80%;
    padding: 0.5rem 1.5rem 0.5rem 1.5rem;
    font-size:14px;
  }
  border-radius: 30px 0px 30px 30px;
  background-color: ${({ correct }) => (correct ? '#4aaf4e' : '#ffa5aa')};
  list-style-type: none;
  margin: 0.5rem;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  button {
    padding: 0.5rem;
    background-color: rgba(255, 255, 255, 0);
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    font-weight: bold;
  }
`;
const TextInputBubble = styled.div`
  width: 70%;
  border-radius: 30px 0px 30px 30px;
  border: solid 1px #ffa5aa;
  margin: 0.5rem;
  padding: 1rem 1.5rem 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-height: 750px) {
    width: 80%;
    padding: 0.5rem 1.5rem 0.5rem 1.5rem;
    font-size: 14px;
  }
  input {
    width: inherit;
    color: #ffa5aa;
    border: none;
    font-weight: bold;
    &:focus {
      outline: none;
    }
    &::placeholder {
      color: #ffa5aa;
    }
  }
  button {
    padding: 0.5rem;
    background-color: rgba(255, 255, 255, 0);
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #ffa5aa;
    font-weight: bold;
  }
`;
const ChoiceTypeRadioContainer = styled.div`
padding:1.5rem 0 1.5rem 0;
  display: flex;
  justify-content: center;
  input[type='radio'] {
    display: none;
  }
  label {
    margin: 0 0.5rem 0 0.5rem;
    padding: 0.25rem 1.25rem 0.25rem 1.25rem;
    cursor: pointer;
    color: #ff4d57;
    border-radius: 30px;
    border: solid 1px #ff4d57;
  }
  input[type='radio']:checked + label {
    background-color: #ff4d57;
    color: white;
    font-weight: bold;
    transition: ease-in-out 0.2s;
    box-shadow: 0 0 0.875rem 0 rgba(33, 37, 41, 0.05);
  }
`;

const ProblemTitleContainer = styled.div`
  display: flex;
  button {
    background-color: white;
    border: none;
    color: #ff4d57;
  }
`;
const ProblemTitleBubble = styled.div`
  display: flex;
  width: 80%;
  border-radius: 0px 30px 30px 30px;
  margin: 0.5rem;
  padding: 1rem 1.5rem 1rem 1.5rem;
  background-color: #eee;
  input {
    width:100%;
    background-color: transparent;
    color: #999999;
    border: none;
    padding: 0.5rem;
    &:focus {
      outline: none;
    }

    &::placeholder {
      color: #99999970;
    }
  }
`;

export default Page;
