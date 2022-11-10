import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useInput } from 'hooks';
import { AiOutlineClose } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
import { saveSolveUserNameAction } from 'store/quiz_solve';
import Router from 'next/router';
import { RootState } from 'store';
import axios from 'axios';

/* 이 Modal 컴포넌트는 ReactDom.createPortal 로 관리 될 예정임. */
interface NickNameProps {
  moveResult: (arg0: string) => void;
}

const NickNameModal = ({ setLoading }: any) => {
  const { solveUserScore, quizId } = useSelector((state: RootState) => state.solve);
  const { isLoggedin, nickName, id} = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const moveResult = (_nickname: string) => {
    /**  비동기로 풀이자 닉네임과 점수를 서버에 저장을 요청하는 함수 */
    async function postSolver() {
      // 로그인한 유저의 경우 유저아이디를 추가로 전달
      if (isLoggedin) {
        await axios
          .post(`${process.env.NEXT_PUBLIC_BACKEND}/solver`, {
            nickName: _nickname,
            score: solveUserScore,
            probsetId: quizId,
            userId: id,
          })
          .then(function () {
            setLoading(false);
            Router.push(`/quiz/solve/${quizId}/result/${id}`);
          })
          .catch(function (error) {
            setLoading(false);
            console.log(error);
          });
      } else {
        // 로그인하지 않은 유저의 경우 서버 저장 후 유저아이디를 응답 받음
        await axios
          .post(`${process.env.NEXT_PUBLIC_BACKEND}/solver`, {
            nickName: _nickname,
            score: solveUserScore,
            probsetId: quizId,
          })
          .then(function (response) {
            setLoading(false);
            Router.push(`/quiz/solve/${quizId}/result/${response.data.solverId}`);
          })
          .catch(function (error) {
            setLoading(false);
            console.log(error);
          });
      }
    }

    if (_nickname && _nickname.length <= 12) {
      postSolver();
      dispatch(saveSolveUserNameAction({ solveUserName: _nickname }));
      setLoading(true);
    } else if (_nickname.length > 13) {
      alert('닉네임이 너무 길어요 !');
    }
  };
  const [text, Setter, clearFunction, textHandler] = useInput<string>('');

  // 로그인 환경일 경우 닉네임 default 넣어주기
  useEffect(() => {
    if (isLoggedin) Setter(nickName);
  }, []);

  return (
    <NickNameModalEl>
      <h1>닉네임을 입력해주세요</h1>
      <div>
        <input type="text" value={text} onChange={textHandler} placeholder="한글 최대 6자, 영어 최대 12자, 중복가능" />
        {text && <AiOutlineClose color="#bcbcbc" onClick={clearFunction} />}
      </div>

      <button
        style={text == '' ? { backgroundColor: '#aaa' } : {}}
        onClick={() => {
          moveResult(text);
        }}
      >
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
  h1 {
    margin: 0;
    font-weight: normal;
    font-size: 1rem;
  }

  > div {
    position: relative;
    display: flex;
    justify-content: space-between;
    margin: 15% 0 10%;
    padding: 10px 20px;
    padding-right: 10px;
    border-radius: 25px;
    border: 1px solid #cdcdcd;
    width: 225px;
    input {
      position: relative;
      font-size: 0.6rem;
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
  }
`;

export default NickNameModal;
