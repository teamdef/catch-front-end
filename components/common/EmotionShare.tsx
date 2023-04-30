import styled from 'styled-components';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { BottomUpModal } from 'components/modal';
import { shareProps } from 'components/common/SNSShare';
import { RootState } from 'store';

const EmotionShare = () => {
  const [bottomUpisOpen, setBottomUpIsOpen] = useState<boolean>(false); /* 퀴즈 공유 바텀업 */
  const { quizSetId, setTitle, quizMaker, quizSetThumbnail } = useSelector((state: RootState) => state.solve);
  const snsShareObj: shareProps = {
    thumbnail: quizSetThumbnail,
    setTitle: setTitle,
    id: quizSetId,
    profileImg: quizMaker.profileImg,
    nickName: quizMaker.nickname,
  };

  const bottomUpOpen = () => {
    setBottomUpIsOpen(true);
  };
  const bottomUpClose = () => {
    setBottomUpIsOpen(false);
  };
  return (
    <Wrapper>
      <Content>
        {/* <TextBox>
          <span>퀴즈는 어떠셨나요?</span>
          <span>여러분의 의견을 알려주세요!</span>
        </TextBox>
        <EmotionBox>
          <button>
            <img src="/assets/img/emotion1.svg" alt="이모티콘이미지" />
            <p>재밌어요</p>
            <span>11</span>
          </button>
          <button>
            <img src="/assets/img/emotion2.svg" alt="이모티콘이미지" />
            <p>재미없어요</p>
            <span>11</span>
          </button>
          <button>
            <img src="/assets/img/emotion3.svg" alt="이모티콘이미지" />
            <p>쉬워요</p>
            <span>11</span>
          </button>
          <button>
            <img src="/assets/img/emotion4.svg" alt="이모티콘이미지" />
            <p>어려워요</p>
            <span>11</span>
          </button>
        </EmotionBox> */}
        <ShareButton
          id="quiz-share-btn"
          onClick={(e) => {
            bottomUpOpen();
            e.stopPropagation(); /* 이벤트 전파 방지 */
          }}
        >
          <img src="/assets/img/share2.svg" alt="" />
          퀴즈 공유하기
        </ShareButton>
        {bottomUpisOpen && <BottomUpModal shareInfo={snsShareObj} bottomUpClose={bottomUpClose} />}
      </Content>
    </Wrapper>
  );
};

export default EmotionShare;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;
const Content = styled.div`
display: inline-block;
`;
const TextBox = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-top: 40px;
  span {
    text-align: center;
  }
`;
const EmotionBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 32px;
  button {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 0;
    width: 40px;
    padding: 0;
    background-color: transparent;
    cursor: pointer;
    p {
      position:relative;
      display: block;
      margin-top: 10px;
      font-size: 11px;
      white-space: nowrap;
    }
    span {
      position:relative;
      display: block;
      font-size: 14px;
    }
  }
  margin-top: 16px;
`;

const ShareButton = styled.button`
  margin: auto;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 14px 0;
  min-width: 200px;
  width: 100%;
  font-size: 14px;
  gap: 12px;
  background-color: transparent;
  color: #9e9e9e;
  border: 1px solid #9e9e9e;
  border-radius: 8px;
  cursor: pointer;
`;
