import styled from 'styled-components';

const FlatBtn = styled.button`
  font-size: 1rem;
  font-weight: 500;
  border-radius: 16px;
  border: none;
  background-color: #ff4d57;
  color: #fff;
  width: 200px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  word-break: keep-all;
  &:disabled {
    color: #7c7c7c;
    background-color: #ececec;
  }
  &:hover {
    cursor: pointer;
  }
`;
export default FlatBtn;
