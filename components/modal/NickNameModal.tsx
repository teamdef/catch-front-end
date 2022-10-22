import React from 'react';
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
  const dispatch = useDispatch();

  const moveResult = (_nickname: string) => {
    dispatch(saveSolveUserNameAction({ solveUserName: _nickname }));
    setLoading(true);
    async function postSolver() {
      await axios
        .post('https://api.catchcatch.link/v1/solver', {
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
    postSolver();
  };

  const [text, , clearFunction, textHandler] = useInput<string>('');

  return (
    <NickNameModalEl>
      <h1>닉네임을 입력해주세요</h1>
      <div>
        <input type="text" value={text} onChange={textHandler} placeholder="한글 최대 6자, 영어 최대 12자, 중복가능" />
        <AiOutlineClose color="#bcbcbc" onClick={clearFunction} />
      </div>
      <button
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
