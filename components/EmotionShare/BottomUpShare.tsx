import { useState } from 'react';
import { useSelector } from 'react-redux';
import { BottomUpModal } from 'components/modal';
import { shareProps } from 'components/common/SNSShare';
import { RootState } from 'store';
import styled from 'styled-components';

const BottomUpShare = () => {
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
    <>
      <ShareButton
        id="quiz-share-btn"
        onClick={(e) => {
          bottomUpOpen();
          e.stopPropagation(); /* 이벤트 전파 방지 */
        }}
      >
        <img src="/assets/img/share2.svg" alt="share icon" />
        퀴즈 공유하기
      </ShareButton>
      {bottomUpisOpen && <BottomUpModal shareInfo={snsShareObj} bottomUpClose={bottomUpClose} />}
    </>
  );
};
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
export default BottomUpShare;
