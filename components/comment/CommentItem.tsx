import styled from 'styled-components';
import { CommentType } from 'types/comment';
import { timeForToday } from 'utils/date';

const CommentItem = (props: { comment: CommentType }) => {
  return (
    <Wrapper>
      <div className="comment-profile">
        <img src={props.comment.user ? props.comment.user.profile_img : '/assets/img/user_default.png'}></img>
      </div>
      <div>
        <div className="comment-info">
          <span className="comment-nickname">{props.comment.nickname}</span>
          <span className="comment-date"> · {timeForToday(props.comment.created_at)}</span>
        </div>
        <div className="comment-content">{props.comment.content}</div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: start;
  margin-bottom: 30px;
  width: 100%;
  color: #595959;
  .comment-profile {
    margin-right: 18px;
    img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      object-fit: cover;
    }
  }
  > div {
    display: flex;
    flex-direction: column;
    align-items: start;

    .comment-info {
      margin-bottom: 8px;
      font-size: 0.85rem;
      .comment-date {
        color: #acacac;
      }
    }
    .comment_content {
      font-size: 1rem;
      font-weight: 400;
    }
  }
`;
export default CommentItem;
