import CommentItem from 'components/comment/CommentItem';
import { CommentType } from 'types/comment';
import { NotFound } from 'components/common';
import styled from 'styled-components';

const CommentList = (props: { commentList: CommentType[] }) => {
  return (
    <Wrapper>
      {props.commentList.length === 0 && (
        <NotFound title={'아직 작성된 한줄평이 없습니다 😶'} subTitle={'한줄평이 작성될 때 까지 기다려볼까요?'} />
      )}
      {props.commentList.length !== 0 &&
        props.commentList.map((comment: CommentType, idx: number) => {
          return <CommentItem comment={comment} key={`comment-${idx}`} />;
        })}
    </Wrapper>
  );
};

const Wrapper = styled.div``;
export default CommentList;
