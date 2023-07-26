import type { ReactElement } from 'react';
import type { NextPageWithLayout } from 'pages/_app';
import { AppLayout, HeaderLayout } from 'components/layout';
import { QuizList } from 'components/common';
import { theme } from 'styles/theme';
import styled from 'styled-components';
import Sketchbook from 'components/style/Sketchbook';

const Page: NextPageWithLayout = () => {
  return (
    <Container>
      <Sketchbook>
        <QuizList />
      </Sketchbook>
    </Container>
  );
};
const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
`;

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <AppLayout bgColor={theme.colors.mintColor}>
      <HeaderLayout bgColor={theme.colors.mintColor}>{page}</HeaderLayout>
    </AppLayout>
  );
};
export default Page;
