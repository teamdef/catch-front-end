import { AppLayout, HeaderLayout } from 'components/layout';
import { useRouter } from 'next/router';
import { useEffect, ReactElement, SyntheticEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { NextPageWithLayout } from 'pages/_app';
import { RootState } from 'store';
import { QuizDataFetchApi } from 'pages/api/quiz';
import { saveSolveProblemSetAction, resetSolveAction, saveSolveAnswersAction } from 'store/quiz_solve';
import { resetUserDataAction } from 'store/user_solve';
import { theme } from 'styles/theme';
import styled from 'styled-components';
import Sketchbook from 'components/style/Sketchbook';
import { LargeContainedBtn } from 'components/style/button';
import { useQuery } from '@tanstack/react-query';
import { parseSolveQuizSet } from 'utils/quiz';
import { Loading } from 'components/common';

const Page: NextPageWithLayout = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { quizset_id } = router.query;
  const { setTitle, quizList, quizSetThumbnail, desc } = useSelector((state: RootState) => state.solve);
  const { isLoading, data } = useQuery({
    queryKey: ['fetchQuizSet'],
    queryFn: () => QuizDataFetchApi(),
    select: (_data) => parseSolveQuizSet(_data.data),
  });

  const moveMain = () => {
    router.push(`/quiz/solve/${quizset_id}/main`);
  };
  const handleImgError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = '/assets/img/rebranding/anyquiz/defaultThumb.svg';
  };

  useEffect(() => {
    dispatch(resetSolveAction());
    dispatch(resetUserDataAction());
  }, []);

  useEffect(() => {
    if (data) {
      dispatch(saveSolveProblemSetAction(data));
      dispatch(saveSolveAnswersAction({ answerList: Array(data.quizList.length).fill(5) }));
    }
  }, [data]);

  if (isLoading) return <Loading text="퀴즈를 불러오는 중 입니다." />;

  return (
    <Sketchbook>
      <Wrapper>
        <QuizTitle>{setTitle}</QuizTitle>
        <QuizThumbnail src={quizSetThumbnail} onError={handleImgError} />
        <Description>{desc}</Description>
        <QuizCount>
          총<b>{quizList?.length}</b>문제
        </QuizCount>
        <LargeContainedBtn onClick={moveMain}>시작하기</LargeContainedBtn>
      </Wrapper>
    </Sketchbook>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 56px;
  padding-bottom: 48px;
`;

const QuizTitle = styled.h1`
  position: relative;
  color: #000;
  text-align: center;
  font-size: ${theme.fontSize.subtitle_2};
  font-style: normal;
  font-weight: ${theme.fontWeight.bold};
`;

const QuizThumbnail = styled.img`
  position: relative;
  display: block;
  margin-top: 42px;
  width: 100%;
  aspect-ratio: 310 / 192;
  object-fit: contain;
  margin-bottom: 38px;
`;

const Description = styled.p`
  color: ${theme.colors.blackColors.grey_700};
  text-align: center;
  word-break: keep-all;
  max-height: 63px;
  font-size: ${theme.fontSize.body_2};
`;

const QuizCount = styled.div`
  position: relative;
  margin-top: 40px;
  margin-bottom: 48px;
  color: ${theme.colors.blackColors.grey_800};
  font-size: ${theme.fontSize.caption};
  font-weight: ${theme.fontWeight.regular};
  b {
    color: ${theme.colors.blackColors.grey_900};
    font-size: ${theme.fontSize.body_1};
    margin: 0 10px;
  }
  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: calc(100% + 4px);
    transform: translateX(-50%);
    display: block;
    width: 128px;
    height: 1px;
    background-color: ${theme.colors.secondary_300};
  }
`;

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <AppLayout bgColor={theme.colors.primary_bg}>
      <HeaderLayout bgColor={theme.colors.primary_bg}>{page}</HeaderLayout>
    </AppLayout>
  );
};
export default Page;
