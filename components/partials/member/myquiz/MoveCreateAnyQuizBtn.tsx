import Router from 'next/router';
import React from 'react';
import styled from 'styled-components';

const MoveCreateAnyQuizBtn = () => {
  const moveCreateQuiz = () => {
    Router.push('/quiz/create');
  };

  return (
    <Wrapper onClick={moveCreateQuiz}>
      <Title>퀴즈 만들기</Title>
      <Description>모두의 퀴즈는 모든 사람이 풀 수 있습니다.</Description>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  padding: 37px 0;
  border: 1px dashed #8c6eff;
  background: #fff;
  margin-bottom: 36px;
  ::before {
    content: '';
    position: relative;
    display: block;
    width: 16px;
    height: 16px;
    background: url(/assets/img/rebranding/icon/plus_secondary500.svg) no-repeat center;
  }
`;
const Title = styled.h2`
  margin-top: 10px;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-size: ${({ theme }) => theme.fontSize.subtitle_2};
  color: ${({ theme }) => theme.colors.secondary_500};
`;
const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSize.caption};
  color: ${({ theme }) => theme.colors.secondary_300};
`;
export default MoveCreateAnyQuizBtn;
