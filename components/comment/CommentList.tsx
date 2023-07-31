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
  display: flex;
  width: 100%;
`;
export default CommentList;
