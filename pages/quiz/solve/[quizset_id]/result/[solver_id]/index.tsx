import { ReactElement, useEffect } from 'react';
import styled from 'styled-components';
import { Emotion, NotFound } from 'components/common';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { NextPageWithLayout } from 'pages/_app';
import { AppLayout, HeaderLayout } from 'components/layout';
import { theme } from 'styles/theme';
import UserScore from 'components/partials/solve/result/UserScore';
import Sketchbook from 'components/style/Sketchbook';
import Comment from 'components/comment/Comment';
import { ShareModalBtn } from 'components/share';
import { RankingBoard } from 'components/ranking';
import { useRouter } from 'next/router';

const Page: NextPageWithLayout = () => {
  const { solveUserName, solveUserScore } = useSelector((state: RootState) => state.user_solve);
  const { quizList } = useSelector((state: RootState) => state.solve);
  const isValid = solveUserScore !== undefined;
  const router = useRouter();
  const { quizset_id, solver_id } = router.query;

  useEffect(() => {
    // 뒤로가기 막기 (router query 할당 이전 함수 실행 방지)
    if (quizset_id && solver_id) {
      router.beforePopState(({ as }) => {
        if (as !== router.asPath) {
          window.history.pushState('', '');
          router.push(router.asPath);
          return false;
        }
        return true;
      });
    }
    return () => {
      router.beforePopState(() => true);
    };
  }, [quizset_id, solver_id]);
  return (
    <>
      {!isValid && <NotFound text="잘못된 접근이에요!" />}
      {isValid && (
        <Sketchbook>
          <Wrapper>
            <UserScore name={solveUserName} score={solveUserScore} total={quizList.length} />
            <RankingBoard />
            <Emotion />
            <ShareModalBtn />
            <Comment />
          </Wrapper>
        </Sketchbook>
      )}
    </>
  );
};

const Wrapper = styled.div`
  position: relative;
  margin-top: 56px;
  margin-bottom: 12px;
`;

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <AppLayout bgColor={theme.colors.primary_bg}>
      <HeaderLayout bgColor={theme.colors.primary_bg}>{page}</HeaderLayout>
    </AppLayout>
  );
};
export default Page;
