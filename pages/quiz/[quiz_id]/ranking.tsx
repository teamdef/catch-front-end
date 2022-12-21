import type { ReactElement } from 'react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import type { NextPageWithLayout } from 'pages/_app';
import { useRouter } from 'next/router';
import { AppLayout } from 'components/layout';
import { Title, NotFound } from 'components/common';
import * as S from 'styles/quiz/detail/ranking.style';
/*
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
};*/
const Page: NextPageWithLayout = () => {
  const router = useRouter();
  let { quiz_id } = router.query;

  return (
    <>
      <Title
        isBack={true}
        title="참여자 랭킹 🏆"
        subTitle="참여자 모두의 랭킹을 확인해보세요! 누가 가장 많이 맞췄을까요?"
      />
      <S.Wrapper>
        {quiz_id}{' '}
        <NotFound title={'아직 퀴즈에 참여한 유저가 없습니다 😶'} subTitle={'퀴즈집을 공유하여 다같이 풀어보세요!'} />
      </S.Wrapper>
    </>
  );
};
Page.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};

export default Page;
