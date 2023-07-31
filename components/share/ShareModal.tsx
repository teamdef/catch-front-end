import styled from 'styled-components';
import { useEffect } from 'react';
import { Twitter, Facebook, Kakaotalk, LinkCopyBtn } from '.';

export interface ShareModalProps {
  thumbnail: string | null;
  setTitle: string;
  id: string;
  profileImg: string | undefined;
  nickName: string | undefined;
}

const ShareModal = ({ thumbnail, setTitle, id, profileImg, nickName }: ShareModalProps) => {
  useEffect(() => {
    if (window.Kakao) {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY);
      }
    }
  }, [window.Kakao]);

  return (
    <Wrapper>
      <Twitter props={{ setTitle, id, nickName }} />
      <Facebook id={id} />
      <Kakaotalk props={{ thumbnail, setTitle, id, profileImg, nickName }} />
      <LinkCopyBtn id={id} />
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
