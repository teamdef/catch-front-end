import type { ReactElement } from 'react';
import type { NextPageWithLayout } from 'pages/_app';
import { AppLayout, HeaderLayout } from 'components/layout';
import { Button } from 'components/common';
import styled from "styled-components"
const Home: NextPageWithLayout = () => {
  return (
    <Background>
      <div>생성한 퀴즈가 없어여!</div>
      <Button bgColor="#9437FF" fontColor="white" width="10rem" height="3rem">
        새로 만들기
      </Button>
    </Background>
  );
};

const Background = styled.div`
  background-color: #f5f5f5;
`;
Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <AppLayout>
      <HeaderLayout>{page}</HeaderLayout>
    </AppLayout>
  );
};

export default Home;
