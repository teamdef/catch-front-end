import ProfileImage from 'components/common/ProfileImage';
import { SyntheticEvent } from 'react';
import styled from 'styled-components';

import { QuizSetCardType } from 'types/quiz';
import { timeForToday } from 'utils/date';
import { useRouter } from 'next/router';

interface PropsType {
  quizSet: QuizSetCardType;
}

const QuizCard = ({ quizSet }: PropsType) => {
  const router = useRouter();
  const DEFAULT_IMG_URL = '/assets/img/rebranding/anyquiz/defaultThumb.svg';

  const onErrorHandler = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = DEFAULT_IMG_URL;
  };

  const moveQuizStart = () => {
    router.push(`/quiz/solve/${quizSet.quizSetId}`);
  };

  return (
    <Wrapper onClick={moveQuizStart}>
      <Img
        src={quizSet.quizSetThumbnail ? quizSet.quizSetThumbnail : DEFAULT_IMG_URL}
        onError={onErrorHandler}
        alt="퀴즈썸네일이미지"
      />
      <Content>
        <Top>
          <QuizTitle>{quizSet.quizSetTitle}</QuizTitle>
          <CreatedAt>{timeForToday(quizSet.createdAt)}</CreatedAt>
        </Top>
        <Bottom>
          <Profile>
            <ProfileImage src={quizSet.quizSetMaker.profile_img} size="24px" />
            <Nickname>{quizSet.quizSetMaker.nickname || '탈퇴한 사용자'}</Nickname>
          </Profile>
          <Count>참여 {quizSet.solverCnt}</Count>
        </Bottom>
      </Content>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 120px;
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
  align-items: end;
`;
const QuizTitle = styled.h2`
  color: ${({ theme }) => theme.colors.blackColors.grey_800};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-size: ${({ theme }) => theme.fontSize.body_2};
`;
const CreatedAt = styled.span`
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
