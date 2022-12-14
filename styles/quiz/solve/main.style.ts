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
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const QuizSolveCard = styled.div`
  width: 100%;
  border: 1px solid #ffcaca;
  border-radius: 25px;
  background-color: white;
  padding: 0 3%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  margin: 20% 0;

  span {
    color: #aaa;
    font-size: 0.8rem;
  }
`;
export const CardTitle = styled.h2`
  position: relative;
  display: block;
  text-align: center;
  width: 100%;
  transform: translateY(-50%);
  padding: 20px 28px;
  font-weight: normal;
  border-radius: 24px;
  background-color: #ff4d57;
  font-size: 1rem;
  color: #fff;
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
    color: #fff;
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
  width: 90%;
  top: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  button {
    position:relative;
    display: flex;
    transform: translateY(0);
    transition: transform .5s;
    &.on {
      transform: translateY(-60px);
    }
    span {
      padding-left: 10px;
      font-size: 1.2rem;
    }
    align-items: center;
  }
`;
