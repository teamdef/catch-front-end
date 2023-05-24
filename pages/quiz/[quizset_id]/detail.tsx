/* react, next 관련 */
import type { ReactElement } from 'react';
import type { NextPageWithLayout } from 'pages/_app';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
/* redux 관련 */
import { RootState } from 'store';
import { useSelector } from 'react-redux';
/* 컴포넌트 */
import { AppLayout, HeaderLayout } from 'components/layout';
import { Title, SNSShare, ThumbnailChange, RankingBoard } from 'components/common';
/* react-icons */
import { MdOutlineArrowForwardIos } from 'react-icons/md';
import { AiOutlineDelete } from 'react-icons/ai';

import * as S from 'styles/quiz/detail/detail.style'; /* 컴포넌트 */
import { MyQuizDetailApi, QuizDeleteApi } from 'pages/api/quiz'; /* 통신 */
import { useModal } from 'hooks';

export const getServerSideProps: GetServerSideProps = async ({ req, res, params }: GetServerSidePropsContext) => {
  // 클라이언트는 여러 대지만 서버는 한대이기 때문에 서버 사용한 쿠키는 반드시 제거해 줘야 한다
  const cookie = req ? req?.headers?.cookie : null;
  if (cookie) {
    let match = cookie.match(new RegExp('(^| )' + 'access_token' + '=([^;]+)'));
    // 쿠키가 적용되어 있다면 (로그인 상태라면)
    if (!!match === false) {
      res.statusCode = 302;
      res.setHeader('Location', `/`);
      res.end();
    }
  } else {
    res.statusCode = 302;
    res.setHeader('Location', `/`);
    res.end();
  }
  return { props: {} };
};

const Page: NextPageWithLayout = () => {
  const router = useRouter();
  const { quizset_id } = router.query;
  const { profileImg, nickName } = useSelector((state: RootState) => state.user);

  const [quizDetailData, setQuizDetailData] = useState<DetailQuizType | null>(null);
  const [quizRankingList, setQuizRankingList] = useState<RankingType[] | null>(null);
  const [quizCommentList, setQuizCommentList] = useState<CommentType[] | null>(null);
  const [openDeleteModal, closeDeleteModal, RenderDeleteModal] = useModal({
    backgroundClickable: true,
    yesTitle: '삭제',
    yesAction: () => MyQuizDelete(),
    noTitle: '취소',
    contents: <div>삭제하시겠습니까? 삭제 클릭시 즉시 삭제됩니다.</div>,
  });

  // string string[] undefined 해결방법?
  const fetchDetailQuizData = async () => {
    try {
      const res = await MyQuizDetailApi(quizset_id as string);
      const { quizset, best_solver, best_comment } = res.data;
      parseBestRankingList(best_solver);
      parseBestCommentList(best_comment);
      parseDetailQuiz(quizset);
    } catch (err) {
      console.log(err);
    }
  };

  const parseDetailQuiz = (data: any) => {
    const _detailQuiz: DetailQuizType = {
      solverCnt: data.solver_cnt,
      createdAt: data.created_at.substring(0, 10),
      updatedAt: data.updated_at.substring(0, 10),
      quizSetId: data.id,
      setTitle: data.set_title,
      average: data.average.toFixed(2),
      description: data.description,
      quizSetThumbnail: data.thumbnail ?? null,
    };
    setQuizDetailData(_detailQuiz);
  };

  const parseBestCommentList = (data: any) => {
    const _bestCommentList = data.map((comment: any) => {
      const _comment: CommentType = {
        nickname: comment.nickname,
        content: comment.content,
        createdAt: comment.created_at,
        user: comment.user && { nickname: comment.user.nickname, profileImg: comment.user.profile_img },
      };
      return _comment;
    });
    setQuizCommentList(_bestCommentList);
  };

  const parseBestRankingList = (data: any) => {
    const _bestRankingList = data.map((ranking: any) => {
      const _ranking: RankingType = {
        nickname: ranking.nickname,
        score: ranking.score,
        ranking: ranking.ranking,
        quizCount: ranking.quiz_count,
      };
      return _ranking;
    });
    setQuizRankingList(_bestRankingList);
  };

  const MyQuizDelete = async () => {
    try {
      await QuizDeleteApi(quizset_id as string);
      alert('성공적으로 삭제되었습니다.');
      closeDeleteModal();
      router.push('/');
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (!!quizset_id) fetchDetailQuizData();
  }, [router.isReady]);

  return (
    <>
      <Title
        title="퀴즈 세트 자세히보기"
        subTitle="퀴즈 세트 정보, 참여자 랭킹, 한줄평 등 다양한 정보를 확인해보세요!👀"
      />
      <S.Wrapper>
        <S.SectionBlock>
          {quizDetailData ? <div id="section-title">{quizDetailData.setTitle}</div> : <S.SkeletonTitle />}
          <div id="section-description">{quizDetailData?.description}</div>
          <div id="section-contents">
            {quizDetailData ? (
              <ThumbnailChange url={quizDetailData?.quizSetThumbnail} probsetId={quizset_id as string} />
            ) : (
              <S.SkeletonThunmbnailChange />
            )}
            {quizDetailData ? (
              <S.StatusContainer>
                <div id="status">
                  <div>참여자</div>
                  <div id="count">{quizDetailData?.solverCnt}명</div>
                </div>
                <div id="status">
                  <div>평균점수</div>
                  <div id="count">{quizDetailData?.average}점</div>
                </div>
              </S.StatusContainer>
            ) : (
              <S.SkeletonStatusContainer>
                <div></div>
                <div></div>
              </S.SkeletonStatusContainer>
            )}

            <S.DateInfoWrapper>
              <div>생성 날짜 {quizDetailData?.createdAt}</div>
              <div>마지막으로 푼 날짜 {quizDetailData?.updatedAt}</div>
            </S.DateInfoWrapper>
          </div>
        </S.SectionBlock>
        {quizDetailData && (
          <S.SectionBlock>
            <div id="section-title">퀴즈 세트 공유 👋</div>
            <div id="section-contents">
              <div id="quiz-share-contents">
                <SNSShare
                  nickName={nickName}
                  profileImg={profileImg}
                  setTitle={quizDetailData.setTitle}
                  id={quizDetailData.quizSetId}
                  thumbnail={quizDetailData?.quizSetThumbnail}
                />
              </div>
            </div>
          </S.SectionBlock>
        )}
        <S.SectionBlock>
          {quizDetailData && (
            <div id="section-title">
              참여자 랭킹 🏆
              <Link href={`/quiz/${quizset_id}/ranking`} passHref>
                <a id="more">
                  더보기 <MdOutlineArrowForwardIos />
                </a>
              </Link>
            </div>
          )}
          <div id="section-contents">
            <RankingBoard rankingList={quizRankingList} />
          </div>
        </S.SectionBlock>
        {quizDetailData && (
          <S.DeleteButton onClick={openDeleteModal}>
            <AiOutlineDelete size={30} />
          </S.DeleteButton>
        )}
      </S.Wrapper>
      <RenderDeleteModal />
    </>
  );
};
Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <AppLayout>
      <HeaderLayout>{page}</HeaderLayout>
    </AppLayout>
  );
};

export default Page;
