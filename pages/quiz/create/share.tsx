import { ReactElement } from 'react';
import Router from 'next/router';
import styled from 'styled-components';
import type { NextPageWithLayout } from 'pages/_app';
import { AppLayout } from 'components/layout';
import { SNSShare } from 'components/common';
import { RootState } from 'store';
import { useSelector } from 'react-redux';
import { MdPhotoCamera, MdHomeFilled } from 'react-icons/md';
import { HiOutlineShare, HiLink } from 'react-icons/hi';

const Page: NextPageWithLayout = () => {
  const { setTitle, problems } = useSelector((state: RootState) => state.quiz);

  const goHome = () => {
    Router.push('/home');
  };
  return (
    <Wrapper>
      <div id="inner-wrapper">
        <Complete>퀴즈 완성 !!!</Complete>
        <QuizInfoContainer>
          <div id="top">{setTitle}</div>
          <div id="bottom">
            총<strong>{problems.length}</strong>문제
          </div>
        </QuizInfoContainer>
        <ThumbnailSettingContainer>
          <div id="explain">
            <span>
              퀴즈의 대표 사진을 설정해보세요! <br />
              설정하지 않으면, 등록된 이미지 중 <strong>랜덤</strong>으로 설정됩니다.
            </span>
          </div>
          <div id="thumbnail-img-wrapper">
            <img
              src={
                'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
              }
              alt="문제집 썸네일 이미지"
            />
            <div id="thumbnail-input-btn">
              <MdPhotoCamera size={20} />
            </div>
          </div>
        </ThumbnailSettingContainer>
        <ShareContainer>
          <div id="explain">
            <HiOutlineShare />
            <span>직접 만든 퀴즈를 공유해보세요!</span>
          </div>
          <div id="share-wrapper">
           <SNSShare/>
          </div>
        </ShareContainer>
        <HomeButton onClick={goHome}>
          <MdHomeFilled size={20} />
          홈으로
        </HomeButton>
      </div>
    </Wrapper>
  );
};
Page.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};

// 기능 가시성을 위한 임시 디자인
const Wrapper = styled.div`
  background-color: #fff6f7;
  height: 100vh;
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  overflow-y: scroll;
  & {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
  #inner-wrapper {
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media (max-width: 400px) {
      width: 100%;
    }
  }
  strong {
    font-weight: 400;
    color: #ff4d57;
    margin: 0 0.5rem 0 0.5rem;
  }
`;

const Complete = styled.div`
  color: #ff4d57;
  font-size: 40px;
  font-family: 'RixInooAriDuriR';
  margin-top: 36px;
`;

const QuizInfoContainer = styled.div`
  width: 80%;

  margin-top: 36px;
  #top {
    padding: 1.5rem 0 1.5rem 0;
    background-color: #ff4d57;
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
    color: white;
    font-size: 20px;
    font-weight: bold;
    display: flex;
    justify-content: center;
  }
  #bottom {
    padding: 1.5rem 0 1.5rem 0;
    background-color: #fff;
    border-bottom-right-radius: 1rem;
    border-bottom-left-radius: 1rem;
    border: solid 1px #f2f2f2;
    border-top: none;
    display: flex;
    justify-content: center;
    font-size: 20px;
    font-weight: 300;
  }
`;

const ThumbnailSettingContainer = styled.div`
  margin-top: 24px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  #explain {
    color: #888;
    text-align: center;
    font-size: 14px;
    strong {
      margin: 0;
    }
  }
  #thumbnail-img-wrapper {
    margin-top: 24px;
    width: 80%;
    height: 200px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 1rem;
    }
    #thumbnail-input-btn {
      position: absolute;
      top: 1rem;
      right: 1rem;
      color: white;
      &:hover {
        cursor: pointer;
      }
    }
  }
`;

const ShareContainer = styled.div`
  margin-top: 36px;
  width: 65%;
  #explain {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #888;
    font-size: 14px;
    span {
      margin-left: 0.5rem;
    }
  }
  #share-wrapper {
    margin-top: 24px;
  }
  
`;

const HomeButton = styled.div`
  margin-top: 48px;
  width: 60%;

  font-size: 16px;
  border-radius: 30px;
  padding: 1rem 1.5rem 1rem 1.5rem;

  background-color: #ff4d57;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    margin-right: 4px;
  }
  &:hover {
    cursor: pointer;
    background-color: #ffa5aa;
  }
`;
export default Page;
