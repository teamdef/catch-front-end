import styled from 'styled-components';

const QuizTitle = styled.div`
  display: flex;
  color: #000;
  font-size: ${({ theme }) => theme.fontSize.body_2};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  margin-left: 4px;
  height: 36px;
  margin-bottom: 12px;
`;
export default QuizTitle;
