import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { ReactElement, useEffect, useState } from 'react';
import type { NextPageWithLayout } from 'pages/_app';
import { useRouter } from 'next/router';
import { AppLayout, HeaderLayout } from 'components/layout';
import { Title, RankingBoard } from 'components/common';
import * as S from 'styles/quiz/detail/ranking.style';
import { QuizRankingListApi } from 'pages/api/quiz';

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
  const router = useRouter();
  const [rankingList, setRankingList] = useState<RankingType[] | null>(null);
  let { quizset_id } = router.query;

  const fetchRankingList = async () => {
    try {
      const res = await QuizRankingListApi(quizset_id as string);
      parseRankingList(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const parseRankingList = (data: any) => {
    const _rankingList = data.map((ranking: any) => {
      const _ranking: RankingType = {
        nickname: ranking.nickname,
        score: ranking.score,
        ranking: ranking.ranking,
        quizCount:ranking.quiz_count
      };
      return _ranking;
    });
    setRankingList(_rankingList);
  };
  useEffect(() => {
    if (!!quizset_id) fetchRankingList();
  }, [router.isReady]);

  return (
    <>
      <Title title="참여자 랭킹 🏆" subTitle="참여자 모두의 랭킹을 확인해보세요! 누가 가장 많이 맞췄을까요?" />
      <S.Wrapper>
        <RankingBoard rankingList={rankingList} />
      </S.Wrapper>
    </>
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
