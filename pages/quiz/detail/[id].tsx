import type { ReactElement } from 'react';
import type { NextPageWithLayout } from 'pages/_app';
import { AppLayout } from 'components/layout';
import { Title } from 'components/common';
import styled from 'styled-components';
import {AiOutlineDelete} from 'react-icons/ai'
const Page: NextPageWithLayout = () => {
  return (
    <>
      <Title backRoute="/home" title="문제집 자세히보기" subTitle="문제집 정보와 참여자 순위를 확인해보세요 👀" />
      <Wrapper>
        <SectionBlock>
          <div id="section-title">팡머가 좋아하는 것들</div>
          <div id="section-contents">
            <ThumbnailWrapper>
              <img
                src={'https://press.com.mx/wp-content/uploads/2022/01/licenciatura-en-psicologi%CC%81a-1140x641.png'}
              />
            </ThumbnailWrapper>
            <StatusContainer>
              <div id="status">
                <div>참여자</div>
                <div id="count">386</div>
              </div>
              <div id="status">
                <div>평균점수</div>
                <div id="count">7.7점</div>
              </div>
            </StatusContainer>
            <DateInfoWrapper>
              <div>생성 날짜 2022-09-22</div>
              <div>마지막으로 푼 날짜 2022-10-03</div>
            </DateInfoWrapper>
          </div>
        </SectionBlock>
        <SectionBlock>
          <div id="section-title">문제집 공유 👋</div>
          <div id="section-contents">
            <div>문제집 공유 컴포넌트 들어올 예정</div>
          </div>
        </SectionBlock>
        <SectionBlock>
          <div id="section-title">참여자 랭킹 🏆</div>
          <div id="section-contents">
            <div>랭킹보드 들어올 예정 </div>
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
  }
`;

const ThumbnailWrapper = styled.div`
  width: 100%;
  height: 150px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 12px;
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
  @media (max-width: 500px){
    bottom:20px;
    right:20px;
  }
  z-index: 5;
`;
export default Page;
