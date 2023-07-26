import styled from 'styled-components';

interface PropsType {
  rankingList: RankingType[] | null;
}
const RankingBoard = ({ rankingList }: PropsType) => {
  if (!rankingList) return null;
  const slice_list = rankingList.length >= 3 ? rankingList.slice(1, 3) : rankingList;
  const item = rankingList[0];
  slice_list.splice(1, 0, item);

  return (
    <Wrapper>
      {slice_list.map((user) => (
        <Ranker key={user.ranking}>
          <Nickname>{user.nickname}</Nickname>
          <Tag>
            {user.quizCount} / {user.score}
          </Tag>
          <Podium rank={user.ranking} />
        </Ranker>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.ul`
  position: relative;
  display: flex;
  padding: 0 8px;
`;

const Nickname = styled.span``;
const Tag = styled.span`
  margin-top: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 56px;
  height: 24px;
  border-radius: 18px;
  border: 1px solid ${({ theme }) => theme.colors.blackColors.grey_800};
  text-align: center;
`;
const Podium = styled.div<{ rank: number }>`
  background-color: #b099fe;
  box-shadow: 0px 2px 4px #dacefe;
  position: relative;
  width: 100%;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  ${({ rank }) =>
    rank === 1 &&
    'margin-top: 24px; aspect-ratio: 98/128; box-shadow:0px 2px 6px rgba(59, 39, 255, 0.20); background-color: #8c6eff;'};
  ${({ rank }) => rank === 2 && 'margin-top: 38px; aspect-ratio: 98/93'};
  ${({ rank }) => rank === 3 && 'margin-top: 26px; aspect-ratio: 98/86'};

  &::after {
    ${({ rank }) => rank === 1 && 'background-image: url(/assets/img/rebranding/anyquiz/gold_medal.svg);'}
    ${({ rank }) => rank === 2 && 'background-image: url(/assets/img/rebranding/anyquiz/silver_medal.svg);'}
    ${({ rank }) => rank === 3 && 'background-image: url(/assets/img/rebranding/anyquiz/bronze_medal.svg);'}
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    display: block;
    width: 50%;
    aspect-ratio: 48/80.68;
    background-size: 100% 100%;
  }
`;

const Ranker = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: end;
  align-items: center;
  color: ${({ theme }) => theme.colors.blackColors.grey_800};
  font-size: ${({ theme }) => theme.fontSize.caption};
`;

export default RankingBoard;
