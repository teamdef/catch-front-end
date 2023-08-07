import { AppLayout, HeaderLayout } from 'components/layout';
import EmptyQuiz from 'components/partials/member/myquiz/EmptyQuiz';
import HeaderContentWrapper from 'components/style/HeaderContentWrapper';
import { ReactElement } from 'react';
import styled from 'styled-components';

const Page = () => {
  return (
    <HeaderContentWrapper>
      <Title>모두의 퀴즈</Title>
      <EmptyQuiz />
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
