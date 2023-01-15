import { useInput } from 'hooks';
import styled from 'styled-components';

import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { CommentSaveApi, CommentListApi } from 'pages/api/quiz';
import { useEffect, useState } from 'react';

import { CommentList } from 'components/common';

interface CommentType {
  content: string;
  created_at: string;
  nickname: string;
  user: any;
}
interface propsCommentType {
  hideInput?: boolean;
}

const Comment = ({ hideInput }: propsCommentType) => {
  const [text, , clearFunction, textHandler] = useInput<string>('');
  // get 요청 예정 !!!
  const { problemSetId } = useSelector((state: RootState) => state.solve);
  const { solveUserName } = useSelector((state: RootState) => state.user_solve);
  const [comments, setComments] = useState<CommentType[]>([]);

  useEffect(() => {
    CommentListApi(problemSetId).then((res) => {
      setComments(res.data);
    });
  }, [problemSetId]);
  const saveComment = async (_comm: string) => {
    if (_comm) {
      clearFunction();
      CommentSaveApi(solveUserName, text, problemSetId, '').then((res) => {
        setComments(res.data);
      });
    }
  };
  return (
    <Container>
      {comments && (
        <>
          <Title>
            {hideInput ? '베스트 한줄평' : '한줄평'}
            <img src="/assets/img/chat.png" />
          </Title>
          {hideInput ? (
            ''
          ) : (
            <InputBox>
              <img src="/assets/img/user_default.png" alt="" />
              {/* <span>({text.length}/50)</span> */}
              <input
                type="text"
                value={text}
                onChange={textHandler}
                id="comment-input"
                maxLength={50}
                placeholder="나도 한마디.."
              />
              <button className={text ? 'on': ''} onClick={() => saveComment(text)}>등록</button>
            </InputBox>
          )}
          <CommentList commentList={comments} />
        </>
      )}
    </Container>
  );
};
const Container = styled.div`
  position: relative;
  width: 100%;
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
    font-size: 1.25rem;
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
    font-size: 1.25rem;
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
