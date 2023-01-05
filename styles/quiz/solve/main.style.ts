import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  display: flex;
  /*justify-content: space-evenly;*/
  background-color: #fff6f7;
  flex-direction: column;
  padding: 0 5%;
  /*padding-top: 5%;*/
  width: 100%;
  color: #555;
  min-height: 100vh;

  a {
    position: absolute;
    display: block;
    top: 24px;
    left: 24px;
  }
`;
export const QuizCount = styled.div`
  position: fixed;
  top: 20px;
  right: 5%;
  z-index: 99999;
  span {
    color: #ff4d57;
    font-weight: bold;
  }
`;
export const QuizTitle = styled.h1`
  text-align: center;
  font-weight: normal;
  word-break: keep-all;
  color: #6a5050;
  font-family: 'Noto Sans KR';
  width: 80%;
  font-size: 1.3rem;
  /*line-height: 1.6rem;*/
  margin: 4rem auto 1rem auto;
`;

export const QuizSolveContent = styled.div`
  @keyframes Bounce {
    0% {
      transform: translateY(-30px);
    }
    100% {
      transform: translateY(0);
    }
  }

  @keyframes Right {
    0% {
      transform: translateX(-10px);
    }
    100% {
      transform: translateX(0);
    }
  }
  margin-top: 95px;
  margin-bottom: 65px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const QuizSolveCard = styled.div`
  position: relative;
  width: 100%;
  border: 1px solid #ffcaca;
  border-radius: 20px;
  background-color: white;
  padding: 0 4%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  margin-bottom: 65px;
`;

export const ChoiceWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  gap: 20px;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  margin: 40px 0 30px 0;
  &#choice-img-wrapper {
    display: grid;
    gap: 10px;
    grid-template-columns: repeat(2, calc(50% - 5px));
    grid-template-rows: repeat(2, 150px);
  }
`;
export const ChoiceItem = styled.div`
  @keyframes pick {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(0.9);
    }
    100% {
      transform: scale(1);
    }
  }
  position: relative;
  width: 100%;
  label {
    height: 60px;
    position: relative;
    font-size: 1rem;
    display: flex;
    padding-left: 35px;
    align-items: center;
    border-radius: 30px;
    background-color: #f4f4f4;
  }
  input {
    display: none;
  }
  input:checked + label {
    color: #244e10;
    font-weight: bold;
    background-color: #aad775;
  }
  &#choice-txt-item {
    &:last-child {
      margin-bottom: 10px;
    }
  }

  &#choice-img-item {
    width: 100%;
    height: 100%;
    label {
      padding: 0;
      border-radius: 1rem;
      overflow: hidden;
      width: 100%;
      height: 100%;
    }
    input:checked + label {
      animation: pick 0.2s;
      color: #fff;
      &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: block;
        width: 80px;
        height: 80px;
        background: url('/assets/img/check-mark.png') center no-repeat;
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
export const QuizSolveBottom = styled.div`
  @keyframes Bounce {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(-60px);
    }
  }
  position: fixed;
  max-width: 500px;
  width: 100%;
  top: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  button {
    position: relative;
    display: flex;
    transform: translateY(0);
    transition: transform 0.5s;
    border-radius: 30px;
    &.on {
      transform: translateY(-80px);
    }
    span {
      font-size: 1.2rem;
    }
    align-items: center;
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
