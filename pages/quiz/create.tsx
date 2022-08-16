import { ReactElement, ChangeEvent, useState, useEffect } from 'react';
import styled from 'styled-components';
import type { NextPageWithLayout } from 'pages/_app';
import { AppLayout } from 'components/layout';
import useInput from 'hooks/useInput';
import { Button } from 'components/common';
import { useDispatch, useSelector } from 'react-redux';
import { saveProblemsAction } from 'store/quiz';
import { RootState } from 'store';
import { IoDice } from 'react-icons/io5';
import data from "data/question.json"

const Page: NextPageWithLayout = () => {
  const { problems } = useSelector((state: RootState) => state.quiz);
  const dispatch = useDispatch();
  const [problemCount, setProblemCount] = useState<number>(0); // 0부터 문제 개수 카운트. 9까지
  type choice = 'img' | 'text'; // 리터럴 타입
  const [problemTitle, setProblemTitle, problemTitleClear, problemTitleHandler] = useInput<string>('');
  const [choiceType, setChoiceType, choiceTypeClear, choiceTypeHandler] = useInput<choice>('text'); // 텍스트 타입이 기본

  const [choices, setChoices] = useState<any[]>([]); // 임시 any

  const [choiceText, , choiceTextClear, choiceTextHandler] = useInput<string>('');

  const randomProblemTitle = () => {
    const randomTitle = (data.questions[Math.floor(Math.random() * data.questions.length)]);
    setProblemTitle(randomTitle)
  }
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
      {problemCount !== 0 && <Button onClick={prevProblemLoad}>이전 문제 수정</Button>}
      {problemCount < 9 && <Button onClick={saveProblem}>저장하고 다음으로</Button>}
    </Wrapper>
  );
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
Page.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};
export default Page;
