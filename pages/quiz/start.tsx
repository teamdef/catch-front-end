import { ReactElement } from 'react';
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
  const [setTitle,,,setTitleHandler] = useInput<string>('');
  
  const saveTitle = () => {
    dispatch(saveProblemSetTitleAction({ userId, setTitle })); // 제목 저장
    Router.push('/quiz/create')
  }
  return (
    <Wrapper>
      <div id="title">문제집 만들기</div>
      <input
        type="text"
        placeholder="문제집 제목을 입력하세요 !! "
        value={setTitle}
        onChange={setTitleHandler}
        maxLength={30}
      />
      <p>문제집 이름 미입력시 빈 값으로 생성됩니다</p>
      <Button width={'300px'} height={'50px'} onClick={saveTitle}>START</Button>
    </Wrapper>
  );
};
Page.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};

// 임시 디자인
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;

  * {
    margin-bottom: 5rem;
  }
  #title {
    font-size: 20px;
    font-weight: bold;
  }
  input {
    border-radius: 1rem;
    border: solid 1px #d6d6d6;
    width: 500px;
    height: 50px;
    text-align: center;
  }
  button {
  }
`;
export default Page;
