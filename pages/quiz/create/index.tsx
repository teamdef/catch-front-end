/* react, next 관련 */
import { ReactElement, ChangeEvent, useEffect, useState, useCallback, KeyboardEvent } from 'react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import type { NextPageWithLayout } from 'pages/_app';
import { useModal, useInput } from 'hooks';
import { useRouter } from 'next/router';
/* redux 관련 */
import { useDispatch, useSelector } from 'react-redux';
import { saveProblemsAction, saveProblemSetTitleAction, saveProblemDescriptionAction } from 'store/quiz';
import { RootState } from 'store';
/* 라이브러리 */
import imageCompression from 'browser-image-compression'; // 이미지 최적화용
/* 통신 */
import { AxiosResponse } from 'axios';
import { QuizUploadApi } from 'pages/api/quiz';
/* 컴포넌트 */
import { Logo, Loading } from 'components/common';
import { AppLayout } from 'components/layout';
/* 스타일 코드 */
import * as S from 'styles/quiz/create/index.style';
import { MainButton } from 'styles/common';
/* react-icons */
import { MdClear, MdOutlineAdd, MdClose, MdPhotoCamera } from 'react-icons/md';
import { VscChromeClose } from 'react-icons/vsc';
import { AiFillCamera } from 'react-icons/ai';

export const getServerSideProps: GetServerSideProps = async ({ req, res, params }: GetServerSidePropsContext) => {
  // 클라이언트는 여러 대지만 서버는 한대이기 때문에 서버 사용한 쿠키는 반드시 제거해 줘야 한다
  const cookie = req ? req?.headers?.cookie : null;
  if (cookie) {
    let match = cookie.match(new RegExp('(^| )' + 'access_token' + '=([^;]+)'));
    // 쿠키가 적용되어 있다면 (로그인 상태라면)
    if (!!match === false) {
      res.statusCode = 302;
      res.setHeader('Location', `/`);
      res.end();
    }
  } else {
    res.statusCode = 302;
    res.setHeader('Location', `/`);
    res.end();
  }
  return { props: {} };
};



const Page: NextPageWithLayout = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false); // 로딩중 표시

  const { setTitle, problems, description } = useSelector((state: RootState) => state.quiz);
  const { id } = useSelector((state: RootState) => state.user);

  /* 페이지 렌더링 용 input 핸들러 및 state */
  const [title, titleSetter, titleClear, titleHandler] = useInput<string>('');
  const [problemList, setProblemList] = useState<ProblemTypes[]>([]); // 문제 저장 배열
  const [textChoiceInput, , textChoiceInputClear, textChoiceInputHandler] = useInput<string>(''); // 객관식 텍스트 답안 전용 input 핸들러
  const [_description, _setDescription] = useState<string>('');

  /* 모달 관리 */
  const [open제작중있음Modal, , Render제작중있음Modal] = useModal({
    yesTitle: '이어서',
    noTitle: '새롭게',
    noAction: () => {
      resetLocalProblemSet();
    },
    contents: (
      <div>
        <div>
          제작하던 <strong style={{ color: '#ff4d57' }}>{setTitle}</strong>
          <br />
          퀴즈 세트가 있습니다
        </div>
        <div style={{ marginTop: '10px', fontSize: '12px', color: '#999' }}>이어서 제작하시겠습니까?</div>
      </div>
    ),
  });

  // 퀴즈 세트 설명 textarea 핸들러
  const _descriptionHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > 100) {
      return false;
    } else {
      _setDescription(e.target.value);
    }
  };

  // redux store 자체를 초기화
  const resetReduxProblemSet = () => {
    dispatch(saveProblemDescriptionAction({ description: '' })); // 설명 저장
    dispatch(saveProblemSetTitleAction({ setTitle: '' })); // 제목 저장
    dispatch(saveProblemsAction({ problems: [] })); // 빈 배열로 초기화
  };

  const resetLocalProblemSet = () => {
    _setDescription('');
    setProblemList([]);
    titleClear();
  };

  // 새로운 퀴즈 문항 추가 함수
  const createProblem = () => {
    const obj: ProblemTypes = {
      problemTitle: '',
      problemImage: undefined,
      choiceType: 'text',
      choices: [],
      correctIndex: 0,
    };
    //prev => [...prev, obj]
    setProblemList((prev) => [...prev, obj]);
  };
  // 퀴즈 문항 삭제 함수
  const deleteProblem = useCallback(
    (problemIndex: number) => {
      let temp = [...problemList];
      temp.splice(problemIndex, 1);
      setProblemList(temp);
    },
    [problemList],
  );

  // 문제 정보를 변경하는 함수
  const onChangeProblem = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    const problem = { ...problemList[index], [name]: value };
    let temp = [...problemList];
    temp[index] = problem;
    setProblemList(temp);
  };

  // 객관식 답안 타입 변경 함수
  const setChoiceType = (problemIndex: number, choiceType: 'img' | 'text') => {
    console.log(problemIndex);
    let temp = JSON.parse(JSON.stringify(problemList));
    if (problemList[problemIndex].choices.length !== 0) {
      if (choiceType === 'img') {
        temp[problemIndex].choices = [] as ChoiceImageTypes[];
      } else {
        temp[problemIndex].choices = [] as ChoiceTextTypes[];
      }
    }
    temp[problemIndex].choiceType = choiceType;
    temp[problemIndex].correctIndex = 0;
    setProblemList(temp);
  };

  // 텍스트 답안 추가
  const addChoiceText = (problemIndex: number) => {
    if (textChoiceInput === '') {
      alert('빈 값은 추가할 수 없습니다.');
    } else {
      let temp = JSON.parse(JSON.stringify(problemList));
      temp[problemIndex].choices.push(textChoiceInput);
      setProblemList(temp);
      textChoiceInputClear();
    }
  };
  // 정답 체크
  const setCorrectIndex = (problemIndex: number, choiceIndex: number) => {
    let temp = JSON.parse(JSON.stringify(problemList));
    temp[problemIndex].correctIndex = choiceIndex;
    setProblemList(temp);
  };

  // 이미지 압축을 위한 옵션
  const options = {
    maxSizeMB: 1, // 원본 이미지 최대 용량
    maxWidthOrHeight: 300, // 리사이즈 이미지 최대 width를 300px로 설정
    //useWebWorker: true, // 이미지 변환 작업 다중 스레드 사용 여부
    fileType: 'images/*', // 파일 타입
  };

  // 랜덤 문자열 생성 함수
  const randomString = (len: number): string => {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; // 중복의 여지가 있긴 함.
    for (let i = 0; i < len; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));
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
  const ReturnFileByImageSize = async (img: HTMLImageElement, file: File): Promise<ChoiceImageTypes> => {
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
    let _fileArray = Array.from(_files);
    return _fileArray.map(async (file) => {
      const _imgElement = await loadImage(_URL.createObjectURL(file)); // 이미지 element 구하기
      const _thumbnail = await ReturnFileByImageSize(_imgElement, file); // 이미지 파일 url 저장
      return _thumbnail;
    });
  };
  // 퀴즈 객관식 이미지 onChange 이벤트 처리 함수
  const onChoiceImgChange = async (e: ChangeEvent<HTMLInputElement>, problemIndex: number) => {
    const files = e.target.files as FileList; // 입력 받은 파일 리스트

    // 이미지가 있을 경우
    if (files && files[0]) {
      // 기존에 업로드 된 이미지와 새로 업로드 할 이미지의 총 합이 4개 이하
      if (files.length + problemList[problemIndex].choices.length > 4) {
        alert('이미지는 최대 4장까지 업로드 가능합니다');
        return;
      }
      const _imgFileTaskList = FileListToImageObject(files);
      // Promise.all 의 응답값은 filelist의 file객체를 모두 ChoiceImageTypes 타입으로 변경한 것
      Promise.all(_imgFileTaskList).then((res) => {
        const _choicesImgThumbnail = res;
        let temp = JSON.parse(JSON.stringify(problemList));
        let _choices = [...temp[problemIndex].choices, ..._choicesImgThumbnail];
        temp[problemIndex].choices = _choices;
        setProblemList(temp);
        e.target.value = '';
      });
    }
  };

  // 퀴즈 설명 이미지 onChange 이벤트 처리 함수
  const onQuizImageChange = async (e: ChangeEvent<HTMLInputElement>, problemIndex: number) => {
    const files = e.target.files as FileList; // 입력 받은 파일 리스트
    const _URL = window.URL || window.webkitURL;
    // 이미지가 있을 경우
    if (files && files[0]) {
      const _quizImageFile = files[0];
      const _imgElement = await loadImage(_URL.createObjectURL(_quizImageFile)); // 이미지 element 구하기
      const _thumbnail = await ReturnFileByImageSize(_imgElement, _quizImageFile); // 이미지 파일 url 저장
      let temp = JSON.parse(JSON.stringify(problemList));
      temp[problemIndex].problemImage = _thumbnail;
      setProblemList(temp);
      e.target.value = '';
    }
  };

  const deleteQuizImage = (problemIndex: number) => {
    let temp = JSON.parse(JSON.stringify(problemList));
    temp[problemIndex].problemImage = undefined;
    setProblemList(temp);
  };
  // 답안 항목 삭제
  const deleteChoice = (problemIndex: number, choiceIndex: number) => {
    let temp = JSON.parse(JSON.stringify(problemList));
    temp[problemIndex].choices.splice(choiceIndex, 1);
    if (temp[problemIndex].correctIndex > temp[problemIndex].choices.length - 1) {
      temp[problemIndex].correctIndex = 0;
    }
    setProblemList(temp);
  };

  // 엔터키 클릭시 답안 등록
  const onKeyDown = (e: KeyboardEvent<HTMLElement>, problemIndex: number): void => {
    if (e.key === 'Enter') addChoiceText(problemIndex);
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
      QuizUploadApi(problemList, id, setTitle, description).then((res: AxiosResponse) => {
        resetReduxProblemSet(); // 문제집 redux 초기화
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
    } else {
      alert(
        `퀴즈 세트 저장 조건이 맞지 않습니다. 다시 확인 바랍니다! \r\n (퀴즈 제목 작성 및 답안 2개 이상 작성 필수) `,
      );
    }
  };

  // 기존에 제작하던 퀴즈 세트의 유무를 확인하고 팝업을 띄운다.
  useEffect(() => {
    if (problems.length !== 0) {
      // 제작 중이던 문제가 있을 경우
      open제작중있음Modal();
    }
    if (problems) {
      setProblemList(problems);
    }
    titleSetter(setTitle); // 퀴즈 세트 제목 세팅
    _setDescription(description); // 퀴즈 세트 설명 세팅
  }, []);

  // 퀴즈 세트 제목 변경 사항 바로 redux에 저장
  useEffect(() => {
    dispatch(saveProblemSetTitleAction({ setTitle: title }));
  }, [title]);
  // 퀴즈 세트 설명 변경 사항 바로 redux에 저장
  useEffect(() => {
    dispatch(saveProblemDescriptionAction({ description: _description }));
  }, [_description]);
  // 퀴즈 세트 문항 변경 사항 바로 redux에 저장
  useEffect(() => {
    dispatch(saveProblemsAction({ problems: problemList }));
  }, [problemList]);

  return (
    <>
      {loading && <Loading ment={'퀴즈 세트를 저장하고 있습니다!'} />}
      <S.Wrapper>
        <S.TitleContainer>
          <div id="logo-wrapper">
            <Logo color={'#fff'} />
          </div>
          <div id="title-input-wrapper">
            <S.TitleInput>
              <input
                type="text"
                placeholder="제목을 입력해주세요! (최대20자)"
                value={title}
                onChange={titleHandler}
                maxLength={20}
              />
              <button id="clear-btn" onClick={titleClear} disabled={title === ''}>
                <MdClear size={20} />
              </button>
            </S.TitleInput>
          </div>
          <div id="description-input-wrapper">
            <div id="title">퀴즈에 대한 설명을 적어보세요! ({_description.length}/100)</div>
            <textarea value={_description} onChange={_descriptionHandler} id="description-textarea"></textarea>
          </div>
        </S.TitleContainer>
        <S.QuizCreateContainer>
          {problemList.map((problem, problemIndex) => {
            return (
              <S.QuizCreateCard>
                <S.CardNumber>{problemIndex + 1}</S.CardNumber>
                <button
                  id="quiz-delete-btn"
                  onClick={() => {
                    deleteProblem(problemIndex);
                  }}
                >
                  <MdClose size={28} />
                </button>
                <S.QuizTitleInput
                  type="text"
                  placeholder="퀴즈 제목을 입력해주세요!"
                  value={problem.problemTitle}
                  name="problemTitle"
                  autoComplete="off"
                  onChange={(e) => {
                    onChangeProblem(e, problemIndex);
                  }}
                />
                <S.QuizImageWrapper>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      onQuizImageChange(e, problemIndex);
                    }}
                    id={`quiz-image-input-${problemIndex}`}
                    name={`quiz-image-input-${problemIndex}`}
                  />
                  <label htmlFor={`quiz-image-input-${problemIndex}`}>
                    {problem.problemImage ? (
                      <>
                        <S.DeleteButton
                          onClick={(e) => {
                            e.preventDefault();
                            deleteQuizImage(problemIndex);
                          }}
                        >
                          <MdClose />
                        </S.DeleteButton>
                        <img src={problem.problemImage.imgURL} />
                      </>
                    ) : (
                      <S.QuizImageUpload>
                        <MdPhotoCamera size={40} />
                        <p>보기 이미지 추가하기 + </p>
                        <p>(선택사항)</p>
                      </S.QuizImageUpload>
                    )}
                  </label>
                </S.QuizImageWrapper>
                <S.QuizChoiceTypeRadio>
                  <input
                    id={`choiceType-text-${problemIndex}`}
                    checked={problem.choiceType === 'text'}
                    type="radio"
                    name={`choiceType-${problemIndex}`}
                    value="text"
                    onChange={() => {
                      setChoiceType(problemIndex, 'text');
                    }}
                  />
                  <label htmlFor={`choiceType-text-${problemIndex}`}>텍스트</label>
                  <input
                    id={`choiceType-img-${problemIndex}`}
                    checked={problem.choiceType === 'img'}
                    type="radio"
                    name={`choiceType-${problemIndex}`}
                    value="img"
                    onChange={() => {
                      setChoiceType(problemIndex, 'img');
                    }}
                  />
                  <label htmlFor={`choiceType-img-${problemIndex}`}>이미지</label>
                </S.QuizChoiceTypeRadio>
                {problem.choiceType === 'text' && (
                  <S.TextChoiceContainer>
                    <S.TextChoiceList>
                      {problem.choices.map((item: any, choiceIndex: number) => {
                        return (
                          <S.TextChoiceItem
                            correct={problem.correctIndex === choiceIndex}
                            key={`${problem.choiceType} ${problemIndex + choiceIndex}`}
                            onClick={() => {
                              setCorrectIndex(problemIndex, choiceIndex);
                            }}
                          >
                            <div>{item}</div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteChoice(problemIndex, choiceIndex);
                              }}
                            >
                              <VscChromeClose size={20} />
                            </button>
                          </S.TextChoiceItem>
                        );
                      })}
                    </S.TextChoiceList>
                    {problem.choices.length < 4 && (
                      <S.TextChoiceCreateBtn>
                        <input
                          type="text"
                          placeholder={'객관식 답안을 입력해주세요!'}
                          autoComplete="off"
                          maxLength={30}
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
                          <MdOutlineAdd size={20} />
                        </button>
                      </S.TextChoiceCreateBtn>
                    )}
                  </S.TextChoiceContainer>
                )}
                {problem.choiceType === 'img' && (
                  <S.ImgChoiceContainer>
                    <S.ImgChoiceListContainer>
                      {problem.choices.map((item: any, choiceIndex: number) => {
                        return (
                          <S.ImgWrapper
                            correct={problem.correctIndex === choiceIndex}
                            key={`${problem.choiceType} ${problemIndex + choiceIndex}`}
                            onClick={() => {
                              setCorrectIndex(problemIndex, choiceIndex);
                            }}
                          >
                            <img alt="미리보기" src={item.imgURL} />
                            <S.DeleteButton
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteChoice(problemIndex, choiceIndex);
                              }}
                            >
                              <MdClose />
                            </S.DeleteButton>
                          </S.ImgWrapper>
                        );
                      })}
                      {problem.choices.length < 4 && (
                        <S.ImgInputContainer>
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={(e) => {
                              onChoiceImgChange(e, problemIndex);
                            }}
                            id={`choice-image-input-${problemIndex}`}
                            name={`choice-image-input-${problemIndex}`}
                          />
                          <label htmlFor={`choice-image-input-${problemIndex}`}>
                            <AiFillCamera size={30} />
                            <span>이미지추가</span>
                          </label>
                        </S.ImgInputContainer>
                      )}
                    </S.ImgChoiceListContainer>
                  </S.ImgChoiceContainer>
                )}

                <S.InfoContainer>정답을 선택해 주세요</S.InfoContainer>
              </S.QuizCreateCard>
            );
          })}
          <S.QuizCreateBtn onClick={createProblem}>
            <span>새 퀴즈 추가</span>
            <MdOutlineAdd size={20} />
          </S.QuizCreateBtn>
        </S.QuizCreateContainer>
        <S.ButtonContainer>
          <MainButton onClick={publicationProblemSet} disabled={title === ''}>
            퀴즈 생성 완료
          </MainButton>
        </S.ButtonContainer>
      </S.Wrapper>
      <Render제작중있음Modal />
    </>
  );
};
Page.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};

export default Page;
