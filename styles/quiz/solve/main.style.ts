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
  position:relative;
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
`;
export const CardNumber = styled.span`
  position: absolute;
  left: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 14px;
  width: 35px;
  height: 45px;
  border: solid 17px #FFA5AA;
  border-bottom: solid 10px #fff;
  background-color: #FFA5AA;
  font-weight: bold;
  font-size: 1.2rem;
  color: #fff;
`;
export const CardTitle = styled.h2`
  position: relative;
  display: block;
  text-align: center;
  width: 100%;
  margin-top: 15%;
  font-weight: 500;
  font-size: 1.2rem;
  color: #555;
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
      border-radius: 1rem;
      overflow: hidden;
      width: 100%;
      height: 100%;
    }
    input:checked + label {
      color: #fff;
      transform: scale(1.05);
      &::after {
        content: '';
        position:absolute;
        display:block;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #aad775;
        opacity: .5;
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
    &.on {
      transform: translateY(-60px);
    }
    span {
      font-size: 1.2rem;
    }
    align-items: center;
  }
`;
