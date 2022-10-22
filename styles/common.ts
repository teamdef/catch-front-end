import styled from 'styled-components';

export const MainButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
  width: 400px;
  height: 50px;
  border: none;
  border-radius: 2rem;
  margin-right: 0.5rem;
  margin-left: 0.5rem;
  background-color: #ff4d57;
  color: #fff;
  box-shadow: 0 4px #c4363e;
  &:disabled {
    color: #7c7c7c;
    background-color: #ececec;
    box-shadow: 0 4px lightgrey;
  }
  &:hover {
    cursor: pointer;
  }
  svg {
    margin-right: 4px;
  }
`;
