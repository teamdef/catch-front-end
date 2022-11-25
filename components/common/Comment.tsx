import { useInput } from 'hooks';
import styled from 'styled-components';
const Comment = () => {

  const commCount = 232;

  const [text, Setter, clearFunction, textHandler] = useInput<string>('');

  const postComment = (_comm:string) => {

  } 
  return (<CommentArea>
      <h2>
        한줄평 남기기 <span style={{ fontSize: '.7rem' }}>({commCount})</span>
      </h2>
      <div>
        <span>({text.length}/50)</span>
        <input
          type="text"
          value={text}
          onChange={textHandler}
          id="comment-input"
          maxLength={50}
          placeholder="나도 한마디.."
        />
        <button onClick={() => postComment(text)}>등록</button>
      </div>
      </CommentArea>)
};
const CommentArea = styled.div`
  position: relative;
  width: 100%;
  h2 {
    font-size: 0.9rem;
    color: #ff4d57;
  }
  div {
    position:relative;
    display: flex;
    > span {
    position: absolute;
    font-size: .6rem;
    color: #aaa;
    bottom: 100%;
    right: 4px;
    }
    input {
      background-color: #f4f4f4;
      width: 100%;
      height: 40px;
      border: none;
      padding: 0 5%;
      color: #888;
      border-radius: 4px;
      ::placeholder {
        color: #aaa;
      }
    }
    button {
      position: relative;
      word-break: keep-all;
      border: none;
      font-weight: 500;
      background-color: #ff4d57;
      color: #fff;
      border-radius: 0 4px 4px 0;
      padding: 0 10px;
      right: 0;
    }
  }
`;
export default Comment;