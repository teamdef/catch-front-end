import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { CommentListApi } from 'pages/api/quiz';
import { useRouter } from 'next/router';
import { theme } from 'styles/theme';
import { useModal } from 'hooks';
import { CommentItem, CommentModal } from '.';

// 미리보기용 한줄평 1개를 클릭하면 자세히 볼 수 있는 바텀업이 올라오는 컴포넌트임.
const Comment = () => {
  const router = useRouter();
  const [commentList, setCommentList] = useState<CommentType[]>([]);
  const { quizset_id } = router.query; // [quizset_id]/result/[solver_id] 형태의 url에서 사용 가능
  const [openModal, , RenderModal] = useModal({
    escClickable: true,
    backgroundClickable: true,
    bottomSheet: true,
    contents: <CommentModal />,
  });

  const fetchCommentList = useCallback(async () => {
    try {
      const res = await CommentListApi(quizset_id as string);
      setCommentList(res);
    } catch (err) {
      console.log(err);
    }
  }, [quizset_id]);

  useEffect(() => {
    fetchCommentList();
  }, [quizset_id]);

  return (
    <Wrapper>
      <CommentHeader>
        <HeaderLeft>
          <Title>한줄평</Title>
          <Count>{commentList.length}</Count>
        </HeaderLeft>
        <More onClick={openModal}>더보기</More>
      </CommentHeader>
      {commentList[0] && <CommentItem comment={commentList[0]} />}
      {!commentList[0] && <Empty>등록된 한줄평이 없습니다.</Empty>}
      <RenderModal />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 48px;
`;

const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 13px;
`;
const HeaderLeft = styled.div`
  display: flex;
  align-items: baseline;
`;
const Title = styled.h1`
  color: ${theme.colors.blackColors.grey_900};
  font-weight: ${theme.fontWeight.bold};
  font-size: ${theme.fontSize.body_1};
`;
const Count = styled.span`
  margin-left: 8px;
  color: ${theme.colors.blackColors.grey_800};
  font-size: ${theme.fontSize.caption};
`;
const More = styled.button`
  color: ${theme.colors.secondary_300};
  font-size: ${theme.fontSize.caption};
  background-color: transparent;
  padding: 8px 12px;
`;

const Empty = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 25px;
  margin-bottom: 40px;
  color: ${theme.colors.blackColors.grey_500};
  font-size: ${theme.fontSize.caption};
`;
export default Comment;
