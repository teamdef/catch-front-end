import type { ReactElement } from 'react';
import type { NextPageWithLayout } from 'pages/_app';
import { AppLayout } from 'components/layout';
import { Title, SNSShare, ThumbnailChange, NotFound } from 'components/common';
import * as S from 'styles/quiz/detail/detail.style';
import { AiOutlineDelete } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { MyQuizDetailApi, QuizDeleteApi, QuizRankingListApi } from 'pages/api/quiz';
import { useModal } from 'hooks';
import { RootState } from 'store';
import { useSelector } from 'react-redux';
// next.js 위한 라이브러리 및 타입
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

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
interface DetailQuizType {
  created_at: string;
  updated_at: string;
  id: string;
  set_title: string;
  solverCnt: number;
  thumbnail: string | null;
  average: number;
}
interface RankingType {
  created_at: string;
  nickname: string;
  score: number;
  ranking: string;
  id: string;
}
const Page: NextPageWithLayout = () => {
  const router = useRouter();
  let { id } = router.query;
  const { profileImg, nickName } = useSelector((state: RootState) => state.user);

  const [quizDetailData, setQuizDetailData] = useState<DetailQuizType | null>(null);
  const [quizRankingList, setQuizRankingList] = useState<RankingType[] | null>(null);
  const [openDeleteModal, closeDeleteModal, RenderDeleteModal] = useModal({
    backgroundClickable: true,
    yesTitle: '삭제',
    yesAction: () => MyQuizDelete(),
    noTitle: '취소',
    contents: <div>삭제하시겠습니까? 삭제 클릭시 즉시 삭제됩니다.</div>,
  });

  // string string[] undefined 해결방법?
  const getMyQuizData = async () => {
    const res = await MyQuizDetailApi(id as string);
    let _detail = { ...res?.data[0] };
    _detail.solverCnt = Number(_detail.solverCnt);
    _detail.created_at = _detail.created_at.substring(0, 10);
    _detail.updated_at = _detail.updated_at.substring(0, 10);
    _detail.thumbnail = _detail.thumbnail === '' ? null : _detail.thumbnail;
    _detail.average = Number(_detail.average.substring(0, 3));
    setQuizDetailData(_detail);
  };


  const getMyQuizRanking = async () => {
    const res = await QuizRankingListApi(id as string);
    let _ranking: RankingType[] = res?.data;
    setQuizRankingList(_ranking);
  }

  const MyQuizDelete = async () => {
    if (!!id) {
      const res = await QuizDeleteApi(id as string);
      if (res.status === 200) {
        closeDeleteModal();
        router.push('/');
      }
    }
  };
  useEffect(() => {
    getMyQuizData();
    getMyQuizRanking();
  }, [router.isReady]);


  return (
    <>
      <Title backRoute="/" title="문제집 자세히보기" subTitle="문제집 정보와 참여자 순위를 확인해보세요 👀" />
      <S.Wrapper>
        <S.SectionBlock>
          {quizDetailData ? <div id="section-title">{quizDetailData?.set_title}</div> : <S.SkeletonTitle />}

          <div id="section-contents">
            {quizDetailData ? (
              <ThumbnailChange url={quizDetailData?.thumbnail} probsetId={id as string} />
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
        {quizRankingList && (
          <S.SectionBlock>
            <div id="section-title">참여자 랭킹 🏆</div>
            <div id="section-contents">
              <S.RankingBoard>
                {quizRankingList.length === 0 ? (
                  <NotFound
                    title={'아직 퀴즈에 참여한 유저가 없습니다 😶'}
                    subTitle={'퀴즈집을 공유하여 다같이 풀어보세요!'}
                  />
                ) : (
                  quizRankingList.map((userRanking: RankingType, index: number) => {
                    return (
                      <li
                        key={userRanking.id}
                        id={index == 0 ? 'first' : index == 1 ? 'second' : index == 2 ? 'third' : ''}
                      >
                        <i>{index == 0 ? '🥇' : index == 1 ? '🥈' : index == 2 ? '🥉' : index + 1}</i>
                        <strong>{userRanking?.nickname}</strong>
                        <em>{userRanking?.score}점</em>
                      </li>
                    );
                  })
                )}
              </S.RankingBoard>
            </div>
          </S.SectionBlock>
        )}

        <S.DeleteButton onClick={openDeleteModal}>
          <AiOutlineDelete size={30} />
        </S.DeleteButton>
      </S.Wrapper>
      <RenderDeleteModal />
    </>
  );
};
Page.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};


export default Page;
