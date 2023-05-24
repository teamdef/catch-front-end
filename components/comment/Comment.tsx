import { useState } from 'react';
import styled from 'styled-components';

import CommentItem from 'components/comment/CommentItem';
import CommentModal from 'components/comment/CommentModal';

import { MdOutlineKeyboardArrowRight } from 'react-icons/md';

// 미리보기용 한줄평 1개를 클릭하면 자세히 볼 수 있는 바텀업이 올라오는 컴포넌트임.
const Comment = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpenModal = () => setIsOpen(true);
  const handleCloseModal = () => setIsOpen(false);

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
      <CommentPreviewButton onClick={OpenComment}>
        <MoreCommentWrapper>
          <CommentItem
            comment={{
              nickname: '블라블라',
              createdAt: '2023-05-19T12:34:56Z',
              content: '댓그르르르르르르르르르르르르르르르르르르르르르르르르르르',
            }}
          />
          <MoreComment>
            <MdOutlineKeyboardArrowRight size={20} />
          </MoreComment>
        </MoreCommentWrapper>
      </CommentPreviewButton>
      {isOpen && <CommentModal onCloseModal={handleCloseModal} />}
    </Wrapper>
  );
};

const Wrapper = styled.div``;

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
`;

const MoreComment = styled.div`
  display: flex;
  align-items: center;
  color: #9e9e9e;
`;
export default Comment;
