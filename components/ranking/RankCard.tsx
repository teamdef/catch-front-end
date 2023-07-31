import React from 'react';
import styled from 'styled-components';
import { theme } from 'styles/theme';

const RankCard = ({ user }: { user: RankingType }) => {
  return (
    <Box>
      <UserRank>{user.ranking}</UserRank>
      <UserName>{user.nickname}</UserName>
      <UserScore>
        {user.score} / {user.quizCount}
      </UserScore>
    </Box>
  );
};

const Box = styled.div`
  position: relative;
  display: flex;
  gap: 12px;
  border-radius: 8px;
  background-color: ${theme.colors.primary_50};
  align-items: center;
  padding: 12px 20px;
`;
const UserRank = styled.span`
  color: ${theme.colors.blackColors.grey_900};
  font-weight: ${theme.fontWeight.medium};
  font-size: ${theme.fontSize.subtitle_2};
`;
const UserName = styled.span`
  flex-grow: 1;
  color: ${theme.colors.blackColors.grey_800};
  font-weight: ${theme.fontWeight.bold};
  font-size: ${theme.fontSize.caption};
`;
const UserScore = styled.span`
  color: ${theme.colors.blackColors.grey_900};
  font-weight: ${theme.fontWeight.medium};
  font-size: ${theme.fontSize.caption};
`;
export default RankCard;
