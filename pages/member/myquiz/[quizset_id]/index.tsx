import { Loading } from 'components/common';
import { AppLayout, HeaderLayout } from 'components/layout';
import DetailQuizInfo from 'components/partials/member/myquiz/DetailQuizInfo';
import Torn from 'components/style/Torn';
import { useRouter } from 'next/router';
import { MyQuizDetailApi } from 'pages/api/quiz';
import { ReactElement, useEffect, useState } from 'react';
import styled from 'styled-components';
import { theme } from 'styles/theme';
import { parseBestCommentList, parseBestRankingList, parseDetailQuiz } from 'utils/quiz';

const Page = () => {
  const router = useRouter();
  const { quizset_id } = router.query;
  const [quizDetailData, setQuizDetailData] = useState<DetailQuizType | null>(null);
  const [quizRankingList, setQuizRankingList] = useState<RankingType[] | null>(null);
  const [quizCommentList, setQuizCommentList] = useState<CommentType[] | null>(null);

  const fetchDetailQuizData = async (_quizset_id: string) => {
    try {
      const res = await MyQuizDetailApi(_quizset_id);
      const { quizset, best_solver, best_comment } = res.data;
      setQuizRankingList(parseBestRankingList(best_solver));
      setQuizCommentList(parseBestCommentList(best_comment));
      setQuizDetailData(parseDetailQuiz(quizset));
    } catch (err) {
      console.log(err);
    }
  };

  console.log(quizDetailData, quizRankingList, quizCommentList);
  useEffect(() => {
    if (quizset_id) fetchDetailQuizData(quizset_id as string);
  }, [router.isReady]);

  if (!quizDetailData || !quizRankingList || !quizCommentList) return <Loading />;
  return (
    <Wrapper>
      <Title>퀴즈 자세히 보기</Title>
      <Torn>
        <Content>
          <DetailQuizInfo detail={quizDetailData} />
        </Content>
      </Torn>
    </Wrapper>
  );
};
const Wrapper = styled.div``;
const Title = styled.h2`
  padding: 14px 0;
  color: ${theme.colors.blackColors.grey_900};
  font-weight: ${theme.fontWeight.bold};
  font-size: ${theme.fontSize.subtitle_2};
`;
const Content = styled.div``;

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <AppLayout bgColor={theme.colors.primary_bg}>
      <HeaderLayout bgColor={theme.colors.primary_bg}>{page}</HeaderLayout>
    </AppLayout>
  );
};

export default Page;
