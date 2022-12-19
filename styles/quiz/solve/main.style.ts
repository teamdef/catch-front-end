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
    top: 0;
    left: 0;
    display: block;
    padding: 5%;
  }
`;
export const QuizTitle = styled.h1`
  margin-top: 4rem;
  margin-bottom: 4rem;
  text-align: center;
  font-weight: normal;
  font-size: 24px;
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
  margin-top: 75px;
  margin-bottom:120px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const QuizSolveCard = styled.div`
  padding: 0 3%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  border: solid 1px #ffa5aa50;
  width: 100%;
  min-height: 400px;
  border-radius: 20px;
  margin-top: 40px;
  background-color: #fff;

  span {
    color: #aaa;
    font-size: 0.8rem;
  }
  #quiz-num-flag {
    display: block;
    position: relative;
    left: -165px;
    text-align: center;
    #quiz-num {
      position: absolute;
      width:34px;
      top: 10px;
      font-size: 18px;
      font-weight: bold;
      color: #fff;
      text-align: center;
    }
  }
  #quiz-title {
    color: #6a5050;
    font-family: 'Noto Sans KR';
    width: 80%;
    font-size: 1.3rem;
    text-align: center;
    margin: 0 auto;
    line-height: 1.7rem;
    margin-top: 0.5rem;
  }
`;

export const ChoiceWrapper = styled.div`
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
export const ChoiceItem = styled.div`
  position: relative;
  width: 80%;
  label {
    padding: 1.25rem 1.25rem 1.25rem 1.75rem;
    position: relative;
    font-size: 1rem;
    text-align: center;
    display: block;
    border-radius: 20px;
    background-color: #f4f4f4;
  }
  input {
    display: none;
  }
  input:checked + label {
    color: #244e10;
    background-color: #aad775;
  }
  &#choice-img-item {
    width: 100%;
    height: 100%;
    label {
      padding: 0;
      overflow: hidden;
      border-radius: 1rem;
      width: 100%;
      height: 100%;
    }
    input:checked + label {
      color: #fff;
      background-color: #f4f4f4;
      border: 5px solid #aad775;
      transform: scale(1.08);
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
    &.on {
      transform: translateY(-70px);
    }
    span {
      padding-left: 10px;
      font-size: 1.2rem;
    }
    align-items: center;
  }
`;
