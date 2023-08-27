import React from 'react';
import Floating from 'components/common/Floating';
import styled from 'styled-components';

const EmptyQuiz = () => {
  return (
    <Empty>
      <Text>등록된 퀴즈가 없습니다.</Text>
      <Button>퀴즈 만들기</Button>
      <Floating />
    </Empty>
  );
};
const Empty = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  padding-bottom: 52px;
`;
const Text = styled.div`
  color: ${({ theme }) => theme.colors.blackColors.grey_900};
  padding: 7px 0;
`;
const Button = styled.div`
  color: ${({ theme }) => theme.colors.secondary_500};
  text-decoration: underline;
`;

export default EmptyQuiz;
