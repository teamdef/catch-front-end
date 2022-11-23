import * as S from 'styles/quiz/create/index.style'
import { ReactElement, useEffect } from 'react';
import type { NextPageWithLayout } from 'pages/_app';
import { AppLayout } from 'components/layout';
import { Logo,HeadMeta } from 'components/common';
import useInput from 'hooks/useInput';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { saveProblemsAction, saveProblemSetTitleAction } from 'store/quiz';
import Router, { useRouter } from 'next/router';
import { BsCheck } from 'react-icons/bs';
import { MdClear } from 'react-icons/md';
import { useModal } from 'hooks';
import { MainButton } from 'styles/common';
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
    noAction: () => {
      dispatch(saveProblemSetTitleAction({ setTitle: '' })); // 제목 저장
      dispatch(saveProblemsAction({ problems: [] })); // 빈 배열로 초기화
    },
    contents: (
      <div>
        <div>
          제작하던 <strong style={{ color: '#ff4d57' }}>{setTitle}</strong>
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
      <S.Wrapper>
        <S.TitleContainer>
          <div id="logo-wrapper">
            <Logo color={'#fff'} />
          </div>
          <div id="title-input-wrapper">
            <span>참여자들에게 어떤 제목으로 보여줄까요?</span>
            <S.TitleInput>
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
            </S.TitleInput>
          </div>
        </S.TitleContainer>
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
        <S.ButtonContainer>
          <MainButton onClick={goQuizCreateMain} disabled={title === ''}>
            <span>시작하기</span>
          </MainButton>
        </S.ButtonContainer>
      </S.Wrapper>
      <Render제작중있음Modal />
    </>
  );
};
Page.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};

export default Page;
