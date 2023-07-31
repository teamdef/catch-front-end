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

const ShareModal = () => {
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
  justify-content: center;
  gap: 20px;
  .share-btn {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #d9d9d9;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    &:hover {
      cursor: pointer;
    }
    &:active {
      outline: none;
    }
  }
  .kakao-btn {
    background-color: #fbe54d;
    img {
      width: 18px;
      height: 17px;
      object-fit: cover;
    }
  }
  .facebook-btn,
  .instagram-btn,
  .twitter-btn {
    width: 50px;
    height: 50px;
    &:hover {
      cursor: pointer;
    }
  }
`;

export default ShareModal;
