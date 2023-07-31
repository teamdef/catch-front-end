import styled from 'styled-components';
import Router, { useRouter } from 'next/router';

interface UserScoreProps {
  name: string;
  score: number;
  total: number;
}
const UserScore = ({ name, score, total }: UserScoreProps) => {
  const router = useRouter();
  const { quizset_id, solver_id } = router.query;

  const moveMatchnote = () => {
    Router.push(`/quiz/solve/${quizset_id}/result/${solver_id}/matchnote`);
  };
  return (
    <Wrapper>
      <Name>{name}</Name>
      <Bottom>
        <Score>
          <b>{total}문제</b> 중 <b>{score}문제</b> 맞혔네요!
        </Score>
        <MoveMatchBtn onClick={moveMatchnote}>오답노트</MoveMatchBtn>
      </Bottom>
    </Wrapper>
  );
};

const Wrapper = styled.div``;
const Name = styled.div`
  color: ${({ theme }) => theme.colors.blackColors.grey_900};
  font-size: ${({ theme }) => theme.fontSize.subtitle_2};
  font-weight: ${({ theme }) => theme.fontWeight.extra_bold};
`;
const Bottom = styled.div`
  margin-top: 6px;
  position: relative;
  display: flex;
  justify-content: space-between;
`;

const Score = styled.span`
  color: ${({ theme }) => theme.colors.blackColors.grey_800};
  font-size: ${({ theme }) => theme.fontSize.body_1};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  b {
    color: ${({ theme }) => theme.colors.secondary_500};
  }
`;
const MoveMatchBtn = styled.button`
  height: 34px;
  background: none;
  line-height: 34px;
  display: flex;
  align-items: center;
  margin-top: 2px;
  gap: 8px;
  color: ${({ theme }) => theme.colors.secondary_500};
  font-size: ${({ theme }) => theme.fontSize.caption};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  &::after {
    content: '';
    position: relative;
    display: block;
    width: 6px;
    height: 9px;
    background: url(/assets/img/rebranding/icon/arrow_right_secondary500.svg);
  }
`;

export default UserScore;
