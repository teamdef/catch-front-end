import { ReactElement, useState, useEffect } from 'react';
import styled from 'styled-components';
import type { NextPageWithLayout } from 'pages/_app';
import { AppLayout } from 'components/layout';
import { Button } from 'components/common';
import useInput from 'hooks/useInput';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { saveProblemsAction, saveProblemSetTitleAction } from 'store/quiz';
import Router, { useRouter } from 'next/router';
import { BsCheck } from 'react-icons/bs';
import { MdClear } from 'react-icons/md';
import { useModal } from 'hooks';

// next.js 위한 라이브러리 및 타입
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

export const getServerSideProps: GetServerSideProps = async ({ req, res, params }: GetServerSidePropsContext) => {
  // 클라이언트는 여러 대지만 서버는 한대이기 때문에 서버 사용한 쿠키는 반드시 제거해 줘야 한다
  const cookie = req ? req?.headers?.cookie : null;
  if (cookie) {
    let match = cookie.match(new RegExp('(^| )' + 'access_token' + '=([^;]+)'));
    // 쿠키가 적용되어 있다면 (로그인 상태라면)
    if (!!match === false) {
      res.statusCode = 302;
      res.setHeader('Location', `/`);
      res.end();
    }
  } else {
    res.statusCode = 302;
    res.setHeader('Location', `/`);
    res.end();
  }
  return { props: {} };
};
const Page: NextPageWithLayout = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [title, , titleClear, titleHandler] = useInput<string>('');
  const { setTitle, problems } = useSelector((state: RootState) => state.quiz);
  const [open제작중있음Modal, , Render제작중있음Modal] = useModal({
    yesTitle: '이어서',
    noTitle: '새롭게',
    yesAction: () => router.push('/quiz/create/main'),
    contents: (
      <div>
        <div>
          제작하던<strong style={{ color: '#ff4d57' }}>{setTitle}</strong>
          <br />
          문제집이 있습니다
        </div>
        <div style={{ marginTop: '10px', fontSize: '12px', color: '#999' }}>이어서 제작하시겠습니까?</div>
      </div>
    ),
  });

  const goQuizCreateMain = () => {
    // 시작하기 클릭해서 제작을 시작할 땐, 무조건 초기화 해줌
    dispatch(saveProblemSetTitleAction({ setTitle: title })); // 제목 저장
    dispatch(saveProblemsAction({ problems: [] })); // 빈 배열로 초기화
    Router.push('/quiz/create/main');
  };
  const goHome = () => {
    Router.push('/');
  };

  // 기존에 제작하던 문제집의 유무를 확인하고 팝업을 띄운다.
  useEffect(() => {
    const storage = globalThis?.sessionStorage; // sesstion storage 를 가져옴
    const prevPath = storage.getItem('prevPath'); // prevPath 라고 하는 key 의 value 를 가져옴 . 현재 router 의 이전 router
    if (prevPath) {
      if (problems.length !== 0) {
        // 제작 중이던 문제가 있을 경우
        open제작중있음Modal();
      }
    }
    // 이 페이지에 최초 접속하였는데, 만들던 데이터가 있다면
    else if (!prevPath) {
      if (problems.length !== 0) {
        open제작중있음Modal();
      }
    }
  }, []);
  return (
    <>
      <Wrapper>
        <TitleContainer>
          <div id="logo-wrapper">
            <div id="logo" onClick={goHome}>
              캐치캐치
            </div>
          </div>
          <div id="title-input-wrapper">
            <span>참여자들에게 어떤 제목으로 보여줄까요?</span>
            <TitleInput>
              <input
                type="text"
                placeholder="제목을 입력해주세요!"
                value={title}
                onChange={titleHandler}
                maxLength={20}
              />
              <button id="clear-btn" onClick={titleClear} disabled={title === ''}>
                <MdClear size={20} />
              </button>
            </TitleInput>
          </div>
        </TitleContainer>
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
            객관식 답안은 <strong>최대 4개</strong> 까지 추가할 수 있습니다.
          </li>
          <li>
            <BsCheck size="20" color="#ff4d57" />
            참여자들에게 보여지는 퀴즈이므로, <strong>유해한 단어는 지양</strong>해주세요!
            <br />
            (ex. 욕설, 미풍약속을 해치는 단어 )
          </li>
          <li>
            <BsCheck size="20" color="#ff4d57" />
            생성한 퀴즈는 수정이 불가능 합니다.
          </li>
        </ul>
        <ButtonContainer>
          <Button width={'90%'} onClick={goQuizCreateMain} disabled={title === ''}>
            <span>시작하기</span>
          </Button>
        </ButtonContainer>
      </Wrapper>
      <Render제작중있음Modal/>
    </>
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

  .notice {
    padding: 0 10%;
    margin: 15% 0;
    @media (max-height: 700px) {
      margin: 10% 0;
      li {
        margin-bottom: 5%;
      }
    }
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

const TitleContainer = styled.div`
  overflow: hidden;
  position: relative;
  display: block;
  width: 100%;
  height: 35%;
  #logo-wrapper {
    padding: 1.5rem;
    text-align: left;
    position: relative;
    background-color: transparent;
    z-index: 2;
    #logo {
      color: #fff;
      font-size: 1.5rem;
      font-family: 'RixInooAriDuriR';
      &:hover {
        cursor: pointer;
        color: lightgrey;
      }
    }
  }
  #title-input-wrapper {
    color: #fff;
    span {
      text-align: center;
      position: relative;
      display: block;
      margin-top: 15px;
      margin-bottom: 15px;
      z-index: 2;
    }
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
    width: 600px;
    height: 100%;
    z-index: 1;
  }
`;
const TitleInput = styled.div`
  z-index: 2;
  display: flex;
  position: relative;
  border-bottom: 2px solid #fff;
  max-width: 70%;
  input {
    height: 50px;
    border: 0;
    width: 85%;
    background-color: transparent;
    color: #fff;
    font-size: 1rem;
    text-align: center;
    &:focus {
      outline: none;
    }
    &::placeholder {
      font-size: 20px;
      font-weight: 300;
      opacity: 0.5;
      color: #fff;
    }
  }
  #clear-btn {
    margin: 0;
    height: 50px;
    background-color: transparent;
    border: none;
    color: #fff;
    &:disabled {
      display: none;
    }
    svg {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1rem 0 1rem;
  background-color: #fff;
  padding: 1rem;
  position: absolute;
  width: 100%;
  bottom: 0;
  button {
    bottom: 0;
    font-size: 14px;
    border-radius: 30px;
    height: 50px;
    box-shadow: 0 4px #c4363e;
    font-weight: bold;
    margin-right: 0.5rem;
    margin-left: 0.5rem;
    background-color: #ff4d57;
    color: #fff;
    &:disabled {
      color: #7c7c7c;
      background-color: #ececec;
      box-shadow: 0 4px lightgrey;
    }
  }
`;

export default Page;
