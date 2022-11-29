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
  margin-bottom:4rem;
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
  .swiper-wrapper {
    padding-top: 30px;
    padding-bottom: 10px;
  }
  .swiper-pagination {
    bottom: calc(100% - 1rem);
    .swiper-pagination-bullet {
      width: 10px;
      height: 10px;
    }
    .swiper-pagination-bullet-active {
      background-color: #ff4d57;
    }
  }
  .swiper-slide {
    visibility: hidden;
    height: auto;
    h2 {
      opacity: 0;
      transition: opacity 1s 0.2s;
    }
    .choice-item {
      opacity: 0;
      transition: 0.5s;

      &:nth-child(1) {
        transition-delay: 0.8s;
        animation-delay: 0.8s;
      }
      &:nth-child(2) {
        transition-delay: 1s;
        animation-delay: 1s;
      }
      &:nth-child(3) {
        transition-delay: 1.2s;
        animation-delay: 1.2s;
      }
      &:nth-child(4) {
        transition-delay: 1.4s;
        animation-delay: 1.4s;
      }
    }
  }
  .swiper-slide-active {
    visibility: visible;

    h2,
    .choice-item {
      opacity: 1;
    }
    h2 {
      animation: Bounce 1s;
    }
    .choice-item {
      animation: Right 0.5s;
    }
  }
`;
export const QuizSolveCard = styled.div`
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 10%), 0 1px 2px 0 rgb(0 0 0 / 6%);
  width: 90%;
  height: 100%;
  border-radius: 25px;
  background-color: white;
  padding: 1rem;
  padding-top:10%;
  padding-bottom:10%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  margin: 0 auto;

  span {
    color: #aaa;
    font-size: 0.8rem;
  }
`;
export const CardTitle = styled.h2`
  position: relative;
  display: block;
  text-align: center;
  min-width: 80%;
  /*margin-top: 10%;*/
  margin-bottom: 10%;
  padding: 20px 28px;
  font-weight: normal;
  border-radius: 25px;
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
  margin-bottom: 3%;
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
    /*padding: 15px 20px;*/
    padding: 1.25rem 1.25rem 1.25rem 1.75rem;
    position: relative;
    font-size: 1rem;
    display: block;
    /*border-radius: 18px 0 18px 18px;*/
    border-radius: 30px 0px 30px 30px;
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
      border: 3px solid #aad775;
    }
    img {
      position: relative;
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
`;
export const QuizSolveBottom = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  button {
    display: flex;
    span {
      padding-left: 10px;
      font-size: 1.2rem;
    }
    align-items: center;
  }
`;
