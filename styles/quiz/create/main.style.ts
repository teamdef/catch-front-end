import styled, { keyframes } from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff6f7;
  input {
    &:focus {
      outline: none;
    }
    &::placeholder {
      color: #00000050;
    }
  }
  .swiper-wrapper {
    padding-top: 30px;
    padding-bottom: 3px;
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
  button {
    &:hover {
      cursor: pointer;
    }
  }
`;
export const Header = styled.div`
  padding: 1.5rem;
`;
export const blink = keyframes` 
  50% {opacity: 0;}
`;
export const CreateNewQuizContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  margin-top: 200px;
  button {
    background-color: transparent;
    border: none;
    color: #d6d6d6;
    margin-bottom: 1rem;
  }
  strong {
    color: #ff4d57;
    font-weight: bold;
  }
`;

export const CardWrapper = styled.div`
  padding: 0rem 1rem 0.5rem 1rem;
`;
export const ProblemSetTitleInputWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 0.5rem;
  /* animation: ${blink} 1s step-end infinite; */
  input {
    display: inline-block;
    color: #00000050;
    font-weight: bold;
    font-size: 24px;
    background-color: transparent;
    border: none;
    text-align: center;
    &::placeholder {
      color: #00000020;
    }
  }
`;
export const QuizCreateCard = styled.div`
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 10%), 0 1px 2px 0 rgb(0 0 0 / 6%);
  width: 90%;
  border-radius: 25px;
  background-color: white;
  padding: 1rem;

  display: flex;
  flex-direction: column;
  width: inherit;
  flex-wrap: nowrap;
  align-items: center;
  margin: 0 auto;
  height: 600px;
`;
export const DeleteButton = styled.button`
  background-color: transparent;
  border: none;
  color: #d6d6d6;
  position: absolute;
  right: 30px;
  top: 30px;
`;
export const bounce = keyframes` 
  0% {transform: translatey(0px);}
  5% {transform: translatey(-10px);}
  10% {transform: translatey(0px);}
  100% {transform: translatey(0px);}
`;
export const ProblemTitleContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 1rem;
  padding-top: 2.5rem;
  button {
    border: none;
    background-color: transparent;
    margin-left: 0.5rem;
    img {
      width: 40px;
      height: 40px;
    }
    &:hover {
      cursor: pointer;
      animation: ${bounce} 2s linear 0.1s infinite;
    }
  }
`;
export const ProblemTitleInputBubble = styled.input`
  display: flex;
  width: 90%;
  border-radius: 0px 30px 30px 30px;
  background-color: #fff6f7;
  color: #ffa5aa;
  border: none;
  padding: 1.25rem 1.75rem 1.25rem 1.75rem;
  font-size: 1rem;
  &::placeholder {
    color: #00000020;
  }
`;
interface choiceProps {
  select: boolean;
}
export const ChoiceTypeContainer = styled.div`
  margin-top: 0.5rem;
  display: flex;
  font-size: 14px;
  justify-content: center;
`;

export const ChoiceTypeButton = styled.div<choiceProps>`
  margin: 0 0.5rem 0 0.5rem;
  padding: 0.25rem 1.25rem 0.25rem 1.25rem;
  border-radius: 30px;
  border: ${({ select }) => (select ? 'none' : 'solid 1px #ff4d57;')};
  color: ${({ select }) => (select ? '#fff' : '#ff4d57')};
  transition: ease-in-out 0.2s;
  background-color: ${({ select }) => (select ? '#ff4d57' : '#fff')};
  &:hover {
    cursor: pointer;
  }
`;
export const ChoiceWrapper = styled.div`
  width: 90%;
  margin-top: 1rem;
`;
export const TextChoiceListContainer = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: end;
  float: right;
`;
interface CorrectProps {
  correct?: boolean;
}
export const TextChoiceBubble = styled.li<CorrectProps>`
  width: 100%;
  display: flex;
  position: relative;
  justify-content: space-between;
  background-color: ${({ correct }) => (correct ? '#AAD775' : '#eee')};
  color: ${({ correct }) => (correct ? '#fff' : '#999')};
  padding: 1.25rem 1.25rem 1.25rem 1.75rem;
  border-radius: 30px 0px 30px 30px;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  cursor: pointer;
  button {
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    border: none;
    color: ${({ correct }) => (correct ? '#fff' : '#999')};
  }
  #check-icon {
    color: #aad775;
    position: absolute;
    left: -40px;
  }
`;
export const TextChoiceAddContainer = styled(TextChoiceBubble)`
  input {
    color: #ffa5aa;
    background-color: transparent;
    font-size: 1rem;
    width: 100%;
    border: none;
  }
  background-color: #fff6f7;
  border: dashed 1px #ffa5aa;
  cursor: none;
  button {
    color: #ffa5aa;
  }
`;
export const InfoContainer = styled.div`
  font-size: 14px;
  color: #999;
  text-align: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;
export const ImgChoiceBubble = styled(TextChoiceBubble)`
  padding: 1rem;
`;
export const ImgChoiceListContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 10px;
  grid-row-gap: 10px;
`;
export const ImgInputContainer = styled.div`
  background-color: #fff6f7;
  border: dashed 1px #ffa5aa;
  border-radius: 1rem;
  height: 150px;
  input {
    display: none;
  }
  label {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #ffa5aa;
    width: 100%;
    height: 100%;
    &:hover {
      cursor: pointer;
    }
  }
`;
export const ImgWrapper = styled.div<CorrectProps>`
  width: 100%;
  height: 150px;
  position: relative;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 1rem;
    border: ${({ correct }) => (correct ? 'solid 3px #AAD775' : 'none')};
  }
  #delete-btn {
    display: flex;
    position: absolute;
    width: 25px;
    height: 25px;
    top: 8px;
    right: 8px;
    border: solid 1px #d6d6d6;
    background-color: white;
    padding: 0.25rem;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    border-radius: 50%;
    font-size: 16px;
    color: rgb(59, 59, 59);
    justify-content: center;
    align-items: center;
    &:hover {
      background-color: lightgrey;
    }
  }
`;
/* 퀴즈 완성 버튼 디자인 */
export const CompleteButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 0.5rem;
`;
