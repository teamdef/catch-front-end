// 바텀업 모달임

import styled from 'styled-components';
import { useCallback, useEffect, useState } from 'react';
import CommentList from 'components/comment/CommentList';
import { CommentListApi } from 'pages/api/quiz';
import { useRouter } from 'next/router';
import Empty from 'components/style/Empty';
import CommentInput from './CommentInput';

const CommentModal = () => {
  const router = useRouter();
  const { quizset_id } = router.query; // [quizset_id]/result/[solver_id] 형태의 url에서 사용 가능
  const [comments, setComments] = useState<CommentType[]>([]);

  const commentsHandler = (_comments: CommentType[]) => {
    setComments(_comments);
  };
  const fetchCommentList = useCallback(async () => {
    try {
      const res = await CommentListApi(quizset_id as string);
      setComments(res);
    } catch (err) {
      console.log(err);
    }
  }, [quizset_id]);

  useEffect(() => {
    fetchCommentList();
  }, [quizset_id]);

  return (
    <Wrapper>
      <Title>한줄평</Title>
      {comments[0] && <CommentList comments={comments} />}
      {!comments[0] && <Empty>등록된 한줄평이 없습니다.</Empty>}
      <CommentInput commentsHandler={commentsHandler} />
    </Wrapper>
  );
};
const Wrapper = styled.div`
  position: relative;
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
`;
const Title = styled.div`
  font-size: ${({ theme }) => theme.fontSize.subtitle_2};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.blackColors.grey_900};
  height: 69px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: none;
`;

export default CommentModal;
