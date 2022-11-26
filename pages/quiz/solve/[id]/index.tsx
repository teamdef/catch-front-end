import * as S from 'styles/quiz/solve/index.style';
import { AppLayout } from 'components/layout';
import { useRouter } from 'next/router';
import { useEffect, useState, ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loading } from 'components/common';
import type { NextPageWithLayout } from 'pages/_app';
import { RootState } from 'store';
import { MainButton } from 'styles/common';
import { saveSolveProblemsAction, saveSolveProblemSetAction, saveQuizIdAction } from 'store/quiz_solve';
import { QuizDataFetchApi } from 'pages/api/quiz';
const Page: NextPageWithLayout = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { solveSetTitle } = useSelector((state: RootState) => state.solve);
  const { solveProblems } = useSelector((state: RootState) => state.solve);
  const [thumbnail, setThumbnail] = useState('');
  const [maker, setMaker] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  let { id } = router.query;
  // id 값이 변경될 시
  useEffect(() => {
    setLoading(true)
    QuizDataFetchApi(id as string)
      .then((res) => {
        dispatch(saveSolveProblemSetAction({ solveSetTitle: res?.data?.set_title }));
        dispatch(saveSolveProblemsAction({ solveProblems: res?.data?.prob }));
        dispatch(saveQuizIdAction({ quizId: `${id}` }));
        setMaker(res?.data?.user?.nickname);
        setThumbnail(res?.data?.thumbnail);
        setLoading(false);
        // 정답 배열 생성
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  return (
    <S.Container>
      {loading ? <Loading /> : ''}
      <S.Logo />
      <S.QuizInfo>
        {thumbnail == '' ? (
          <S.Bubbling style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)' }}>
            <img src="/assets/img/catch_character.png"/>
          </S.Bubbling>
        ) : (
          <S.BgImg src={thumbnail} />
        )}
        <S.InfoTxt>
          <S.InfoTitle>
            <h1>{solveSetTitle}</h1>
          </S.InfoTitle>
          <p>
            총 <em>{solveProblems.length}</em> 문제
          </p>
          <span>출제자 : {maker}</span>
        </S.InfoTxt>
      </S.QuizInfo>
      {thumbnail && (
        <S.Bubbling style={{ padding: '5%' }}>
          <img src="/assets/img/chch.png" />
        </S.Bubbling>
      )}

      <S.ButtonWrap>
        <MainButton
          onClick={() => {
            router.push(`/quiz/solve/${id}/main`);
          }}
        >
          시작하기
        </MainButton>
      </S.ButtonWrap>
    </S.Container>
  );
};
Page.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};
export default Page;
