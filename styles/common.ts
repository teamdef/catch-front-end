import styled from 'styled-components';

export const MainButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  line-height:28px;
  font-weight: 700;
  width: 100%;
  height: 64px;
  border: none;
  border-radius: 16px;
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
  font-size: 1rem;
  border-radius: 16px;
  border: none;
  font-weight: 500;
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
