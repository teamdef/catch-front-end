import { ReactElement, ChangeEvent, KeyboardEvent, useState, useEffect, useCallback, MouseEvent } from 'react';
import styled, { keyframes, css } from 'styled-components';
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
import { Loading } from 'components/common';
import useInput from 'hooks/useInput';
import { AppLayout } from 'components/layout';
import { AxiosResponse } from 'axios';
import { useModal } from 'hooks';
import { VscChromeClose } from 'react-icons/vsc';

// Import Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import { EffectCards } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-cards';

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
    noAction: () => {
      goQuizCreate();
    },
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
    yesAction: () => {
      router.push('/quiz/create');
    },
    contents: (
      <div>
        제작중인 퀴즈가 없어
        <br />
        시작 화면으로 돌아갑니다.
      </div>
    ),
  });

  // 문제를 저장할 배열
  const [problemList, setProblemList] = useState<ProblemTypes[]>([]); // 문제 저장 배열
  const [tempSetTitle, setTempSetTitle, , tempSetTitleHandler] = useInput<string>(''); // 문제집 제목 변경 전용 input 핸들러
  const [textChoiceInput, , textChoiceInputClear, textChoiceInputHandler] = useInput<string>(''); // 객관식 텍스트 답안 전용 input 핸들러

  // 메인화면으로
  const goHome = () => {
    router.push('/home');
  };
  // 퀴즈 생성 화면으로
  const goQuizCreate = () => {
    router.push('/quiz/create');
  };

  const createProblem = () => {
    let temp = [...problemList];
    const obj: ProblemTypes = {
      problemTitle: '',
      choiceType: 'text',
      choices: [],
      correctIndex: 0,
    };
    temp.push(obj);
    setProblemList(temp);
  };
  const deleteProblem = (problemIndex: number) => {
    let temp = [...problemList];
    temp.splice(problemIndex, 1);
    setProblemList(temp);
  };
  const onChangeProblem = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    console.log(value, name, index);
    const problem = { ...problemList[index], [name]: value };
    let temp = [...problemList];
    temp[index] = problem;
    setProblemList(temp);
  };

  const choiceTypeHandler = (e: ChangeEvent<HTMLInputElement>, problemIndex: number) => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    const problem = { ...problemList[problemIndex], [name]: value };
    let temp = [...problemList];
    if (value === 'img') {
      const _arr: ChoiceImageTypes = [];
      temp[problemIndex].choices = _arr;
    }
  };

  const setCorrectIndex = (problemIndex: number, choiceIndex: number) => {
    let temp = [...problemList];
    temp[problemIndex].correctIndex = choiceIndex;
    setProblemList(temp);
  };

  const addChoiceText = (problemIndex: number) => {
    let temp = [...problemList];
    const obj: ChoiceTextTypes = {
      choiceText: textChoiceInput,
    };
    temp[problemIndex].choices.push(obj);
    setProblemList(temp);
    textChoiceInputClear();
  };

  const deleteChoice = (problemIndex: number, choiceIndex: number) => {
    let temp = [...problemList];
    temp[problemIndex].choices.splice(choiceIndex, 1);
    setProblemList(temp);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLElement>, problemIndex: number): void => {
    if (e.key === 'Enter') addChoiceText(problemIndex);
  };
  // 주사위 버튼 누르면 실행되는 함수
  const randomProblemTitle = (problemIndex: number) => {
    const randomTitle: string = data.questions[Math.floor(Math.random() * data.questions.length)];
    let temp = [...problemList];
    temp[problemIndex].problemTitle = randomTitle;
    console.log(temp);
    //setProblemList(temp);
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
  const onImgChange = async (e: ChangeEvent<HTMLInputElement>, problemIndex: number) => {
    const files = e.target.files as FileList; // 입력 받은 파일 리스트
    const _URL = window.URL || window.webkitURL;

    // 이미지가 있을 경우
    if (files && files[0]) {
      // 기존에 업로드 된 이미지와 새로 업로드 할 이미지의 총 합이 4개 이하

      if (files.length + problemList[problemIndex].choices.length > 4) {
        alert('이미지는 최대 4장까지 업로드 가능합니다');
        return;
      }

      let _choicesImgThumbnail: ThumbnailObjectType[] = [];
      // let _choicesImgFile: File[] = [];

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
          // _choicesImgFile.push(_imgFile);

          // resize된 , 또는 압축되지 않은 이미지 파일의 썸네일 url을 생성함.
          const _imgURL = await imageCompression.getDataUrlFromFile(_imgFile);
          let _thumbnail: ThumbnailObjectType = { imgURL: _imgURL, imgName: _imgFile.name };

          // 이미지 파일 url 저장
          _choicesImgThumbnail.push(_thumbnail);
        });
      }, Promise.resolve());

      let temp = [...problemList];
      let _choices = [...temp[problemIndex].choices, ..._choicesImgThumbnail];
      console.log(_choices);
      temp[problemIndex].choices = _choices;
      setProblemList(temp);
    }
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
      problemList.forEach((problem: ProblemTypes) => {
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
  const publicationProblemSet = async () => {
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
      if (problems.length !== 0) {
        // 제작 중이던 문제가 있을 경우
        open제작중있음Modal();
      } else {
        open제작중없음Modal();
      }
    }
    /*
    if (prevPath === '/quiz/create') {
      // /quiz/create 를 통해 넘어왔을 경우
      if (problems.length === 0) {
        // 초기 상태일 경우
        createProblem(); // 새롭게 문제 1개 추가
      }
    }*/
    // 문제집 타이틀 값 세팅하기
    setTempSetTitle(setTitle);
    if (problems) {
      setProblemList(problems);
    }
  }, []);

  /*
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
    */

  useEffect(() => {
    console.log(problemList);
    dispatch(saveProblemsAction({ problems: problemList }));
  }, [problemList]);

  useEffect(() => {
    dispatch(saveProblemSetTitleAction({ setTitle: tempSetTitle })); // 임시 제목 저장
  }, [tempSetTitle]);

  // TODO: useMemo 및 useCallback을 이용하여 렌더링 최적화하기
  return (
    <>
      <Wrapper>
        {loading && <Loading ment={'문제집 저장중 입니다!'} />}
        <Header>
          <div id="logo" onClick={goHome}>
            캐치캐치
          </div>
          <ProblemSetTitleInputWrapper>
            <input
              type="text"
              value={tempSetTitle}
              onChange={tempSetTitleHandler}
              placeholder={'퀴즈 제목을 입력하세요!'}
              spellCheck="false"
            />
          </ProblemSetTitleInputWrapper>
        </Header>
        <CardWrapper>
          <Swiper
            spaceBetween={10}
            pagination={{ clickable: false }}
            modules={[Pagination]}
            loop={false}
            grabCursor={false}
          >
            {problemList.map((problem, problemIndex) => {
              return (
                <SwiperSlide key={problemIndex}>
                  <QuizCreateCard>
                    <DeleteButton
                      onClick={() => {
                        deleteProblem(problemIndex);
                      }}
                    >
                      <VscChromeClose size={24} />
                    </DeleteButton>
                    <ProblemTitleContainer>
                      <ProblemTitleInputBubble
                        type="text"
                        placeholder="문제 제목을 입력해주세요!"
                        value={problem.problemTitle}
                        name="problemTitle"
                        autoComplete="off"
                        onChange={(e) => {
                          onChangeProblem(e, problemIndex);
                        }}
                      />
                      <button
                        onClick={() => {
                          randomProblemTitle(problemIndex);
                        }}
                      >
                        <img src={'/assets/img/dice2.png'} />
                      </button>
                    </ProblemTitleContainer>
                    <ChoiceTypeRadioContainer>
                      <input
                        type="radio"
                        name="choiceType"
                        id="text_choice"
                        value="text"
                        onChange={(e) => {
                          onChangeProblem(e, problemIndex);
                        }}
                        checked={problem.choiceType === 'text'}
                      />
                      <label htmlFor="text_choice">텍스트</label>
                      <input
                        type="radio"
                        name="choiceType"
                        id="img_choice"
                        value="img"
                        onChange={(e) => {
                          onChangeProblem(e, problemIndex);
                        }}
                        checked={problem.choiceType === 'img'}
                      />
                      <label htmlFor="img_choice">이미지</label>
                    </ChoiceTypeRadioContainer>
                    <ChoiceWrapper>
                      {problem.choiceType === 'text' ? (
                        <TextChoiceListContainer>
                          <>
                            {problem.choices.map((item, choiceIndex) => {
                              return (
                                <>
                                  <TextChoiceBubble
                                    correct={problem.correctIndex === choiceIndex}
                                    key={choiceIndex}
                                    onClick={() => {
                                      setCorrectIndex(problemIndex, choiceIndex);
                                    }}
                                  >
                                    {problem.correctIndex === choiceIndex && <MdCheck id="check-icon" size={30} />}
                                    <div>{item.choiceText}</div>
                                    <button
                                      onClick={() => {
                                        deleteChoice(problemIndex, choiceIndex);
                                      }}
                                    >
                                      <VscChromeClose size={20} />
                                    </button>
                                  </TextChoiceBubble>
                                </>
                              );
                            })}
                            {problem.choices.length < 4 && (
                              <TextChoiceAddContainer as="div">
                                <input
                                  type="text"
                                  placeholder={'객관식 답안을 입력해주세요!'}
                                  autoComplete="off"
                                  value={textChoiceInput}
                                  onChange={textChoiceInputHandler}
                                  onKeyDown={(e) => {
                                    onKeyDown(e, problemIndex);
                                  }}
                                />
                                <button
                                  onClick={() => {
                                    addChoiceText(problemIndex);
                                  }}
                                >
                                  <AiOutlinePlus size={24} />
                                </button>
                              </TextChoiceAddContainer>
                            )}
                          </>
                        </TextChoiceListContainer>
                      ) : (
                        <ImgChoiceBubble>
                          <ImgChoiceListContainer>
                            {problem.choices.length < 4 && (
                              <ImgInputContainer>
                                <input
                                  type="file"
                                  accept="image/*"
                                  multiple
                                  onClick={onImgClick}
                                  onChange={(e) => {
                                    onImgChange(e, problemIndex);
                                  }}
                                  id="select-image"
                                  name="select-image"
                                />
                                <label htmlFor="select-image">
                                  <AiFillCamera size={30} />
                                  <span>이미지추가</span>
                                </label>
                              </ImgInputContainer>
                            )}
                            {problem.choices.map((item, choiceIndex) => {
                              return (
                                <ImgWrapper
                                  key={choiceIndex}
                                  onClick={() => {
                                    setCorrectIndex(problemIndex, choiceIndex);
                                  }}
                                  correct={choiceIndex === problem.correctIndex}
                                >
                                  <img alt="미리보기" src={item.imgURL} />
                                  <button
                                    id="delete-btn"
                                    onClick={() => {
                                      deleteChoice(problemIndex, choiceIndex);
                                    }}
                                  >
                                    <MdClose />
                                  </button>
                                </ImgWrapper>
                              );
                            })}
                          </ImgChoiceListContainer>
                        </ImgChoiceBubble>
                      )}
                    </ChoiceWrapper>

                    <InfoContainer>정답 항목을 클릭해주세요!</InfoContainer>
                  </QuizCreateCard>
                </SwiperSlide>
              );
            })}

            {problems.length < 9 && (
              <SwiperSlide>
                <QuizCreateCard>
                  <CreateNewQuizContainer>
                    <button onClick={createProblem}>
                      <AiOutlinePlus size={50} />
                    </button>
                    <div>{problemList.length === 0 ? <strong>새로운 퀴즈</strong> : '새 문제를'}를 추가해볼까요?</div>
                    <div>
                      위의 <strong>+</strong> 버튼을 누르세요!
                    </div>
                  </CreateNewQuizContainer>
                </QuizCreateCard>
              </SwiperSlide>
            )}
          </Swiper>
        </CardWrapper>

        <CompleteButtonWrapper>
          <button onClick={publicationProblemSet} disabled={problems.length < 2}>
            퀴즈 생성 완료!
          </button>
        </CompleteButtonWrapper>
      </Wrapper>
      <Render제작중있음Modal />
      <Render제작중없음Modal />
    </>
  );
};
Page.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};
// 기능 가시성을 위한 임시 디자인
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff6f7;
  input {
    &:focus {
      outline: none;
    }
    &::placeholder {
      color: #00000050;
    }
  }
  .swiper-wrapper {
    padding-top: 30px;
    padding-bottom: 4px;
  }
  .swiper-pagination {
    bottom: calc(100% - 1rem);
    .swiper-pagination-bullet {
      width: 10px;
      height: 10px;
    }
    .swiper-pagination-bullet-active {
      background-color: #ff4d57;
    }
  }
  button {
    &:hover {
      cursor: pointer;
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
`;
const blink = keyframes` 
  50% {opacity: 0;}
`;
const CreateNewQuizContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  margin-top: 200px;
  button {
    background-color: transparent;
    border: none;
    color: #d6d6d6;
    margin-bottom: 1rem;
  }
  strong {
    color: #ff4d57;
    font-weight: bold;
  }
`;

const CardWrapper = styled.div`
  padding: 1rem;
  padding-top: 0;
`;
const ProblemSetTitleInputWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 0.5rem;
  /* animation: ${blink} 1s step-end infinite; */
  input {
    display: inline-block;
    color: #00000050;
    font-weight: bold;
    font-size: 24px;
    background-color: transparent;
    border: none;
    text-align: center;
    &::placeholder {
      color: #00000020;
    }
  }
`;
const QuizCreateCard = styled.div`
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 10%), 0 1px 2px 0 rgb(0 0 0 / 6%);
  width: 90%;
  border-radius: 25px;
  background-color: white;
  padding: 1rem;

  display: flex;
  flex-direction: column;
  width: inherit;
  flex-wrap: nowrap;
  align-items: center;
  margin: 0 auto;
  height: 650px;
`;
const DeleteButton = styled.button`
  background-color: transparent;
  border: none;
  color: #d6d6d6;
  position: absolute;
  right: 30px;
  top: 30px;
`;
const bounce = keyframes` 
  0% {transform: translatey(0px);}
  5% {transform: translatey(-10px);}
  10% {transform: translatey(0px);}
  100% {transform: translatey(0px);}
`;
const ProblemTitleContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 1rem;
  padding-top: 2.5rem;
  button {
    border: none;
    background-color: transparent;
    margin-left: 0.5rem;
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
const ProblemTitleInputBubble = styled.input`
  display: flex;
  width: 90%;
  border-radius: 0px 30px 30px 30px;
  background-color: #fff6f7;
  color: #ffa5aa;
  border: none;
  padding: 1.5rem 1.75rem 1.5rem 1.75rem;
  font-size: 1rem;
  &::placeholder {
    color: #00000020;
  }
`;
const ChoiceTypeRadioContainer = styled.div`
  margin-top: 0.5rem;
  display: flex;
  font-size: 14px;
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
    transition: ease-in-out 0.2s;
    box-shadow: 0 0 0.875rem 0 rgba(33, 37, 41, 0.05);
  }
`;

const ChoiceWrapper = styled.div`
  width: 90%;
  margin-top: 1rem;
`;
const TextChoiceListContainer = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: end;
  float: right;
`;
interface CorrectProps {
  correct?: boolean;
}
const TextChoiceBubble = styled.li<CorrectProps>`
  width: 100%;
  display: flex;
  position: relative;
  justify-content: space-between;
  background-color: ${({ correct }) => (correct ? '#AAD775' : '#eee')};
  color: ${({ correct }) => (correct ? '#fff' : '#999')};
  padding: 1.5rem 1.25rem 1.5rem 1.75rem;
  border-radius: 30px 0px 30px 30px;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  cursor: pointer;
  button {
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    border: none;
    color: ${({ correct }) => (correct ? '#fff' : '#999')};
  }
  #check-icon {
    color: #aad775;
    position: absolute;
    left: -40px;
  }
`;
const TextChoiceAddContainer = styled(TextChoiceBubble)`
  input {
    color: #ffa5aa;
    background-color: transparent;
    font-size: 1rem;
    width: 100%;
    border: none;
  }
  background-color: #fff6f7;
  border: dashed 1px #ffa5aa;
  cursor: none;
  button {
    color: #ffa5aa;
  }
`;
const InfoContainer = styled.div`
  font-size: 14px;
  color: #999;
  text-align: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;
const ImgChoiceBubble = styled(TextChoiceBubble)`
  padding: 1rem;
`;
const ImgChoiceListContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 10px;
  grid-row-gap: 10px;
`;
const ImgInputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff6f7;
  border: dashed 1px #ffa5aa;
  border-radius: 1rem;
  height: 150px;
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
const ImgWrapper = styled.div<CorrectProps>`
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
    border: ${({ correct }) => (correct ? 'solid 3px #AAD775' : 'none')};
  }
  #delete-btn {
    display: flex;
    position: absolute;
    width: 25px;
    height: 25px;
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
/* 퀴즈 완성 버튼 디자인 */
const CompleteButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 0.5rem;
  button {
    border: none;
    border-radius: 30px;
    background-color: #ff4d57;
    box-shadow: 0 4px #c4363e;
    color: #fff;
    font-weight: bold;
    width: 60%;
    height: 60px;
    font-size: 18px;
    &:disabled {
      cursor: not-allowed;
      border: none;
      color: #7c7c7c;
      background-color: #ececec;
      box-shadow: 0 4px lightgrey;
    }
  }
`;
export default Page;
