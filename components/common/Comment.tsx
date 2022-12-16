import axios from 'axios';
import { useInput } from 'hooks';
import styled from 'styled-components';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store';
import { CommentSaveApi,CommentListApi } from 'pages/api/quiz';
import { useEffect, useState } from 'react';
const Comment = () => {
  const [text, , , textHandler] = useInput<string>('');
  const dispatch = useDispatch();
  // get 요청 예정 !!!
  const { problemSetId } = useSelector((state: RootState) => state.solve);
  const { solveUserName } = useSelector((state: RootState) => state.user_solve);
  const [comments, setComments ] = useState<string[]>([]);
  useEffect(()=> {
    CommentListApi(problemSetId).then((res)=> {
      setComments(res.data);
      console.log(res);
    });
  },[])
  const saveComment = async (_comm: string) => {
    if (_comm) {
      CommentSaveApi(solveUserName, text, problemSetId)
        .then((res) => {
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
            한줄평 남기기 <span style={{ fontSize: '.7rem' }}>{comments.length}</span>
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
          <CommentBoard>
            {comments && comments.length !== 0 ? (
              comments.map((item: any, index: number) => (
                <CommentBox key={index}>
                  <img src={item.img ? item.img : '/assets/img/user_default.png'}></img>
                  <div>
                    <span className="nickname">{item.nickname}</span>
                    <p>{item.content}</p>
                  </div>
                  <span className="date">{item.created_at.substr(0, item.created_at.indexOf('T'))}</span>
                </CommentBox>
              ))
            ) : (
              <div className="empty">
                <span>아직 한줄평이 없어요 !</span>
              </div>
            )}
            {/* <button className="more">더보기</button> */}
          </CommentBoard>
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
  font-size: 0.9rem;
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
    flex-grow: 1;
    height: 40px;
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
const CommentBoard = styled.div`
  position: relative;
  margin-top: 5%;
  .empty {
    margin: 20% 0;
    text-align: center;
    span {
      font-size: 0.9rem;
      color: #888;
    }
  }
  .more {
    border: none;
    width: 100%;
    padding: 5px;
    margin: 5% 0;
    border-radius: 10px;
    background-color: #fff6f7;
  }
`;
const CommentBox = styled.div`
  position: relative;
  display: flex;
  color: #555;
  font-size: 0.8rem;
  margin-bottom: 5%;
  img {
    position: relative;
    display: block;
    width: 38px;
    height: 38px;
    margin-right: 20px;
    border-radius: 50%;
  }
  > div {
    position: relative;
    display: block;
    span {
      display: block;
      margin: 4px 0 8px 0;
    }
    p {
      display: block;
      padding: 15px 18px;
      font-size: 0.7rem;
      background: #f4f4f4;
      border-radius: 0px 15px 15px 15px;
    }
  }
  .date {
    position: relative;
    display: block;
    color: #888;
    font-size: 0.5rem;
    white-space: nowrap;
    align-self: flex-end;
    padding-left: 5px;
  }
`;
export default Comment;
