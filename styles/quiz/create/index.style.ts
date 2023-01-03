import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  display: block;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  color: #000;
  background-color: #fff6f7;
  #warning {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
    color: red;
  }
`;

export const TitleContainer = styled.div`
  overflow: hidden;
  position: relative;
  display: block;
  width: 100%;
  border-bottom-right-radius: 20%;
  border-bottom-left-radius: 20%;
  background-color: #ff4d57;
  height: 370px;

  #logo-wrapper {
    text-align: left;
    position: relative;
    background-color: transparent;
    top: 24px;
    left: 24px;
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
      font-weight: 300;
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
  padding: 1rem;
  position: fixed;
  width: 500px;
  @media(max-width:500px){
    width:100%;
  }
  bottom: 0;
`;

export const QuizCreateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  margin: 0 auto;
`;

export const QuizCreateCard = styled.div`
  width: 100%;
  min-height: 400px;
  border-radius: 20px;
  border: solid 1px #ffa5aa50;
  background-color: #fff;
  margin-top: 40px;
  position: relative;
  display: flex;
  flex-direction: column;
  #quiz-delete-btn {
    position: absolute;
    right: 20px;
    top: 20px;
    color: #d6d6d6;
    border: none;
    cursor: pointer;
    background-color: transparent;
  }
`;

export const QuizTitleInput = styled.input`
  width: 80%;
  font-size: 1.3rem;
  text-align: center;
  align-self: center;
  margin-top:4rem;
  border: none;
  border-bottom: solid 1px #d6d6d6;
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
    margin: 0 0.5rem 0 0.5rem;
    padding: 0.5rem 1.25rem 0.5rem 1.25rem;
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
  padding-right: 2rem;
  margin-top: 1rem;
`;
export const TextChoiceList = styled.ul`
  width: 70%;
`;
export const TextChoiceItem = styled.li<CorrectProps>`
  width: 100%;
  display: flex;
  position: relative;
  justify-content: space-between;
  background-color: ${({ correct }) => (correct ? '#AAD775' : '#eee')};
  color: ${({ correct }) => (correct ? '#244E10' : '#888')};
  font-weight:${({ correct }) => (correct && 'bold')};
  padding: 1.25rem 1rem 1rem 1.75rem;
  border-radius: 25px;
  margin-top: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
  button {
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    border: none;
    color: ${({ correct }) => (correct ? '#244E10' : '#888')};
  }
  #check-icon {
    color: #aad775;
    position: absolute;
    left: -40px;
  }
`;
export const TextChoiceCreateBtn = styled.div`
  width: 70%;
  display: flex;
  position: relative;
  justify-content: space-between;
  background-color: #fff6f7;
  color: #ffa5aa;
  padding: 1rem 1rem 1rem 1.5rem;
  border: dashed 1px #ffa5aa;
  border-radius: 25px;
  margin-bottom: 0.75rem;
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
    color: #ffa5aa;
    &::placeholder {
      color: #ffa5aa90;
    }
  }
`;

export const ImgChoiceContainer = styled.div`
  padding: 1rem;
  margin-top: 1rem;
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
  height: 160px;
  position: relative;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 1rem;
    border: ${({ correct }) => (correct ? 'solid 5px #AAD775' : 'none')};
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

export const ImgInputContainer = styled.div`
  background-color: #fff6f7;
  border: dashed 1px #ffa5aa;
  border-radius: 1rem;
  height: 160px;
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
  margin-bottom: 120px;
`;

export const InfoContainer = styled.div`
  font-size: 14px;
  color: #999;
  text-align: center;
  margin-top: 1rem;
  margin-bottom: 2rem;
`;

export const CardNumber = styled.span`
  position: absolute;
  top:-1px;
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

