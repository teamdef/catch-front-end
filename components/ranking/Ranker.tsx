import React from 'react';
import styled from 'styled-components';

const Ranker = ({ ranker }: { ranker: RankingType }) => {
  if (!ranker) return <div />;

  return (
    <Box key={ranker.ranking} rank={ranker.ranking}>
      {ranker.nickname}
      <Tag>
        {ranker.score} / {ranker.quizCount}
      </Tag>
    </Box>
  );
};
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

const Box = styled.div<{ rank: number }>`
  ${({ rank }) => rank === 2 && 'padding-top:20px;'}
  ${({ rank }) => rank === 3 && 'padding-top:40px;'}
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  color: ${({ theme }) => theme.colors.blackColors.grey_800};
  font-size: ${({ theme }) => theme.fontSize.caption};
`;
export default Ranker;
