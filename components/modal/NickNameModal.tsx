import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useInput } from 'hooks';
import { AiOutlineClose } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
import { saveSolveUserNameAction } from 'store/user_solve';
import { RootState } from 'store';
import saveScore from 'utils/score';

const NickNameModal = ({ setLoading }: any) => {
  const dispatch = useDispatch();
  const { isLoggedin, nickName } = useSelector((state: RootState) => state.user);
  const [_nickname, _nicknameSetter, _nicknameClearFunction, _nicknameHandler] = useInput<string>('');

  const checkNickname = () => {
    if (_nickname && _nickname.length <= 12) {
      saveScore(_nickname);
      dispatch(saveSolveUserNameAction({ solveUserName: _nickname }));
      setLoading(true);
    } else if (_nickname.length > 13) {
      alert('닉네임이 너무 길어요 !');
    }
  };

  // 로그인 환경일 경우 닉네임 default 넣어주기
  useEffect(() => {
    if (isLoggedin) _nicknameSetter(nickName);
  }, []);

  return (
    <NickNameModalEl>
      <h1>닉네임을 입력해주세요</h1>
      <div>
        <input
          type="text"
          value={_nickname}
          onChange={_nicknameHandler}
          placeholder="한글 최대 6자, 영어 최대 12자, 중복가능"
        />
        {_nickname && <AiOutlineClose color="#bcbcbc" onClick={_nicknameClearFunction} />}
      </div>

      <button disabled={_nickname === ''} onClick={checkNickname}>
        확인
      </button>
    </NickNameModalEl>
  );
};
const NickNameModalEl = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  h1 {
    margin: 0;
    font-weight: normal;
    font-size: 1.25rem;
  }

  > div {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 5% 0 10%;
    padding: 10px 20px;
    padding-right: 15px;
    border-radius: 25px;
    border: 1px solid #cdcdcd;
    width: 80%;
    @media (max-width: 390px) {
      width: 95%;
    }
    height: 40px;
    input {
      position: relative;
      font-size: 1rem;
      width: 100%;
      &::placeholder {
        color: #bcbcbc;
      }
      border: none;
      outline-style: none;
      padding: 0;
    }
  }
  button {
    width: 50%;
    padding: 10px;
    background-color: #ff4d57;
    color: #fff;
    border: 0;
    border-radius: 30px;
    &:disabled {
      background: #aaa;
    }
    &:hover {
      cursor: pointer;
    }
  }
`;

export default NickNameModal;
