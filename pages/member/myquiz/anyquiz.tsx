import { Loading } from 'components/common';
import { AppLayout, HeaderLayout } from 'components/layout';
import AnyQuizListWrapper from 'components/partials/member/myquiz/AnyQuizListWrapper';
import EmptyQuiz from 'components/partials/member/myquiz/EmptyQuiz';
import HeaderContentWrapper from 'components/style/HeaderContentWrapper';
import { UserQuizListApi } from 'pages/api/quiz';
import { ReactElement, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import styled from 'styled-components';

const Page = () => {
  const { userId } = useSelector((state: RootState) => state.user);
  const [userAnyQuiz, setUserAnyQuiz] = useState([]);
  const [loading, setLoading] = useState(false);
  const getUserAnyQuiz = async (_userId: string) => {
    setLoading(true);
    try {
      const res = await UserQuizListApi(_userId);
      setUserAnyQuiz(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) getUserAnyQuiz(userId);
  }, [userId]);
  if (loading) return <Loading text="퀴즈를 불러오는 중 입니다." />;
  return (
    <HeaderContentWrapper>
      <Title>모두의 퀴즈</Title>
      {userAnyQuiz[0] && <AnyQuizListWrapper userAnyQuiz={userAnyQuiz} />}
      {!userAnyQuiz[0] && <EmptyQuiz />}
    </HeaderContentWrapper>
  );
};

const Title = styled.div`
  padding: 14px 0;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-size: ${({ theme }) => theme.fontSize.subtitle_2};
  color: ${({ theme }) => theme.colors.blackColors.grey_900};
`;

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <AppLayout>
      <HeaderLayout>{page}</HeaderLayout>
    </AppLayout>
  );
};

export default Page;
