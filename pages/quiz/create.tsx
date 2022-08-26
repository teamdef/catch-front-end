import { ReactElement, ChangeEvent,KeyboardEvent, useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import type { NextPageWithLayout } from 'pages/_app';
import { AppLayout } from 'components/layout';
import useInput from 'hooks/useInput';
import { Button, CompressLoading } from 'components/common';
import { useDispatch, useSelector } from 'react-redux';
import { saveProblemsAction } from 'store/quiz';
import { RootState } from 'store';
import { IoDice } from 'react-icons/io5';
import data from 'data/question.json';
import imageCompression from 'browser-image-compression'; // 이미지 최적화용
import { MdClose } from 'react-icons/md';
import { AiOutlinePlus, AiFillCamera } from 'react-icons/ai';
import { imageTestApi } from 'pages/api/test';

interface ThumbnailObjectType {
  imgURL: string;
  imgName: string;
}
const Page: NextPageWithLayout = () => {

  const [loading, setLoading] = useState(false);
  const { problems, setTitle } = useSelector((state: RootState) => state.quiz);
  const { userId } = useSelector((state: RootState) => state.user);
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

  const onKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") addTextChoice();
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

  const randomString = (len: number): string => {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; // 중복의 여지가 있긴 함.
    for (let i = 0; i < len; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  };

  // 이미지 로더. 이미지의 가로세로 크기를 구하기 위함 
  const loadImage = (url: string): Promise<HTMLImageElement> => {
    return new Promise((resolve) => {
      const _img = new Image();
      _img.src = url;
      _img.addEventListener('load', () => {
        resolve(_img);
      });
    });
  };

  // 이미지 onChange 이벤트 처리 함수
  const onImgChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files as FileList; // 입력 받은 파일 리스트
    const _URL = window.URL || window.webkitURL;
    // 이미지가 있을 경우
    if (files && files[0]) {
      // 기존에 업로드 된 이미지와 새로 업로드 할 이미지의 총 합이 4개 이하 

      if (files.length + choicesImgFile.length > 4) {
        alert('이미지는 최대 4장까지 업로드 가능합니다');
        return;
      }
      setLoading(true); // 로딩중 활성화

      let _choicesImgThumbnail: ThumbnailObjectType[] = [];
      let _choicesImgFile: File[] = [];

      await Array.from(files).reduce(async (promise, file) => {
        // This line will wait for the last async function to finish.
        // The first iteration uses an already resolved Promise
        // so, it will immediately continue.

        await promise; // 이전 작업이 종료될때 까지 대기
        await loadImage(_URL.createObjectURL(file)).then(async (img) => {
          let _imgFile;

          // 이미지의 가로 또는 세로 길이가 300px 이하일 경우에는 압축하지 않음

          if (img.width < 300 || img.height < 300) {
            _imgFile = new File([file], randomString(20), { type: file.type }); // 원본 이미지 대입
          } else {
            // 이미지 압축 과정
            const _compressed = (await imageCompression(file, options)) as File;
            _imgFile = _compressed; // 압축 이미지 대입
          }

          // 이미지 파일 객체저장
          _choicesImgFile.push(_imgFile);

          // resize된 , 또는 압축되지 않은 이미지 파일의 썸네일 url을 생성함.
          const _imgURL = await imageCompression.getDataUrlFromFile(_imgFile);
          let _thumbnail: ThumbnailObjectType = { imgURL: _imgURL, imgName: randomString(20) };

          // 이미지 파일 url 저장
          _choicesImgThumbnail.push(_thumbnail);
        });
      }, Promise.resolve());

      setChoicesImgFile([...choicesImgFile, ..._choicesImgFile]);
      setChoicesImgThumbnail([...choicesImgThumbnail,..._choicesImgThumbnail]);
      setLoading(false); // 로딩중 해제
    }
  };

  const makeFileFromThumbnail = async (thumbnailList: ThumbnailObjectType[]) => {
    const _temp: File[] = []; // base64 encoded string 에서 File Blob Object 으로 변환
    for (let i = 0; i < thumbnailList.length; i++) {
      try {
        const _thumbnail = await imageCompression.getFilefromDataUrl(thumbnailList[i].imgURL, thumbnailList[i].imgName);
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
    setChoicesImgThumbnail(thumbnail_temp);
    setChoicesImgFile(file_temp);
  };

  const createNewProblem = () => {
    saveProblem(); // 현재 문제 저장 
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

    let temp = [...problems];
    temp[problemCount] = {
      problemTitle,
      choiceType,
      choices: choiceType === 'text' ? choicesText : choicesImgThumbnail,
      correctIndex,
    };
    dispatch(saveProblemsAction({ problems: temp }));
  };

  const deleteProblem = () => {
    let temp = [...problems];
    temp.splice(problemCount, 1);
    dispatch(saveProblemsAction({ problems: temp }));
    setProblemCount(problemCount - 1);
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

  const publicationProblems = () => {
    const tempUserId = 1234;
    // url 형태의 이미지를 다시 blob 객체로 변환. 
    let _problems = problems.map((problem: ProblemTypes) => {
      if (problem.choiceType === 'img') {
        let _problem = JSON.parse(JSON.stringify(problem)); // 객체 깊은 복사
        let _choices: File[] = [];
        problem.choices.forEach(async (img) => {
          try {
            const _temp = img as ChoiceImageTypes;
            const _file = await imageCompression.getFilefromDataUrl(_temp.imgURL, _temp.imgName);
            _choices.push(_file);
          } catch (e) {
            console.log(e);
          }
        });
        _problem.choices = _choices;
        return _problem;
      } else {
        return problem;
      }
    });
    Promise.all(_problems).then((res) => {
      imageTestApi(res, tempUserId, setTitle);
    })
  };

  useEffect(() => {
    resetProblem(); // 입력란 및 기존 데이터 모두 초기화
    if (problems.length !== 0 && !!problems[problemCount]) {
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

  useEffect(() => {
    // 정답으로 선택한 답안이 삭제 되었을 경우 첫번째 요소로 초기화 
    if (choiceType === "text") {
      if (correctIndex > choicesText.length-1) {
        setCorrectIndex(0);
      }
    }
    if (choiceType === "img") {
      if (correctIndex > choicesImgFile.length-1) {
        setCorrectIndex(0);
      }
    } 
  }, [correctIndex, choicesText, choicesImgFile])
  
  useEffect(() => {
    // 문제 제목, 객관식 보기 답안이 문제 저장 조건을 만족한다면 자동 저장 
    if (problemTitle !== "" && choicesText.length > 1 && choicesImgFile.length > 1) {
       saveProblem();
    }
   
  },[problemTitle,correctIndex,choicesText,choicesImgFile])

  return (
    <Wrapper>
      <div id="inner-wrapper">
        <>
          <ProblemCountContainer>
            <strong>{problemCount + 1}/</strong>
            <span>{problems.length}</span>
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
                        onKeyDown={onKeyDown}
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
            <Button onClick={saveProblem} height="50px" fontColor="#999999">
              저장하기
            </Button>
            {problems.length < 9 && (
              <Button onClick={createNewProblem} height="50px" bgColor="#ff4d57" fontColor="white">
                새로만들기
              </Button>
            )}
            {problems.length > 1 && (
              <Button onClick={deleteProblem} height="50px">
                문제 삭제
              </Button>
            )}
            {problems.length > 1 && (
              <Button onClick={publicationProblems} height="50px">
                문제집 완성하기
              </Button>
            )}
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
  transform: translate(-50%, 0%);
  display: flex;
  justify-content: center;
  & button {
    margin: 0.5rem;
    width: 150px;
    @media (max-height: 750px) {
      width: 100px;
      font-size: 12px;
    }
  }
`;
const ProblemCountContainer = styled.div`
  font-size: 20px;
  padding-top: 20px;
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
    &:hover {
      cursor: pointer;
    }
  }
`;

interface CircleShortcutButtonProps {
  active?: boolean;
}

const CircleShortcutContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem 0 1rem 0;
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
  &:hover {
    cursor: pointer;
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
  width: 70%;
  padding: 1rem 1.5rem 1rem 1.5rem;
  @media (max-height: 750px) {
    width: 80%;
    padding: 0.5rem 1.5rem 0.5rem 1.5rem;
    font-size: 14px;
  }
  border-radius: 30px 0px 30px 30px;
  background-color: ${({ correct }) => (correct ? '#FF4D57' : '#ffa5aa')};
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
  padding: 1.5rem 0 1.5rem 0;
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
    width: 100%;
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
