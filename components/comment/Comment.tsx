import { useState, useEffect } from 'react';
import styled from 'styled-components';

import CommentItem from 'components/comment/CommentItem';
import CommentModal from 'components/comment/CommentModal';
import { CommentType } from 'types/comment';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { CommentListApi, CommentSaveApi } from 'pages/api/quiz';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

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
      parseCommentList(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const parseCommentList = (data: any) => {
    const _commentList = data.map((comment: any) => {
      const _comment: CommentType = {
        nickname: comment.nickname,
        content: comment.content,
        createdAt: comment.created_at,
        user: comment.user && { nickname: comment.user.nickname, profileImg: comment.user.profile_img },
      };
      return _comment;
    });
    setCommentList(_commentList);
  };

  const saveComment = async (commentInput: string) => {
    try {
      const res = await CommentSaveApi(solveUserName, commentInput, quizset_id as string, isLoggedin && userId);
      parseCommentList(res.data);
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
      <CommentTitle>
        <span className="section-title">한줄평</span>
        <span className="section-count">{commentList.length}</span>
      </CommentTitle>
      <CommentPreviewButton onClick={OpenComment}>
        {commentList.length !== 0 ? (
          <MoreCommentWrapper>
            <CommentItem
              comment={{
                nickname: commentList[0].nickname,
                createdAt: commentList[0].createdAt,
                content: commentList[0].content,
              }}
            />
            <MoreComment>
              <MdOutlineKeyboardArrowRight size={20} />
            </MoreComment>
          </MoreCommentWrapper>
        ) : (
          <EmptyComment>한줄평을 작성해볼까요?</EmptyComment>
        )}
      </CommentPreviewButton>
      {isOpen && <CommentModal onCloseModal={handleCloseModal} saveComment={saveComment} commentList={commentList} />}
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const CommentTitle = styled.div`
  margin-top: 20px;
  .section-title {
    font-size: 1.2rem;
    font-weight: 500;
    color: #212121;
  }
  .section-description {
    color: #616161;
    font-size: 0.85rem;
  }
  .section-count {
    font-size: 1.1rem;
    font-weight: 500;
    color: #424242;
    margin-left: 8px;
  }
`;
const CommentPreviewButton = styled.button`
  outline: none;
  border: none;
  background-color: transparent;
  cursor: pointer;
  width: 100%;
  text-align: left;
`;

const MoreCommentWrapper = styled.div`
  display: flex;
  margin-top: 20px;
`;

const MoreComment = styled.div`
  display: flex;
  align-items: center;
  color: #9e9e9e;
`;

const EmptyComment = styled.div`
  color: #616161;
  height:100px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export default Comment;
