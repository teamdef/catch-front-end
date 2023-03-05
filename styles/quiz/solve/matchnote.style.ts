import styled from 'styled-components';

export const MatchEl = styled.div`
  position: relative;
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
    margin-top: 40px;
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
export const QuizSolveCard = styled.div`
  position: relative;
  width: 100%;
  padding: 0 4%;
  border: 4px solid #aad775;
  border-radius: 20px;
  background-color: white;
  opacity: 0.5;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  margin-top: 40px;
  > span {
    border-color: #aad775;
    border-bottom: solid 10px #fff;
  }
  &.wrong {
    border: 4px solid #ffcaca;
    > span {
      border: solid 17px #ffa5aa;
      border-bottom: solid 10px #fff;
    }
    opacity: 1;
  }
`;
export const CardNumber = styled.span`
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

export const CardTitle = styled.h2`
  text-align: center;
  font-weight: normal;
  word-break: keep-all;
  color: #6a5050;
  font-family: 'Noto Sans KR';
  width: 80%;
  font-size: 1.3rem;
  margin-top: 80px;
`;
export const CardTitleImg = styled.img`
  position: relative;
  display: block;
  width: 100%;
  height: 200px;
`;
export const ChoiceWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  margin: 10% 0;
  gap: 10px;
  &#choice-img-wrapper {
    display: grid;
    grid-template-columns: repeat(2, calc(50% - 5px));
  }
`;
export const ChoiceItem = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 60px;
  padding: 0 35px;
  align-items: center;
  border-radius: 30px;
  background-color: #f4f4f4;
  &.choice-img-item {
    width: 100%;
    height: 150px;
    padding: 0;
    border-radius: 15px;
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
  &.choice-txt-item {
    &.correct {
      background-color: #aad775 !important;
      color: #244e10 !important;
      font-weight: bold;
    }
    &#my-answer {
      background-color: #ffa5aa;
      color: #da4343;
      font-weight: bold;
    }
  }
`;
export const MatchBottom = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding-bottom: 30px;
  margin-top: 40px;
  gap: 10px;
`;