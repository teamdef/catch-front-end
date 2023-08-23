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
interface ShareBoxProps {
  quizSetThumb?: string;
}
const ShareBox = ({ quizSetThumb }: ShareBoxProps) => {
  const { quizSetId, setTitle, quizMaker, quizSetThumbnail } = useSelector((state: RootState) => state.solve);
  const DEFAULT_IMG = '/assets/img/rebranding/icon/default_profile.svg';

  const shareInfo: ShareInfo = {
    thumbnail: quizSetThumbnail || quizSetThumb || DEFAULT_IMG,
    setTitle,
    id: quizSetId,
    profileImg: quizMaker.profileImg,
    nickName: quizMaker.nickname,
  };
  console.log(shareInfo);

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
  button {
    width: 57px;
    height: 57px;
    border-radius: 50%;
    background-repeat: no-repeat;
  }
`;

export default ShareBox;
