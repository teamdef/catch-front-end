import { useInput } from 'hooks';
import styled from 'styled-components';
import ModalPortal from 'components/modal/PortalWrapper';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { CommentSaveApi, CommentListApi } from 'pages/api/quiz';
import React, { useEffect, useState } from 'react';
import CommentList  from 'components/comment/CommentList';

interface propsCommentType {
  hideInput?: boolean;
  setIsOpen?: ()=>void;
}

const Comment = ({ hideInput, setIsOpen }: propsCommentType) => {

  const [commentInput, , commentInputClear, commentInputHandler] = useInput<string>('');

  const { quizSetId } = useSelector((state: RootState) => state.solve);
  const { solveUserName } = useSelector((state: RootState) => state.user_solve);
  const [commentList, setCommentList] = useState<CommentType[]>([]);
  const { isLoggedin, profileImg, userId } = useSelector((state: RootState) => state.user);

  const userImgError = (e: any) => {
    e.target.src = '/assets/img/user_default.png';
  };

  const fetchCommentList = async () => {
    try {
      const res = await CommentListApi(quizSetId);
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

  const saveComment = async() => {
      try {
        const res = await CommentSaveApi(solveUserName, commentInput, quizSetId, isLoggedin && userId);
        parseCommentList(res.data);
        commentInputClear();
      } catch (err) {
        console.log(err);
      }
  };

  useEffect(() => {
    fetchCommentList();
  }, [quizSetId]);

  return (
    <ModalPortal wrapperId="react-portal-modal-container">
      <Container>
        {commentList && (
          <>
            {/* <Bg onClick={() => setIsOpen(false)} /> */}
            <Wrapper>
              {/* <CloseButton onClick={() => setIsOpen(false)}>▾</CloseButton> */}
              <CommentList commentList={commentList} />
              {!hideInput && (
                <InputBox>
                  <img src={profileImg || '/assets/img/user_default.png'} onError={userImgError} />
                  <input
                    type="text"
                    value={commentInput}
                    onChange={commentInputHandler}
                    id="comment-input"
                    maxLength={50}
                    placeholder="한줄평 남기기..."
                  />
                  <button  disabled={commentInput.length === 0 } onClick={saveComment}>
                    등록
                  </button>
                </InputBox>
              )}
            </Wrapper>
          </>
        )}
      </Container>
    </ModalPortal>
  );
};

const CommentInputContainer = styled.div`
  
  
`
const Container = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: end;
  left: 50%;
  transform: translateX(-50%);
  top: 0;
  max-width: 480px;
  width: 100%;
  height: 100%;
  z-index: 9999;
`;
const Bg = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  display: block;
  background-color: #000;
  opacity: 0.5;
`;
const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  @keyframes ani {
    0% {
      transform: translateY(100%);
    }
    100% {
      transform: translateY(0);
    }
  }
  animation: ani 0.5s;
`;
const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 100%;
  height: 20px;
  background-color: #ff4d57;
  color: #fff;
  font-size: 1.5rem;
  border: none;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  padding: 0;
`;

const Title = styled.h2`
  position: relative;
  display: block;
  font-size: 1.25rem;
  color: #ff4d57;
  font-weight: bold;
  width: 100%;
  align-items: center;
  span {
    position: absolute;
    padding: 2px;
    border-radius: 50%;
    color: #fff;
    top: -7px;
    font-size: 0.7rem;
    left: 18px;
  }
  img {
    margin-left: 5px;
    width: 14px;
    height: 14px;
  }
`;
const InputBox = styled.div`
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  background-color: #fff;
  z-index: 1;
  box-shadow: 0px 0px 15px #eee;
  img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    margin-left: 3%;
    object-fit: cover;
  }
  > span {
    position: absolute;
    font-size: 0.6rem;
    color: #aaa;
  }
  input {
    background-color: #f4f4f4;
    margin-left: 10px;
    margin-right: 3%;
    outline: none;
    flex-grow: 1;
    height: 56px;
    border: none;
    padding: 0 5%;
    color: #888;
    border-radius: 30px;
    font-size: 1rem;
    ::placeholder {
      color: #aaa;
    }
  }
  button {
    position: absolute;
    word-break: keep-all;
    height: 40px;
    right: calc(3% + 8px);
    border: none;
    padding: 0 20px;
    font-weight: 500;
    font-size: 1rem;
    background-color: #ccc;
    color: #fff;
    border-radius: 30px;
    &.on {
      background-color: #ff4d57;
    }
  }
`;

const CommentEmpty = styled.div`
  margin: 20% 0;
  text-align: center;
  span {
    font-size: 0.9rem;
    color: #888;
  }
`;
export default Comment;
