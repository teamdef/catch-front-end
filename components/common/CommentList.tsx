import styled,{keyframes} from 'styled-components';
import { NotFound } from 'components/common';
interface CommentType {
  content: string;
  created_at: string;
  nickname: string;
  user: any;
}
interface CommentBoardProps {
  commentList: CommentType[] | null;
}
const CommentList = ({ commentList }: CommentBoardProps) => {
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
    <CommentBoardWrapper>
      {commentList ? (
        commentList.length !== 0 ? (
          commentList.map((item: any, index: number) => (
            <CommentBox key={index}>
              <img src={item.img ? item.img : '/assets/img/user_default.png'}></img>
              <div>
                <span className="nickname">{item.nickname}</span>
                <p>{item.content}</p>
              </div>
              <span className="date">{timeForToday(item.created_at)}</span>
            </CommentBox>
          ))
        ) : (
          <NotFound title={'아직 작성된 한줄평이 없습니다 😶'} subTitle={'한줄평이 작성될 때 까지 기다려볼까요?'} />
        )
      ) : (
        <div>
          <SkeletonCommentBox>
            <div id="img-container"></div>
            <div>
              <span className="nickname"></span>
              <p></p>
            </div>
            <span className="date"></span>
          </SkeletonCommentBox>
          <SkeletonCommentBox>
            <div id="img-container"></div>
            <div>
              <span className="nickname"></span>
              <p></p>
            </div>
            <span className="date"></span>
          </SkeletonCommentBox>
          <SkeletonCommentBox>
            <div id="img-container"></div>
            <div>
              <span className="nickname"></span>
              <p></p>
            </div>
            <span className="date"></span>
          </SkeletonCommentBox>
        </div>
      )}
    </CommentBoardWrapper>
  );
};

const CommentBoardWrapper = styled.div`
  position: relative;
  margin-top: 5%;
  width: 100%;

  .more {
    border: none;
    width: 100%;
    padding: 5px;
    margin: 5% 0;
    border-radius: 10px;
    background-color: #fff6f7;
  }
`;
const gradient = keyframes` 
  0% {background-color: rgba(165, 165, 165, 0.1);}
  50% {background-color: rgba(165, 165, 165, 0.3);}
  100% {background-color: rgba(165, 165, 165, 0.1);}
`;
const CommentBox = styled.div`
  position: relative;
  display: flex;
  color: #555;
  font-size: 0.9rem;
  margin-bottom: 5%;
  img {
    position: relative;
    display: block;
    width: 38px;
    height: 38px;
    margin-right: 20px;
    border-radius: 50%;
  }
  > div {
    position: relative;
    display: block;
    span {
      display: block;
      font-size: .85rem;
      margin: 4px 0 8px 0;
    }
    p {
      display: block;
      padding: 15px 18px;
      font-size: 1rem;
      background: #f4f4f4;
      border-radius: 0px 15px 15px 15px;
      /*line-height: 1.2rem;*/

    }
  }
  .date {
    position: relative;
    display: block;
    color: #888;
    font-size: 0.5rem;
    white-space: nowrap;
    align-self: flex-end;
    padding-left: 5px;
  }
`;

const SkeletonCommentBox = styled(CommentBox)`
  #img-container {
    position: relative;
    display: block;
    width: 38px;
    height: 38px;
    margin-right: 20px;
    border-radius: 50%;
    background-color: #d6d6d6;
    animation: ${gradient} 1.5s linear infinite alternate;
  }
  > div {
    span {
      background-color: #d6d6d6;
      border-radius: 12px;
      width: 100px;
      height: 0.9rem;
      animation: ${gradient} 1.5s linear infinite alternate;
    }
    p {
      border-radius: 0px 15px 15px 15px;
      width: 200px;
      height: 50px;
      background-color: #d6d6d6;
      animation: ${gradient} 1.5s linear infinite alternate;
    }
  }
  .date {
    background-color: #d6d6d6;
    border-radius: 12px;
    width: 70px;
    height: 0.6rem;
    animation: ${gradient} 1.5s linear infinite alternate;
  }
`;

export default CommentList;
