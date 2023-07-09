import styled from 'styled-components';
import Link from 'next/link';
import { timeForToday } from 'lib/date';

const PopularQuizCard = (props: { recentQuiz: RecentQuizType }) => {
  return (
    <>
      <Link href={`/quiz/solve/${props.recentQuiz.id}`} passHref>
        <a>
          <Wrapper>
            <div className="thumbnail-wrapper">
              <img src={props.recentQuiz.thumbnail || '/assets/img/quiz_card_default.png'} alt="추천퀴즈썸네일이미지" />
            </div>
            <div className="text-wrapper">
              <div className="quiz-title">{props.recentQuiz.setTitle}</div>
              <div className="nickname">{props.recentQuiz.user.nickname || '탈퇴한 사용자'}</div>
              <div className="text-bottom">
                <div>{timeForToday(props.recentQuiz.createdAt)}</div>
                <div>참여 {props.recentQuiz.solverCnt}</div>
              </div>
            </div>
          </Wrapper>
        </a>
      </Link>
    </>
  );
};
const Wrapper = styled.div`
  display: flex;
  height: 124px;
  width: 100%;
  border: solid 1px #e8e7e7;
  margin-bottom: 12px;
  border-radius: 4px;
  .thumbnail-wrapper {
    width: 40%;
    height: 100%;
    border-right: solid 1px #e8e7e7;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-bottom-left-radius: 4px;
      border-top-left-radius: 4px;
    }
  }
  .text-wrapper {
    width: 60%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 16px;

    .quiz-title {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      font-weight: bold;
      color: #424242;
    }
    .nickname {
      font-weight: 500;
      font-size: 0.85rem;
      color: #616161;
    }
    .text-bottom {
      color: #9e9e9e;
      display: flex;
      justify-content: space-between;
      font-size: 0.85rem;
    }
  }
`;

export default PopularQuizCard;
