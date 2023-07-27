import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { CommentListApi, CommentSaveApi } from 'pages/api/quiz';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { theme } from 'styles/theme';
import { CommentItem, CommentModal } from '.';

// 미리보기용 한줄평 1개를 클릭하면 자세히 볼 수 있는 바텀업이 올라오는 컴포넌트임.
const Comment = () => {
  const router = useRouter();
  const { quizset_id } = router.query; // [quizset_id]/result/[solver_id] 형태의 url에서 사용 가능
  const { isLoggedin, userId } = useSelector((state: RootState) => state.user);
  const { solveUserName } = useSelector((state: RootState) => state.user_solve);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [commentList, setCommentList] = useState<CommentType[]>([]);

  const handleOpenModal = () => setIsOpen(true);
  const handleCloseModal = () => setIsOpen(false);

  const fetchCommentList = async (id: string) => {
    try {
      const res = await CommentListApi(id);
      setCommentList(res);
    } catch (err) {
      console.log(err);
    }
  };

  const saveComment = async (commentInput: string) => {
    try {
      const res = await CommentSaveApi(solveUserName, commentInput, quizset_id as string, isLoggedin && userId);
      setCommentList(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCommentList(quizset_id as string);
  }, [quizset_id]);

  const OpenComment = () => {
    // 한줄평 모달 오픈 시 부모 컴포넌트 스크롤 막기
    if (isOpen) {
      document.body.style.cssText = `
      overflow-y: hidden;
      touch-action: none;
      `;
      window.scrollTo(0, 0);
    } else {
      document.body.style.cssText = `
      overflow-y: auto;`;
    }
    handleOpenModal();
  };

  return (
    <Wrapper>
      <CommentHeader>
        <HeaderLeft>
          <Title>한줄평</Title>
          <Count>{commentList.length}</Count>
        </HeaderLeft>
        <More onClick={OpenComment}>더보기</More>
      </CommentHeader>
      {commentList[0] && <CommentItem comment={commentList[0]} />}
      {!commentList[0] && <EmptyComment>한줄평을 작성해볼까요?</EmptyComment>}
      {isOpen && <CommentModal onCloseModal={handleCloseModal} saveComment={saveComment} commentList={commentList} />}
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

const EmptyComment = styled.div`
  color: #616161;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export default Comment;
