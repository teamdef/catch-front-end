import { ReactElement, ChangeEvent, KeyboardEvent, useState, useEffect, useCallback, MouseEvent } from 'react';
import styled, { keyframes } from 'styled-components';
import type { NextPageWithLayout } from 'pages/_app';
import { useDispatch, useSelector } from 'react-redux';
import { saveProblemsAction, saveProblemSetTitleAction } from 'store/quiz';
import { RootState } from 'store';
import { useRouter } from 'next/router';
import data from 'data/question.json'; // 문제 더미 데이터
import imageCompression from 'browser-image-compression'; // 이미지 최적화용
import { MdClose, MdCheck } from 'react-icons/md'; // 아이콘
import { AiOutlinePlus, AiFillCamera } from 'react-icons/ai'; // 아이콘
import { imageTestApi } from 'pages/api/test'; // 이미지 업로드 테스트 api
import { Button, Loading } from 'components/common';
import useInput from 'hooks/useInput';
import { AppLayout, SmartphoneLayout } from 'components/layout';
import { AxiosResponse } from 'axios';
import { useModal } from 'hooks';

interface ThumbnailObjectType {
  imgURL: string;
  imgName: string;
}

const Page: NextPageWithLayout = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { problems, setTitle } = useSelector((state: RootState) => state.quiz);
  const { id } = useSelector((state: RootState) => state.user);

  const [loading, setLoading] = useState<boolean>(false);

    const [open제작중있음Modal, , Render제작중있음Modal] = useModal({
      yesTitle: '이어서',
      noTitle: '새롭게',
      noAction:()=>{goQuizCreate()},
      contents: (
        <div>
          <div>
            제작하던<strong style={{ color: '#ff4d57' }}>{setTitle}</strong>
            <br />
            문제집이 있습니다
          </div>
          <div style={{ marginTop: '10px', fontSize: '12px', color: '#999' }}>이어서 제작하시겠습니까?</div>
        </div>
      ),
    });
    const [open제작중없음Modal, , Render제작중없음Modal] = useModal({
      yesTitle: '확인',
      yesAction: () => { router.push('/quiz/create') },
      contents: (
        <div>
          제작중인 퀴즈가 없어
          <br />
          시작 화면으로 돌아갑니다.
        </div>
      ),
    });
  const [tempSetTitle, setTempSetTitle, , tempSetTitleHandler] = useInput<string>(''); // 문제집 제목 변경 전용 input 핸들러
  const [problemTitle, setProblemTitle, problemTitleClear, problemTitleHandler] = useInput<string>(''); // 문제 제목 input 핸들러

  const [choiceType, setChoiceType, choiceTypeClear, choiceTypeHandler] = useInput<'img' | 'text'>('text'); // 텍스트 타입이 기본 input 핸들러

  const [textChoice, , textChoiceClear, textChoiceHandler] = useInput<string>(''); // 텍스트 객관식 input 핸들러

  const [problemCount, setProblemCount] = useState<number>(0); // 현재 문제 번호

  const [choicesText, setChoicesText] = useState<string[]>([]); // 텍스트 객관식 답안 리스트

  const [choicesImgThumbnail, setChoicesImgThumbnail] = useState<ThumbnailObjectType[]>([]); // 이미지 객관식 답안 썸네일 리스트 base64 url , image name
  const [choicesImgFile, setChoicesImgFile] = useState<File[]>([]); // 이미지 객관식 답안 파일 리스트 blob object

  const [correctIndex, setCorrectIndex] = useState<number>(0); // 정답 인덱스. 객관식 보기 배열 내에서 정답인 요소의 인덱스를 저장함.

  // 메인화면으로
  const goHome = () => {
    router.push('/home');
  };
  const goQuizCreate = () => {
    resetProblemSet();
    router.replace('/quiz/create');
  };

  // 주사위 버튼 누르면 실행되는 함수
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

  const onKeyDown = (e: KeyboardEvent<HTMLElement>): void => {
    if (e.key === 'Enter') addTextChoice();
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

  // 동일 파일이 재업로드 되지 않는 오류 해결을 위한 함수
  const onImgClick = (e: any) => {
    e.target.value = null;
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

      let _choicesImgThumbnail: ThumbnailObjectType[] = [];
      let _choicesImgFile: File[] = [];

      // PromiseAll 로 개선하기
      await Array.from(files).reduce(async (promise, file) => {
        // This line will wait for the last async function to finish.
        // The first iteration uses an already resolved Promise
        // so, it will immediately continue.

        await promise; // 이전 작업이 종료될때 까지 대기
        await loadImage(_URL.createObjectURL(file)).then(async (img) => {
          let _imgFile;
          let timestamp = new Date().toISOString().substring(0, 10);
          // 이미지의 가로 또는 세로 길이가 300px 이하일 경우에는 압축하지 않음

          if (img.width < 300 || img.height < 300) {
            _imgFile = new File([file], `${timestamp}_${randomString(20)}.${file.type.split('/')[1]}`, {
              type: file.type,
            }); // 원본 이미지 대입
          } else {
            // 이미지 압축 과정
            const _compressed = (await imageCompression(file, options)) as File;
            _imgFile = new File([_compressed], `${timestamp}_${randomString(20)}.${_compressed.type.split('/')[1]}`, {
              type: _compressed.type,
            }); // 압축 이미지 대입
          }

          // 이미지 파일 객체저장
          _choicesImgFile.push(_imgFile);

          // resize된 , 또는 압축되지 않은 이미지 파일의 썸네일 url을 생성함.
          const _imgURL = await imageCompression.getDataUrlFromFile(_imgFile);
          let _thumbnail: ThumbnailObjectType = { imgURL: _imgURL, imgName: _imgFile.name };

          // 이미지 파일 url 저장
          _choicesImgThumbnail.push(_thumbnail);
        });
      }, Promise.resolve());

      setChoicesImgFile([...choicesImgFile, ..._choicesImgFile]);
      setChoicesImgThumbnail([...choicesImgThumbnail, ..._choicesImgThumbnail]);
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

  // 문제 저장. 조건 검사는 하지 않음
  const saveProblem = () => {
    // if (problemTitle === '') {
    //   alert('문제 제목을 작성해주세요.');
    //   return;
    // }
    // if (choiceType === 'text') {
    //   if (choicesText.length < 2) {
    //     alert('객관식 보기 답안을 2개 이상 작성해주세요.');
    //     return;
    //   }
    // } else if (choiceType === 'img') {
    //   if (choicesImgFile.length < 2) {
    //     alert('이미지 보기 답안을 2개 이상 추가해주세요.');
    //     return;
    //   }
    // }

    let temp = [...problems];
    temp[problemCount] = {
      problemTitle,
      choiceType,
      choices: choiceType === 'text' ? choicesText : choicesImgThumbnail,
      correctIndex,
    };
    dispatch(saveProblemsAction({ problems: temp }));
  };

  // 문제 추가
  const createProblem = () => {
    saveProblem(); // 현재 문제 저장
    let temp = [...problems];
    temp.push({
      problemTitle: '',
      choiceType: 'text',
      choices: [],
      correctIndex: 0,
    });
    dispatch(saveProblemsAction({ problems: temp })); // 문제 초기값 (빈 문제) 추가
    setProblemCount(problems.length); // problemCount 를 현재 문제로 이동
  };

  // 문제 삭제
  const deleteProblem = () => {
    if (problems.length === 1 && problemCount === 0) {
      return; // 문제가 1개 남았을 때 맨 앞 문제는 삭제하지 못하도록 함. 에러 방지
    }
    let temp = [...problems];
    temp.splice(problemCount, 1);
    dispatch(saveProblemsAction({ problems: temp }));
    if (problems.length === problemCount + 1) {
      // 마지막 문제를 삭제 할 경우
      setProblemCount(problemCount - 1);
    } else {
      setProblemCount(problemCount);
    }
  };

  // 현재 작성중인 문제 화면 데이터 초기화
  const resetCurrentProblem = () => {
    problemTitleClear(); // 문제 제목 초기화
    textChoiceClear(); // 답안 입력란 초기화
    choiceTypeClear(); // 문제 유형 초기화
    setChoicesText([]); // 문제 답안 목록 초기화
    setChoicesImgFile([]); // 문제 이미지 답안 목록 초기화
    setChoicesImgThumbnail([]); // 문제 이미지 썸네일 목록 초기화
    setCorrectIndex(0); // 정답 인덱스 초기화
  };

  // redux store 자체를 초기화
  const resetProblemSet = () => {
    dispatch(saveProblemSetTitleAction({ setTitle: '' })); // 제목 저장
    dispatch(saveProblemsAction({ problems: [] })); // 빈 배열로 초기화
  };

  // 문제 저장 조건 체크 함수
  const checkProblemSet = (): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      let status: boolean = true;
      problems.forEach((problem: ProblemTypes) => {
        if (problem.problemTitle === '') {
          status = false;
        }
        if (problem.choices.length < 2) {
          status = false;
        }
      });
      resolve(status);
    });
  };
  // 문제집 생성하기 ( 서버에 저장하기 )
  const publicationProblems = async () => {
    // 문제 저장 조건 체크
    if (await checkProblemSet()) {
      setLoading(true);
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
        imageTestApi(res, id, setTitle).then((res: AxiosResponse) => {
          resetProblemSet(); // 문제집 redux 초기화
          setLoading(false); // 로딩 해제 
          router.push({
            pathname: '/quiz/create/share',
            query: {
              probSetTitle: setTitle,
              probSetCount: problems.length,
              returnThumb: res.data.returnThumb,
              returnSetId: res.data.returnSetId,
            },
          }); // 문제집 생성 완료 및 공유 화면으로 이동
        });
      });
    } else {
      alert(`문제 저장 조건이 맞지 않습니다. 다시 확인 바랍니다! \r\n (문제 제목 작성 및 답안 2개 이상 작성 필수) `);
    }
  };

  // 기존에 제작하던 문제집의 유무를 확인하고 팝업을 띄운다.
  useEffect(() => {
    const storage = globalThis?.sessionStorage; // sesstion storage 를 가져옴
    const prevPath = storage.getItem('prevPath'); // prevPath 라고 하는 key 의 value 를 가져옴 . 현재 router 의 이전 router
    if (!prevPath || prevPath !== '/quiz/create/') {
      // /quiz/create 가 아닌 직접URL 또는 외부 이탈 후 재접속 하였음
      console.log("test")
      if (problems.length !== 0) {
        // 제작 중이던 문제가 있을 경우
        open제작중있음Modal();
      } else {
        open제작중없음Modal();
      }
    }
    if (prevPath === '/quiz/create') {
      // /quiz/create 를 통해 넘어왔을 경우
      if (problems.length === 0) {
        // 초기 상태일 경우
        createProblem(); // 새롭게 문제 1개 추가
      }
    }
    // 문제집 타이틀 값 세팅하기
    setTempSetTitle(setTitle);
  }, []);

  // problemCount가 바뀔 경우, 구슬 클릭
  useEffect(() => {
    if (problemCount < 0 || problemCount > 9) {
      return; // 비정상 접근
    }
    resetCurrentProblem(); // 입력란 및 기존 데이터 모두 초기화

    if (problems.length !== 0 && !!problems[problemCount]) {
      setChoiceType(problems[problemCount].choiceType);
      setProblemTitle(problems[problemCount].problemTitle);
      setCorrectIndex(problems[problemCount].correctIndex);

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
    if (choiceType === 'text') {
      if (correctIndex > choicesText.length - 1) {
        setCorrectIndex(0);
      }
    }
    if (choiceType === 'img') {
      if (correctIndex > choicesImgFile.length - 1) {
        setCorrectIndex(0);
      }
    }
  }, [correctIndex, choicesText, choicesImgFile]);

  useEffect(() => {
    // 자동 저장
    saveProblem();
  }, [problemTitle, choiceType, correctIndex, choicesText, choicesImgFile]);

  useEffect(() => {
    dispatch(saveProblemSetTitleAction({ setTitle: tempSetTitle })); // 임시 제목 저장
  }, [tempSetTitle]);

  return (
    <>
      <Wrapper>
        {loading && <Loading ment={'문제집 저장중 입니다!'} />}
        <div id="inner-wrapper">
          <Header>
            <div id="logo" onClick={goHome}>
              캐치캐치
            </div>
            <div id="input-wrapper">
              <input type="text" value={tempSetTitle} onChange={tempSetTitleHandler} />
            </div>
          </Header>
          <ProblemCountContainer>
            <strong>{problemCount + 1}/</strong>
            <span>{problems.length}</span>
          </ProblemCountContainer>
          <CircleShortcutContainer>
            {problems.map((item: ProblemTypes, index: number) => {
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
              <img src={'/assets/img/dice2.png'} onClick={randomProblemTitle} />
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
          <Explain>정답 요소를 클릭해주세요!</Explain>
          {choiceType === 'text' && (
            <TextChoicesContainer>
              <div>
                <ul>
                  {choicesText.map((item, index) => {
                    return (
                      <TextBubbleWrapper>
                        {correctIndex === index && <MdCheck size={20} color={'#AAD775'} />}
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
                      </TextBubbleWrapper>
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
              <ImgBubble>
                <ImageChoicesContainer>
                  {choicesImgThumbnail.length < 4 && (
                    <ImgChoiceBubble>
                      <ImageInputContainer>
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onClick={onImgClick}
                          onChange={onImgChange}
                          id="select-image"
                          name="select-image"
                        />
                        <label htmlFor="select-image">
                          <AiFillCamera size={30} />
                          <span>이미지추가</span>
                        </label>
                      </ImageInputContainer>
                    </ImgChoiceBubble>
                  )}

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
            </ImgChoicesContainer>
          )}
          <ButtonContainer>
            <Button onClick={createProblem} disabled={problems.length > 9}>
              문제 추가
            </Button>
            <Button id="delete" onClick={deleteProblem} disabled={problems.length < 2}>
              문제 삭제
            </Button>
            <Button id="save" onClick={saveProblem}>
              문제 저장
            </Button>
            <Button id="done" onClick={publicationProblems} disabled={problems.length < 2}>
              완성 하기
            </Button>
          </ButtonContainer>
        </div>
      </Wrapper>
      <Render제작중있음Modal />
      <Render제작중없음Modal />
    </>
  );
};
Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <AppLayout>
      <SmartphoneLayout>{page}</SmartphoneLayout>
    </AppLayout>
  );
};
// 기능 가시성을 위한 임시 디자인
const Wrapper = styled.div`
  height: 100%;
  #inner-wrapper {
    margin-bottom: 55px;
    @media (max-width: 400px) {
      margin-bottom: 100px;
    }
  }
`;

const Header = styled.div`
  padding: 1.5rem;
  #logo {
    color: #ff4d57;
    font-family: 'RixInooAriDuriR';
    font-size: 1.5rem;
    &:hover {
      cursor: pointer;
      color: lightgrey;
    }
  }
  #input-wrapper {
    color: #888;
    display: flex;
    justify-content: center;
    input {
      text-align: center;
      border: none;
      border-bottom: solid 1px #eee;
      padding-bottom: 0.5rem;
      &:focus {
        outline: none;
      }
    }
  }
`;
const ButtonContainer = styled.div`
  width: 80%;
  position: absolute;
  bottom: 35px;
  left: 50%;
  transform: translate(-50%, 0%);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
  @media (max-width: 400px) {
    gap: 5px;
  }
  /* justify-content: center; */

  & #done {
    border: solid 2px #ff4d57;
    box-shadow: 0 0.6em #ff4d57;
    color: #ff4d57;
  }
  & #save {
    border: solid 2px #aad775;
    box-shadow: 0 0.6em #aad775;
    color: #aad775;
  }
  & #delete {
    border: solid 2px #c5c5b9;
    box-shadow: 0 0.6em #c5c5b9;
    color: #c5c5b9;
  }
  button {
    @media (max-width: 400px) {
      height: 50px;
    }
    font-size: 12px;
    word-break: keep-all;
    background-color: #fff;
    border: solid 2px #ffa5aa;
    box-shadow: 0 0.6em #ffa5aa;
    color: #ffa5aa;
    /* @media (max-height: 750px) {
      width: 100px;
      font-size: 12px;
    } */
    &:disabled {
      cursor: not-allowed;
      border: none;
      color: #7c7c7c;
      background-color: #ececec;
      border: solid 2px lightgrey;
      box-shadow: 0 0.6em lightgrey;
    }
    &:focus {
      outline: none;
    }
    /* box-shadow: 3px 3px; */
  }
`;
const ProblemCountContainer = styled.div`
  font-size: 14px;
  strong {
    color: #ff4d57;
    font-weight: bold;
  }
  color: rgb(59, 59, 59);
  text-align: center;
`;
const ImageChoicesContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  @media (max-width: 400px) {
    grid-column-gap: 10px;
    grid-row-gap: 10px;
  }
`;

interface CorrectProps {
  correct?: boolean;
}
const ImageWrapper = styled.div<CorrectProps>`
  width: 100%;
  height: 150px;
  @media (max-width: 400px) {
    height: 120px;
  }
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
  input {
    display: none;
  }
  label {
    display: flex;
    flex-direction: column;
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
  padding: 0.5rem 0 1rem 0;
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
  width: 100%;
  height: 150px;
  @media (max-width: 400px) {
    height: 120px;
  }
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff6f7;
  @media (max-height: 750px) {
    font-size: 14px;
  }
`;

const TextBubbleWrapper = styled.li`
  width: 100%;
  list-style-type: none;
  display: flex;
  justify-content: right;
  align-items: center;
`;
const TextBubble = styled.li<CorrectProps>`
  width: 70%;
  @media (max-width: 400px) {
    width: 80%;
  }
  font-size: 14px;
  padding: 0.5rem 1rem 0.5rem 1.5rem;
  border-radius: 25px 0px 25px 25px;
  background-color: ${({ correct }) => (correct ? '#AAD775' : '#ffa5aa')};
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
  @media (max-width: 400px) {
    width: 80%;
  }
  border-radius: 25px 0px 25px 25px;
  border: solid 1px #ffa5aa;
  margin: 0.5rem;
  padding: 0.5rem 1rem 0.5rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

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
  @media (max-width: 400px) {
    padding: 0.5rem 0 0.5rem 0;
  }
  display: flex;
  justify-content: center;
  input[type='radio'] {
    display: none;
  }
  label {
    margin: 0 0.5rem 0 0.5rem;
    padding: 0.25rem 1.25rem 0.25rem 1.25rem;
    cursor: pointer;
    color: #ffa5aa;
    border-radius: 30px;
    border: solid 1px #ffa5aa;
  }
  input[type='radio']:checked + label {
    background-color: #ffa5aa;
    color: white;
    font-weight: bold;
    transition: ease-in-out 0.2s;
    box-shadow: 0 0 0.875rem 0 rgba(33, 37, 41, 0.05);
  }
`;

const bounce = keyframes` 
  0% {transform: translatey(0px);}
  5% {transform: translatey(-10px);}
  10% {transform: translatey(0px);}
  100% {transform: translatey(0px);}
`;

const ProblemTitleContainer = styled.div`
  display: flex;
  button {
    background-color: white;
    border: none;
    color: #ff4d57;
    img {
      width: 40px;
      height: 40px;
    }
    &:hover {
      cursor: pointer;
      animation: ${bounce} 2s linear 0.1s infinite;
    }
  }
`;
const ProblemTitleBubble = styled.div`
  display: flex;
  width: 80%;
  border-radius: 0px 30px 30px 30px;
  margin: 0.5rem;
  padding: 1rem 1.5rem 1rem 1.5rem;
  background-color: #eee;
  @media (max-width: 400px) {
    margin: 0.5 0.25 0.5 0.25rem;
    padding: 0.5rem 1rem 0.5rem 1rem;
    border-radius: 0px 25px 25px 25px;
  }
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

const Explain = styled.div`
  font-size: 14px;
  color: #999;
  margin-top: 10px;
  margin-bottom: 20px;
  @media (max-width: 400px) {
    font-size: 12px;
    margin-top: 5px;
    margin-bottom: 5px;
  }
  text-align: center;
`;

export default Page;
