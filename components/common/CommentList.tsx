import styled from 'styled-components'
interface CommentType {
  content: string;
  created_at: string;
  nickname: string;
  user: any;
}
interface CommentBoardProps {
  commentList: CommentType[];
}
const CommentList = ({ commentList }: CommentBoardProps) => {
  return (
    <CommentBoardWrapper>
      {commentList.length !== 0 &&
        commentList.map((item: any, index: number) => (
          <CommentBox key={index}>
            <img src={item.img ? item.img : '/assets/img/user_default.png'}></img>
            <div>
              <span className="nickname">{item.nickname}</span>
              <p>{item.content}</p>
            </div>
            <span className="date">{item.created_at.substr(0, item.created_at.indexOf('T'))}</span>
          </CommentBox>
        ))}
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
      margin: 4px 0 8px 0;
    }
    p {
      display: block;
      padding: 15px 18px;
      font-size: 0.9rem;
      background: #f4f4f4;
      border-radius: 0px 15px 15px 15px;
      line-height: 1.2rem;
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

export default CommentList;
