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
  padding: 0 4%;
  border: 1px solid #aad775;
  border-radius: 20px;
  background-color: white;
  opacity: 0.5;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  margin-top: 44px;
  > span {
    border-color: #aad775;
    border-bottom: solid 10px #fff;
  }
  &.wrong {
    border: 1px solid #ffcaca;
    > span {
      border: solid 17px #ffa5aa;
      border-bottom: solid 10px #fff;
    }
    opacity: 1;
    .choice-txt-item.correct {
      color: #fff;
      background-color: #ff4d57;
      border: 1px solid #ff4d57;
    }
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
  border: 1px dashed #ffa5aa;
  &.choice-txt-item {
    &.correct {
      background-color: #aad775;
      color: #244e10;
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
export const MatchBottom = styled.div`
  position: relative;
  display: block;
  flex-direction: column;
  padding-bottom: 48px;
  text-align: center;
  margin-top: 50px;
  gap: 10px;
  button {
    display: flex;
    margin: 0 auto;
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
