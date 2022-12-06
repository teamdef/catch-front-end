import styled from 'styled-components';

export const MainButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
  width: 100%;
  height: 50px;
  border: none;
  border-radius: 2rem;
  background-color: #ff4d57;
  color: #fff;
  box-shadow: 0 4px #c4363e;
  word-break: keep-all;
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

export const FlatButton = styled.button`
  bottom: 0;
  font-size: 14px;
  border-radius: 30px;
  border: none;
  height: 50px;
  font-weight: 500;
  background-color: #ff4d57;
  color: #fff;
  width: 100%;
  margin-right: 0.5rem;
  margin-left: 0.5rem;
  word-break:keep-all;
  &:disabled {
    color: #7c7c7c;
    background-color: #ececec;
  }
  &:hover {
    cursor: pointer;
  }
`;
