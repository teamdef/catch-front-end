import styled from 'styled-components';
import { RootState } from 'store';
import { useSelector } from 'react-redux';
import { Logo } from 'components/common';
import { MainButton } from 'styles/common';
import { useRouter } from 'next/router';

const MatchNote = ({ setOpenMatch }: any) => {
  const router = useRouter();
  const { solveAnswers, solveProblems, problemSetId } = useSelector((state: RootState) => state.solve);
  return (
    <MatchEl>
      <Logo />
      <h1>오답노트📝</h1>
      {solveProblems.map((item: any, i: number) => {
        return (
          <QuizSolveCard key={i} className={solveAnswers[i] ? 'wrong' : ''}>
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
                    className={`choice-txt-item ${item.correct_answer == _choice.id ? 'correct' : ''}`}
                    id={_choice.id == solveAnswers[i] ? 'my-answer' : ''}
                  >
                    <div id={_choice.id}>
                      <span>{_choice.cho_txt}</span>
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
  padding: 0 5%;
  padding-top: 65px;
  h1 {
    margin: 0;
    color: #ff4d57;
    text-align: center;
    font-size: 1.6rem;
  }
`;
const QuizSolveCard = styled.div`
  position: relative;
  width: 100%;
  border: 1px solid #ffcaca;
  border-radius: 25px;
  background-color: white;
  opacity: 0.6;
  padding: 0 3%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  margin: 20% 0;
  &.wrong {
    opacity: 1;
  }
`;
const CardNumber = styled.span`
  position: absolute;
  left: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 14px;
  width: 35px;
  height: 45px;
  border: solid 17px #ffa5aa;
  border-bottom: solid 10px #fff;
  background-color: #ffa5aa;
  font-weight: bold;
  font-size: 1.2rem;
  color: #fff;
`;
const CardTitle = styled.h2`
  position: relative;
  display: block;
  text-align: center;
  width: 100%;
  margin-top: 15%;
  font-weight: 500;
  font-size: 1.2rem;
  color: #555;
`;
const ChoiceWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  margin: 10% 0;
  &#choice-img-wrapper {
    display: grid;
    grid-template-columns: repeat(2, calc(50% - 5px));
    grid-template-rows: repeat(2, 150px);
  }
`;
const ChoiceItem = styled.div`
  position: relative;
  width: 80%;
  padding: 1.25rem 1.25rem 1.25rem 1.75rem;
  font-size: 1rem;
  text-align: center;
  display: block;
  border-radius: 20px;
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
        width: 80px;
        height: 80px;
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
        width: 80px;
        height: 80px;
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
`;
const MatchBottom = styled.div`
  position: relative;
  display: flex;
  padding-bottom: 20px;
  gap: 10px;
  button {
    width: 50%;
  }
`;
export default MatchNote;
