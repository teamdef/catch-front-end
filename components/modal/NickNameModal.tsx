import React, { useEffect, RefObject, useRef, MouseEvent } from 'react';
import styled from 'styled-components';
import { useInput } from 'hooks';
import { useSelector } from 'react-redux';
import Router from 'next/router';
import { RootState } from 'store';
import {AiOutlineClose} from 'react-icons/ai'
/* 이 Modal 컴포넌트는 ReactDom.createPortal 로 관리 될 예정임. */
interface NickNameProps {
  moveResult: (arg0: string) => void;
}
const NickNameModal = ({ moveResult }: NickNameProps) => {
  const { quizId } = useSelector((state: RootState) => state.solve);
  const [text, , clearFunction, textHandler] = useInput<string>('');
  return (
    <NickNameModalEl>
      <h1>닉네임을 입력해주세요</h1>
      <div>
        <input type="text" value={text} onChange={textHandler} placeholder="한글 최대 6자, 영어 최대 12자, 중복가능"/>
        <AiOutlineClose color="#bcbcbc" onClick={clearFunction}/>
      </div>
      <button
        onClick={() => {
          moveResult(text);
          Router.push(`/quiz/solve/${quizId}/result`);
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
    position:relative;
    display:flex;
    justify-content: space-between;
    margin: 15% 0 10%;
    padding: 10px 20px;
    padding-right: 10px;
    border-radius: 25px;
    border: 1px solid #CDCDCD;
    width: 225px;
    input {
      position:relative;
      font-size: .6rem;
      width: 100%;
      &::placeholder {color: #BCBCBC;}
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
