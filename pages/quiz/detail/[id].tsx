import type { ReactElement } from 'react';
import type { NextPageWithLayout } from 'pages/_app';
import { AppLayout } from 'components/layout';
import { Title, SNSShare } from 'components/common';
import styled, { keyframes } from 'styled-components';
import { AiOutlineDelete } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { MyQuizDetailApi, QuizDeleteApi } from 'pages/api/test';
import { ThumbnailChange, NotFound } from 'components/common';
import { useModal } from 'hooks';

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
interface test {
  nickname: string;
  score: number;
}

const Page: NextPageWithLayout = () => {
  const router = useRouter();
  let { id } = router.query;

  const [quizDetailData, setQuizDetailData] = useState<DetailQuizType | null>(null);
  const [openDeleteModal, closeDeleteModal, RenderDeleteModal] = useModal({
    backgroundClickable: true,
    yesTitle: '삭제',
    yesAction: () => {
      MyQuizDelete();
    },
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
    if (id === '1234') {
      const obj: DetailQuizType = {
        created_at: '2022-10-17',
        updated_at: '2022-10-17',
        id: '1234',
        set_title: '하영이가 좋아하는 할맥 안주',
        solverCnt: 11,
        thumbnail: null,
        average: 7.7,
      };
      setQuizDetailData(obj);
    } else {
      getMyQuizData();
    }
  }, [router.isReady]);

  const score_list: test[] = [
     {
       nickname: '냉동피자',
       score: 8,
     },
     {
       nickname: '유통기한지난우유',
       score: 8,
     },
     {
       nickname: '먹다남은떡볶이',
       score: 7,
     },
     {
       nickname: '남은거포장해온치킨',
       score: 6,
     },
     {
      nickname: '삼겹살두루치기',
      score: 4,
     },
     {
       nickname: '장유산균음료',
       score: 4,
     },
     {
       nickname: '유통기한지난오뎅',
       score: 2,
     },
  ];

  return (
    <>
      <Title backRoute="/" title="문제집 자세히보기" subTitle="문제집 정보와 참여자 순위를 확인해보세요 👀" />
      <Wrapper>
        <SectionBlock>
          {quizDetailData ? <div id="section-title">{quizDetailData?.set_title}</div> : <SkeletonTitle />}

          <div id="section-contents">
            {quizDetailData ? (
              <ThumbnailChange url={quizDetailData?.thumbnail} probsetId={id as string} />
            ) : (
              <SkeletonThunmbnailChange />
            )}
            {quizDetailData ? (
              <StatusContainer>
                <div id="status">
                  <div>참여자</div>
                  <div id="count">{quizDetailData?.solverCnt}명</div>
                </div>
                <div id="status">
                  <div>평균점수</div>
                  <div id="count">{quizDetailData?.average}점</div>
                </div>
              </StatusContainer>
            ) : (
              <SkeletonStatusContainer>
                <div></div>
                <div></div>
              </SkeletonStatusContainer>
            )}

            <DateInfoWrapper>
              <div>생성 날짜 {quizDetailData?.created_at}</div>
              <div>마지막으로 푼 날짜 {quizDetailData?.updated_at}</div>
            </DateInfoWrapper>
          </div>
        </SectionBlock>
        {quizDetailData && (
          <SectionBlock>
            <div id="section-title">문제집 공유 👋</div>
            <div id="section-contents">
              <div id="quiz-share-contents">
                <SNSShare
                  set_title={quizDetailData?.set_title}
                  url={`quiz/solve/${quizDetailData?.id}`}
                  thumbnail={quizDetailData?.thumbnail}
                />
              </div>
            </div>
          </SectionBlock>
        )}
        {quizDetailData && (
          <SectionBlock>
            <div id="section-title">참여자 랭킹 🏆</div>
            <div id="section-contents">
              <RankingBoard>
                {score_list.length === 0 ? (
                  <NotFound
                    title={'아직 퀴즈에 참여한 유저가 없습니다 😶'}
                    subTitle={'퀴즈집을 공유하여 다같이 풀어보세요!'}
                  />
                ) : (
                  score_list.map((userScore: test, index: number) => {
                    return (
                      <li id={index == 0 ? 'first' : index == 1 ? 'second' : index == 2 ? 'third' : ''}>
                        <i>{index == 0 ? '🥇' : index == 1 ? '🥈' : index == 2 ? '🥉' : index + 1}</i>
                        <strong>{userScore?.nickname}</strong>
                        <em>{userScore?.score}점</em>
                      </li>
                    );
                  })
                )}
              </RankingBoard>
            </div>
          </SectionBlock>
        )}

        <DeleteButton onClick={openDeleteModal}>
          <AiOutlineDelete size={30} />
        </DeleteButton>
      </Wrapper>
      <RenderDeleteModal/>
    </>
  );
};
Page.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};

const Wrapper = styled.div`
  width: 85%;
  margin: 0 auto;
  margin-top: 2rem;
  margin-bottom: 7rem;
`;

const SectionBlock = styled.div`
  margin-bottom: 2rem;
  &:last-child {
    margin-bottom: 0;
  }
  #section-title {
    color: #ff264d;
    margin-bottom: 0.5rem;
    font-size: 18px;
  }
  #section-contents {
    margin-top: 1rem;
    #quiz-share-contents {
      width: 80%;
      margin: 0 auto;
    }
  }
`;

const StatusContainer = styled.div`
  display: grid;
  gap: 15px;
  grid-template-columns: 1fr 1fr;
  height: 70px;
  margin-top: 10px;
  #status {
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: #fff6f7;
    border-radius: 12px;
    #count {
      font-size: 18px;
      font-weight: bold;
      color: #ff264d;
    }
  }
`;
const DateInfoWrapper = styled.div`
  margin-top: 10px;
  font-size: 14px;
  color: #bcbcbc;
`;

const DeleteButton = styled.div`
  width: 65px;
  height: 65px;
  border-radius: 50%;
  background-color: #ff4d57;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 20px;
  right: calc(50% - 32.5px - 190px);
  @media (max-width: 500px) {
    bottom: 20px;
    right: 20px;
  }
  z-index: 5;
  &:hover{
    cursor:pointer; 
  }
`;

const RankingBoard = styled.ul`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  padding: 0;
  margin: 0;
  flex-direction: column;
  align-items: center;
  li {
    position: relative;
    display: flex;
    color: #595959;
    width: 100%;
    list-style: none;
    border-radius: 4px;
    font-size: 0.9rem;
    border: solid 1px #f6f6f6;
    border-radius: 4px;
    height: 50px;
    margin: 3px;
    justify-content: space-between;
    align-items: center;
    span {
      position: relative;
      width: 44px;
      height: 44px;
    }
    strong {
      font-weight: normal;
    }
    i,
    em {
      display: flex;
      justify-content: center;
      align-items: center;
      font-style: normal;
      width: 50px;
    }
    i {
      color: #ff4d57;
      font-size: 1rem;
    }
  }
  #first {
    border: none;
    background-color: #fff1b4;
  }
  #second {
    border: none;
    background-color: #ececec;
  }
  #third {
    border: none;
    background-color: #ffe6d4;
  }
`;

// skeleton
const gradient = keyframes` 
  0% {background-color: rgba(165, 165, 165, 0.1);}
  50% {background-color: rgba(165, 165, 165, 0.3);}
  100% {background-color: rgba(165, 165, 165, 0.1);}
`;

const Skeleton = styled.div`
  background-color: #eee;
  border-radius: 1rem;
`;
const SkeletonThunmbnailChange = styled(Skeleton)`
  width: 100%;
  height: 200px;
  animation: ${gradient} 1.5s linear infinite alternate;
`;
const SkeletonStatusContainer = styled(StatusContainer)`
  display: grid;
  gap: 15px;
  grid-template-columns: 1fr 1fr;
  height: 70px;
  margin-top: 10px;
  div {
    background-color: #eee;
    border-radius: 12px;
    animation: ${gradient} 1.5s linear infinite alternate;
  }
`;
const SkeletonTitle = styled(Skeleton)`
  width: 250px;
  height: 24px;
  animation: ${gradient} 1.5s linear infinite alternate;
`;
const SkeletonRanking = styled.div`
  background-color: #eee;
  border-radius: 4px;
  animation: ${gradient} 1.5s linear infinite alternate;
  width: 100%;
  height: 50px;
  margin: 3px;
  margin-bottom: 7px;
`;

export default Page;
