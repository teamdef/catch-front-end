import { useState } from 'react';
import styled, { css } from 'styled-components';
import Link from 'next/link';
import { IoShareOutline } from 'react-icons/io5';
import { BottomUpModal } from 'components/modal';
import { shareProps } from 'components/common/SNSShare';
interface QuizProps {
  recentQuiz: QuizCardType;
}
const QuizCard = ({ recentQuiz }: QuizProps) => {
  const [bottomUpisOpen, setBottomUpIsOpen] = useState<boolean>(false); /* 퀴즈 공유 바텀업 */
  const snsShareObj: shareProps = {
    thumbnail: recentQuiz.thumbnail,
    set_title: recentQuiz.set_title,
    id: recentQuiz.id,
    profileImg: recentQuiz.profile_img,
    nickName: recentQuiz.nickname,
  };
  const bottomUpOpen = () => {
    setBottomUpIsOpen(true);
  };
  const bottomUpClose = () => {
    setBottomUpIsOpen(false);
  };

  const timeForToday = (date: string) => {
    const today = new Date();
    const timeValue = new Date(date.replace(/ /g, 'T')); // ios safari 크로스 브라우징 이슈로 인해 yyyy-mm-ddThh:mm:ss 로 변경
    const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
    if (betweenTime < 1) return '방금 전';
    if (betweenTime < 60) {
      return `${betweenTime}분 전`;
    }
    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) {
      return `${betweenTimeHour}시간 전`;
    }
    const betweenTimeDay = Math.floor(betweenTimeHour / 24);
    if (betweenTimeDay < 7) {
      return `${betweenTimeDay}일 전`;
    }
    const betweenTimeWeek = Math.floor(betweenTimeDay / 7);
    if (betweenTimeWeek < 4) {
      return `${betweenTimeWeek}주 전`;
    }
    const betweenTimeMonth = Math.floor(betweenTimeDay / 30);
    if (betweenTimeMonth === 0) {
      return `1달 전`;
    }
    if (betweenTimeMonth < 12) {
      return `${betweenTimeMonth}달 전`;
    }
    const value = today.toISOString().substring(0, 10);
    return value;
  };

  return (
    <>
      <Link href={`/quiz/solve/${recentQuiz.id}`} passHref>
        <QuizCardWrapper>
          {recentQuiz.thumbnail && (
            <ThumbnailWrapper thumbnailURL={recentQuiz.thumbnail}>
              <QuizInfoChips isThumbnail={!!recentQuiz.thumbnail}>
                <span className="chip">참여 {recentQuiz.solverCnt}</span>
              </QuizInfoChips>
            </ThumbnailWrapper>
          )}
          <div id="quiz-contents-container">
            <div id="quiz-contents">
              <div id="quiz-title">{recentQuiz.set_title}</div>
              <div id="profile-row">
                <ProfileImgWrapper>
                  <img src={recentQuiz.profile_img || '/assets/img/user_default.png'} />
                </ProfileImgWrapper>
                <div id="name-and-date">
                  {recentQuiz.nickname} · {timeForToday(recentQuiz.created_at)}
                </div>
              </div>
              {!!recentQuiz.thumbnail === false && (
                <QuizInfoChips isThumbnail={!!recentQuiz.thumbnail}>
                  <span className="chip">참여 {recentQuiz.solverCnt}</span>
                </QuizInfoChips>
              )}
            </div>
            <button
              id="quiz-share-btn"
              onClick={(e) => {
                bottomUpOpen();
                e.stopPropagation(); /* 이벤트 전파 방지 */
              }}
            >
              <IoShareOutline size={20} />
            </button>
          </div>
        </QuizCardWrapper>
      </Link>
      {bottomUpisOpen && <BottomUpModal shareInfo={snsShareObj} bottomUpClose={bottomUpClose} />}
    </>
  );
};

const QuizCardWrapper = styled.div`
  border-radius: 12px;
  position: relative;
  margin-bottom: 1rem;

  border: solid 1px #eee;

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
        #name-and-date {
          color: #888;
          font-size: 0.9rem;
        }
      }
      #quiz-title {
        font-size: 1rem;
        color: #595959;
        padding-bottom: 5px;
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
    margin: 0 auto;
    color: #595959;
  }
`;

const ProfileImgWrapper = styled.div`
  width: 28px;
  height: 28px;
  margin-right: 10px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
`;

/* 썸네일 유무에 따라 스타일을 다르게 변경 할 예정 */
interface QuizInfoChipsProps {
  isThumbnail: boolean;
}
const QuizInfoChips = styled.div<QuizInfoChipsProps>`
  display: flex;

  ${(props) =>
    props.isThumbnail
      ? css`
          align-items: end;
          justify-content: right;
          height: inherit;
          padding-right: 3%;
          padding-bottom: 2%;
        `
      : css`
          padding-top: 8px;
        `};
  .chip {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 15px;
    border: ${(props) => (props.isThumbnail ? 'solid 1px #ffffff20' : 'solid 1px #eee')};
    background-color: ${(props) => (props.isThumbnail ? '#00000070' : '#fff')};
    color: ${(props) => (props.isThumbnail ? '#fff' : '#888')};
    font-size: 0.9rem;
    padding: 4px 12px 4px 12px;
  }
`;

/* 썸네일 유무에 따라 스타일을 다르게 변경 할 예정 */
interface ThumbnailWrapperProps {
  thumbnailURL: string;
}

const ThumbnailWrapper = styled.div<ThumbnailWrapperProps>`
  width: 100%;
  height: 200px;
  background-image: ${(props) => css`url(${props.thumbnailURL})`};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  @media (max-width: 390px) {
    /* 화면이 작아지는 break-point 로 설정 */
    height: 150px;
  }
  #quiz-info-chips {
    display: flex;
    position: absolute;
    right: 2%;
    top: calc(170px + 2%);
    @media (max-width: 390px) {
      /* 화면이 작아지는 break-point 로 설정 */
      top: calc(120px + 2%);
    }
    #quiz-solver {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 15px;
      border: solid 1px #ffffff20;
      background-color: #00000070;
      color: #fff;
      font-size: 0.9rem;
      padding: 4px 12px 4px 12px;
    }
  }
  /* img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
  } */
`;
export default QuizCard;
