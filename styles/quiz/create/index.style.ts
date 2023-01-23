import styled,{css} from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  display: block;
  min-height: 100%;
`;

export const TitleContainer = styled.div`
  /*overflow: hidden;*/
  position: relative;
  display: block;
  width: 480px;
  transform:translateX(-3%);
  @media (max-width:480px){
    width:100vw;
  }
  border-bottom-right-radius: 40px;
  border-bottom-left-radius: 40px;
  background-color: #ff4d57;
  height: 370px;

  #logo-wrapper {
    text-align: left;
    position: relative;
    background-color: transparent;
    top: 24px;
    left: 24px;
    display:inline-block;
  }
  #title-input-wrapper {
    color: #fff;
    margin-top: 3rem;
    span {
      text-align: center;
      position: relative;
      display: block;
      margin-top: 15px;
      margin-bottom: 15px;
    }
  }
  #description-input-wrapper {
    text-align: center;
    position: relative;
    display: block;
    margin-top: 30px;
    margin-bottom: 15px;
    color: #fff;
    #description-textarea {
      height: 100px;
      background-attachment: local;
      background-image: linear-gradient(to right, #ff4d57 10px, transparent 10px),
        linear-gradient(to left, #ff4d57 10px, transparent 10px),
        repeating-linear-gradient(#ff4d57, #ff4d57 30px, #ccc 30px, #ccc 31px, #ff4d57 31px);
      font-size: 1rem;
      line-height: 31px;
      padding: 3px 10px;
      margin-top: 2rem;
      border: none;
      width: 85%;
      outline: none;
      color: #fff;
      resize: none;
      overflow-y: hidden;
      font-family: 'Noto Sans KR';
      font-weight: 400;
    }
  }
`;
export const TitleInput = styled.div`
  z-index: 2;
  display: flex;
  position: relative;
  border-bottom: 2px solid #fff;
  max-width: 80%;
  text-align: center;
  margin: 0 auto;
  input {
    margin: 0 auto;
    height: 50px;
    border: 0;
    width: 85%;
    background-color: transparent;
    color: #fff;
    font-size: 1.5rem;
    text-align: center;
    &:focus {
      outline: none;
    }
    &::placeholder {
      font-size: 1.5rem;
      font-weight: 300;
      opacity: 0.5;
      color: #fff;
    }
  }
  #clear-btn {
    margin: 0;
    height: 50px;
    background-color: transparent;
    border: none;
    color: #fff;
    &:disabled {
      display: none;
    }
    &:hover {
      cursor: pointer;
    }
    svg {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;
export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  width: 480px;
  @media (max-width: 480px) {
    width: 100%;
  }
  left:calc(50%);
  transform:translateX(-50%);
  padding:0 calc(480px * 0.03);
  bottom: 20px;
  z-index:99;
`;

export const QuizCreateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
`;

export const QuizCreateCard = styled.div`
  width: 100%;
  border-radius: 20px;
  border: solid 1px #ffa5aa50;
  background-color: #fff;
  margin-top: 40px;
  position: relative;
  display: flex;
  flex-direction: column;
  padding-left: 4%;
  padding-right: 4%;
  #quiz-delete-btn {
    position: absolute;
    right: 20px;
    top: 20px;
    color: #d6d6d6;
    border: none;
    cursor: pointer;
    background-color: transparent;
    z-index:2;
  }
`;

export const QuizTitleInput = styled.input`
  width: 80%;
  font-size: 1.3rem;
  text-align: center;
  align-self: center;
  margin-top: 4rem;
  border: none;
  border-bottom: solid 1px #6a5050;
  outline: none;
  padding: 0rem 0.5rem 0.5rem 0.5rem;
  color: #6a5050;
  font-family: 'Noto Sans KR';
`;

export const QuizChoiceTypeRadio = styled.div`
  margin-top: 1.5rem;
  display: flex;
  font-size: 14px;
  justify-content: center;

  input[type='radio'] {
    display: none;
  }
  input[type='radio'] + label {
    transition: ease-in-out 0.2s;
    cursor: pointer;
    margin: 0 4.5px 0 4.5px;
    /*padding: 0.5rem 1.25rem 0.5rem 1.25rem; */
    display: flex;
    align-items: center;
    justify-content: center;
    width: 70px;
    height: 30px;
    border-radius: 30px;
  }
  input[type='radio'] + label {
    background-color: #fff;
    color: #ff4d57;
    border: solid 1px #ff4d57;
  }
  input[type='radio']:checked + label {
    background-color: #ff4d57;
    color: #fff;
    border: none;
  }
`;

interface CorrectProps {
  correct?: boolean;
}

export const TextChoiceContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: end;
`;
export const TextChoiceList = styled.ul`
  width: 100%;
`;
export const TextChoiceItem = styled.li<CorrectProps>`
  width: 100%;
  display: flex;
  position: relative;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ correct }) => (correct ? '#AAD775' : '#eee')};
  color: ${({ correct }) => (correct ? '#244E10' : '#888')};
  font-weight: ${({ correct }) => correct && 'bold'};
  border-radius: 30px;
  margin-top: 20px;
  padding-left: 34px;
  padding-right: 20px;
  height: 60px;
  cursor: pointer;
  font-size: 1rem;
  button {
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    border: none;
    color: ${({ correct }) => (correct ? '#244E10' : '#888')};
  }
  /* #check-icon {
    color: #aad775;
    position: absolute;
    left: -40px;
  } */
`;
export const TextChoiceCreateBtn = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  justify-content: space-between;
  align-items: center;
  background-color: #fff6f7;
  color: #ffa5aa;
  padding-left: 30px;
  padding-right: 20px;
  border: dashed 1px #ffa5aa;
  border-radius: 30px;
  margin-top: 20px;
  height: 60px;
  cursor: pointer;
  button {
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    border: none;
    color: #ffa5aa;
  }
  input {
    background-color: transparent;
    border: none;
    outline: none;
    width: 100%;
    font-size:1rem;
    color: #ffa5aa;
    &::placeholder {
      color: #ffa5aa90;
    }
  }
`;

export const ImgChoiceContainer = styled.div`
  margin-top: 20px;
`;

export const ImgChoiceListContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 10px;
  grid-row-gap: 10px;
`;

export const ImgWrapper = styled.div<CorrectProps>`
  width: 100%;
  height: 150px;
  position: relative;
  cursor: pointer;
  ${({ correct }) =>
    correct &&
    css`
      /* border: solid 3px #aad775; */
      /* border-radius: 1rem; */
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
        border-radius: 1rem;
      }
    `}
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 1rem;
    border: ${({ correct }) => (correct ? 'solid 3px #AAD775' : 'none')};
  }
  #delete-btn {
    z-index: 9;
    cursor: pointer;
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

export const QuizCreateBtn = styled.button`
  width: 100%;
  height: 60px;
  border-radius: 20px;
  border: dashed 1px #ffa5aa70;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ff4d57;
  background-color: #fff;
  margin-top: 40px;
  font-weight: bold;
  font-size: 1.25rem;
  margin-bottom: 120px;
`;

export const InfoContainer = styled.div`
  font-size: 1rem;
  color: #999;
  text-align: center;
  margin-top: 30px;
  margin-bottom: 40px;
`;

export const CardNumber = styled.span`
  position: absolute;
  top: -1px;
  left: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 14px;
  width: 35px;
  height: 50px;
  border: solid 17px #ffa5aa;
  border-bottom: solid 10px #fff;
  background-color: #ffa5aa;
  font-weight: bold;
  font-size: 1.2rem;
  color: #fff;
`;
