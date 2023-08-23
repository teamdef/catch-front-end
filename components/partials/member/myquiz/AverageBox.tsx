import React from 'react';
import styled from 'styled-components';

interface AverageBoxProps {
  average: number;
  count: number;
}
const AverageBox = ({ average, count }: AverageBoxProps) => {
  const parseAverage = Math.floor((average as number) * 10) / 10;
  return (
    <Wrapper>
      <span>평균점수</span>
      {count ? <span>{parseAverage}점</span> : <span>-</span>}
    </Wrapper>
  );
};
const Wrapper = styled.div`
  position: relative;
  padding: 13px 36px;
  background-color: ${({ theme }) => theme.colors.primary_50};
  color: ${({ theme }) => theme.colors.secondary_500};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  display: flex;
  justify-content: space-between;
`;
export default AverageBox;
