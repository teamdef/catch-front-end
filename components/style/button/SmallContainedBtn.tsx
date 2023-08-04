import styled from 'styled-components';

const SmallContainedBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  color: #fff;
  padding: 13px 0;
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

export default SmallContainedBtn;
