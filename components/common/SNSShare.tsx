import styled from 'styled-components';
import { HiLink } from 'react-icons/hi';

const SNSShare = () => {
  const shareLink = 'home';
  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('클립보드에 링크가 복사되었습니다.');
    } catch (e) {
      alert('복사에 실패하였습니다');
    }
  };

  const goFacebook = () => {};
  const goInstagram = () => {};
  const goKakaoTalk = () => {
    window.Kakao.Link.sendScrap({
      requestUrl: 'http://localhost:3000/', // 요청 페이지 url 카카오 developer 에 등록된 도메인
      templateId: 83714, // 메시지템플릿 번호 카카오 developer 에 있음
      templateArgs: {
        PROFILE_IMG: 'https://i.stack.imgur.com/l60Hf.png', // 퀴즈 제작자 프로필 이미지 주소 ${PROFILE_IMG}
        NICKNAME: '멍어지', // 퀴즈 제작자 닉네임 ${NICKNAME}
        QUIZ_THUMB: 'https://t1.daumcdn.net/cfile/tistory/2403BA485896A5C829', // 퀴즈 썸네일 주소 ${QUIZ_THUMB}
        TITLE: '하영이 좋아하는 프랜차이즈 브랜드 맞추기', // 퀴즈 제목 텍스트 ${TITLE}
        ROUTE: shareLink, // 퀴즈 공유 링크
      },
    });
  };

  return (
    <Wrapper>
      <img onClick={goInstagram} className="instagram-btn" src={'/assets/img/instagram_icon.png'} />
      <img onClick={goFacebook} className="facebook-btn" src={'/assets/img/facebook_icon.png'} />

      <button onClick={goKakaoTalk} className="share-btn kakao-btn">
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
  .instagram-btn {
    width: 50px;
    height: 50px;
    &:hover {
      cursor: pointer;
    }
  }
`;

export default SNSShare;
