import * as S from 'styles/quiz/solve/index.style';
import { AppLayout } from 'components/layout';
import { useRouter } from 'next/router';
import { useEffect, useState, ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loading , Logo, SNSShare} from 'components/common';
import type { NextPageWithLayout } from 'pages/_app';
import { RootState } from 'store';
import { MainButton } from 'styles/common';
import {AiOutlineShareAlt} from 'react-icons/ai'
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
  const [description, setDescription] = useState<string>("");
  let { id } = router.query;
  // id 값이 변경될 시
  useEffect(() => {
    setLoading(true)
    QuizDataFetchApi(id as string)
      .then((res) => {
        dispatch(saveSolveProblemSetAction({ solveSetTitle: res?.data?.set_title })); // 퀴즈 메인 타이틀
        dispatch(saveSolveProblemsAction({ solveProblems: res?.data?.prob })); // 퀴즈 문항
        dispatch(saveQuizIdAction({ quizId: `${id}` })); // 퀴즈 id
        setMaker(res?.data?.user?.nickname); // 퀴즈 제작자 닉네임
        setThumbnail(res?.data?.thumbnail); // 퀴즈 썸네일
        setDescription(res?.data?.description); // 퀴즈 설명 
        setLoading(false);
        // 정답 배열 생성
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  return (
    <>
      {loading ? <Loading /> : ''}
      <S.Container>
        <Logo />
        <S.QuizInfo thumbnail={thumbnail}>
          <S.QuizTitle>{solveSetTitle}</S.QuizTitle>
        </S.QuizInfo>
        <S.InnerContainer>
          <S.Description>{description === "" ? "해당 퀴즈의 설명이 없습니다!":description}</S.Description>
          <S.QuizInfoContainer>
            <S.QuizMakerBlock>
              <div>출제자</div>
              <div id="maker">{maker}</div>
            </S.QuizMakerBlock>
            <div id="block">
              <strong>{solveProblems.length}</strong>
              <div>문제</div>
            </div>
            <div id="block">
              <strong>???</strong>
              <div>참여</div>
            </div>
          </S.QuizInfoContainer>
          <S.SNSShareContainer>
            <div id="explain">
              <AiOutlineShareAlt />
              <div>퀴즈 세트를 공유해보세요!</div>
            </div>
            <SNSShare nickName={maker} set_title={solveSetTitle} url={`quiz/solve/${id}`} thumbnail={thumbnail} />
          </S.SNSShareContainer>
        </S.InnerContainer>

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
    </>
  );
};
Page.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};
export default Page;
