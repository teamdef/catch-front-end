import type { ReactElement } from 'react';
import type { NextPageWithLayout } from 'pages/_app';
import { AppLayout } from 'components/layout';
import { Title, SNSShare, ThumbnailChange, CommentList, RankingBoard } from 'components/common';
import * as S from 'styles/quiz/detail/detail.style';
import { AiOutlineDelete } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { MyQuizDetailApi, QuizDeleteApi, QuizRankingListApi } from 'pages/api/quiz';
import { useModal } from 'hooks';
import { RootState } from 'store';
import { useSelector } from 'react-redux';
import { MdOutlineArrowForwardIos } from 'react-icons/md';
import Link from 'next/link';

// next.js 위한 라이브러리 및 타입
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
/*
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
};*/
interface DetailQuizType {
  created_at: string;
  updated_at: string;
  id: string;
  set_title: string;
  solverCnt: number;
  thumbnail: string | null;
  average: number;
  description: string;
}
interface RankingType {
  created_at: string;
  nickname: string;
  score: number;
  ranking: string;
  id: string;
}
interface CommentType {
  content: string;
  created_at: string;
  nickname: string;
  user: any;
}

const Page: NextPageWithLayout = () => {
  const router = useRouter();
  let { quiz_id } = router.query;
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
  const getMyQuizData = async () => {
    const res = await MyQuizDetailApi(quiz_id as string);

    let { bestSolver, bestComment, probset } = res?.data;
    let _detail = { ...probset[0] };
    _detail.solverCnt = Number(_detail.solverCnt);
    _detail.created_at = _detail.created_at.substring(0, 10);
    _detail.updated_at = _detail.updated_at.substring(0, 10);
    _detail.thumbnail = _detail.thumbnail === '' ? null : _detail.thumbnail;
    _detail.average = Number(_detail.average.substring(0, 3));
    setQuizDetailData(_detail);
    setQuizRankingList(bestSolver);
    setQuizCommentList(bestComment);
  };

  const MyQuizDelete = async () => {
    if (!!quiz_id) {
      const res = await QuizDeleteApi(quiz_id as string);
      if (res.status === 200) {
        closeDeleteModal();
        router.push('/');
      }
    }
  };
  useEffect(() => {
    getMyQuizData();
  }, [router.isReady]);

  return (
    <>
      <Title
        isBack={true}
        title="퀴즈 세트 자세히보기"
        subTitle="퀴즈 세트 정보, 참여자 랭킹, 한줄평 등 다양한 정보를 확인해보세요!👀"
      />
      <S.Wrapper>
        <S.SectionBlock>
          {quizDetailData ? <div id="section-title">{quizDetailData?.set_title}</div> : <S.SkeletonTitle />}
          <div id="section-description">{quizDetailData?.description}</div>
          <div id="section-contents">
            {quizDetailData ? (
              <ThumbnailChange url={quizDetailData?.thumbnail} probsetId={quiz_id as string} />
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
              <div>생성 날짜 {quizDetailData?.created_at}</div>
              <div>마지막으로 푼 날짜 {quizDetailData?.updated_at}</div>
            </S.DateInfoWrapper>
          </div>
        </S.SectionBlock>
        {quizDetailData && (
          <S.SectionBlock>
            <div id="section-title">문제집 공유 👋</div>
            <div id="section-contents">
              <div id="quiz-share-contents">
                <SNSShare
                  nickName={nickName}
                  profileImg={profileImg}
                  set_title={quizDetailData?.set_title}
                  url={`quiz/solve/${quizDetailData?.id}`}
                  thumbnail={quizDetailData?.thumbnail}
                />
              </div>
            </div>
          </S.SectionBlock>
        )}
        <S.SectionBlock>
          {quizDetailData && (
            <div id="section-title">
              참여자 랭킹 🏆
              <Link href={`/quiz/${quiz_id}/ranking`} passHref>
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
        <S.SectionBlock>
          {quizDetailData && (
            <div id="section-title">
              베스트 한줄평 ✍️
              <Link href={`/quiz/${quiz_id}/comment`} passHref>
                <a id="more">
                  더보기 <MdOutlineArrowForwardIos />
                </a>
              </Link>
            </div>
          )}
          <div id="section-contents">
            <CommentList commentList={quizCommentList} />
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
  return <AppLayout>{page}</AppLayout>;
};

export default Page;
