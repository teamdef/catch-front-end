import styled, { keyframes } from 'styled-components';

export const Wrapper = styled.div`
  background-color: #fff6f7;
  height: 100vh;
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  overflow-y: scroll;
  & {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
  #inner-wrapper {
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media (max-width: 400px) {
      width: 100%;
    }
  }
  strong {
    font-weight: 400;
    color: #ff4d57;
    margin: 0 0.5rem 0 0.5rem;
  }
`;

export const bounce = keyframes` 
  0% {transform: translatey(0px);}
  5% {transform: translatey(-10px);}
  10% {transform: translatey(0px);}
  100% {transform: translatey(0px);}
`;

export const Complete = styled.div`
  color: #ff4d57;
  font-size: 40px;
  font-family: 'RixInooAriDuriR';
  margin-top: 36px;
  animation: ${bounce} 2s linear 0.1s infinite;
`;

export const QuizInfoContainer = styled.div`
  width: 90%;
  margin-top: 36px;
  #top {
    padding: 1.5rem 0 1.5rem 0;
    background-color: #ff4d57;
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
    color: white;
    font-size: 20px;
    font-weight: bold;
    display: flex;
    justify-content: center;
  }
  #bottom {
    padding: 1.5rem 0 1.5rem 0;
    background-color: #fff;
    border-bottom-right-radius: 1rem;
    border-bottom-left-radius: 1rem;
    border: solid 1px #f2f2f2;
    border-top: none;
    display: flex;
    justify-content: center;
    font-size: 20px;
    font-weight: 300;
  }
`;

export const ThumbnailSettingContainer = styled.div`
  margin-top: 24px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  #explain {
    color: #888;
    text-align: center;
    font-size: 14px;
    strong {
      margin: 0;
    }
  }
  #thumbnail-img-wrapper {
    margin-top: 24px;
    width: 90%;
    height: 200px;
    position: relative;

    input {
      display: none;
    }
    label {
      &:hover {
        cursor: pointer;
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 1rem;
      }
    }

    #thumbnail-input-btn {
      position: absolute;
      top: 1rem;
      right: 1rem;
      color: white;
      &:hover {
        cursor: pointer;
      }
    }
  }
`;

export const ShareContainer = styled.div`
  margin-top: 36px;
  margin-bottom: 50px;
  width: 75%;
  #explain {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #888;
    font-size: 14px;
    span {
      margin-left: 0.5rem;
    }
  }
  #share-wrapper {
    margin-top: 24px;
  }
`;

export const HomeButton = styled.div`
  margin-top: 48px;
  width: 60%;

  font-size: 16px;
  border-radius: 30px;
  padding: 1rem 1.5rem 1rem 1.5rem;

  background-color: #ff4d57;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    margin-right: 4px;
  }
  &:hover {
    cursor: pointer;
    background-color: #ffa5aa;
  }
`;

export const DefaultThumbnail = styled.div`
  background-color: #fff6f7;
  border-radius: 1rem;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    color: #ffa5aa;
  }
`;
