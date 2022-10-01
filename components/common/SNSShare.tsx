import styled from 'styled-components';
import { HiLink } from 'react-icons/hi';

const SNSShare = () => {
  const shareLink = 'http://localhost:3000/problem/어쩌구저쩌구';
  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('클립보드에 링크가 복사되었습니다.');
    } catch (e) {
      alert('복사에 실패하였습니다');
    }
  };

  return (
    <Wrapper>
      <img className="instagram-btn" src={'/assets/img/instagram_icon.png'} />
      <img className="facebook-btn" src={'/assets/img/facebook_icon.png'} />

      <button className="share-btn kakao-btn">
        <img src={'/assets/img/kakao_icon.png'} />
      </button>
      <button
        className="share-btn"
        onClick={() => {
          handleCopyClipBoard(shareLink);
        }}
      >
        <HiLink size={20} />
      </button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

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
  .instagram-btn {
    width: 50px;
    height: 50px;
  }
`;

export default SNSShare;
