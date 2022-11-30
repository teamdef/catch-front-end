import axios from 'axios';
import { useInput } from 'hooks';
import styled from 'styled-components';

const Comment = () => {
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
  const commList = [
    {
      uid: 'asdqwc23d2d2s21d33dse-e2d',
      nickname: '배따라기',
      comm: '와재미따와재미따와재미따와재미따와재미따와재미따와재미따와재미따와재미따와재미따',
      time: '2022-11-29',
    },
    {
      uid: 'ggkfkfs21d33dse--df22',
      nickname: '진따라기',
      comm: '개꿀잼',
      time: '2022-11-30',
    },
  ];
  return (
    <Container>
      <Title>
        한줄평 남기기 <span style={{ fontSize: '.7rem' }}>({commList.length})</span>
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
        {commList.length !== 0 ? (
          commList.map((item: any, index: number) => (
            <CommentBox>
              <img src={item.img ? item.img : '/assets/img/user_default.png'}></img>
              <div>
                <span className="nickname">{item.nickname}</span>
                <p>{item.comm}</p>
              </div>
              <span className="date">{item.time}</span>
            </CommentBox>
          ))
        ) : (
          <div className="empty">
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
  margin-top: 5%;
  .empty {
    margin: 20% 0;
    text-align: center;
    span {
      font-size: 0.9rem;
      color: #888;
    }
  }
`;
const CommentBox = styled.div`
  position: relative;
  display: flex;
  color: #555;
  font-size: .8rem;
  margin-bottom: 5%;
  img {
    position:relative;
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
      font-size: .7rem;
      background: #f4f4f4;
      border-radius: 0px 15px 15px 15px;
    }
  }
  .date {
    position:relative;
    display: block;
    color: #888;
    font-size: 0.5rem;
    white-space: nowrap;
    align-self: flex-end;
    padding-left: 5px;
  }
`;
export default Comment;
