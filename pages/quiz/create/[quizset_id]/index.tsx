import { AppLayout, HeaderLayout } from 'components/layout';
import ImageSetter from 'components/common/ImageSetter';
import { ShareBox } from 'components/share';
import Torn from 'components/style/Torn';
import { useRouter } from 'next/router';
import { NextPageWithLayout } from 'pages/_app';
import { ReactElement, useEffect, useState } from 'react';
import styled from 'styled-components';
import { theme } from 'styles/theme';
import { QuizDataFetchApi } from 'pages/api/quiz';

const Page: NextPageWithLayout = () => {
  const router = useRouter();
  const { quizset_id } = router.query;
  const [quizSetTitle, setQuizSetTitle] = useState<string>('');
  const [quizSetThumb, setQuizSetThumb] = useState<string>('');

  const fetchDetailQuizData = async () => {
    try {
      const res = await QuizDataFetchApi(quizset_id as string);
      const { set_title, thumbnail } = res.data;
      setQuizSetTitle(set_title);
      setQuizSetThumb(thumbnail);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (quizset_id) fetchDetailQuizData();
  }, [router.isReady]);
  return (
    <Torn marginTop="16px">
      <Content>
        <Title>퀴즈 완성!</Title>
        <Description>
          퀴즈가 생성되었습니다.
          <br />
          퀴즈 수정은 마이페이지 &#62; 내가 만든 퀴즈에서 가능합니다.
        </Description>
        <QuizTitle>{quizSetTitle}</QuizTitle>
        <ImageSetter quizSetThumb={quizSetThumb} quizSetId={quizset_id as string} />
        <ShareText>친구들에게 내가 만든 퀴즈를 공유해보세요!</ShareText>
        <ShareBox quizSetThumb={quizSetThumb} />
      </Content>
    </Torn>
  );
};

const Content = styled.div`
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 66px;
`;
const Title = styled.h2`
  position: relative;
  color: ${theme.colors.secondary_500};
  font-size: ${theme.fontSize.header_5};
  font-weight: ${theme.fontWeight.bold};
`;
const Description = styled.p`
  margin-top: 8px;
  text-align: center;
  font-size: ${theme.fontSize.caption};
  color: ${theme.colors.blackColors.grey_900};
  font-weight: ${theme.fontWeight.light};
`;
const QuizTitle = styled.h3`
  margin-top: 20px;
  margin-bottom: 16px;
  font-size: ${theme.fontSize.body_1};
  color: ${theme.colors.blackColors.grey_900};
  font-weight: ${theme.fontWeight.bold};
`;
const ShareText = styled.p`
  margin-top: 54px;
  margin-bottom: 20px;
  font-size: ${theme.fontSize.body_2};
  color: ${theme.colors.blackColors.grey_500};
`;
Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <AppLayout bgColor={theme.colors.primary_bg}>
      <HeaderLayout bgColor={theme.colors.primary_bg}>{page}</HeaderLayout>
    </AppLayout>
  );
};

export default Page;
