import Floating from 'components/common/Floating';
import { AppLayout, HeaderLayout } from 'components/layout';
import HeaderContentWrapper from 'components/style/HeaderContentWrapper';
import { ReactElement } from 'react';
import styled from 'styled-components';

const Page = () => {
  return (
    <HeaderContentWrapper>
      <Title>모두의 퀴즈</Title>
      <Empty>
        <Text>등록된 퀴즈가 없습니다.</Text>
        <Button>퀴즈 만들기</Button>
        <Floating />
      </Empty>
    </HeaderContentWrapper>
  );
};

const Title = styled.div`
  padding: 14px 0;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-size: ${({ theme }) => theme.fontSize.subtitle_2};
  color: ${({ theme }) => theme.colors.blackColors.grey_900};
`;
const Empty = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  padding-bottom: 52px;
`;
const Text = styled.div`
  color: ${({ theme }) => theme.colors.blackColors.grey_900};
  padding: 7px 0;
`;
const Button = styled.div``;

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <AppLayout>
      <HeaderLayout>{page}</HeaderLayout>
    </AppLayout>
  );
};

export default Page;
