import styled from 'styled-components';

export const MatchTitle = styled.h1`
  position: relative;
  display: block;
  text-align: center;
  margin-top: 40px;
  span {
    position: relative;
    font-family: 'RixInooAriDuriR';
    color: #ff4d57;
    font-size: 1.6rem;
    z-index: 1;
    &::before {
      content: '';
      position: absolute;
      display: block;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 6px;
      border-radius: 3px;
      background-color: #91ce61;
    }
  }
`;
export const QuizMatchCard = styled.div`
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
export const MatchChoiceItem = styled.div`
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
