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

const Page: NextPageWithLayout = () => {
  const { problems } = useSelector((state: RootState) => state.quiz);
  const dispatch = useDispatch();
  const [problemCount, setProblemCount] = useState<number>(0); // 0부터 문제 개수 카운트. 9까지
  type choice = 'img' | 'text'; // 리터럴 타입
  const [problemTitle, setProblemTitle, problemTitleClear, problemTitleHandler] = useInput<string>('');
  const [choiceType, setChoiceType, choiceTypeClear, choiceTypeHandler] = useInput<choice>('text'); // 텍스트 타입이 기본

  const [choices, setChoices] = useState<any[]>([]); // 임시 any , 텍스트 객관식 답안 리스트
  const [choicesThumbnail, setChoicesThumbnail] = useState<string[]>([]); // 이미지 객관식 답안 썸네일 리스트

  const [choiceText, , choiceTextClear, choiceTextHandler] = useInput<string>(''); // 텍스트 객관식 input 관리
  const randomProblemTitle = () => {
    const randomTitle = data.questions[Math.floor(Math.random() * data.questions.length)];
    setProblemTitle(randomTitle);
  };
  const choiceAdd = () => {
    if (choiceText === '') {
      alert('값을 입력하세요');
      return;
    }
    setChoices([...choices, choiceText]);
    choiceTextClear(); // 초기화
  };
  const choiceDelete = (index: number) => {
    let temp = [...choices];
    temp.splice(index, 1);
    setChoices(temp);
  };
  const prevProblemLoad = () => {
    setProblemCount(problemCount - 1);
  };
  const saveProblem = () => {
    if (choices.length < 2) {
      alert('객관식 보기 답안을 2개 이상 작성해주세요.');
      return;
    }
    if (problemTitle === '') {
      alert('문제 제목을 작성해주세요.');
      return;
    }
    let temp = [...problems];
    temp[problemCount] = { problemTitle, choiceType, choices };
    dispatch(saveProblemsAction({ problems: temp }));
    setProblemCount(problemCount + 1);
    resetProblem();
  };

  const resetProblem = () => {
    problemTitleClear(); // 문제 제목 초기화
    choiceTextClear(); // 답안 입력란 초기화
    choiceTypeClear(); // 문제 유형 초기화
    setChoices([]); // 문제 답안 목록 초기화
  };

  // 이미지 압축을 위한 옵션
  const options = {
    maxSizeMB: 1, // 원본 이미지 최대 용량
    maxWidthOrHeight: 300, // 리사이즈 이미지 최대 width를 100px로 설정
    //useWebWorker: true, // 이미지 변환 작업 다중 스레드 사용 여부
    fileType: 'images/*', // 파일 타입
  };

  // 이미지 onChange 이벤트 처리 함수
  const onImgChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files as FileList; // 입력 받은 파일 리스트

    let thumbnailList: string[] = [];
    let compressedImgList: File[] = [];

    if (files && files[0]) {
      // 이미지가 있을 경우
      if (files.length > 4) {
        alert('이미지는 최대 4장까지 업로드 가능합니다');
        return;
      }
      for (let i = 0; i < files.length; i++) {
        try {
          // 이미지 압축 과정
          const compressedImg = (await imageCompression(files[i], options)) as File;
          compressedImgList.push(compressedImg);

          // resize된 이미지의 url을 생성 및 저장
          const compressedImgUrl = await imageCompression.getDataUrlFromFile(compressedImg);
          thumbnailList.push(compressedImgUrl);
        } catch (e) {
          console.log(e);
        }
      }
      setChoicesThumbnail(thumbnailList);
      console.log(compressedImgList);
    }
  };

  useEffect(() => {
    if (problems.length !== 0 && !!problems[problemCount]) {
      console.log(problems[problemCount]);
      setChoiceType(problems[problemCount].choiceType);
      setProblemTitle(problems[problemCount].problemTitle);
      setChoices(problems[problemCount].choices);
    }
  }, [problemCount]);
  return (
    <Wrapper>
      <div>
        <strong>
          {problemCount + 1}/{problems.length + 1}
        </strong>
      </div>
      <strong>문제 제목</strong>
      <div>
        <input type="text" value={problemTitle} onChange={problemTitleHandler} placeholder="문제 제목을 입력하세요" />
        <button onClick={randomProblemTitle}>
          <IoDice size={20} />
        </button>
      </div>
      <strong>문제 유형</strong>
      <div>
        <input
          type="radio"
          name="choice"
          id="choice_text"
          value="text"
          onChange={choiceTypeHandler}
          checked={choiceType === 'text'}
        />
        <label htmlFor="choice_text">텍스트</label>
        <input
          type="radio"
          name="choice"
          id="choice_img"
          value="img"
          onChange={choiceTypeHandler}
          checked={choiceType === 'img'}
        />
        <label htmlFor="choice_img">이미지</label>
      </div>
      {choiceType === 'text' && (
        <>
          <strong>객관식 답안 작성</strong>
          <div>
            <div>
              <ul>
                {choices.map((item, index) => {
                  return (
                    <li key={index}>
                      {item}
                      <Button
                        onClick={() => {
                          choiceDelete(index);
                        }}
                      >
                        삭제
                      </Button>
                    </li>
                  );
                })}
              </ul>
            </div>
            {choices.length < 4 && (
              <div>
                <input
                  id="input-text"
                  type="text"
                  placeholder="답안 작성"
                  value={choiceText}
                  onChange={choiceTextHandler}
                />
                <Button onClick={choiceAdd}>추가</Button>
              </div>
            )}
          </div>
        </>
      )}
      {choiceType === 'img' && (
        <>
          <strong>이미지 답안 작성</strong>
          <div>
            <input type="file" accept="image/*" multiple onChange={onImgChange} />
            <ImageChoicesContainer>
              {choicesThumbnail.map((item, index) => {
                return (
                  <ImageWrapper>
                    <img alt="미리보기" src={item} />
                  </ImageWrapper>
                );
              })}
            </ImageChoicesContainer>
          </div>
        </>
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
  strong {
    font-size: 20px;
  }
  & > div {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
`;

const ImageChoicesContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;
const ImageWrapper = styled.div`
  width: 100%;
  height: 200px;
  padding: 1rem;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 1rem;
  }
`;
export default Page;
