import React from 'react';
import styled from 'styled-components';
import { ShareInfo } from './ShareModal';

const Kakaotalk = ({ shareInfo }: { shareInfo: ShareInfo }) => {
  const { thumbnail, setTitle, id, profileImg, nickName } = shareInfo;
  const BASEURL: string = process.env.NEXT_PUBLIC_FRONTEND as string;

  const goKakaoTalk = () => {
    if (window.Kakao) {
      const kakaoShareUrl = `quiz/solve/${id}/?utm_source=kakao&utm_medium=share&utm_campaign=funnel`;
      window.Kakao.Link.sendScrap({
        requestUrl: 'https://catchcatch.link/', // 요청 페이지 url 카카오 developer 에 등록된 도메인
        templateId: 83714, // 메시지템플릿 번호 카카오 developer 에 있음
        templateArgs: {
          PROFILE_IMG: profileImg ?? `${BASEURL}/assets/img/user_default.png`, // 퀴즈 제작자 프로필 이미지 주소 ${PROFILE_IMG}
          NICKNAME: nickName ?? '탈퇴한 사용자', // 퀴즈 제작자 닉네임 ${NICKNAME}
          QUIZ_THUMB: thumbnail ?? `${BASEURL}/assets/img/catch_share.png`, // 퀴즈 썸네일 주소 ${QUIZ_THUMB}
          TITLE: setTitle, // 퀴즈 제목 텍스트 ${TITLE}
          ROUTE: kakaoShareUrl, // 퀴즈 공유 링크
        },
      });
    }
  };
  return <Button onClick={goKakaoTalk} className="share-btn kakao-btn" />;
};

const Button = styled.button`
  background-image: url(/assets/img/kakao_icon.png);
`;

export default Kakaotalk;
