import styled from 'styled-components';
import Link from 'next/link';
import { timeForToday } from 'utils/date';
interface QuizProps {
  recentQuiz: RecentQuizType;
}
const QuizMiniCard = ({ recentQuiz }: QuizProps) => {
  return (
    <>
      <Link href={`/quiz/solve/${recentQuiz.id}`} passHref>
        <QuizCardWrapper>
          <ThumbnailWrapper>
            <img
              src={'/assets/img/quiz_card_default.png'}
              alt="추천퀴즈썸네일이미지"
            />
          </ThumbnailWrapper>
          <QuizTextWrapper>
            <span id="quiz-title">{recentQuiz.setTitle}</span>
            <span id="nickname">{recentQuiz.user.nickname || '탈퇴한 사용자'}</span>
            <div id="text-bottom">
              <span>{timeForToday(recentQuiz.createdAt)}</span>
              <span>참여 {recentQuiz.solverCnt}</span>
            </div>
          </QuizTextWrapper>
        </QuizCardWrapper>
      </Link>
    </>
  );
};
const QuizCardWrapper = styled.a`
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  height: 100%;
  border: 1px solid #e8e7e7;
`;
const ThumbnailWrapper = styled.div`
  width: 100%;
  height: 178px;
  background-color: #ffa5aa;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
const QuizTextWrapper = styled.div`
  padding: 12px 4%;
  font-size: 0.75rem;
  color: #9e9e9e;
  #quiz-title {
    position: relative;
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #212121;
    font-size: 1rem;
    font-weight: bold;
  }
  #nickname {
    display: block;
    font-size: 0.85rem;
    font-weight: 500;
    color: #616161;
  }
  #text-bottom {
    margin-top: 7px;
    display: flex;
    justify-content: space-between;
    padding-right: 5px;
  }
`;
export default QuizMiniCard;
