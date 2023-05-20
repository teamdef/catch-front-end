import styled from 'styled-components';
import { NotFound } from 'components/common';
import CommentItem from 'components/comment/CommentItem';

interface CommentBoardProps {
  commentList: CommentType[] | null;
}
const CommentList = ({ commentList }: CommentBoardProps) => {
  return (
    <CommentBoardWrapper>
      {commentList && (
        commentList.length !== 0 ? (
          commentList.map((comment: CommentType, index: number) => (
            <CommentItem key={index} comment={comment}/>
          ))
        ) : (
          <NotFound title={'아직 작성된 한줄평이 없습니다 😶'} subTitle={'한줄평이 작성될 때 까지 기다려볼까요?'}/>
        ))}
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
  padding: 20px 4% 0;
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

export default CommentList;
