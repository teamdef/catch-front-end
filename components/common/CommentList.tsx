import styled, { keyframes } from 'styled-components';
import { NotFound } from 'components/common';
import { timeForToday } from 'utils/date';

interface CommentBoardProps {
  commentList: CommentType[] | null;
}
const CommentList = ({ commentList }: CommentBoardProps) => {
  return (
    <CommentBoardWrapper>
      {commentList ? (
        commentList.length !== 0 ? (
          commentList.map((comment: CommentType, index: number) => (
            <CommentBox key={index}>
              <img src={comment.user ? comment.user.profileImg : '/assets/img/user_default.png'}></img>
              <div>
                <span className="nickname">{comment.nickname}</span>
                <span className="date">· {timeForToday(comment.createdAt)}</span>
                <p>{comment.content}</p>
              </div>
            </CommentBox>
          ))
        ) : (
          <NotFound title={'아직 작성된 한줄평이 없습니다 😶'} subTitle={'한줄평이 작성될 때 까지 기다려볼까요?'}/>
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
  display:block;
  background-color: #fff;
  width: 100%;
  overflow-y:scroll;
  height: 60vh;
  padding-top: 20px;
  margin-bottom: 80px;
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
    object-fit:cover;
  }
  > div {
    position: relative;
    display: block;
    span {
      position: relative;
      display: inline-block;
      font-size: 0.85rem;
      margin: 4px 0 8px 0;
      &.date {
        padding-left: 5px;
        color: #acacac;
      }
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
