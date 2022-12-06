import * as S from 'styles/quiz/solve/index.style';
import { AppLayout } from 'components/layout';
import { useRouter } from 'next/router';
import { useEffect, useState, ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { NextPageWithLayout } from 'pages/_app';
import { RootState } from 'store';
import { MainButton } from 'styles/common';
import { Loading , Logo, SNSShare} from 'components/common';
import {AiOutlineShareAlt} from 'react-icons/ai'
import { QuizDataFetchApi } from 'pages/api/quiz';
import { saveSolveProblemSetAction } from 'store/quiz_solve';

const Page: NextPageWithLayout = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { solveProblemSetTitle, solveProblems } = useSelector((state: RootState) => state.solve);
  const [thumbnail, setThumbnail] = useState('');
  const [maker, setMaker] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("");
  let { id } = router.query;
  // id 값이 변경될 시
  useEffect(() => {
    setLoading(true);
    QuizDataFetchApi(id as string)
      .then((res) => {
        dispatch(
          saveSolveProblemSetAction({
            solveProblemSetTitle: res?.data?.set_title,
            problemSetId: `${id}`,
            solveProblems: res?.data?.prob,
          }),
        );
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
          <S.QuizTitle>{solveProblemSetTitle}</S.QuizTitle>
        </S.QuizInfo>
        <S.InnerContainer>
          <S.Description>{description === '' ? '해당 퀴즈의 설명이 없습니다!' : description}</S.Description>
          <S.ButtonWrap>
            <MainButton
              onClick={() => {
                router.push(`/quiz/solve/${id}/main`);
              }}
            >
              시작하기
            </MainButton>
          </S.ButtonWrap>
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
            <SNSShare nickName={maker} set_title={solveProblemSetTitle} url={`quiz/solve/${id}`} thumbnail={thumbnail} />
          </S.SNSShareContainer>
          <S.BestCommentContainer>
            <div id="title">베스트 한줄평 👍</div>
          </S.BestCommentContainer>
        </S.InnerContainer>
      </S.Container>
    </>
  );
};
Page.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};
export default Page;
