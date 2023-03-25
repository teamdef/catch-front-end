import { useInput } from 'hooks';
import styled from 'styled-components';

import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { CommentSaveApi, CommentListApi } from 'pages/api/quiz';
import React, { useEffect, useState } from 'react';

import { CommentList } from 'components/common';

interface propsCommentType {
  hideInput?: boolean;
}

const Comment = ({ hideInput }: propsCommentType) => {
  const [text, , textClear, textHandler] = useInput<string>('');
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

  const saveComment = async (_comm: string) => {
    if (!!_comm) {
      try {
        const res = await CommentSaveApi(solveUserName, text, quizSetId, isLoggedin ? userId : null);
        parseCommentList(res.data);
        textClear();
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    fetchCommentList();
  }, [quizSetId]);

  return (
    <Container>
      {commentList && (
        <>
          <Title>
            {hideInput ? '베스트 한줄평' : '한줄평'}
            <img src="/assets/img/chat.png" />
          </Title>
          {!hideInput && (
            <InputBox>
              <img src={profileImg || '/assets/img/user_default.png'} onError={userImgError} />
              <input
                type="text"
                value={text}
                onChange={textHandler}
                id="comment-input"
                maxLength={50}
                placeholder="나도 한마디.."
              />
              <button className={text && 'on'} onClick={() => saveComment(text)}>
                등록
              </button>
            </InputBox>
          )}
          <CommentList commentList={commentList} />
        </>
      )}
    </Container>
  );
};
const Container = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 40px;
`;
const Title = styled.h2`
  display: flex;
  font-size: 1.25rem;
  color: #ff4d57;
  font-weight: bold;
  align-items: center;
  span {
    position: absolute;
    padding: 2px;
    border-radius: 50%;
    color: #ff4d57;
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
  position: fixed;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  max-width: 480px;
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
