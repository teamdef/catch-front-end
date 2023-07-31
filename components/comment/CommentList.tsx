import CommentItem from 'components/comment/CommentItem';
import styled from 'styled-components';

const CommentList = (props: { comments: CommentType[] }) => {
  return (
    <Wrapper>
      {props.comments.map((comment: CommentType, idx: number) => {
        return <CommentItem comment={comment} key={`comment-${idx}`} />;
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 74px;
  padding-left: 24px;
  padding-right: 15px;
  overflow-y: scroll;
`;
export default CommentList;
