import { ReactElement, useState } from 'react';
import styled from 'styled-components';
import type { NextPageWithLayout } from 'pages/_app';
import { AppLayout } from 'components/layout';
import { Button } from 'components/common';
import useInput from 'hooks/useInput';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { saveProblemSetTitleAction } from 'store/quiz';
import Router from 'next/router';

const Page: NextPageWithLayout = () => {
  const { userId } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const [setTitle, , , setTitleHandler] = useInput<string>('');
  
  const saveTitle = () => {
    if (setTitle.length < 2) {
      return;
    }
    dispatch(saveProblemSetTitleAction({ userId, setTitle })); // 제목 저장
    Router.push('/quiz/create');
  };
  return (
    <Wrapper>
      <div id="title">퀴즈 생성</div>
      <input type="text" placeholder="제목 입력.." value={setTitle} onChange={setTitleHandler} maxLength={30} />
      {setTitle.length < 2 ? (<p id="warning">
        제목을 2글자 이상 입력해주세요!
      </p>) : null}
      <Button width={'300px'} height={'50px'} onClick={saveTitle} className={setTitle.length >= 2 ? 'active' : ''}>
        START
      </Button>
    </Wrapper>
  );
};
Page.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};

// 임시 디자인
const Wrapper = styled.div`
  display: block;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  color: #000;
  #warning {
    position:absolute;
    left:50%;
    transform:translateX(-50%);
    white-space: nowrap;
    color: red;
  }
  * {
    margin: 0 auto;
    text-align: center;
  }
  #title {
    position: relative;
    display: block;
    width: 100%;
    height: 30%;
    background-color: #ffde6d;
    padding-top: 10%;
    text-align: center;
    font-size: 1.5rem;
    font-weight: bold;
  }
  input {
    position: relative;
    border: 3px solid #ffde6d;
    top: -28px;
    display: block;
    border-radius: 20px;
    width: 80%;
    font-size: 1rem;
    height: 50px;
    text-align: center;
  }
  button {
    position: relative;
    margin-top: 30%;
    color: #999;
    &.active {
      background-color: #ffde6d;
      color: #000;
    }
    display: block;
  }
`;
export default Page;
