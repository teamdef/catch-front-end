import { ReactElement, useEffect, useState } from 'react';
import type { NextPageWithLayout } from 'pages/_app';
import { AppLayout, HeaderLayout } from 'components/layout';
import { Title, CommentList } from 'components/common';
import * as S from 'styles/quiz/detail/comment.style';
import { useRouter } from 'next/router';
import { CommentListApi } from 'pages/api/quiz';
// next.js 위한 라이브러리 및 타입
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
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

interface CommentType {
  content: string;
  created_at: string;
  nickname: string;
  user: any;
}
const Page: NextPageWithLayout = () => {
  const router = useRouter();
  let { quiz_id } = router.query;

  const [commentList, setCommentList] = useState<CommentType[] | null>(null);

  useEffect(() => {
    CommentListApi(quiz_id as string).then((res) => {
      setCommentList(res.data);
    });
  }, [router.isReady]);

  return (
    <S.Wrapper>
      <Title title="참여자 한줄평 ✍️" subTitle="참여자들이 남긴 퀴즈 한줄평은 어떨까요?👀" />
      <S.CommentListWrapper>
        <CommentList commentList={commentList} />
      </S.CommentListWrapper>
    </S.Wrapper>
  );
};
Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <AppLayout>
      <HeaderLayout>{page}</HeaderLayout>
    </AppLayout>
  );
};

export default Page;
