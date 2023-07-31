import styled from 'styled-components';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { Twitter, Facebook, Kakaotalk, LinkCopyBtn } from '.';

export interface ShareInfo {
  thumbnail: string | null;
  setTitle: string;
  id: string;
  profileImg: string | undefined;
  nickName: string | undefined;
}

const ShareBox = () => {
  const { quizSetId, setTitle, quizMaker, quizSetThumbnail } = useSelector((state: RootState) => state.solve);

  const shareInfo: ShareInfo = {
    thumbnail: quizSetThumbnail,
    setTitle,
    id: quizSetId,
    profileImg: quizMaker.profileImg,
    nickName: quizMaker.nickname,
  };

  useEffect(() => {
    if (window.Kakao) {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY);
      }
    }
  }, [window.Kakao]);

  return (
    <Wrapper>
      <Twitter shareInfo={shareInfo} />
      <Facebook id={shareInfo.id} />
      <Kakaotalk shareInfo={shareInfo} />
      <LinkCopyBtn id={shareInfo.id} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 27px;
  button {
    width: 57px;
    height: 57px;
    border-radius: 50%;
    background-repeat: no-repeat;
  }
`;

export default ShareBox;
