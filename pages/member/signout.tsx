/* react, next 관련 */
import { ReactElement, useEffect } from 'react';
import type { NextPageWithLayout } from 'pages/_app';
import { useState, ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
/* redux 관련 */
import { useDispatch } from 'react-redux';
import { kakaoLeaveApi } from 'pages/api/member';
import { logoutAction } from 'store/user';
/* 통신 */
import { ProfileChangeApi } from 'pages/api/member';
/* 컴포넌트 */
import { AppLayout } from 'components/layout';
import { Title, Loading } from 'components/common';

import * as S from 'styles/member/signout.style'; /* 스타일 코드 */
import { FlatButton } from 'styles/common';

export const getServerSideProps: GetServerSideProps = async ({ req, res }: GetServerSidePropsContext) => {
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
  const [isLoading, setIsLoading] = useState(false);

  const serviceLeave = () => {
    setIsLoading(true);
    kakaoLeaveApi().then((res) => {
      if (res.status === 200) {
        alert('성공적으로 회원 탈퇴 되었습니다.');
        dispatch(logoutAction()); // 로그아웃 처리. 쿠키 삭제
        router.push('/'); // 메인화면으로 이동
        setIsLoading(false);
      }
    });
  };

  const cancel = () => {
    router.push('/'); // 메인화면으로 이동
  };

  return (
    <>
      {isLoading && <Loading ment={'탈퇴 진행중 입니다...'} />}
      <S.Wrapper>
        <h3>탈퇴하시겠습니까?</h3>
        <p>
          저희 서비스를 탈퇴하신다니 너무 아쉽네요 😥 조금 더 보완된 기능과 서비스 품질로 다시 찾아뵐 수 있으면
          좋겠습니다.
        </p>
        <hr />
        <strong id="warning">아래 숙지 사항을 반드시 확인하여 주세요!</strong>
        <ul>
          <li>1. 회원 탈퇴 시 등록된 회원정보는 삭제되나, 등록된 게시글은 삭제되지 않고 유지됩니다.</li>
          <li>2. 사용자의 정보는 기본프로필사진, 탈퇴한사용자 로 표시됩니다.</li>
          <li>3. 데이터 삭제를 원하실 경우 모든 데이터를 삭제하신 후 탈퇴 부탁드립니다.</li>
        </ul>
        <div id="button-wrapper">
          <FlatButton onClick={cancel}>취소</FlatButton>
          <FlatButton onClick={serviceLeave}>탈퇴</FlatButton>
        </div>
      </S.Wrapper>
    </>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};

export default Page;
