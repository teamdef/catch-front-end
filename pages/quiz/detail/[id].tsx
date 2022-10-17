import type { ReactElement } from 'react';
import type { NextPageWithLayout } from 'pages/_app';
import { AppLayout } from 'components/layout';
import { Title, SNSShare } from 'components/common';
import styled from 'styled-components';
import { AiOutlineDelete } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { MyQuizDetailApi } from 'pages/api/test';
import { ThumbnailChange,NotFound } from 'components/common';

interface DetailQuizType {
  created_at: string;
  updated_at: string;
  id: string;
  set_title: string;
  solverCnt: number;
  thumbnail: string | null;
  average: number;
}

const Page: NextPageWithLayout = () => {
  const router = useRouter();
  let { id } = router.query;

  const [quizDetailData, setQuizDetailData] = useState<DetailQuizType>();

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
  useEffect(() => {
    if (id === 'e87fa62e-c992-4370-9fbe-f9c31c855008') getMyQuizData();
    else {
      const obj: DetailQuizType = {
        created_at: '2022-10-17',
        updated_at: '2022-10-17',
        id: '1234',
        set_title: '하영이가 좋아하는 할맥 안주',
        solverCnt: 11,
        thumbnail: null,
        average:7.7,
      };
      setQuizDetailData(obj);
    };
  }, [router.isReady]);

  const score_list= [
    {
      nickname: '덴마크유산균',
      score: 8,
    },
    {
      nickname: '춘식이',
      score: 8,
    },
    {
      nickname: '올라프',
      score: 7,
    },
    {
      nickname: '헤라',
      score: 6,
    },
    {
      nickname: '스윙스',
      score: 4,
    },
    {
      nickname: '커피매니아',
      score: 4,
    },
    {
      nickname: '부리부리용사',
      score: 2,
    },
  ];

  return (
    <>
      <Title backRoute="/home" title="문제집 자세히보기" subTitle="문제집 정보와 참여자 순위를 확인해보세요 👀" />
      <Wrapper>
        <SectionBlock>
          <div id="section-title">{quizDetailData?.set_title}</div>
          <div id="section-contents">
            <ThumbnailChange url={quizDetailData?.thumbnail} probsetId={id as string} />
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
            <DateInfoWrapper>
              <div>생성 날짜 {quizDetailData?.created_at}</div>
              <div>마지막으로 푼 날짜 {quizDetailData?.updated_at}</div>
            </DateInfoWrapper>
          </div>
        </SectionBlock>
        <SectionBlock>
          <div id="section-title">문제집 공유 👋</div>
          <div id="section-contents">
            <div id="quiz-share-contents">
              <SNSShare title={'test'} url={'zz'} />
            </div>
          </div>
        </SectionBlock>
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
                score_list.map((userScore, index) => {
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
        <DeleteButton>
          <AiOutlineDelete size={30} />
        </DeleteButton>
      </Wrapper>
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
export default Page;
