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
import data from 'data/question.json';
import imageCompression from 'browser-image-compression'; // 이미지 최적화용
import { MdClose } from 'react-icons/md';
import { AiOutlinePlus } from 'react-icons/ai';

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

  const prevProblemLoad = () => {
    setProblemCount(problemCount - 1);
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
    let temp = [...problems];
    temp[problemCount] = {
      problemTitle,
      choiceType,
      choices: choiceType === 'text' ? choicesText : choicesImgThumbnail,
    };
    dispatch(saveProblemsAction({ problems: temp }));
    setProblemCount(problemCount + 1); // 다음 문제 생성용
  };

  const resetProblem = () => {
    problemTitleClear(); // 문제 제목 초기화
    textChoiceClear(); // 답안 입력란 초기화
    choiceTypeClear(); // 문제 유형 초기화
    setChoicesText([]); // 문제 답안 목록 초기화
    setChoicesImgFile([]); // 문제 이미지 답안 목록 초기화
    setChoicesImgThumbnail([]); // 문제 이미지 썸네일 목록 초기화
    setCorrectIndex(0); // 정답 인덱스 초기화
  };

  useEffect(() => {
    resetProblem(); // 입력란 및 기존 데이터 모두 초기화
    if (problems.length !== 0 && !!problems[problemCount]) {
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
      <ProblemCountContainer>
        <strong>{problemCount + 1}/</strong>
        <span>{problems.length}</span>
      </ProblemCountContainer>
      <CircleShortcutContainer>
        {problems.map((item, index) => {
          return (
            <CircleShortcutButton
              active={problemCount === index}
              key={index}
              onClick={() => {
                setProblemCount(index);
              }}
            ></CircleShortcutButton>
          );
        })}
      </CircleShortcutContainer>
      <ProblemTitleBubble>
        <input type="text" value={problemTitle} onChange={problemTitleHandler} placeholder="문제 제목을 입력하세요" />
      </ProblemTitleBubble>
      <button onClick={randomProblemTitle}>
        <IoDice size={20} />
      </button>
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
        <div>
          <ImageInputContainer>
            <input type="file" accept="image/*" multiple onChange={onImgChange} id="select-image" name="select-image" />
            <label htmlFor="select-image">이미지 추가</label> <span>{choicesImgFile.length}개 선택됨</span>
          </ImageInputContainer>

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
        </div>
      )}

      {problemCount !== 0 && <Button onClick={prevProblemLoad}>이전 문제 수정</Button>}
      {problemCount < 9 && <Button onClick={saveProblem}>저장하고 다음으로</Button>}
    </Wrapper>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};

// 기능 가시성을 위한 임시 디자인
const Wrapper = styled.div`
  & > div {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
`;

const ProblemCountContainer = styled.div`
  font-size: 26px;
  strong {
    color: #ff4d57;
    font-weight: bold;
  }
  font-weight: bold;
  color: rgb(59, 59, 59);
  text-align:center;
`;
const ImageChoicesContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

interface CorrectProps {
  correct?: boolean;
}
const ImageWrapper = styled.div<CorrectProps>`
  width: 100%;
  height: 200px;
  padding: 1rem;
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
    top: 0;
    right: 0;
    border: solid 1px #d6d6d6;
    background-color: white;
    padding: 0.5rem;
    border-radius: 50%;
    font-size: 20px;
    color: rgb(59, 59, 59);
    justify-content: center;
    align-items: center;
    &:hover {
      background-color: lightgrey;
    }
  }
`;
const ImageInputContainer = styled.div`
  input {
    display: none;
  }
  label {
    background-color: grey;
    color: rgb(59, 59, 59);
    width: 100px;
    height: 30px;
    padding: 0.5rem;
  }
`;

interface CircleShortcutButtonProps {
  active?: boolean;
}

const CircleShortcutContainer = styled.div` 
  display:flex;
  justify-content:center;
`
const CircleShortcutButton = styled.button<CircleShortcutButtonProps>`
  border: none;
  border-radius: 50%;
  width: 15px;
  height: 15px;
  margin:4px;
  background-color: ${({ active }) => (active ? '#FF4D57' : '#d9d9d9')};
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
const TextBubble = styled.li<CorrectProps>`
  width:70%;
  border-radius: 30px 0px 30px 30px;
  background-color: ${({ correct }) => (correct ? '#FF4D57' : '#ffa5aa')};
  list-style-type: none;
  margin: 0.5rem;
  padding: 1rem 1.5rem 1rem 1.5rem;
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
  input {
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
  display: flex;
  justify-content: center;
  input[type='radio'] {
    display: none;
  }
  label {
    margin: 0 1rem 0 1rem;
    padding: 0.5rem 2rem 0.5rem 2rem;
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

const ProblemTitleBubble = styled.div`
display:flex;
  width: 80%;
  border-radius: 0px 30px 30px 30px;
  margin: 0.5rem;
  padding: 1rem 1.5rem 1rem 1.5rem;
  background-color: #eee;
  input {
    background-color: transparent;
    color: #999999;
    border:none;
    border-bottom:solid 1px #99999930;
    font-weight: bold;
    padding:0.5rem;
    &:focus {
      outline: none;
    }
    &::placeholder {
      color: #99999970;
    }
  }
`;
export default Page;
