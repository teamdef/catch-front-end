import { ReactElement, ChangeEvent, useState, useEffect } from 'react';
import styled from 'styled-components';
import type { NextPageWithLayout } from 'pages/_app';
import { AppLayout } from 'components/layout';
import useInput from 'hooks/useInput';
import { Button } from 'components/common';
import { useDispatch, useSelector } from 'react-redux';
import { saveProblemsAction } from 'store/quiz';
import { RootState } from 'store';
import { IoIosClose, IoIosAdd, IoIosArrowForward } from 'react-icons/io';
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
  // 정답 선택 및 미선택시 return 구현 예정
  return (
    <Wrapper>
      <div className="template">
        <header className="quiz-title">
          <div id="quiz-count"> 
            <em id="current"> {problemCount + 1}</em>
            {' / '}
            <em id="total">10</em>
          </div>
          <div className="input-area">
            <input
              id="input-title"
              spellCheck={false}
              type="text"
              value={problemTitle}
              onChange={problemTitleHandler}
              placeholder="질문 입력.."
            />
          </div>
          <button id="random" onClick={randomProblemTitle}>
            <img src="/assets/img/casino.png"></img>
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
          <div className="answer-area">
            {choices.map((item, index) => {
              return (
                <div className="answer-item" key={index}>
                  <input id={`answer${index}`} name="answer" type="radio" className="answer"/>
                  <label htmlFor={`answer${index}`}>
                    {item}
                    <IoIosClose
                      size="30"
                      color="#fff"
                      onClick={() => {
                        choiceDelete(index);
                      }}
                    ></IoIosClose>
                  </label>
                </div>
              );
            })}
            {choices.length < 4 && (
              <div className="input-answer">
                <IoIosAdd onClick={choiceAdd} size="30" color="#ff4d57"></IoIosAdd>
                <input
                  id="input-text"
                  type="text"
                  placeholder="항목 입력.."
                  value={choiceText}
                  onChange={choiceTextHandler}
                />
              </div>
            )}
          </div>
        </div>
        {problemCount !== 0 && (
          <Button className="footer-btn prev" onClick={prevProblemLoad} fontSize="1.2rem" width={'50%'} height={'60px'}>
            <span>이전 문제 수정</span>
          </Button>
        )}
        {problemCount < 9 && (
          <Button className="footer-btn next" onClick={saveProblem} fontSize="1.2rem" width={'50%'} height={'60px'}>
            <span>
              <IoIosArrowForward />
              다음 문제
            </span>
          </Button>
        )}
      </div>
    </Wrapper>
  );
};

// 기능 가시성을 위한 임시 디자인
const Wrapper = styled.div`
  position: relative;
  padding: 15% 5%;
  height: 100%;
  .template {
    position:relative;
    border-radius: 30px;
    background-color: #fff;
    height: 100%;
    &::before {
      content: '';
      position: absolute;
      top: 10px;
      left: 50%;
      transform: translateX(-50%);
      display: block;
      width: 40px;
      height: 3px;
      background-color: #ccc;
    }
  }
  .quiz-title {
    position: relative;
    padding: 10% 0;
    display: block;
    border-bottom-left-radius: 30%;
    border-bottom-right-radius: 30%;
    font-weight: bold;
    #quiz-count {
      text-decoration: none;
      font-size: 2rem;
      text-align: center;
      margin-bottom: 5%;
      color: #ff4d57;
      em {
        font-style: normal;
        font-weight: bold;
      }
      #current {
        color: #000;
      }
    }
    .input-area {
      position: relative;
      display: inline-block;
      background-color: #eee;
      border-radius: 20px;
      border-top-left-radius: 0;
      padding: 20px 30px;
      width: 75%;
      margin-left: 20px;
    }
    #input-title {
      position: relative;
      display: block;
      background-color: transparent;
      border: none;
      width: 100%;
      border-bottom: 1px solid #ccc;
      font-size: 1rem;
      color: #555;
      &::placeholder {
        color: #aaa;
      }
    }
    #random {
      margin-top: 3%;
      margin-left: 5%;
      position: relative;
      padding: 0;
      background-color: transparent;
      width: 30px;
      height: 30px;
      border: none;
      color: #7a7a7a;
      display: inline-block;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .quiz-main {
    margin-top: 5%;
    text-align: center;
    #type {
      > * {
        margin: 0 10px;
      }
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      .choice-type {
        display: none;
      }
      label {
        padding: 5px 20px;
        color: #ff4d57;
        border: 1px solid #ff4d57;
        border-radius: 30px;
        font-size: 1.2rem;
      }
      .choice-type[type='radio']:checked + label {
        color: #fff;
        background-color: #ff4d57;
      }
    }
    .input-answer {
      position: relative;
      display: block;
      border: 0;
      font-size: 16px;
      max-width: 300px;
      width: 80%;
      padding: 4% 0;
      border-radius: 20px;
      border-top-right-radius: 0;
      border: 1px solid #ff4d57;
      #input-text {
        background: none;
        border: none;
        &::placeholder {
          color: #ff4d57;
        }
      }
      svg {
        position: absolute;
        background: none;
        top: 50%;
        transform: translateY(-50%);
        right: 10px;
        font-size: 1rem;
      }
    }

    .answer-area {
      position: relative;
      padding: 0 5%;
      display: flex;
      align-items: end;
      flex-direction: column;
      margin-top: 10%;
      .answer-item {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: right;
        width: 100%;
        margin-bottom: 20px;
        .answer {
          display: block;
          margin-right: 10px;
          width: 25px;
          height: 25px;
          &[type='radio'] + label {
            position: relative;
            display: inline-block;
            width: 80%;
            padding: 4% 0;
            border-radius: 20px;
            background-color: #ff4d57;
            border-top-right-radius: 0;
            color: #fff;
          }
          &[type='radio']:checked + label {
            background-color: #4aaf4e;
          }
        }
        input[type='radio'] {
          appearance: none;
        }
        input[type='radio']:checked {
          background: url('/assets/img/check.png') no-repeat center;
        }
        svg {
          position: absolute;
          background: none;
          top: 50%;
          transform: translateY(-50%);
          right: 10px;
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

  .footer-btn {
    position: fixed;
    bottom: 4%;
    left: 50%;
    transform: translateX(-50%);
    width: 60%;
    color: #fff;
    background-color: #ff4d57;
    span {
      padding-right: 10%;
    }
    svg {
      position: absolute;
      top: 50%;
      right: 10%;
      transform: translateY(-50%);
      display: block;
    }
  }
`;
Page.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};
export default Page;
