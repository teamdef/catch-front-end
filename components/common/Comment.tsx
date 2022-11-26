import axios from 'axios';
import { useInput } from 'hooks';
import styled from 'styled-components';

const Comment = () => {
  const commCount = 0;

  const [text, Setter, clearFunction, textHandler] = useInput<string>('');

  const onClick = (_comm: string) => {
    const postComment = async () => {
      // if (_comm) {
      //   await axios.post(`${process.env.NEXT_PUBLIC_BACKEND}`, {
      //     comment: _comm
      //   }).then(()=> {
      //   });
      // }
    };
  };
  return (
    <Container>
      <Title>
        한줄평 남기기 <span style={{ fontSize: '.7rem' }}>({commCount})</span>
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
        <button onClick={() => onClick(text)}>등록</button>
      </InputBox>
      <CommentBoard>
        {commCount !== 0 ? (
          <></>
        ) : (
          <div className='empty'>
            <span>아직 한줄평이 없어요 !</span>
          </div>
        )}
      </CommentBoard>
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
  margin: 20% 0;
  .empty {
    text-align: center;
    span {
      font-size: .9rem;
      color: #888;
    }
  }
`;
export default Comment;
