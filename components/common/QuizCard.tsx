import styled from 'styled-components';
import { MdPlayArrow } from 'react-icons/md';
import Link from 'next/link';
import { RecentQuizType } from './RecentQuiz';
import { shareProps } from 'components/common/SNSShare';
import {IoShareOutline} from 'react-icons/io5'
interface QuizProps {
  recentQuiz: RecentQuizType;
  bottomUpOpen: (currentQuiz: RecentQuizType) => void;
}
const QuizCard = ({ bottomUpOpen, recentQuiz }: QuizProps) => {
  const timeForToday = (date: string) => {
    const today = new Date();
    const timeValue = new Date(date.replace(/ /g, 'T')); // ios safari 크로스 브라우징 이슈로 인해 yyyy-mm-ddThh:mm:ss 로 변경
    const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
    if (betweenTime < 1) return '방금전';
    if (betweenTime < 60) {
      return `${betweenTime}분전`;
    }

    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) {
      return `${betweenTimeHour}시간전`;
    }

    const betweenTimeDay = Math.floor(betweenTimeHour / 24);

    if (betweenTimeDay < 7) {
      return `${betweenTimeDay}일전`;
    }

    const betweenTimeWeek = Math.floor(betweenTimeDay / 7);
    if (betweenTimeWeek < 4) {
      return `${betweenTimeWeek}주전`;
    }

    const betweenTimeMonth = Math.floor(betweenTimeDay / 30);
    if (betweenTimeMonth === 0) {
      return `1달전`;
    }
    if (betweenTimeMonth < 12) {
      return `${betweenTimeMonth}달전`;
    }

    const value = today.toISOString().substring(0, 10);
    return value;
  };

  return (
    <Link href={`/quiz/solve/${recentQuiz.id}`} passHref>
      <QuizCardWrapper>
        {recentQuiz.thumbnail && (
          <ThumbnailWrapper>
            <img src={recentQuiz.thumbnail} alt="퀴즈 썸네일" />
          </ThumbnailWrapper>
        )}
        <div id="quiz-contents-container">
          <div id="quiz-contents">
            <div id="profile-row">
              <ProfileImgWrapper>
                <img src={recentQuiz.profile_img || '/assets/img/user_default.png'} />
              </ProfileImgWrapper>
              <div id="user-name">{recentQuiz.nickname}</div>
              <div id="quiz-date">{timeForToday(recentQuiz.created_at)}</div>
            </div>
            <div id="quiz-title">{recentQuiz.set_title}</div>
            <div id="quiz-info">참여 {recentQuiz.solverCnt}</div>
          </div>
          <button
            id="quiz-share-btn"
            onClick={(e) => {
              bottomUpOpen(recentQuiz);
              e.stopPropagation(); /* 이벤트 전파 방지 */
            }}
          >
            <IoShareOutline size={20} />
          </button>
        </div>
      </QuizCardWrapper>
    </Link>
  );
};

const QuizCardWrapper = styled.div`
  border-radius: 12px;
  position: relative;
  margin-bottom: 1rem;
  border: solid 1px #eee;
  &:last-child {
    margin: 0;
  }
  &:hover {
    cursor: pointer;
  }

  width: 100%;
  #quiz-contents-container {
    display: flex;
    #quiz-contents {
      padding: 1rem;
      width: 80%;
      #profile-row {
        display: flex;
        align-items: center;
        #quiz-date {
          font-size: 0.9rem;
          color: #888;
          margin-left: 10px;
        }
      }
      #quiz-title {
        font-size: 1.1rem;
      }

      #quiz-info {
        font-size: 0.9rem;
        color: #888;
      }
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
  #quiz-share-btn {
    background-color: transparent;
    border: none;
    margin:0 auto;
    color:#595959;
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
  @media (max-width: 390px) { /* 화면이 작아지는 break-point 로 설정 */
    height:120px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
  }
`;
export default QuizCard;
