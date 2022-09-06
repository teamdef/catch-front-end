import { ReactElement } from 'react';
import styled from 'styled-components';
import type { NextPageWithLayout } from 'pages/_app';
import { AppLayout } from 'components/layout';
import { Button } from 'components/common';
import useInput from 'hooks/useInput';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { saveProblemsAction, saveProblemSetTitleAction } from 'store/quiz';
import Router from 'next/router';
import { BsCheck } from 'react-icons/bs';
import { IoIosArrowForward } from 'react-icons/io';

const Page: NextPageWithLayout = () => {
  const dispatch = useDispatch();
  const [title, , , titleHandler] = useInput<string>('');
  const { setTitle } = useSelector((state: RootState) => state.quiz);

  const newStart = () => {
    dispatch(saveProblemSetTitleAction({ setTitle: title })); // 제목 저장
    dispatch(saveProblemsAction({ problems: [] })); // 빈 배열로 초기화
    Router.push('/quiz/create');
  };
  const keepGoing = () => {
    Router.push('/quiz/create');
  }
  return (
    <Wrapper>
      <div id="title">
        <span>참여자들에게 어떤 제목으로 보여줄까요?</span>
        <input type="text" placeholder="제목을 입력해주세요!" value={title} onChange={titleHandler} maxLength={30} />
      </div>
      <ul className="notice">
        <li>
          <BsCheck size="20" color="#ff4d57" />
          문제 생성은 <strong>최대 10개</strong> 까지 가능합니다.
        </li>
        <li>
          <BsCheck size="20" color="#ff4d57" />
          제목 입력은 필수입니다! <strong>최대 20자</strong> 까지 입력 가능합니다.
        </li>
        <li>
          <BsCheck size="20" color="#ff4d57" />
          객관식 답안은 <strong>최대 4개</strong> 까지 추가할 수 있습니다
        </li>
        <li>
          <BsCheck size="20" color="#ff4d57" />
          참여자들에게 보여지는 제목인 만큼 유해한 단어는 지양해주세요!
        </li>
      </ul>
      <ButtonContainer>
        <Button width={'60%'} height={'60px'} onClick={newStart} disabled={title === ''}>
          <span>새롭게 시작하기</span>
          <IoIosArrowForward />
        </Button>
        <Button width={'60%'} height={'60px'} onClick={keepGoing} className="active" disabled={setTitle === ''}>
          <span>이어서 만들기</span>
          <IoIosArrowForward />
        </Button>
      </ButtonContainer>
    </Wrapper>
  );
};
Page.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};

// 임시 디자인
const Wrapper = styled.div`
  position: relative;
  display: block;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  color: #000;
  background-color: white;
  #warning {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
    color: red;
  }
  * {
    margin: 0 auto;
  }
  #title {
    position: relative;
    display: block;
    width: 100%;
    height: 35%;
    text-align: center;
    font-size: 1rem;
    color: #fff;
    overflow: hidden;
    span {
      position: relative;
      display: block;
      margin-top: 60px;
      margin-bottom: 30px;
      z-index: 1;
    }
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      background-color: #ff4d57;
      border-bottom-right-radius: 50%;
      border-bottom-left-radius: 50%;
      display: block;
      width: 500px;
      height: 100%;
    }
  }
  input {
    position: relative;
    border: 0;
    border-bottom: 2px solid #fff;
    background-color: transparent;
    display: block;
    max-width: 300px;
    width: 80%;
    color: #fff;
    font-size: 1rem;
    height: 50px;
    text-align: center;
    &:focus {
      outline: none;
    }
    &::placeholder {
      font-size: 1.5rem;
      opacity: 0.5;
      color: #fff;
    }
    &::-webkit-search-cancel-button {
      /* 이 부분을 custom  하여 clear 버튼을 꾸밀 수 있음... 쉽진 않네  */
    }
  }
  .notice {
    padding: 0 10%;
    margin: 15% 0;
    li {
      position: relative;
      font-size: 0.9rem;
      color: #888;
      list-style: none;
      padding-left: 10%;
      margin-bottom: 10%;
      word-break: keep-all;
      strong {
        color: #ff4d57;
      }
      svg {
        position: absolute;
        left: 0;
      }
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  @media (max-width: 400px), (max-height:850px) {
    flex-direction: row;
  }
  button {
    margin: 0.5rem;
    position: relative;
    width: 50%;
    span {
      padding-right: 10%;
    }
    background-color: #ff4d57;
    color: #fff;
    &:disabled,
    &[disabled] {
      color: #999;
      background-color: lightgrey;
    }

    svg {
      position: absolute;
      top: 50%;
      right: 10%;
      transform: translateY(-50%);
      display: block;
    }
  }
`;
export default Page;
