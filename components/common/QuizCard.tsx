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
  const { quizSetId, quizSetTitle, thumbnail, createdAt, nickname, solverCnt } = quizInfo;
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
        <QuizTitle>{quizSetTitle}</QuizTitle>
        <Nickname>{nickname || '탈퇴한 사용자'}</Nickname>
        <Bottom>
          <Count>참여 {solverCnt}</Count>
          <CreatedAt>{timeForToday(createdAt)}</CreatedAt>
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
  position: relative;
  width: 33.24%;
  aspect-ratio: 57/50;
  object-fit: cover;
  flex: none;
`;
const Content = styled.div`
  position: relative;
  width: 67.76%;
  ${({ theme }) => theme.mixin.flex({ direction: 'column', justify: 'start', align: 'start' })}; /* mixin 사용 */
  padding: 10px 18px;
`;

const QuizTitle = styled.h2`
  position: relative;
  width: 100%;
  display: block;
  color: ${({ theme }) => theme.colors.blackColors.grey_800};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-size: ${({ theme }) => theme.fontSize.body_2};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const CreatedAt = styled.span`
  flex: none;
  color: ${({ theme }) => theme.colors.blackColors.grey_700};
  font-size: ${({ theme }) => theme.fontSize.caption};
`;

const Bottom = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Nickname = styled.span`
  padding-top: 6px;
  color: ${({ theme }) => theme.colors.blackColors.grey_700};
  font-size: ${({ theme }) => theme.fontSize.caption};
  flex-grow: 1;
`;
const Count = styled.div`
  color: ${({ theme }) => theme.colors.blackColors.grey_700};
  font-size: ${({ theme }) => theme.fontSize.caption};
  display: flex;
`;
export default QuizCard;
