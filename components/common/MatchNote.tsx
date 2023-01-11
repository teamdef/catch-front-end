import styled from 'styled-components';
import { RootState } from 'store';
import { useSelector } from 'react-redux';
import { MainButton } from 'styles/common';
import { useRouter } from 'next/router';

const MatchNote = ({ setOpenMatch }: any) => {
  const router = useRouter();
  const { solveAnswers, solveProblems, problemSetId } = useSelector((state: RootState) => state.solve);
  console.log(solveAnswers);
  return (
    <MatchEl>
      <h1>오답노트</h1>
      {solveProblems.map((item: any, i: number) => {
        return (
          <QuizSolveCard key={i} className={solveAnswers[i] != 'catch' ? 'wrong' : ''}>
            <CardNumber>{i + 1}</CardNumber>
            <CardTitle>{item.prob_title}</CardTitle>
            {item.is_img ? (
              <ChoiceWrapper id="choice-img-wrapper">
                {item.choices.map((_choice: any, j: number) => (
                  <ChoiceItem
                    key={j}
                    className={`choice-img-item ${item.correct_choice == _choice.id ? 'correct' : ''}`}
                    id={_choice.id == solveAnswers[i] ? 'my-answer' : ''}
                  >
                    <img src={_choice.cho_img} />
                  </ChoiceItem>
                ))}
              </ChoiceWrapper>
            ) : (
              <ChoiceWrapper>
                {item.choices.map((_choice: any, j: number) => (
                  <ChoiceItem
                    key={j}
                    className={`choice-txt-item ${item.correct_choice == _choice.id ? 'correct' : ''}`}
                    id={_choice.id == solveAnswers[i] ? 'my-answer' : ''}
                  >
                    <div id={_choice.id}>
                      <span>{_choice.cho_txt}</span>
                      {item.correct_choice == _choice.id ? <span>정답</span> : ''}
                    </div>
                  </ChoiceItem>
                ))}
              </ChoiceWrapper>
            )}
          </QuizSolveCard>
        );
      })}
      <MatchBottom>
        <MainButton onClick={() => router.push(`/quiz/solve/${problemSetId}`)}>다시 풀기</MainButton>
        <MainButton onClick={() => setOpenMatch(false)}>닫기</MainButton>
      </MatchBottom>
    </MatchEl>
  );
};

const MatchEl = styled.div`
  position: absolute;
  top: 0;
  display: block;
  width: 100%;
  min-height: 100vh;
  background-color: #fff;
  z-index: 2;
  text-align: center;
  h1 {
    position: relative;
    display: inline-block;
    font-family: 'RixInooAriDuriR';
    color: #ff4d57;
    text-align: center;
    font-size: 1.6rem;
    &::before {
      content: '';
      position: absolute;
      display: block;
      bottom: 0;
      width: 100%;
      height: 6px;
      border-radius: 3px;
      background-color: #91ce61;
    }
  }
`;
const QuizSolveCard = styled.div`
  position: relative;
  width: 100%;
  border: 1px solid #ffcaca;
  border-radius: 1.4rem;
  background-color: white;
  opacity: 0.6;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  margin-top:2rem;
  &.wrong {
    opacity: 1;
  }
`;
const CardNumber = styled.span`
  position: absolute;
  left: 4%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 14px;
  width: 34px;
  height: 50px;
  border: solid 17px #ffa5aa;
  border-bottom: solid 10px #fff;
  background-color: #fff;
  font-weight: bold;
  font-size: 1.2rem;
  color: #fff;
`;

const CardTitle = styled.h2`
  text-align: center;
  font-weight: normal;
  word-break: keep-all;
  color: #6a5050;
  font-family: 'Noto Sans KR';
  width: 80%;
  font-size: 1.3rem;
  margin: 4rem auto 1rem auto;
`;
const ChoiceWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  gap: .5rem;
  padding: 0 4%;
  margin: 10% 0;
  &#choice-img-wrapper {
    display: grid;
    grid-template-columns: repeat(2, calc(50% - .25rem));
    grid-template-rows: repeat(2, 150px);
  }
`;
const ChoiceItem = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 60px;
  padding-left: 35px;
  align-items: center;
  border-radius: 30px;
  background-color: #f4f4f4;
  &.choice-img-item {
    width: 100%;
    height: 100%;
    padding: 0;
    border-radius: 1rem;
    overflow: hidden;
    &#my-answer {
      &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: block;
        width: 5rem;
        height: 5rem;
        background: url('/assets/img/wrong_check.png') center no-repeat;
        background-size: cover;
        z-index: 1;
      }
      &::after {
        content: '';
        position: absolute;
        display: block;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #ffa5aa;
        opacity: 0.5;
      }
    }
    &.correct {
      &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: block;
        width: 5rem;
        height: 5rem;
        background: url('/assets/img/circle.png') center no-repeat;
        background-size: cover;
        z-index: 1;
      }
      &::after {
        content: '';
        position: absolute;
        display: block;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #aad775;
        opacity: 0.5;
      }
    }
    img {
      position: relative;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  &.choice-txt-item {
    &.correct {
      background-color: #aad775 !important;
      color: #244E10 !important;
      font-weight: bold;
      span + span {
        position: absolute;
        right: 3%;
      }
    }
    &#my-answer {
      background-color:#ffa5aa;
      color: #DA4343;
      font-weight: bold;
    }
  }
`;
const MatchBottom = styled.div`
  position: relative;
  display: flex;
  padding-bottom: 1rem;
  margin-top: 4rem;
  gap: .5rem;
  button {
    width: 50%;
  }
`;
export default MatchNote;
