import ProfileImage from 'components/common/ProfileImage';
import { SyntheticEvent } from 'react';
import styled from 'styled-components';

import timeForToday from 'utils/date';
import { useRouter } from 'next/router';

interface QuizCardProps {
  quizInfo: {
    quizSetId: string;
    quizSetTitle: string;
    thumbnail?: string | null;
    createdAt: string;
    profileImg?: string;
    nickname?: string;
    solverCnt: number;
  };
  onMyPage?: boolean;
}

const QuizCard = ({ quizInfo, onMyPage }: QuizCardProps) => {
  const { quizSetId, quizSetTitle, thumbnail, createdAt, profileImg, nickname, solverCnt } = quizInfo;
  const router = useRouter();
  const DEFAULT_IMG_URL = '/assets/img/rebranding/default_main_thumb.svg';

  const onErrorHandler = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = DEFAULT_IMG_URL;
  };

  const moveHandler = () => {
    if (onMyPage) router.push(`/member/myquiz/${quizSetId}`);
    else router.push(`/quiz/solve/${quizSetId}`);
  };

  return (
    <Wrapper onClick={moveHandler}>
      <Img src={thumbnail || DEFAULT_IMG_URL} onError={onErrorHandler} alt="퀴즈썸네일이미지" />
      <Content>
        <Top>
          <QuizTitle>{quizSetTitle}</QuizTitle>
          <CreatedAt>{timeForToday(createdAt)}</CreatedAt>
        </Top>
        <Bottom>
          <Profile>
            <ProfileImage src={profileImg} size="24px" />
            <Nickname>{nickname || '탈퇴한 사용자'}</Nickname>
          </Profile>
          <Count>참여 {solverCnt}</Count>
        </Bottom>
      </Content>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  border-radius: 4px;
  border: solid 1px #b4a0ff;
  display: flex;
  overflow: hidden;
  cursor: pointer;
`;

const Img = styled.img`
  width: 33.24%;
  aspect-ratio: 57/50;
  object-fit: cover;
  flex: none;
`;
const Content = styled.div`
  width: 100%;
  ${({ theme }) =>
    theme.mixin.flex({ direction: 'column', justify: 'space-between', align: 'start' })}; /* mixin 사용 */
  padding: 10px 18px;
`;

const Top = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;
const QuizTitle = styled.h2`
  color: ${({ theme }) => theme.colors.blackColors.grey_800};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-size: ${({ theme }) => theme.fontSize.body_2};
`;
const CreatedAt = styled.span`
  flex: none;
  color: ${({ theme }) => theme.colors.blackColors.grey_500};
  font-size: ${({ theme }) => theme.fontSize.caption};
`;

const Bottom = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Profile = styled.div`
  ${({ theme }) => theme.mixin.flex()}
`;
const Nickname = styled.span`
  margin-left: 8px;
  color: ${({ theme }) => theme.colors.blackColors.grey_700};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-size: ${({ theme }) => theme.fontSize.caption};
`;
const Count = styled.div`
  color: ${({ theme }) => theme.colors.blackColors.grey_500};
  font-size: ${({ theme }) => theme.fontSize.caption};
  display: flex;
`;
export default QuizCard;
