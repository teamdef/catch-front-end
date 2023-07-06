import * as S from 'styles/quiz/solve/index.style';
import { AppLayout } from 'components/layout';
import { useRouter } from 'next/router';
import { useEffect, useState, ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { NextPageWithLayout } from 'pages/_app';
import { RootState } from 'store';
import { MainButton } from 'styles/common';
import { Loading, Logo, SNSShare } from 'components/common';
import { AiOutlineShareAlt } from 'react-icons/ai';
import { QuizDataFetchApi } from 'pages/api/quiz';
import { saveSolveProblemSetAction, resetSolveAction, saveSolveAnswersAction } from 'store/quiz_solve';
import { resetUserDataAction } from 'store/user_solve';

const Page: NextPageWithLayout = () => {
  const router = useRouter();
  const { quizset_id } = router.query;
  const dispatch = useDispatch();
  const { setTitle, quizList, quizMaker, quizSetThumbnail, description } = useSelector(
    (state: RootState) => state.solve,
  );

  const [loading, setLoading] = useState<boolean>(false);

  const fetchSolveQuizSet = async () => {
    try {
      const res = await QuizDataFetchApi(quizset_id as string);
      parseSolveQuizSet(res.data);
      dispatch(saveSolveAnswersAction({ answerList: Array(res.data.quiz.length).fill(5) }));
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const parseSolveQuizSet = (data: QuizDataType) => {
    const { id, set_title, thumbnail, description, quiz, user } = data;
    const solveQuizSet: SolveQuizSetType = {
      quizSetId: id,
      setTitle: set_title,
      quizSetThumbnail: thumbnail,
      description,
      quizList: quiz.map((q: SolveQuizType) => {
        const _q: SolveQuizType = {
          quiz_thumbnail: q.quiz_thumbnail ?? null,
          quiz_title: q.quiz_title,
          choice_type: q.choice_type,
          choices: q.choices,
          correct_idx: q.correct_idx,
        };
        return _q;
      }),
      quizMaker: user,
    };
    dispatch(saveSolveProblemSetAction(solveQuizSet));
  };

  useEffect(() => {
    dispatch(resetSolveAction());
    dispatch(resetUserDataAction());
  }, []);

  useEffect(() => {
    setLoading(true);
    if (!!quizset_id) fetchSolveQuizSet();
  }, [router.isReady]);

  return (
    <>
      {loading && <Loading />}
      <S.Container>
        <Logo />
        <S.QuizTitleContainer thumbnail={quizSetThumbnail}>
          <S.QuizTitle>{setTitle}</S.QuizTitle>
        </S.QuizTitleContainer>
        <S.InnerContainer>
          <S.QuizMakerImage src={quizMaker?.profile_img ?? '/assets/img/user_default.png'}></S.QuizMakerImage>
          <S.QuizMakerName>{quizMaker?.nickname ?? '탈퇴한 사용자'}</S.QuizMakerName>
          <S.Description>{description}</S.Description>
          <S.QuizCountContainer>
            총 <strong>{quizList?.length}</strong> 문제
          </S.QuizCountContainer>
          <S.ButtonWrap>
            <MainButton
              onClick={() => {
                router.push(`/quiz/solve/${quizset_id}/main`);
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
            <SNSShare
              nickName={quizMaker?.nickname}
              profileImg={quizMaker?.profile_img}
              setTitle={setTitle}
              id={quizset_id as string}
              thumbnail={quizSetThumbnail}
            />
          </S.SNSShareContainer>
        </S.InnerContainer>
      </S.Container>
    </>
  );
};
Page.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};
export default Page;
