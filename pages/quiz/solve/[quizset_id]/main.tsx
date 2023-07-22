import type { ReactElement } from 'react';
import type { NextPageWithLayout } from 'pages/_app';
import * as S from 'styles/quiz/solve/main.style';
import { Sketchbook } from 'styles/common';
import { AppLayout, HeaderLayout } from 'components/layout';
import { QuizList } from 'components/common';
import { theme } from 'styles/theme';

const Page: NextPageWithLayout = () => {
  return (
    <S.Container>
      <Sketchbook>
        <QuizList />
      </Sketchbook>
    </S.Container>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <AppLayout bgColor={theme.colors.mintColor}>
      <HeaderLayout bgColor={theme.colors.mintColor}>{page}</HeaderLayout>
    </AppLayout>
  );
};
export default Page;
