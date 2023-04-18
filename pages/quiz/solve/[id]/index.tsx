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
import { saveSolveProblemSetAction, resetSolve } from 'store/quiz_solve';

const Page: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const { setTitle, quizList, quizMaker, quizSetThumbnail, description } = useSelector(
    (state: RootState) => state.solve,
  );

  const [loading, setLoading] = useState<boolean>(false);

  // 퀴즈 정보를 불러오는 api를 실행하는 함수
  const fetchSolveQuizSet = async () => {
    try {
      // 퀴즈 id를 통해 정보를 불러오는 custom axios 
      const res = await QuizDataFetchApi(id as string);
      parseSolveQuizSet(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  // response 를 이용하여 redux 에 퀴즈 정보를 저장
  const parseSolveQuizSet = (data: any) => {
    const { id, set_title, thumbnail, description, quiz, user } = data;
    const solveQuizSet: SolveQuizSetType = {
      quizSetId: id,
      setTitle: set_title,
      quizSetThumbnail: thumbnail,
      description,
      quizList: quiz.map((q: any) => {
        const _q: SolveQuizType = {
          quizId: q.id,
          quizThumbnail: q.quiz_thumbnail ?? null,
          quizTitle: q.quiz_title,
          choiceType: q.choice_type,
          choices: q.choices,
          correctIndex: q.correct_idx,
        };
        return _q;
      }),
      quizMaker: user,
    };
    dispatch(saveSolveProblemSetAction(solveQuizSet));
  };

  // 페이지 진입 시 redux state를 초기화 시켜줌.
  useEffect(() => {
    dispatch(resetSolve());
  }, []);

  // id 값이 변경될 시 퀴즈 정보를 갱신한다.
  useEffect(() => {
    setLoading(true);
    if (!!id) fetchSolveQuizSet();
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
            <SNSShare
              nickName={quizMaker?.nickname}
              profileImg={quizMaker?.profile_img}
              setTitle={setTitle}
              id={id as string}
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
