import styled from 'styled-components';

const LargeContainedBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSize.body_1};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  padding: 12px 0;
  width: 100%;
  border: none;
  color: #fff;
  border-radius: 8px;
  border: 1px solid #0500c9;
  background: #3b27ff;
  box-shadow: 0px 4px 0px 0px #0500c9;
  word-break: keep-all;
  &:disabled {
    opacity: 0.5;
    background: #3b27ff;
  }
`;

export default LargeContainedBtn;
