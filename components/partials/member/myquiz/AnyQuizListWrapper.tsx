import styled from 'styled-components';
import { QuizSetCardType } from 'types/quiz';
import { QuizCard } from 'components/common';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import MoveCreateAnyQuizBtn from './MoveCreateAnyQuizBtn';

interface AnyQuizListWrapperProps {
  userAnyQuiz: QuizSetCardType[];
}
const AnyQuizListWrapper = ({ userAnyQuiz }: AnyQuizListWrapperProps) => {
  const { profileImg, nickName } = useSelector((state: RootState) => state.user);
  return (
    <Wrapper>
      <MoveCreateAnyQuizBtn />
      <QuizCardList>
        {userAnyQuiz.map((quizSet: any, idx: number) => {
          const obj = {
            quizSetId: quizSet.id,
            quizSetTitle: quizSet.set_title,
            createdAt: quizSet.created_at,
            thumbnail: quizSet.thumbnail,
            profileImg,
            nickname: nickName,
            solverCnt: quizSet.solver_cnt,
          };
          return <QuizCard quizInfo={obj} key={`quiz-set-card-${idx}`} />;
        })}
      </QuizCardList>
    </Wrapper>
  );
};
const Wrapper = styled.div``;
const QuizCardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
export default AnyQuizListWrapper;
