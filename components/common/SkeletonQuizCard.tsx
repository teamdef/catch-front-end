import styled, { keyframes } from 'styled-components';

interface SkeletonProps {
  isthumb?: boolean;
}
const SkeletonQuizCard = ({ isthumb }: SkeletonProps) => {
  return (
    <QuizCardWrapper>
      {isthumb && <ThumbnailWrapper />}
      <div id="quiz-contents-container">
        <div id="profile-row">
          <ProfileImgWrapper />
          <div id="user-name"></div>
          <div id="quiz-date"></div>
        </div>
        <div id="quiz-title"></div>
        <div id="quiz-info"></div>
      </div>
      <div id="quiz-solve-btn"></div>
    </QuizCardWrapper>
  );
};

const gradient = keyframes` 
  0% {background-color: rgba(165, 165, 165, 0.1);}
  50% {background-color: rgba(165, 165, 165, 0.3);}
  100% {background-color: rgba(165, 165, 165, 0.1);}
`;

const QuizCardWrapper = styled.div`
  border:solid 1px #eee;
  border-radius: 12px;
  position: relative;
  margin-bottom: 1rem;
  &:last-child {
    margin: 0;
  }
  width: 100%;
  #quiz-contents-container {
    padding: 1rem;
    #profile-row {
      display: flex;
      align-items: center;
      #quiz-date {
        font-size: 14px;
        color: #888;
        margin-left: 10px;
        height: 20px;
        width: 40px;
        background-color: #d6d6d6;
        border-radius: 20px;
        animation: ${gradient} 1.5s linear infinite alternate;
      }
      #user-name {
        height: 20px;
        width: 60px;
        background-color: #d6d6d6;
        border-radius: 20px;
        animation: ${gradient} 1.5s linear infinite alternate;
      }
    }
    #quiz-title {
      margin-top: 0.5rem;
      padding-top: 0;
      height: 24px;
      width: 250px;
      background-color: #d6d6d6;
      border-radius: 20px;
      animation: ${gradient} 1.5s linear infinite alternate;
    }

    #quiz-info {
      font-size: 14px;
      color: #888;
      margin-top: 4px;
      height: 20px;
      width: 100px;
      background-color: #d6d6d6;
      border-radius: 20px;
      animation: ${gradient} 1.5s linear infinite alternate;
    }
  }
  #quiz-solve-btn {
    position: absolute;
    bottom: 24px;
    right: 24px;
    color: #ff4d57;
    font-weight: bold;
    display: flex;
    align-items: center;
    background-color: #d6d6d6;
    height: 24px;
    width: 60px;
    border-radius: 20px;
    animation: ${gradient} 1.5s linear infinite alternate;
  }
`;

const ProfileImgWrapper = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 10px;
  background-color: #d6d6d6;
  border-radius: 50%;
  animation: ${gradient} 1.5s linear infinite alternate;
`;

const ThumbnailWrapper = styled.div`
  width: 100%;
  height: 150px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  background-color: #d6d6d6;
  animation: ${gradient} 1.5s linear infinite alternate;
`;
export default SkeletonQuizCard;
