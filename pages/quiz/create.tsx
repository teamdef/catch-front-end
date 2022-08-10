import { ReactElement, ChangeEvent, useState, useEffect } from 'react';
import styled from 'styled-components';
import type { NextPageWithLayout } from 'pages/_app';
import { AppLayout } from 'components/layout';
import useInput from 'hooks/useInput';
import { Button } from 'components/common';
import { useDispatch, useSelector } from 'react-redux';
import { saveProblemsAction } from 'store/quiz';
import { RootState } from 'store';
import {BiPlusCircle,BiMinusCircle} from 'react-icons/bi';
import { IoDice } from 'react-icons/io5';
import data from 'data/question.json';

const Page: NextPageWithLayout = () => {
  const { problems } = useSelector((state: RootState) => state.quiz);
  const dispatch = useDispatch();
  const [warning, setWarning] = useState<Boolean>(false);
  const [problemCount, setProblemCount] = useState<number>(0); // 0부터 문제 개수 카운트. 9까지
  type choice = 'img' | 'text'; // 리터럴 타입
  const [problemTitle, setProblemTitle, problemTitleClear, problemTitleHandler] = useInput<string>('');
  const [choiceType, setChoiceType, choiceTypeClear, choiceTypeHandler] = useInput<choice>('text'); // 텍스트 타입이 기본

  const [choices, setChoices] = useState<any[]>([]); // 임시 any

  const [choiceText, , choiceTextClear, choiceTextHandler] = useInput<string>('');

  const randomProblemTitle = () => {
    const randomTitle = data.questions[Math.floor(Math.random() * data.questions.length)];
    setProblemTitle(randomTitle);
  };
  const choiceAdd = () => {
    if (choiceText === '') {
      setWarning(true);
      return;
    }
    setWarning(false);
    setChoices([...choices, choiceText]);
    choiceTextClear(); // 초기화
  };
  const choiceDelete = (index: number) => {
    let temp = [...choices];
    temp.splice(index, 1);
    setWarning(false);
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
      <header className="quiz-title">
        <div id="quiz-count">
          <em id="current">{problemCount + 1}</em>
          {' / '}
          <em id="total">{problems.length + 1}</em>
        </div>
        Q.
        <input
          id="input-title"
          type="text"
          value={problemTitle}
          onChange={problemTitleHandler}
          placeholder="질문 입력.."
        />
        <button id="random" onClick={randomProblemTitle}>
          <IoDice size={30} color={'#7a7a7a'} />
        </button>
      </header>
      <div className="quiz-main">
        <div id="type">
          <input
            className="choice-type"
            type="radio"
            name="choice"
            id="choice-text"
            value="text"
            onChange={choiceTypeHandler}
            checked={choiceType === 'text'}
          />
          <label htmlFor="choice-text">텍스트</label>
          <input
            className="choice-type"
            type="radio"
            name="choice"
            id="choice-img"
            value="img"
            onChange={choiceTypeHandler}
            checked={choiceType === 'img'}
          />
          <label htmlFor="choice-img">이미지</label>
        </div>
        <div>
          <div>
            <ul>
              {choices.map((item, index) => {
                return (
                  <li key={index} className="choice-item">
                      <strong>{`${index + 1}.`}</strong>
                      {item}
                    <BiMinusCircle size="30" color="red"
                      onClick={() => {
                        choiceDelete(index);
                      }}
                    >
                    </BiMinusCircle>
                  </li>
                );
              })}
            </ul>
          </div>
          {choices.length < 4 && (
            <div>
              <div className="input-area">
                <BiPlusCircle onClick={choiceAdd}
                size="30" color="blue">
                </BiPlusCircle>
                <input
                  id="input-text"
                  type="text"
                  placeholder="항목 입력.."
                  value={choiceText}
                  onChange={choiceTextHandler}
                />
              </div>
              <p className={`${warning ? 'active' : ''}`}>항목을 입력하세요 !</p>
            </div>
          )}
        </div>
      </div>
      <footer className="footer">
        {problemCount !== 0 && <Button onClick={prevProblemLoad}>이전 문제 수정</Button>}
        {problemCount < 9 && <Button onClick={saveProblem}>저장하고 다음으로</Button>}
      </footer>
    </Wrapper>
  );
};

// 기능 가시성을 위한 임시 디자인
const Wrapper = styled.div`
  height: 100vh;
  .quiz-title {
    position: relative;
    padding-top: 5%;
    display: block;
    text-align: center;
    height: 30%;
    background-color: #ffde6d;
    border-bottom-left-radius: 30%;
    border-bottom-right-radius: 30%;
    font-weight: bold;
    #quiz-count {
      text-decoration: none;
      font-size: 2rem;
      margin-bottom: 5%;
      color: #999;
      em {
        font-style: normal;
        font-weight: bold;
      }
      #current {
        color: #000;
      }
      #total {
        color: #fff;
      }
    }
    #input-title {
      position: relative;
      display: block;
      margin: 0 auto;
      background-color: transparent;
      border: none;
      width: 70%;
      padding: 10px 0;
      font-size: 1.2rem;
      text-align: center;
    }
    #random {
      margin: 0 auto;
      margin-top: 3%;
      position: relative;
      padding: 0;
      background-color: transparent;
      border: none;
      color: #7a7a7a;
      display: block;
    }
  }
  .quiz-main {
    margin-top: 10%;
    text-align: center;
    #type {
      >* {
        margin: 0 10px;
      }
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      .choice-type {
        width: 30px;
        height: 30px;
      }
      label {
        font-size: 1.5rem;
      }
    }
    .input-area {
      position:relative;
      display: block;
      margin: 0 auto;
      background-color: #dabbfe;
      border: 0;
      font-size: 16px;
      max-width: 300px;
      width: 70%;
      padding: 15px 30px;
      border-radius: 20px;
      #input-text {
        width: 100%;
        background: none;
        border: none;
      }
      svg {
        position: absolute;
        background: none;
        top: 50%;
        transform: translateY(-50%);
        left: -40px;
        font-size: 1rem;
      }
    }
    
    ul {
      padding: 0;
      margin-top: 10%;
      .choice-item {
        position: relative;
        margin: 0 auto;
        margin-bottom: 20px;
        max-width: 300px;
        width: 70%;
        padding: 15px 30px;
        border-radius: 20px;
        background-color: #ffde6d;
        list-style: none;
        strong {
          position: absolute;
          left: 30px;
        }
        svg {
          position: absolute;
          background: none;
          top: 50%;
          transform: translateY(-50%);
          left: -40px;
          font-size: 1rem;
        }
      }
    }

    p {
      visibility: hidden;
      opacity: 0;
      color: red;
      font-weight: bold;
      transition: opacity 0.3s;
      &.active {
        visibility: visible;
        opacity: 1;
      }
    }
  }
  .footer {
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    bottom: 5%;
    display: block;
    button {
      background-color: #ffde6d;
      padding: 15px 30px;
    }
  }
`;
Page.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};
export default Page;
