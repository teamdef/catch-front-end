import styled from 'styled-components';

export const MainBtn = styled.button<{ isBlur?: boolean }>`
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
  opacity: ${({ isBlur }) => (isBlur ? 0.5 : 1)};
  background: #3b27ff;
  box-shadow: 0px 4px 0px 0px #0500c9;
  word-break: keep-all;
  &:disabled {
    opacity: 0.5;
    background: #3b27ff;
  }
  &:hover {
    cursor: pointer;
  }
  svg {
    margin-right: 4px;
  }
`;
export const Sketchbook = styled.div`
  position: relative;
  border-radius: 8px;
  border: 0.75px solid #00fba5;
  background: #fff;
  padding: 0 4.27%;
  box-shadow: 1px -2px 0px 0px #00fba5;
  &::before {
    content: '';
    position: absolute;
    top: -29px;
    left: 0;
    margin: 0 20px;
    width: calc(100% - 40px);
    height: 54px;
    background-image: url('/assets/img/rebranding/anyquiz/spring.svg');
    background-repeat: space;
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
