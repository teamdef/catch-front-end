import styled from 'styled-components';
import { MdPlayArrow } from 'react-icons/md';
import Link from 'next/link';
interface QuizProps {
  userName: string;
  quizDate: string;
  quizTitle: string;
  quizCount: number;
  quizPlay: number;
  quizRoute: string;
  quizThumbnail?: string;
}
const QuizCard = ({ userName, quizDate, quizTitle, quizCount, quizPlay, quizRoute, quizThumbnail }: QuizProps) => {
  return (
    <QuizCardWrapper>
      {quizThumbnail && (
        <ThumbnailWrapper>
          <img src={quizThumbnail} />
        </ThumbnailWrapper>
      )}
      <div id="quiz-contents-container">
        <div id="profile-row">
          <ProfileImgWrapper>
            <img src={'/assets/img/user_default.png'} />
          </ProfileImgWrapper>
          <div id="user-name">{userName}</div>
          <div id="quiz-date">{quizDate}</div>
        </div>
        <div id="quiz-title">{quizTitle}</div>
        <div id="quiz-info">
          {quizCount}문제 · 참여 {quizPlay}
        </div>
      </div>
      <Link href={quizRoute} passHref>
        <a id="quiz-solve-btn">
          <MdPlayArrow size={24} />
          캐치!
        </a>
      </Link>
    </QuizCardWrapper>
  );
};

const QuizCardWrapper = styled.div`
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 10%), 0 1px 2px 0 rgb(0 0 0 / 6%);
  transition: all 0.1s ease-in-out;
  border-radius: 12px;
  position: relative;
  margin-bottom: 1rem;
  &:last-child {
    margin: 0;
  }
  &:hover {
    transform: scale(1.025);
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
      }
    }
    #quiz-title {
      font-size: 18px;
      margin-top: 0.5rem;
    }

    #quiz-info {
      font-size: 14px;
      color: #888;
      margin-top: 4px;
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
  }
`;

const ProfileImgWrapper = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 10px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const ThumbnailWrapper = styled.div`
  width: 100%;
  height: 150px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
  }
`;
export default QuizCard;
