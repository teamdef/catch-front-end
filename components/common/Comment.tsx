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

const Comment = () => {
  const [text, , clearFunction, textHandler] = useInput<string>('');
  // get 요청 예정 !!!
  const { problemSetId } = useSelector((state: RootState) => state.solve);
  const { solveUserName } = useSelector((state: RootState) => state.user_solve);
  const [comments, setComments] = useState<CommentType[]>([]);

  useEffect(() => {
    CommentListApi(problemSetId).then((res) => {
      setComments(res.data);
      console.log(res);
    });
  }, []);

  const saveComment = async (_comm: string) => {
    if (_comm) {
      clearFunction;
      CommentSaveApi(solveUserName, text, problemSetId, '').then((res) => {
        setComments(res.data);
      });
    }
  };
  console.log(comments);
  return (
    <Container>
      {comments && (
        <>
          <Title>
            한줄평 남기기 <span style={{ fontSize: '1rem' }}>{comments.length}</span>
          </Title>
          <InputBox>
            <span>({text.length}/50)</span>
            <input
              type="text"
              value={text}
              onChange={textHandler}
              id="comment-input"
              maxLength={50}
              placeholder="나도 한마디.."
            />
            <button onClick={() => saveComment(text)}>등록</button>
          </InputBox>
          <CommentList commentList={comments} />
          {/* {comments && comments.length !== 0 ? (
            <CommentList commentList={comments} />
          ) : (
            <CommentEmpty>
              <span>아직 한줄평이 없어요 !</span>
            </CommentEmpty>
          )} */}
          {/* <button className="more">더보기</button> */}
        </>
      )}
    </Container>
  );
};
const Container = styled.div`
  position: relative;
  width: 100%;
  margin-top: 10%;
`;
const Title = styled.h2`
  font-size: 1rem;
  color: #ff4d57;
  font-weight: bold;
`;
const InputBox = styled.div`
  position: relative;
  display: flex;
  margin-top: 5%;
  > span {
    position: absolute;
    font-size: 0.6rem;
    color: #aaa;
    bottom: 4px;
    right: 54px;
  }
  input {
    background-color: #f4f4f4;
    outline: none;
    flex-grow: 1;
    height: 60px;
    border: none;
    padding: 0 5%;
    color: #888;
    border-radius: 4px 0 0 4px;
    ::placeholder {
      color: #aaa;
    }
  }
  button {
    position: relative;
    word-break: keep-all;
    width: 50px;
    border: none;
    font-weight: 500;
    background-color: #ff4d57;
    color: #fff;
    border-radius: 0 4px 4px 0;
    padding: 0 10px;
    right: 0;
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
