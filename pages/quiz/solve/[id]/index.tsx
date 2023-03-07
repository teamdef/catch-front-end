import * as S from 'styles/quiz/solve/index.style';
import { AppLayout } from 'components/layout';
import { useRouter } from 'next/router';
import { useEffect, useState, ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { NextPageWithLayout } from 'pages/_app';
import { RootState } from 'store';
import { MainButton } from 'styles/common';
import { Loading, Logo, SNSShare, Comment } from 'components/common';
import { AiOutlineShareAlt } from 'react-icons/ai';
import { QuizDataFetchApi } from 'pages/api/quiz';
import { saveSolveProblemSetAction, resetSolve } from 'store/quiz_solve';

const Page: NextPageWithLayout = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { solveProblemSetTitle, solveProblems, maker, thumbnail } = useSelector((state: RootState) => state.solve);
  const [loading, setLoading] = useState<boolean>(false);
  const [description, setDescription] = useState<string>('');
  let { id } = router.query;
  useEffect(() => {
    dispatch(resetSolve());
  }, []);

  // id 값이 변경될 시
  useEffect(() => {
    setLoading(true);
    if (id) {
      QuizDataFetchApi(id as string)
        .then((res) => {
          dispatch(
            saveSolveProblemSetAction({
              solveProblemSetTitle: res?.data?.set_title,
              problemSetId: id as string,
              solveProblems: res?.data?.prob,
              maker: res?.data?.user?.nickname,
              thumbnail: res?.data?.thumbnail,
            }),
          );
          setDescription(res?.data?.description); // 퀴즈 설명
          setLoading(false);
          // 정답 배열 생성
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [router.isReady]);

  return (
    <>
      {loading ? <Loading /> : ''}
      <S.Container>
        <Logo />
        <S.QuizTitleContainer thumbnail={thumbnail}>
          <S.QuizTitle>{solveProblemSetTitle}</S.QuizTitle>
        </S.QuizTitleContainer>
        <S.InnerContainer>
          <S.QuizMakerImage src="/assets/img/user_default.png"></S.QuizMakerImage>
          <S.QuizMakerName>{maker}</S.QuizMakerName>
          <S.Description>{description}</S.Description>
          <S.QuizCountContainer>
            총 <strong>{solveProblems.length}</strong> 문제
            {/* <div id="block">
              <strong>???</strong>
              <div>참여</div>
            </div> */}
          </S.QuizCountContainer>
          <S.ButtonWrap>
            <MainButton
              onClick={() => {
                router.push(`/quiz/solve/${id}/main`);
              }}
            >
              <span>시작하기</span>
            </MainButton>
          </S.ButtonWrap>
          <S.SNSShareContainer>
            <div id="explain">
              <AiOutlineShareAlt />
              <div>퀴즈 세트를 공유해보세요!</div>
            </div>
            <SNSShare nickName={maker} set_title={solveProblemSetTitle} url={id as string} thumbnail={thumbnail} />
          </S.SNSShareContainer>
          {/* <S.BestCommentContainer>
            <Comment hideInput={true} />
          </S.BestCommentContainer> */}
        </S.InnerContainer>
      </S.Container>
    </>
  );
};
Page.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};
export default Page;
