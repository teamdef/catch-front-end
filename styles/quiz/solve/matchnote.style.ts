import styled from 'styled-components';

export const MatchTitle = styled.h1`
  position: relative;
  display: block;
  text-align: center;
  margin-top: 38px;
  span {
    position: relative;
    font-size: 1.6rem;
    font-weight: normal;
    z-index: 1;
  }
`;
export const QuizMatchCard = styled.div`
  position: relative;
  width: 100%;
  padding: 0 4.27%;
  border: 1px solid #ff4d57;
  border-radius: 20px;
  background-color: white;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  margin-top: 44px;
  > span {
    border-color: #ff4d57;
    border-bottom: solid 10px #fff;
  }
  &.wrong {
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
  border-radius: 8px;
  color: #999;
  &.choice-txt-item {
    border: 1px dashed #ffa5aa;
    &.correct {
      border: 1px solid #ff4d57;
      background-color: #ff4d57;
      color: #fff;
    }
    &#my-answer {
      background-color: #fff6f7;
    }
  }

  &.choice-img-item {
    width: 100%;
    height: 150px;
    padding: 0;
    border-radius: 15px;
    overflow: hidden;
    &::after {
      content: '';
      position: absolute;
      display: block;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #fff;
      opacity: 0.45;
    }

    &#my-answer {
      opacity: 1;
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
        background-color: #ff0000;
        opacity: 0.15;
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
    }
    img {
      position: relative;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;
export const MatchBottom = styled.div`
  position: relative;
  display: flex;
  padding-bottom: 48px;
  justify-content: center;
  text-align: center;
  margin-top: 50px;
  gap: 16px;
  button {
    display: flex;
    padding: 8px;
    cursor: pointer;
    border: none;
    background-color: transparent;
    color: #616161;
    font-size: 16px;
    font-weight: 700;
    gap: 10px;
  }
`;
