import styled from 'styled-components';
import { HiLink } from 'react-icons/hi';
import { useEffect } from 'react';

export interface shareProps {
  thumbnail: string | null;
  set_title: string;
  id: string;
  profileImg: string | null;
  nickName: string;
}
const SNSShare = ({ thumbnail, set_title, id, profileImg, nickName }: shareProps) => {
  useEffect(() => {
    if (window.Kakao) {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY);
      }
    }
  }, [window.Kakao]);

  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('클립보드에 링크가 복사되었습니다.');
    } catch (e) {
      alert('복사에 실패하였습니다');
    }
  };

  const goFacebook = () => {
    window.open(
      `http://www.facebook.com/sharer.php?u=https://catchcatch.link/${id}/?utm_source=facebook&utm_medium=share&utm_campaign=funnel`,
    );
  };
  const goKakaoTalk = () => {
    if (window.Kakao) {
      const kakaoShareUrl = `quiz/solve/${id}/?utm_source=kakao&utm_medium=share&utm_campaign=funnel`;
      window.Kakao.Link.sendScrap({
        requestUrl: 'https://catchcatch.link/', // 요청 페이지 url 카카오 developer 에 등록된 도메인
        templateId: 83714, // 메시지템플릿 번호 카카오 developer 에 있음
        templateArgs: {
          PROFILE_IMG: profileImg || '/assets/img/user_default.png', // 퀴즈 제작자 프로필 이미지 주소 ${PROFILE_IMG}
          NICKNAME: nickName, // 퀴즈 제작자 닉네임 ${NICKNAME}
          QUIZ_THUMB: thumbnail || '/assets/img/catch_share.png', // 퀴즈 썸네일 주소 ${QUIZ_THUMB}
          TITLE: set_title, // 퀴즈 제목 텍스트 ${TITLE}
          ROUTE: kakaoShareUrl, // 퀴즈 공유 링크
        },
      });
    }
  };
  const goTwitter = () => {
    //"https://twitter.com/intent/tweet?text=" + sendText + "&url=" + sendUrl
    //캐치캐치에 접속해서 해당 퀴즈를 풀어보고 결과를 확인해보세요!
    const sendText = `[📢 캐치캐치] ${nickName}님이 만든 ${set_title} 퀴즈를 풀어보세요!🤔 링크를 클릭하면 캐치캐치 퀴즈 풀이 화면으로 바로 이동됩니다.😊🥰 `;
    const sendUrl = `https://catchcatch.link/quiz/solve/${id}/?utm_source=twitter&utm_medium=share&utm_campaign=funnel`;
    const hashtags = `캐치캐치,퀴즈,나만의퀴즈 `;
    window.open(`https://twitter.com/intent/tweet?text=${sendText}&url=${sendUrl}&hashtags=${hashtags}`);
  };

  return (
    <Wrapper>
      <img onClick={goTwitter} className="twitter-btn" src={'/assets/img/twitter_icon.webp'} />
      {/* <img onClick={goInstagram} className="instagram-btn" src={'/assets/img/instagram_icon.png'} /> */}
      <img onClick={goFacebook} className="facebook-btn" src={'/assets/img/facebook_icon.png'} />

      <button onClick={goKakaoTalk} className="share-btn kakao-btn">
        <img src={'/assets/img/kakao_icon.png'} />
      </button>
      <button
        className="share-btn link-copy"
        onClick={() => {
          handleCopyClipBoard(
            `https://catchcatch.link/quiz/solve/${id}/?utm_source=link&utm_medium=share&utm_campaign=funnel`,
          );
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

export default SNSShare;
