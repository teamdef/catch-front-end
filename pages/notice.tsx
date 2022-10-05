import type { ReactElement } from 'react';
import type { NextPageWithLayout } from 'pages/_app';
import { AppLayout } from 'components/layout';
import { Title } from 'components/common';
import styled from 'styled-components';
const Page: NextPageWithLayout = () => {
  return (
    <>
      <Title backRoute="/home" title="공지사항 📣" subTitle="서비스 이용에 필요한 내용을 확인하세요" />
      <Wrapper>
        
      </Wrapper>
    </>
  );
};
Page.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};

const Wrapper = styled.div`
  width: 95%;
  margin: 0 auto;
  margin-bottom: 5rem;
`;

export default Page;
